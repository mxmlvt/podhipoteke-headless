<?php
/**
 * Snippet dla WordPressa – wklej do Code Snippets (lub functions.php).
 *
 * Robi dwie rzeczy:
 *  1. Rejestruje pola Yoast SEO jako zapisywalne przez REST API
 *     (potrzebne dla skryptu upload-to-wp.js)
 *  2. Po każdym opublikowaniu/aktualizacji posta wysyła webhook do Next.js,
 *     który natychmiast odświeża cache strony (on-demand revalidation)
 */

// ── 1. Yoast SEO meta przez REST API ────────────────────────────────────────
add_action('rest_api_init', function () {
    $fields = [
        '_yoast_wpseo_title'    => 'string',
        '_yoast_wpseo_metadesc' => 'string',
    ];
    foreach ($fields as $key => $type) {
        register_post_meta('post', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

// ── 2. Webhook → Next.js revalidation ───────────────────────────────────────
add_action('save_post', function ($post_id, $post, $update) {
    // Tylko opublikowane posty typu "post"
    if ($post->post_type !== 'post' || $post->post_status !== 'publish') return;
    // Ignoruj auto-save
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    $next_url = 'https://podhipoteke24.pl';
    $secret   = 'ph24_rv_k9mX2nQpL8wR';
    $slug     = $post->post_name;

    wp_remote_post(
        $next_url . '/api/revalidate?secret=' . $secret . '&slug=' . urlencode($slug),
        ['timeout' => 5, 'blocking' => false]
    );
}, 10, 3);
