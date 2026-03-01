import path from "path";
import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

export const dynamic = "force-dynamic";

// ─── Inter font – local WOFF files, no network dependency, full Polish character support ───
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");
Font.register({ family: "Inter",     src: path.join(FONTS_DIR, "Inter-Regular.ttf") });
Font.register({ family: "Inter-Bold", src: path.join(FONTS_DIR, "Inter-Bold.ttf") });

/* ─── styles ─── */
const C = {
  primary: "#1c435e",
  accent: "#2299AA",
  accentSoft: "#e6f7f9",
  mint: "#f0fafb",
  gray: "#6b7280",
  grayLight: "#f3f4f6",
  text: "#374151",
  dark: "#111827",
  white: "#ffffff",
  green: "#16a34a",
  amber: "#d97706",
  red: "#dc2626",
};

const STATUS_COLORS: Record<string, string> = {
  qualified: C.green,
  conditional: C.amber,
  not_qualified: C.red,
};

const STATUS_LABELS: Record<string, string> = {
  qualified: "KWALIFIKUJESZ SIĘ",
  conditional: "WYMAGA ANALIZY",
  not_qualified: "BRAK KWALIFIKACJI",
};

const styles = StyleSheet.create({
  page: { fontFamily: "Inter", backgroundColor: C.white, paddingBottom: 50 },
  header: { backgroundColor: C.primary, padding: "28 36 24 36" },
  headerTitle: { color: C.white, fontSize: 20, fontFamily: "Inter-Bold", marginBottom: 4 },
  headerSub: { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  statusBadge: { marginTop: 12, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20, alignSelf: "flex-start" },
  statusText: { fontSize: 10, fontFamily: "Inter-Bold", color: C.white, letterSpacing: 1 },
  body: { padding: "24 36" },
  sectionTitle: { fontSize: 9, fontFamily: "Inter-Bold", color: C.accent, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 },
  titleText: { fontSize: 16, fontFamily: "Inter-Bold", color: C.dark, marginBottom: 8, lineHeight: 1.4 },
  desc: { fontSize: 10, color: C.text, lineHeight: 1.6, marginBottom: 18 },
  amountBox: { backgroundColor: C.mint, borderRadius: 12, padding: "16 20", marginBottom: 18 },
  amountLabel: { fontSize: 8, fontFamily: "Inter-Bold", color: C.accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  amountValue: { fontSize: 22, fontFamily: "Inter-Bold", color: C.primary },
  amountProduct: { fontSize: 9, color: C.gray, marginTop: 4 },
  divider: { height: 1, backgroundColor: C.grayLight, marginVertical: 16 },
  row: { flexDirection: "row", gap: 16, marginBottom: 16 },
  halfBox: { flex: 1, backgroundColor: C.grayLight, borderRadius: 10, padding: "12 14" },
  halfLabel: { fontSize: 7, fontFamily: "Inter-Bold", color: C.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  stepRow: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "flex-start" },
  stepNum: { width: 18, height: 18, borderRadius: 9, backgroundColor: C.accent, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  stepNumText: { color: C.white, fontSize: 8, fontFamily: "Inter-Bold" },
  stepText: { fontSize: 10, color: C.text, flex: 1, lineHeight: 1.5, paddingTop: 2 },
  docRow: { flexDirection: "row", gap: 8, marginBottom: 6, alignItems: "center" },
  docDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.accent },
  docText: { fontSize: 10, color: C.text, flex: 1 },
  ctaBox: { backgroundColor: C.primary, borderRadius: 12, padding: "16 20", marginTop: 8 },
  ctaText: { color: C.white, fontSize: 11, fontFamily: "Inter-Bold", marginBottom: 4 },
  ctaSub: { color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1.5 },
  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, borderTopColor: C.grayLight,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: "10 36", backgroundColor: C.white,
  },
  footerText: { fontSize: 8, color: C.gray },
  answerGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  answerChip: { backgroundColor: C.mint, borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10 },
  answerLabel: { fontSize: 8, color: C.gray, marginBottom: 1 },
  answerValue: { fontSize: 9, fontFamily: "Inter-Bold", color: C.primary },
});

/* ─── PDF Document ─── */
function DiagnosticPDF({
  status,
  title,
  description,
  recommendedProduct,
  estimatedMin,
  estimatedMax,
  nextSteps,
  requiredDocs,
  propertyType,
  propertyValue,
  bikIssues,
  hasBailiff,
  isBusiness,
  loanPurpose,
  name,
}: {
  status: string;
  title: string;
  description: string;
  recommendedProduct: string;
  estimatedMin: number;
  estimatedMax: number;
  nextSteps: string[];
  requiredDocs: string[];
  propertyType: string;
  propertyValue: number;
  bikIssues: string;
  hasBailiff: boolean;
  isBusiness: boolean;
  loanPurpose: string[];
  name: string;
}) {
  const statusColor = STATUS_COLORS[status] ?? C.gray;
  const statusLabel = STATUS_LABELS[status] ?? status.toUpperCase();
  const hasAmount = estimatedMin > 0 && estimatedMax > 0;

  function fmtPLN(n: number) {
    return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
  }

  const PROP_LABELS: Record<string, string> = {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    dzialka: "Działka budowlana",
    grunt_rolny: "Grunt rolny",
    lokal: "Lokal usługowy",
  };

  const BIK_LABELS: Record<string, string> = {
    nie: "Brak wpisów",
    tak: "Posiada wpisy",
    nie_wiem: "Nie sprawdzał",
  };

  const today = new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <Document title="Diagnostyka finansowa – PodHipoteke24">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Raport diagnostyki finansowej</Text>
          <Text style={styles.headerSub}>
            PODHIPOTEKE24.PL • podhipoteke24.pl • tel. 577 873 616
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Greeting */}
          {name ? (
            <Text style={[styles.desc, { fontSize: 11, marginBottom: 4, fontFamily: "Inter-Bold", color: C.dark }]}>
              Drogi/a {name},
            </Text>
          ) : null}

          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>

          {/* Amount */}
          {hasAmount && (
            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Szacowana kwota pożyczki</Text>
              <Text style={styles.amountValue}>
                {fmtPLN(estimatedMin)} – {fmtPLN(estimatedMax)}
              </Text>
              {recommendedProduct ? (
                <Text style={styles.amountProduct}>Produkt: {recommendedProduct}</Text>
              ) : null}
            </View>
          )}

          <View style={styles.divider} />

          {/* Answer summary */}
          <Text style={styles.sectionTitle}>Twoje odpowiedzi</Text>
          <View style={styles.answerGrid}>
            {propertyType && (
              <View style={styles.answerChip}>
                <Text style={styles.answerLabel}>Typ nieruchomości</Text>
                <Text style={styles.answerValue}>{PROP_LABELS[propertyType] ?? propertyType}</Text>
              </View>
            )}
            {propertyValue > 0 && (
              <View style={styles.answerChip}>
                <Text style={styles.answerLabel}>Wartość nieruchomości</Text>
                <Text style={styles.answerValue}>{fmtPLN(propertyValue)}</Text>
              </View>
            )}
            <View style={styles.answerChip}>
              <Text style={styles.answerLabel}>Historia BIK/KRD</Text>
              <Text style={styles.answerValue}>{BIK_LABELS[bikIssues] ?? bikIssues}</Text>
            </View>
            <View style={styles.answerChip}>
              <Text style={styles.answerLabel}>Zajęcie komornicze</Text>
              <Text style={styles.answerValue}>{hasBailiff ? "Tak" : "Nie"}</Text>
            </View>
            <View style={styles.answerChip}>
              <Text style={styles.answerLabel}>Typ klienta</Text>
              <Text style={styles.answerValue}>{isBusiness ? "Firma" : "Osoba prywatna"}</Text>
            </View>
            {loanPurpose.length > 0 && (
              <View style={styles.answerChip}>
                <Text style={styles.answerLabel}>Cel pożyczki</Text>
                <Text style={styles.answerValue}>{loanPurpose.join(", ")}</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {/* Two columns: steps + docs */}
          <View style={styles.row}>
            {/* Next steps */}
            <View style={styles.halfBox}>
              <Text style={styles.halfLabel}>Kolejne kroki</Text>
              {nextSteps.map((s, i) => (
                <View key={i} style={styles.stepRow}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{s}</Text>
                </View>
              ))}
            </View>

            {/* Required docs */}
            {requiredDocs.length > 0 && (
              <View style={styles.halfBox}>
                <Text style={styles.halfLabel}>Dokumenty do przygotowania</Text>
                {requiredDocs.map((d, i) => (
                  <View key={i} style={styles.docRow}>
                    <View style={styles.docDot} />
                    <Text style={styles.docText}>{d}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Bezpłatna konsultacja z doradcą</Text>
            <Text style={styles.ctaSub}>
              Zadzwoń: 577 873 616 lub napisz na kontakt@podhipoteke24.pl{"\n"}
              Pracujemy pon–pt 8:00–18:00, sob 9:00–14:00
            </Text>
          </View>

          <Text style={[styles.desc, { fontSize: 8, color: C.gray, marginTop: 12, textAlign: "center" }]}>
            Raport wygenerowany: {today} • Wynik diagnostyki ma charakter informacyjny i nie stanowi oferty kredytowej.{"\n"}
            Ostateczna decyzja zależy od indywidualnej analizy przeprowadzonej przez doradcę.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PODHIPOTEKE24.PL</Text>
          <Text style={styles.footerText}>podhipoteke24.pl • 577 873 616</Text>
        </View>
      </Page>
    </Document>
  );
}

/* ─── Route handler ─── */
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;

  const status = p.get("status") ?? "qualified";
  const title = p.get("title") ?? "";
  const description = p.get("description") ?? "";
  const recommendedProduct = p.get("recommended_product") ?? "";
  const estimatedMin = Number(p.get("estimated_min") ?? 0);
  const estimatedMax = Number(p.get("estimated_max") ?? 0);
  const nextSteps = (p.get("next_steps") ?? "").split("||").filter(Boolean);
  const requiredDocs = (p.get("required_documents") ?? "").split("||").filter(Boolean);
  const propertyType = p.get("property_type") ?? "";
  const propertyValue = Number(p.get("property_value") ?? 0);
  const bikIssues = p.get("has_bik_issues") ?? "nie";
  const hasBailiff = p.get("has_bailiff") === "true";
  const isBusiness = p.get("is_business") === "true";
  const loanPurpose = (p.get("loan_purpose") ?? "").split("||").filter(Boolean);
  const name = p.get("name") ?? "";

  try {
    const buffer = await renderToBuffer(
      <DiagnosticPDF
        status={status}
        title={title}
        description={description}
        recommendedProduct={recommendedProduct}
        estimatedMin={estimatedMin}
        estimatedMax={estimatedMax}
        nextSteps={nextSteps}
        requiredDocs={requiredDocs}
        propertyType={propertyType}
        propertyValue={propertyValue}
        bikIssues={bikIssues}
        hasBailiff={hasBailiff}
        isBusiness={isBusiness}
        loanPurpose={loanPurpose}
        name={name}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=diagnostyka-finansowa-podhipoteke24.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf-diagnostic] error:", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
