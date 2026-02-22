<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class PH24_Leads_Email {

    private static array $source_labels = [
        'kalkulator-raty'          => 'Kalkulator raty',
        'estymator-kwoty'          => 'Estymator kwoty',
        'porownywarka'             => 'Porównywarka kredytów',
        'diagnostyka'              => 'Diagnostyka finansowa',
        'kalkulator-konsolidacji'  => 'Kalkulator konsolidacji',
        'kontakt'                  => 'Formularz kontaktowy',
    ];

    private function get_email(): string {
        return (string) get_option( 'ph24_leads_email', get_option( 'admin_email' ) );
    }

    private function notifications_on(): bool {
        return (bool) get_option( 'ph24_leads_notifications', '1' );
    }

    public function send_notification( array $lead ): bool {
        if ( ! $this->notifications_on() ) return false;

        $source_label = self::$source_labels[ $lead['source'] ] ?? $lead['source'];
        $subject      = sprintf( '[PodHipoteke24] Nowy lead z %s – %s', $source_label, $lead['name'] );

        $tool_data      = ! empty( $lead['tool_data'] ) ? json_decode( $lead['tool_data'], true ) : [];
        $tool_data_html = $this->render_tool_data( $tool_data );

        $body = $this->email_template( [
            'name'           => $lead['name'],
            'phone'          => $lead['phone'],
            'email'          => $lead['email'],
            'city'           => $lead['city'] ?? '—',
            'source_label'   => $source_label,
            'created_at'     => $lead['created_at'],
            'tool_data_html' => $tool_data_html,
            'admin_url'      => admin_url( 'admin.php?page=ph24-leads' ),
        ] );

        return wp_mail( $this->get_email(), $subject, $body, [ 'Content-Type: text/html; charset=UTF-8' ] );
    }

    private function render_tool_data( array $data ): string {
        if ( empty( $data ) ) return '';
        $html = '<table style="border-collapse:collapse;width:100%;font-size:13px">';
        foreach ( $data as $key => $value ) {
            $val  = is_array( $value ) ? implode( ', ', $value ) : $value;
            $html .= '<tr>'
                   . '<td style="padding:4px 8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;white-space:nowrap">' . esc_html( $key )  . '</td>'
                   . '<td style="padding:4px 8px;border:1px solid #e5e7eb">'                                                                        . esc_html( $val )  . '</td>'
                   . '</tr>';
        }
        return $html . '</table>';
    }

    private function email_template( array $d ): string {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f3f4f6">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">

  <div style="background:#1c435e;padding:24px 28px">
    <p style="margin:0;color:#fff;font-size:20px;font-weight:700">🏠 PodHipoteke24.pl &mdash; Nowy lead</p>
  </div>

  <div style="padding:24px 28px">
    ' . $this->field( 'Imię i nazwisko', esc_html( $d['name'] ) ) . '
    ' . $this->field( 'Telefon', '<a href="tel:' . esc_attr( $d['phone'] ) . '" style="color:#2299AA">' . esc_html( $d['phone'] ) . '</a>' ) . '
    ' . $this->field( 'E-mail',  '<a href="mailto:' . esc_attr( $d['email'] ) . '" style="color:#2299AA">' . esc_html( $d['email'] ) . '</a>' ) . '
    ' . $this->field( 'Miasto',  esc_html( $d['city'] ) ) . '
    ' . $this->field( 'Źródło',  esc_html( $d['source_label'] ) ) . '
    ' . $this->field( 'Data',    esc_html( $d['created_at'] ) ) . '
    ' . ( $d['tool_data_html'] ? $this->field( 'Dane narzędzia', $d['tool_data_html'] ) : '' ) . '

    <a href="' . esc_url( $d['admin_url'] ) . '" style="display:inline-block;margin-top:16px;padding:10px 22px;background:#2299AA;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">
      Przejdź do panelu leadów &rarr;
    </a>
  </div>

  <div style="padding:14px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">
    PodHipoteke24.pl &bull; Tel: 577 873 616 &bull; kontakt@podhipoteke24.pl
  </div>

</div>
</body></html>';
    }

    private function field( string $label, string $value ): string {
        return '<div style="margin-bottom:14px">
                  <p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;letter-spacing:.5px">' . $label . '</p>
                  <p style="margin:0;font-size:15px;color:#111827">' . $value . '</p>
                </div>';
    }
}
