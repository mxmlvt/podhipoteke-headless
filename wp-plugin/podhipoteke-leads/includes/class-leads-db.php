<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class PH24_Leads_DB {

    const TABLE_NAME = 'ph24_leads';

    /** Tworzy tabelę przy aktywacji pluginu */
    public static function create_table(): void {
        global $wpdb;
        $table          = $wpdb->prefix . self::TABLE_NAME;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table (
            id          bigint(20)   NOT NULL AUTO_INCREMENT,
            source      varchar(50)  NOT NULL,
            name        varchar(100) NOT NULL,
            phone       varchar(20)  NOT NULL,
            email       varchar(100) NOT NULL,
            city        varchar(100) DEFAULT NULL,
            message     text         DEFAULT NULL,
            tool_data   longtext     DEFAULT NULL,
            status      varchar(20)  NOT NULL DEFAULT 'new',
            created_at  datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
            ip_address  varchar(45)  DEFAULT NULL,
            PRIMARY KEY (id),
            KEY status     (status),
            KEY source     (source),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
        update_option( 'ph24_leads_db_version', PH24_LEADS_DB_VERSION );
    }

    /** Wstawia nowy lead. Zwraca ID lub false. */
    public static function insert_lead( array $data ): int|false {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        $result = $wpdb->insert(
            $table,
            [
                'source'     => sanitize_text_field( $data['source'] ?? 'kontakt' ),
                'name'       => sanitize_text_field( $data['name'] ),
                'phone'      => sanitize_text_field( $data['phone'] ),
                'email'      => sanitize_email( $data['email'] ),
                'city'       => isset( $data['city'] )    ? sanitize_text_field( $data['city'] )       : null,
                'message'    => isset( $data['message'] ) ? sanitize_textarea_field( $data['message'] ) : null,
                'tool_data'  => isset( $data['tool_data'] ) ? wp_json_encode( $data['tool_data'] )     : null,
                'status'     => 'new',
                'created_at' => current_time( 'mysql' ),
                'ip_address' => self::get_client_ip(),
            ],
            [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
        );

        return $result ? $wpdb->insert_id : false;
    }

    /** Pobiera listę leadów z filtrami i paginacją */
    public static function get_leads( array $args = [] ): array {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        $where  = [];
        $values = [];

        if ( ! empty( $args['status'] ) ) {
            $where[]  = 'status = %s';
            $values[] = $args['status'];
        }
        if ( ! empty( $args['source'] ) ) {
            $where[]  = 'source = %s';
            $values[] = $args['source'];
        }
        if ( ! empty( $args['date_from'] ) ) {
            $where[]  = 'DATE(created_at) >= %s';
            $values[] = $args['date_from'];
        }
        if ( ! empty( $args['date_to'] ) ) {
            $where[]  = 'DATE(created_at) <= %s';
            $values[] = $args['date_to'];
        }

        $where_sql = ! empty( $where ) ? 'WHERE ' . implode( ' AND ', $where ) : '';
        $per_page  = isset( $args['per_page'] ) ? max( 1, intval( $args['per_page'] ) ) : 20;
        $page      = isset( $args['page'] )     ? max( 1, intval( $args['page'] ) )     : 1;
        $offset    = ( $page - 1 ) * $per_page;

        if ( ! empty( $values ) ) {
            $leads = $wpdb->get_results(
                $wpdb->prepare( "SELECT * FROM $table $where_sql ORDER BY created_at DESC LIMIT %d OFFSET %d",
                    array_merge( $values, [ $per_page, $offset ] ) ),
                ARRAY_A
            );
            $total = (int) $wpdb->get_var(
                $wpdb->prepare( "SELECT COUNT(*) FROM $table $where_sql", $values )
            );
        } else {
            $leads = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC LIMIT $per_page OFFSET $offset", ARRAY_A );
            $total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM $table" );
        }

        return [
            'leads' => $leads ?? [],
            'total' => $total,
            'pages' => (int) ceil( $total / $per_page ),
        ];
    }

    public static function get_lead( int $id ): ?array {
        global $wpdb;
        $table  = $wpdb->prefix . self::TABLE_NAME;
        $result = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", $id ), ARRAY_A );
        return $result ?: null;
    }

    public static function update_status( int $id, string $status ): bool {
        global $wpdb;
        $allowed = [ 'new', 'contacted', 'converted', 'rejected' ];
        if ( ! in_array( $status, $allowed, true ) ) return false;
        return (bool) $wpdb->update(
            $wpdb->prefix . self::TABLE_NAME,
            [ 'status' => $status ],
            [ 'id' => $id ],
            [ '%s' ],
            [ '%d' ]
        );
    }

    public static function delete_lead( int $id ): bool {
        global $wpdb;
        return (bool) $wpdb->delete(
            $wpdb->prefix . self::TABLE_NAME,
            [ 'id' => $id ],
            [ '%d' ]
        );
    }

    public static function export_csv( array $args = [] ): string {
        $data  = self::get_leads( array_merge( $args, [ 'per_page' => 10000 ] ) );
        $leads = $data['leads'];

        $csv = "\xEF\xBB\xBF"; // BOM dla Excela
        $csv .= "ID,Data,Źródło,Imię,Telefon,Email,Miasto,Status,Dane narzędzia\n";

        foreach ( $leads as $l ) {
            $csv .= implode( ',', [
                $l['id'],
                '"' . $l['created_at'] . '"',
                '"' . $l['source'] . '"',
                '"' . str_replace( '"', '""', $l['name'] ) . '"',
                '"' . $l['phone'] . '"',
                '"' . $l['email'] . '"',
                '"' . str_replace( '"', '""', $l['city'] ?? '' ) . '"',
                '"' . $l['status'] . '"',
                '"' . str_replace( '"', '""', $l['tool_data'] ?? '' ) . '"',
            ] ) . "\n";
        }

        return $csv;
    }

    private static function get_client_ip(): string {
        foreach ( [ 'HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR' ] as $key ) {
            if ( ! empty( $_SERVER[ $key ] ) ) {
                $ip = trim( explode( ',', $_SERVER[ $key ] )[0] );
                if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) return $ip;
            }
        }
        return '';
    }
}
