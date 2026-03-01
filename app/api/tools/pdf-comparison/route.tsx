import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { LOAN_PRODUCTS, calcMonthlyPayment, calcTotalCost } from "@/lib/comparison-data";

export const dynamic = "force-dynamic";

// ─── Inter font – local WOFF files, no network dependency, full Polish character support ───
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");
Font.register({ family: "Inter",     src: path.join(FONTS_DIR, "Inter-Regular.ttf") });
Font.register({ family: "Inter-Bold", src: path.join(FONTS_DIR, "Inter-Bold.ttf") });

// ─── Local path – checked at runtime, optional (PDF renders without photo if missing) ───
const ADLER_PHOTO_PATH = path.join(process.cwd(), "public", "images", "piotr-adler.png");
const ADLER_PHOTO_EXISTS = fs.existsSync(ADLER_PHOTO_PATH);
console.log("[pdf-comparison] cwd:", process.cwd());
console.log("[pdf-comparison] adler photo path:", ADLER_PHOTO_PATH);
console.log("[pdf-comparison] adler photo exists:", ADLER_PHOTO_EXISTS);

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
  red: "#dc2626",
};

const styles = StyleSheet.create({
  page: { fontFamily: "Inter", backgroundColor: C.white, paddingBottom: 50 },
  header: { backgroundColor: C.primary, padding: "28 36 24 36" },
  headerTitle: { color: C.white, fontSize: 20, fontFamily: "Inter-Bold", marginBottom: 4 },
  headerSub: { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  paramBox: { backgroundColor: C.accentSoft, marginTop: 12, borderRadius: 8, padding: "8 14", flexDirection: "row", gap: 20 },
  paramItem: { flexDirection: "row", gap: 6, alignItems: "center" },
  paramLabel: { fontSize: 8, color: C.accent },
  paramValue: { fontSize: 9, fontFamily: "Inter-Bold", color: C.primary },
  body: { padding: "24 36" },
  sectionTitle: { fontSize: 9, fontFamily: "Inter-Bold", color: C.accent, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 },

  tableHeader: { flexDirection: "row", backgroundColor: C.dark, borderTopLeftRadius: 6, borderTopRightRadius: 6, padding: "7 8" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.grayLight, padding: "8 8" },
  tableRowHighlight: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.accentSoft, padding: "8 8", backgroundColor: "#f0fafb" },
  tableFooter: { borderBottomLeftRadius: 6, borderBottomRightRadius: 6, backgroundColor: C.grayLight, padding: "6 8" },

  thCell: { fontSize: 7, fontFamily: "Inter-Bold", color: C.white, textTransform: "uppercase" },
  tdCell: { fontSize: 8, color: C.text },
  tdBold: { fontSize: 8, fontFamily: "Inter-Bold", color: C.dark },
  tdAccent: { fontSize: 9, fontFamily: "Inter-Bold", color: C.accent },

  /* widths */
  colProduct: { flex: 2.2 },
  colRate: { flex: 1.1, textAlign: "center" },
  colLtv: { flex: 0.7, textAlign: "center" },
  colBik: { flex: 0.7, textAlign: "center" },
  colMonthly: { flex: 1.1, textAlign: "right" },
  colTotal: { flex: 1.1, textAlign: "right" },
  colComm: { flex: 0.7, textAlign: "right" },

  bestBox: { backgroundColor: C.primary, borderRadius: 12, padding: "14 18", marginTop: 16, flexDirection: "row", gap: 12, alignItems: "flex-start" },
  bestLabel: { fontSize: 8, color: "rgba(255,255,255,0.6)", fontFamily: "Inter-Bold", textTransform: "uppercase", marginBottom: 3 },
  bestValue: { fontSize: 12, fontFamily: "Inter-Bold", color: C.white },
  bestSub: { fontSize: 8, color: "rgba(255,255,255,0.7)", marginTop: 2 },

  ctaBox: { backgroundColor: C.accent, borderRadius: 12, padding: "14 18", marginTop: 12 },
  ctaText: { color: C.white, fontSize: 11, fontFamily: "Inter-Bold", marginBottom: 4 },
  ctaSub: { color: "rgba(255,255,255,0.85)", fontSize: 9, lineHeight: 1.5 },

  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, borderTopColor: C.grayLight,
    flexDirection: "row", justifyContent: "space-between",
    padding: "10 36", backgroundColor: C.white,
  },
  footerText: { fontSize: 8, color: C.gray },
  disclaimer: { fontSize: 7, color: C.gray, marginTop: 10, textAlign: "center", lineHeight: 1.6 },

  // ── Piotr Adler page ──
  adlerHeader: { backgroundColor: C.primary, padding: "24 36 20 36" },
  adlerHeaderTitle: { color: C.white, fontSize: 18, fontFamily: "Inter-Bold", marginBottom: 3 },
  adlerHeaderSub: { color: "rgba(255,255,255,0.65)", fontSize: 9 },
  adlerBody: { padding: "20 36" },
  adlerProfile: { flexDirection: "row", gap: 16, marginBottom: 18, alignItems: "flex-start" },
  adlerPhoto: { width: 80, height: 80, borderRadius: 40, objectFit: "cover" },
  adlerName: { fontSize: 16, fontFamily: "Inter-Bold", color: C.primary, marginBottom: 3 },
  adlerRole: { fontSize: 9, color: C.gray, marginBottom: 5 },
  adlerPhone: { fontSize: 10, fontFamily: "Inter-Bold", color: C.accent },
  pointRow: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "flex-start" },
  pointBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: C.accent, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pointNum: { color: C.white, fontSize: 8, fontFamily: "Inter-Bold" },
  pointContent: { flex: 1 },
  pointTitle: { fontSize: 9, fontFamily: "Inter-Bold", color: C.dark, marginBottom: 2 },
  pointText: { fontSize: 8, color: C.gray, lineHeight: 1.5 },
  adlerCtaBox: { backgroundColor: C.primary, borderRadius: 12, padding: "16 20", marginTop: 16 },
  adlerCtaText: { color: C.white, fontSize: 11, fontFamily: "Inter-Bold", marginBottom: 4 },
  adlerCtaSub: { color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1.5 },
});

const ADLER_POINTS = [
  { title: "Ponad 17 lat doświadczenia w finansowaniu pod hipotekę", text: "Działam w branży finansowej nieprzerwanie od 2007 roku. Przez lata przeanalizowałem setki przypadków związanych z pożyczkami pod zastaw nieruchomości." },
  { title: "Specjalizacja w pożyczkach pod zastaw nieruchomości", text: "Nie działam od wszystkiego. Specjalizuję się w finansowaniu zabezpieczonym hipoteką: pod zastaw domu, mieszkania, działki lub lokalu." },
  { title: "Indywidualna analiza każdej sprawy", text: "Każdy klient ma inną sytuację finansową. Nie stosuję gotowych schematów – analizuję wartość nieruchomości, strukturę zobowiązań i realny cel finansowania." },
  { title: "Transparentność i jasne warunki", text: "W finansach najważniejsze jest zaufanie. Jasno omawiam warunki finansowania, koszty i zabezpieczenie. Bez ukrytych zapisów i niedomówień." },
  { title: "Dyskrecja i bezpieczeństwo", text: "Sprawy finansowe często są wrażliwe. Zapewniam pełną poufność oraz profesjonalne podejście na każdym etapie współpracy." },
  { title: "Realne rozwiązania, nie obietnice", text: "Jeśli rozwiązanie jest możliwe – powiem wprost. Jeśli nie – również. Moim celem nie jest sprzedaż za wszelką cenę, lecz długofalowa reputacja." },
  { title: "Bezpośredni kontakt", text: "Kontaktujesz się bezpośrednio ze mną – nie z call center. Masz jasną komunikację i konkretną odpowiedź." },
];

function fmtPLN(n: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
}
function fmtPct(n: number) {
  return n.toFixed(1).replace(".", ",") + "%";
}

function ComparisonPDF({ loanAmount, term }: { loanAmount: number; term: number }) {
  const today = new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });

  const rows = LOAN_PRODUCTS.map((p) => {
    const midRate = (p.rate_min + p.rate_max) / 2;
    const monthly = calcMonthlyPayment(loanAmount, midRate, term);
    const total = calcTotalCost(loanAmount, midRate, term, p.commission, p.monthly_fee);
    return { product: p, monthly, total };
  });

  const best = rows
    .filter((r) => r.product.highlighted)
    .sort((a, b) => a.monthly - b.monthly)[0];

  return (
    <Document title="Porównanie pożyczek – PodHipoteke24">
      {/* ── Strona 1: Porównanie ── */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Porównanie ofert pożyczek hipotecznych</Text>
          <Text style={styles.headerSub}>PODHIPOTEKE24.PL • podhipoteke24.pl • tel. 577 873 616</Text>
          <View style={styles.paramBox}>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Kwota:</Text>
              <Text style={styles.paramValue}>{fmtPLN(loanAmount)}</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Okres:</Text>
              <Text style={styles.paramValue}>{term} mies. ({Math.round(term / 12)} lat)</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Data:</Text>
              <Text style={styles.paramValue}>{today}</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Zestawienie ofert</Text>

          {/* Table */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thCell, styles.colProduct]}>Produkt / Dostawca</Text>
            <Text style={[styles.thCell, styles.colRate]}>Oprocentowanie</Text>
            <Text style={[styles.thCell, styles.colLtv]}>LTV max</Text>
            <Text style={[styles.thCell, styles.colBik]}>BIK</Text>
            <Text style={[styles.thCell, styles.colMonthly]}>Rata mies.</Text>
            <Text style={[styles.thCell, styles.colTotal]}>Koszt całk.</Text>
            <Text style={[styles.thCell, styles.colComm]}>Prowizja</Text>
          </View>

          {rows.map(({ product: p, monthly, total }) => (
            <View key={p.id} style={p.highlighted ? styles.tableRowHighlight : styles.tableRow}>
              <View style={styles.colProduct}>
                <Text style={styles.tdBold}>{p.highlighted ? "★ " : ""}{p.name}</Text>
                <Text style={[styles.tdCell, { fontSize: 7, color: C.gray }]}>{p.provider}</Text>
                {p.advantages.slice(0, 2).map((a) => (
                  <Text key={a} style={[styles.tdCell, { fontSize: 7, color: C.accent }]}>✓ {a}</Text>
                ))}
              </View>
              <Text style={[p.highlighted ? styles.tdAccent : styles.tdCell, styles.colRate]}>
                {fmtPct(p.rate_min)}–{fmtPct(p.rate_max)}
              </Text>
              <Text style={[styles.tdCell, styles.colLtv]}>
                {p.ltv_max > 0 ? `${p.ltv_max}%` : "–"}
              </Text>
              <Text style={[styles.tdCell, styles.colBik]}>
                {p.bik_check ? "Tak" : "Nie"}
              </Text>
              <Text style={[p.highlighted ? styles.tdAccent : styles.tdBold, styles.colMonthly]}>
                {fmtPLN(Math.round(monthly))}
              </Text>
              <Text style={[styles.tdBold, styles.colTotal]}>
                {fmtPLN(Math.round(total))}
              </Text>
              <Text style={[styles.tdCell, styles.colComm]}>
                {fmtPct(p.commission)}
              </Text>
            </View>
          ))}

          <View style={styles.tableFooter}>
            <Text style={[styles.tdCell, { fontSize: 7, color: C.gray }]}>
              * Rata annuitetowa dla środka przedziału oprocentowania. Wyniki szacunkowe.
            </Text>
          </View>

          {/* Best offer */}
          {best && (
            <View style={styles.bestBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bestLabel}>Nasza rekomendacja dla Twoich parametrów</Text>
                <Text style={styles.bestValue}>{best.product.name}</Text>
                <Text style={styles.bestSub}>
                  Rata: {fmtPLN(Math.round(best.monthly))}/mies. • Koszt: {fmtPLN(Math.round(best.total))}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bestLabel}>Zalety</Text>
                {best.product.advantages.map((a) => (
                  <Text key={a} style={[styles.bestSub, { marginTop: 2 }]}>✓ {a}</Text>
                ))}
              </View>
            </View>
          )}

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Umów bezpłatną konsultację z doradcą</Text>
            <Text style={styles.ctaSub}>
              Zadzwoń: 577 873 616 lub napisz na kontakt@podhipoteke24.pl • Dostępni 24h / 7 dni w tygodniu
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            Niniejsze zestawienie ma charakter wyłącznie informacyjny i nie stanowi oferty w rozumieniu Kodeksu cywilnego.{"\n"}
            Rzeczywiste warunki zależą od indywidualnej analizy, wyceny nieruchomości i decyzji doradcy kredytowego.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PODHIPOTEKE24.PL – Porównanie ofert</Text>
          <Text style={styles.footerText}>podhipoteke24.pl • 577 873 616</Text>
        </View>
      </Page>

      {/* ── Strona 2: Piotr Adler ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.adlerHeader}>
          <Text style={styles.adlerHeaderTitle}>Dlaczego warto mi zaufać?</Text>
          <Text style={styles.adlerHeaderSub}>Piotr Adler • PodHipoteke24.pl • tel. 577 873 616</Text>
        </View>

        <View style={styles.adlerBody}>
          <View style={styles.adlerProfile}>
            {ADLER_PHOTO_EXISTS && (
              <Image
                src={ADLER_PHOTO_PATH}
                style={styles.adlerPhoto}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.adlerName}>Piotr Adler</Text>
              <Text style={styles.adlerRole}>Ekspert ds. finansowania pod zastaw nieruchomości</Text>
              <Text style={styles.adlerPhone}>Tel: 577 873 616</Text>
            </View>
          </View>

          {ADLER_POINTS.map((pt, i) => (
            <View key={i} style={styles.pointRow}>
              <View style={styles.pointBadge}>
                <Text style={styles.pointNum}>{i + 1}</Text>
              </View>
              <View style={styles.pointContent}>
                <Text style={styles.pointTitle}>{pt.title}</Text>
                <Text style={styles.pointText}>{pt.text}</Text>
              </View>
            </View>
          ))}

          <View style={styles.adlerCtaBox}>
            <Text style={styles.adlerCtaText}>Zapraszam do kontaktu</Text>
            <Text style={styles.adlerCtaSub}>
              Zadzwoń: 577 873 616 lub napisz: kontakt@podhipoteke24.pl{"\n"}
              ul. Teodora Kalidego 43 lok. 3, 41-500 Chorzów • Dostępny 24h / 7 dni
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PODHIPOTEKE24.PL</Text>
          <Text style={styles.footerText}>podhipoteke24.pl • 577 873 616</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const loanAmount = Number(p.get("loan_amount") ?? 300_000);
  const term = Number(p.get("term") ?? 120);
  const emailTo = p.get("email") ?? "";

  console.log("[pdf-comparison] request params:", { loanAmount, term, emailTo });

  try {
    console.log("[pdf-comparison] starting renderToBuffer...");
    const buffer = await renderToBuffer(
      <ComparisonPDF loanAmount={loanAmount} term={term} />
    );
    console.log("[pdf-comparison] renderToBuffer OK, size:", buffer.byteLength);

    // Fire-and-forget: send PDF by email if address provided
    if (emailTo && process.env.WORDPRESS_API_URL) {
      fetch(`${process.env.WORDPRESS_API_URL}/wp-json/ph24/v1/send-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTo,
          filename: "porownanie-pozyczek-podhipoteke24.pdf",
          pdf_base64: Buffer.from(buffer).toString("base64"),
          subject: "Twoje porównanie pożyczek hipotecznych – PodHipoteke24",
        }),
        signal: AbortSignal.timeout(10_000),
      }).catch(() => { /* email failure is non-critical */ });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=porownanie-pozyczek-podhipoteke24.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf-comparison] renderToBuffer FAILED:", err);
    console.error("[pdf-comparison] error name:", (err as Error)?.name);
    console.error("[pdf-comparison] error message:", (err as Error)?.message);
    console.error("[pdf-comparison] error stack:", (err as Error)?.stack);
    return NextResponse.json({ error: "PDF generation failed", detail: String(err) }, { status: 500 });
  }
}
