<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class PH24_Leads_Admin {

    private static array $source_labels = [
        'kalkulator-raty'         => 'Kalkulator raty',
        'estymator-kwoty'         => 'Estymator kwoty',
        'porownywarka'            => 'Porównywarka',
        'diagnostyka'             => 'Diagnostyka',
        'kalkulator-konsolidacji' => 'Kalk. konsolidacji',
        'kontakt'                 => 'Formularz kontakt.',
    ];

    private static array $statuses = [
        'new'       => 'Nowy',
        'contacted' => 'Skontaktowany',
        'converted' => 'Konwersja',
        'rejected'  => 'Odrzucony',
    ];

    private static array $status_colors = [
        'new'       => '#2299AA',
        'contacted' => '#f59e0b',
        'converted' => '#10b981',
        'rejected'  => '#ef4444',
    ];

    public function init(): void {
        add_action( 'admin_menu',            [ $this, 'add_menu' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'wp_ajax_ph24_update_status', [ $this, 'ajax_update_status' ] );
        add_action( 'wp_ajax_ph24_delete_lead',  [ $this, 'ajax_delete_lead' ] );
        add_action( 'admin_post_ph24_save_settings', [ $this, 'save_settings' ] );
    }

    public function add_menu(): void {
        add_menu_page(
            'Leady – PodHipoteke24',
            'Leady',
            'manage_options',
            'ph24-leads',
            [ $this, 'render_leads_page' ],
            'dashicons-businessman',
            30
        );
        add_submenu_page(
            'ph24-leads',
            'Ustawienia leadów',
            'Ustawienia',
            'manage_options',
            'ph24-leads-settings',
            [ $this, 'render_settings_page' ]
        );
    }

    public function enqueue_assets( string $hook ): void {
        if ( ! str_contains( $hook, 'ph24-leads' ) ) return;
        wp_enqueue_style( 'ph24-leads', PH24_LEADS_PLUGIN_URL . 'assets/admin-style.css', [], PH24_LEADS_VERSION );
    }

    // ----------------------------------------------------------------
    // Strona główna – lista leadów
    // ----------------------------------------------------------------
    public function render_leads_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Brak uprawnień' );

        $status    = sanitize_text_field( $_GET['status']    ?? '' );
        $source    = sanitize_text_field( $_GET['source']    ?? '' );
        $date_from = sanitize_text_field( $_GET['date_from'] ?? '' );
        $date_to   = sanitize_text_field( $_GET['date_to']   ?? '' );
        $page      = max( 1, intval( $_GET['paged'] ?? 1 ) );

        $data        = PH24_Leads_DB::get_leads( compact( 'status', 'source', 'date_from', 'date_to', 'page' ) + [ 'per_page' => 20 ] );
        $leads       = $data['leads'];
        $total       = $data['total'];
        $total_pages = $data['pages'];

        $export_url = add_query_arg(
            [ 'status' => $status, 'source' => $source, 'date_from' => $date_from, 'date_to' => $date_to ],
            rest_url( 'ph24/v1/leads/export' )
        );
        ?>
        <div class="wrap ph24-wrap">
            <h1 class="ph24-h1">
                Leady
                <span class="ph24-total-badge"><?= esc_html( $total ) ?></span>
            </h1>

            <form method="get" class="ph24-filters">
                <input type="hidden" name="page" value="ph24-leads">

                <select name="status">
                    <option value="">Wszystkie statusy</option>
                    <?php foreach ( self::$statuses as $val => $lbl ) : ?>
                        <option value="<?= esc_attr( $val ) ?>" <?= selected( $status, $val, false ) ?>><?= esc_html( $lbl ) ?></option>
                    <?php endforeach; ?>
                </select>

                <select name="source">
                    <option value="">Wszystkie źródła</option>
                    <?php foreach ( self::$source_labels as $val => $lbl ) : ?>
                        <option value="<?= esc_attr( $val ) ?>" <?= selected( $source, $val, false ) ?>><?= esc_html( $lbl ) ?></option>
                    <?php endforeach; ?>
                </select>

                <input type="date" name="date_from" value="<?= esc_attr( $date_from ) ?>" placeholder="Data od">
                <input type="date" name="date_to"   value="<?= esc_attr( $date_to )   ?>" placeholder="Data do">

                <button type="submit" class="button">Filtruj</button>
                <a href="?page=ph24-leads" class="button">Wyczyść</a>
                <a href="<?= esc_url( $export_url ) ?>" class="button ph24-export" target="_blank">📊 Eksport CSV</a>
            </form>

            <?php if ( empty( $leads ) ) : ?>
                <div class="ph24-empty">Brak leadów spełniających kryteria.</div>
            <?php else : ?>

            <table class="ph24-table widefat">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Źródło</th>
                        <th>Imię</th>
                        <th>Telefon</th>
                        <th>E-mail</th>
                        <th>Status</th>
                        <th>Dane narzędzia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ( $leads as $lead ) :
                    $td = ! empty( $lead['tool_data'] ) ? json_decode( $lead['tool_data'], true ) : [];
                    $sc = self::$status_colors[ $lead['status'] ] ?? '#999';
                ?>
                    <tr>
                        <td class="ph24-date"><?= esc_html( date_i18n( 'd.m.Y H:i', strtotime( $lead['created_at'] ) ) ) ?></td>

                        <td>
                            <span class="ph24-badge" style="background:<?= esc_attr( $sc ) ?>22;color:<?= esc_attr( $sc ) ?>">
                                <?= esc_html( self::$source_labels[ $lead['source'] ] ?? $lead['source'] ) ?>
                            </span>
                        </td>

                        <td class="ph24-name"><?= esc_html( $lead['name'] ) ?></td>

                        <td><a href="tel:<?= esc_attr( $lead['phone'] ) ?>"><?= esc_html( $lead['phone'] ) ?></a></td>

                        <td><a href="mailto:<?= esc_attr( $lead['email'] ) ?>"><?= esc_html( $lead['email'] ) ?></a></td>

                        <td>
                            <select
                                class="ph24-status-select"
                                data-id="<?= intval( $lead['id'] ) ?>"
                                style="border-left:3px solid <?= esc_attr( $sc ) ?>"
                            >
                                <?php foreach ( self::$statuses as $val => $lbl ) : ?>
                                    <option value="<?= esc_attr( $val ) ?>" <?= selected( $lead['status'], $val, false ) ?>>
                                        <?= esc_html( $lbl ) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </td>

                        <td>
                            <?php if ( ! empty( $td ) ) : ?>
                                <details class="ph24-details">
                                    <summary>Pokaż dane</summary>
                                    <table class="ph24-tool-data">
                                        <?php foreach ( $td as $k => $v ) : ?>
                                            <tr>
                                                <td><strong><?= esc_html( $k ) ?></strong></td>
                                                <td><?= esc_html( is_array( $v ) ? implode( ', ', $v ) : $v ) ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </table>
                                </details>
                            <?php else : ?>—<?php endif; ?>
                        </td>

                        <td class="ph24-actions">
                            <button
                                class="ph24-delete-btn button-link-delete"
                                data-id="<?= intval( $lead['id'] ) ?>"
                                title="Usuń lead"
                            >🗑 Usuń</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>

            <?php if ( $total_pages > 1 ) : ?>
                <div class="ph24-pagination">
                    <?php for ( $i = 1; $i <= $total_pages; $i++ ) : ?>
                        <a href="?page=ph24-leads&paged=<?= $i ?>&status=<?= esc_attr( $status ) ?>&source=<?= esc_attr( $source ) ?>"
                           class="button <?= $i === $page ? 'button-primary' : '' ?>"><?= $i ?></a>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>
            <?php endif; ?>
        </div>

        <script>
        (function() {
            const ajaxUrl  = '<?= esc_url( admin_url( 'admin-ajax.php' ) ) ?>';
            const nonceStatus = '<?= wp_create_nonce( 'ph24_update_status' ) ?>';
            const nonceDelete = '<?= wp_create_nonce( 'ph24_delete_lead' ) ?>';

            // ── Zmiana statusu ────────────────────────────────────────
            document.querySelectorAll('.ph24-status-select').forEach(function(sel) {
                sel.addEventListener('change', async function() {
                    const res  = await fetch(ajaxUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: 'action=ph24_update_status&id=' + this.dataset.id + '&status=' + this.value + '&nonce=' + nonceStatus,
                    });
                    const json = await res.json();
                    if (!json.success) alert('Błąd aktualizacji statusu. Odśwież stronę.');
                });
            });

            // ── Usuwanie leada ────────────────────────────────────────
            document.querySelectorAll('.ph24-delete-btn').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    if (!confirm('Czy na pewno chcesz usunąć ten lead? Operacja jest nieodwracalna.')) return;

                    btn.disabled = true;
                    btn.textContent = '⏳';

                    const res  = await fetch(ajaxUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: 'action=ph24_delete_lead&id=' + btn.dataset.id + '&nonce=' + nonceDelete,
                    });
                    const json = await res.json();

                    if (json.success) {
                        const row = btn.closest('tr');
                        row.style.transition = 'opacity .3s';
                        row.style.opacity    = '0';
                        setTimeout(() => row.remove(), 320);
                    } else {
                        btn.disabled    = false;
                        btn.textContent = '🗑 Usuń';
                        alert('Błąd usuwania leada. Odśwież stronę i spróbuj ponownie.');
                    }
                });
            });
        })();
        </script>
        <?php
    }

    // ----------------------------------------------------------------
    // Strona ustawień
    // ----------------------------------------------------------------
    public function render_settings_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Brak uprawnień' );

        $email         = get_option( 'ph24_leads_email', get_option( 'admin_email' ) );
        $notifications = get_option( 'ph24_leads_notifications', '1' );
        ?>
        <div class="wrap">
            <h1>Ustawienia leadów – PodHipoteke24</h1>

            <?php if ( isset( $_GET['saved'] ) ) : ?>
                <div class="notice notice-success is-dismissible"><p>✅ Ustawienia zapisane.</p></div>
            <?php endif; ?>

            <form method="post" action="<?= esc_url( admin_url( 'admin-post.php' ) ) ?>">
                <?php wp_nonce_field( 'ph24_save_settings' ); ?>
                <input type="hidden" name="action" value="ph24_save_settings">

                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="ph24_email">Email do powiadomień</label></th>
                        <td>
                            <input id="ph24_email" type="text" name="ph24_leads_email"
                                   value="<?= esc_attr( $email ) ?>" class="large-text">
                            <p class="description">Na te adresy trafią powiadomienia o nowych leadach. Wiele adresów oddziel przecinkiem, np.: <code>jan@firma.pl, piotr@firma.pl</code></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Powiadomienia email</th>
                        <td>
                            <label>
                                <input type="checkbox" name="ph24_leads_notifications" value="1" <?= checked( $notifications, '1' ) ?>>
                                Wysyłaj email przy każdym nowym leadzie
                            </label>
                        </td>
                    </tr>
                </table>

                <?php submit_button( 'Zapisz ustawienia' ); ?>
            </form>
        </div>
        <?php
    }

    // ----------------------------------------------------------------
    // AJAX
    // ----------------------------------------------------------------
    public function ajax_update_status(): void {
        check_ajax_referer( 'ph24_update_status', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Brak uprawnień', 403 );

        $id     = intval( $_POST['id']     ?? 0 );
        $status = sanitize_text_field( $_POST['status'] ?? '' );

        PH24_Leads_DB::update_status( $id, $status )
            ? wp_send_json_success()
            : wp_send_json_error( 'Błąd aktualizacji' );
    }

    public function ajax_delete_lead(): void {
        check_ajax_referer( 'ph24_delete_lead', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Brak uprawnień', 403 );

        $id = intval( $_POST['id'] ?? 0 );
        if ( $id <= 0 ) wp_send_json_error( 'Nieprawidłowe ID' );

        PH24_Leads_DB::delete_lead( $id )
            ? wp_send_json_success()
            : wp_send_json_error( 'Błąd usuwania' );
    }

    public function save_settings(): void {
        check_admin_referer( 'ph24_save_settings' );
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Brak uprawnień' );

        $raw_emails    = explode( ',', $_POST['ph24_leads_email'] ?? '' );
        $clean_emails  = array_filter( array_map( 'sanitize_email', array_map( 'trim', $raw_emails ) ) );
        update_option( 'ph24_leads_email', implode( ', ', $clean_emails ) );
        update_option( 'ph24_leads_notifications', isset( $_POST['ph24_leads_notifications'] ) ? '1' : '0' );

        wp_redirect( admin_url( 'admin.php?page=ph24-leads-settings&saved=1' ) );
        exit;
    }
}
