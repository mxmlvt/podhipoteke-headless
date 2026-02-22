<?php
/**
 * Plugin Name:       PodHipoteke24 Leady
 * Plugin URI:        https://podhipoteke24.pl
 * Description:       System zarządzania leadami – zbiera dane z narzędzi i formularzy, panel admina, email powiadomienia, eksport CSV.
 * Version:           1.0.0
 * Requires PHP:      8.0
 * Author:            PodHipoteke24
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'PH24_LEADS_VERSION',    '1.0.0' );
define( 'PH24_LEADS_DB_VERSION', '1.0' );
define( 'PH24_LEADS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'PH24_LEADS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once PH24_LEADS_PLUGIN_DIR . 'includes/class-leads-db.php';
require_once PH24_LEADS_PLUGIN_DIR . 'includes/class-leads-api.php';
require_once PH24_LEADS_PLUGIN_DIR . 'includes/class-leads-admin.php';
require_once PH24_LEADS_PLUGIN_DIR . 'includes/class-leads-email.php';

register_activation_hook( __FILE__, [ 'PH24_Leads_DB', 'create_table' ] );

function ph24_leads_init(): void {
    $api = new PH24_Leads_API();
    $api->register_routes();

    if ( is_admin() ) {
        $admin = new PH24_Leads_Admin();
        $admin->init();
    }
}
add_action( 'plugins_loaded', 'ph24_leads_init' );
