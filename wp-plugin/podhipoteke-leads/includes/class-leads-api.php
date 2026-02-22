<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class PH24_Leads_API {

    const NAMESPACE   = 'ph24/v1';
    const RATE_LIMIT  = 5; // max zapytań na minutę per IP

    public function register_routes(): void {
        add_action( 'rest_api_init', [ $this, 'register' ] );
    }

    public function register(): void {
        // POST /leads  (publiczny)  |  GET /leads  (admin)
        register_rest_route( self::NAMESPACE, '/leads', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'create_lead' ],
                'permission_callback' => '__return_true',
                'args'                => $this->get_create_args(),
            ],
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_leads' ],
                'permission_callback' => [ $this, 'check_admin' ],
            ],
        ] );

        // PATCH /leads/{id}  |  DELETE /leads/{id}
        register_rest_route( self::NAMESPACE, '/leads/(?P<id>[\d]+)', [
            [
                'methods'             => 'PATCH',
                'callback'            => [ $this, 'update_lead' ],
                'permission_callback' => [ $this, 'check_admin' ],
            ],
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => [ $this, 'delete_lead' ],
                'permission_callback' => [ $this, 'check_admin' ],
            ],
        ] );

        // GET /leads/export  (admin, CSV)
        register_rest_route( self::NAMESPACE, '/leads/export', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [ $this, 'export_csv' ],
            'permission_callback' => [ $this, 'check_admin' ],
        ] );
    }

    public function create_lead( WP_REST_Request $request ): WP_REST_Response|WP_Error {
        // Rate limiting (Transients API)
        $ip  = $this->get_client_ip();
        $key = 'ph24_rl_' . md5( $ip );
        $cnt = (int) get_transient( $key );

        if ( $cnt >= self::RATE_LIMIT ) {
            return new WP_Error( 'rate_limited', 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.', [ 'status' => 429 ] );
        }
        set_transient( $key, $cnt + 1, 60 );

        $params = $request->get_json_params();

        // Walidacja telefonu (format PL)
        $phone = preg_replace( '/\s+/', '', $params['phone'] ?? '' );
        if ( ! preg_match( '/^(\+48)?[0-9]{9}$/', $phone ) ) {
            return new WP_Error( 'invalid_phone', 'Nieprawidłowy numer telefonu.', [ 'status' => 400 ] );
        }

        $id = PH24_Leads_DB::insert_lead( array_merge( $params, [ 'phone' => $phone ] ) );

        if ( ! $id ) {
            return new WP_Error( 'db_error', 'Błąd zapisu danych. Spróbuj ponownie.', [ 'status' => 500 ] );
        }

        // Email powiadomienie
        $lead = PH24_Leads_DB::get_lead( $id );
        if ( $lead ) {
            ( new PH24_Leads_Email() )->send_notification( $lead );
        }

        return new WP_REST_Response( [ 'success' => true, 'id' => $id ], 201 );
    }

    public function get_leads( WP_REST_Request $request ): WP_REST_Response {
        return new WP_REST_Response( PH24_Leads_DB::get_leads( [
            'status'    => (string) ( $request->get_param( 'status' )   ?? '' ),
            'source'    => (string) ( $request->get_param( 'source' )   ?? '' ),
            'page'      => max( 1, intval( $request->get_param( 'page' )     ?? 1 ) ),
            'per_page'  => min( 100, intval( $request->get_param( 'per_page' ) ?? 20 ) ),
            'date_from' => (string) ( $request->get_param( 'date_from' ) ?? '' ),
            'date_to'   => (string) ( $request->get_param( 'date_to' )   ?? '' ),
        ] ), 200 );
    }

    public function update_lead( WP_REST_Request $request ): WP_REST_Response|WP_Error {
        $id     = intval( $request->get_param( 'id' ) );
        $params = $request->get_json_params();
        $status = sanitize_text_field( $params['status'] ?? '' );

        if ( ! PH24_Leads_DB::update_status( $id, $status ) ) {
            return new WP_Error( 'update_failed', 'Błąd aktualizacji statusu.', [ 'status' => 400 ] );
        }
        return new WP_REST_Response( [ 'success' => true ], 200 );
    }

    public function delete_lead( WP_REST_Request $request ): WP_REST_Response|WP_Error {
        $id = intval( $request->get_param( 'id' ) );

        if ( ! PH24_Leads_DB::delete_lead( $id ) ) {
            return new WP_Error( 'delete_failed', 'Błąd usunięcia leada.', [ 'status' => 400 ] );
        }
        return new WP_REST_Response( [ 'success' => true ], 200 );
    }

    public function export_csv( WP_REST_Request $request ): void {
        $csv      = PH24_Leads_DB::export_csv( [
            'status'    => (string) ( $request->get_param( 'status' )    ?? '' ),
            'source'    => (string) ( $request->get_param( 'source' )    ?? '' ),
            'date_from' => (string) ( $request->get_param( 'date_from' ) ?? '' ),
            'date_to'   => (string) ( $request->get_param( 'date_to' )   ?? '' ),
        ] );
        $filename = 'leady-' . gmdate( 'Y-m-d' ) . '.csv';

        header( 'Content-Type: text/csv; charset=utf-8' );
        header( 'Content-Disposition: attachment; filename="' . $filename . '"' );
        header( 'Pragma: no-cache' );
        echo $csv; // phpcs:ignore WordPress.Security.EscapeOutput
        exit;
    }

    public function check_admin(): bool {
        return current_user_can( 'manage_options' );
    }

    private function get_create_args(): array {
        return [
            'source'    => [ 'required' => false, 'type' => 'string' ],
            'name'      => [ 'required' => true,  'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ],
            'phone'     => [ 'required' => true,  'type' => 'string' ],
            'email'     => [ 'required' => true,  'type' => 'string', 'validate_callback' => 'is_email' ],
            'city'      => [ 'required' => false, 'type' => 'string' ],
            'message'   => [ 'required' => false, 'type' => 'string' ],
            'tool_data' => [ 'required' => false, 'type' => 'object' ],
        ];
    }

    private function get_client_ip(): string {
        foreach ( [ 'HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR' ] as $k ) {
            if ( ! empty( $_SERVER[ $k ] ) ) {
                return trim( explode( ',', $_SERVER[ $k ] )[0] );
            }
        }
        return '';
    }
}
