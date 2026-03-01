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

export const dynamic = "force-dynamic";

// ─── Inter font – local WOFF files, no network dependency, full Polish character support ───
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");
Font.register({ family: "Inter",     src: path.join(FONTS_DIR, "Inter-Regular.woff") });
Font.register({ family: "Inter-Bold", src: path.join(FONTS_DIR, "Inter-Bold.woff") });

// ─── Local path – checked at runtime, optional (PDF renders without photo if missing) ───
const ADLER_PHOTO_PATH = path.join(process.cwd(), "public", "images", "piotr-adler.png");
const ADLER_PHOTO_EXISTS = fs.existsSync(ADLER_PHOTO_PATH);
console.log("[pdf-consolidation] cwd:", process.cwd());
console.log("[pdf-consolidation] adler photo path:", ADLER_PHOTO_PATH);
console.log("[pdf-consolidation] adler photo exists:", ADLER_PHOTO_EXISTS);

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
};

const styles = StyleSheet.create({
  page: { fontFamily: "Inter", backgroundColor: C.white, paddingBottom: 50 },
  header: { backgroundColor: C.primary, padding: "28 36 24 36" },
  headerTitle: { color: C.white, fontSize: 20, fontFamily: "Inter-Bold", marginBottom: 4 },
  headerSub: { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  body: { padding: "24 36" },
  sectionTitle: { fontSize: 9, fontFamily: "Inter-Bold", color: C.accent, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 },
  divider: { height: 1, backgroundColor: C.grayLight, marginVertical: 14 },

  summaryGrid: { flexDirection: "row", gap: 10, marginBottom: 16 },
  summaryBox: { flex: 1, borderRadius: 10, padding: "12 14" },
  summaryLabel: { fontSize: 7, fontFamily: "Inter-Bold", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 },
  summaryValue: { fontSize: 16, fontFamily: "Inter-Bold" },
  summarySub: { fontSize: 8, marginTop: 2 },

  savingBox: { backgroundColor: C.mint, borderRadius: 12, padding: "14 20", marginBottom: 16, alignItems: "center" },
  savingLabel: { fontSize: 9, color: C.accent, fontFamily: "Inter-Bold", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  savingValue: { fontSize: 26, fontFamily: "Inter-Bold", color: C.primary },
  savingSub: { fontSize: 9, color: C.gray, marginTop: 3 },

  tableHeader: { flexDirection: "row", backgroundColor: C.grayLight, borderTopLeftRadius: 6, borderTopRightRadius: 6, padding: "6 10" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.grayLight, padding: "7 10" },
  tableCell: { fontSize: 9, color: C.text, flex: 1 },
  tableCellBold: { fontSize: 9, fontFamily: "Inter-Bold", color: C.dark, flex: 1 },
  tableHeaderCell: { fontSize: 8, fontFamily: "Inter-Bold", color: C.gray, textTransform: "uppercase", flex: 1 },
  tableFooter: { flexDirection: "row", backgroundColor: C.primary, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: "8 10" },
  tableFooterCell: { fontSize: 9, fontFamily: "Inter-Bold", color: C.white, flex: 1 },

  ctaBox: { backgroundColor: C.primary, borderRadius: 12, padding: "16 20", marginTop: 12 },
  ctaText: { color: C.white, fontSize: 11, fontFamily: "Inter-Bold", marginBottom: 4 },
  ctaSub: { color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1.5 },

  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, borderTopColor: C.grayLight,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: "10 36", backgroundColor: C.white,
  },
  footerText: { fontSize: 8, color: C.gray },

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

interface LiabilityItem {
  name: string;
  monthly: number;
  balance: number;
  rate: number;
}

function fmtPLN(n: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(1).replace(".", ",") + "%";
}

function ConsolidationPDF({
  liabilities, term, rate, totalBalance, currentMonthly, newMonthly, monthlySaving, totalSaving,
}: {
  liabilities: LiabilityItem[];
  term: number; rate: number; totalBalance: number; currentMonthly: number;
  newMonthly: number; monthlySaving: number; totalSaving: number;
}) {
  const today = new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
  const years = Math.round(term / 12);
  const saving = monthlySaving > 0;

  return (
    <Document title="Plan konsolidacji – PodHipoteke24">
      {/* ── Strona 1: Plan konsolidacji ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plan konsolidacji zobowiązań</Text>
          <Text style={styles.headerSub}>PODHIPOTEKE24.PL • podhipoteke24.pl • tel. 577 873 616</Text>
        </View>

        <View style={styles.body}>
          {saving && (
            <View style={styles.savingBox}>
              <Text style={styles.savingLabel}>Miesięczna oszczędność</Text>
              <Text style={styles.savingValue}>{fmtPLN(monthlySaving)}</Text>
              {totalSaving > 0 && (
                <Text style={styles.savingSub}>Łącznie przez {term} mies.: {fmtPLN(totalSaving)}</Text>
              )}
            </View>
          )}

          <Text style={styles.sectionTitle}>Podsumowanie konsolidacji</Text>
          <View style={styles.summaryGrid}>
            <View style={[styles.summaryBox, { backgroundColor: C.grayLight }]}>
              <Text style={[styles.summaryLabel, { color: C.gray }]}>Suma zobowiązań</Text>
              <Text style={[styles.summaryValue, { color: C.primary }]}>{fmtPLN(totalBalance)}</Text>
            </View>
            <View style={[styles.summaryBox, { backgroundColor: C.grayLight }]}>
              <Text style={[styles.summaryLabel, { color: C.gray }]}>Obecna suma rat</Text>
              <Text style={[styles.summaryValue, { color: C.primary }]}>{fmtPLN(currentMonthly)}/mies.</Text>
            </View>
            <View style={[styles.summaryBox, { backgroundColor: C.accentSoft }]}>
              <Text style={[styles.summaryLabel, { color: C.accent }]}>Nowa rata</Text>
              <Text style={[styles.summaryValue, { color: C.accent }]}>{fmtPLN(newMonthly)}/mies.</Text>
              <Text style={[styles.summarySub, { color: C.gray }]}>{fmtPct(rate)} • {term} mies. ({years} lat)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Lista konsolidowanych zobowiązań</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Zobowiązanie</Text>
            <Text style={styles.tableHeaderCell}>Rata (zł)</Text>
            <Text style={styles.tableHeaderCell}>Saldo (zł)</Text>
            <Text style={styles.tableHeaderCell}>Oprocent.</Text>
          </View>
          {liabilities.map((l, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>{l.name || "Zobowiązanie"}</Text>
              <Text style={styles.tableCell}>{fmtPLN(l.monthly)}</Text>
              <Text style={styles.tableCell}>{fmtPLN(l.balance)}</Text>
              <Text style={styles.tableCell}>{fmtPct(l.rate)}</Text>
            </View>
          ))}
          <View style={styles.tableFooter}>
            <Text style={[styles.tableFooterCell, { flex: 2 }]}>RAZEM</Text>
            <Text style={styles.tableFooterCell}>{fmtPLN(currentMonthly)}</Text>
            <Text style={styles.tableFooterCell}>{fmtPLN(totalBalance)}</Text>
            <Text style={styles.tableFooterCell}>–</Text>
          </View>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Umów bezpłatną konsultację z doradcą</Text>
            <Text style={styles.ctaSub}>
              Zadzwoń: 577 873 616 lub napisz na kontakt@podhipoteke24.pl{"\n"}
              Dostępni 24h / 7 dni w tygodniu
            </Text>
          </View>

          <Text style={{ fontSize: 7, color: C.gray, marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>
            Raport wygenerowany: {today} • Wyniki mają charakter szacunkowy i nie stanowią oferty kredytowej.{"\n"}
            Ostateczna oferta zależy od indywidualnej analizy i wyceny nieruchomości.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PODHIPOTEKE24.PL</Text>
          <Text style={styles.footerText}>podhipoteke24.pl • 577 873 616</Text>
        </View>
      </Page>

      {/* ── Strona 2: Piotr Adler ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.adlerHeader}>
          <Text style={styles.adlerHeaderTitle}>Dlaczego warto mi zaufać?</Text>
          <Text style={styles.adlerHeaderSub}>Poznaj eksperta – Piotr Adler, PodHipoteke24.pl</Text>
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

          <View style={[styles.ctaBox, { marginTop: 16 }]}>
            <Text style={styles.ctaText}>Skontaktuj się bezpośrednio z Piotrem</Text>
            <Text style={styles.ctaSub}>
              Tel: 577 873 616 • kontakt@podhipoteke24.pl{"\n"}
              ul. Teodora Kalidego 43 lok. 3, 41-500 Chorzów • Dostępni 24h / 7 dni
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

  const term = Number(p.get("term") ?? 120);
  const rate = Number(p.get("rate") ?? 9.5);
  const totalBalance = Number(p.get("total_balance") ?? 0);
  const currentMonthly = Number(p.get("current_monthly") ?? 0);
  const newMonthly = Number(p.get("new_monthly") ?? 0);
  const monthlySaving = Number(p.get("monthly_saving") ?? 0);
  const totalSaving = Number(p.get("total_saving") ?? 0);
  const emailTo = p.get("email") ?? "";
  let liabilities: LiabilityItem[] = [];
  try {
    liabilities = JSON.parse(p.get("liabilities") ?? "[]");
  } catch {
    liabilities = [];
  }

  console.log("[pdf-consolidation] request params:", { term, rate, totalBalance, currentMonthly, newMonthly, monthlySaving, totalSaving, emailTo, liabilitiesCount: liabilities.length });

  try {
    console.log("[pdf-consolidation] starting renderToBuffer...");
    const buffer = await renderToBuffer(
      <ConsolidationPDF
        liabilities={liabilities}
        term={term} rate={rate} totalBalance={totalBalance}
        currentMonthly={currentMonthly} newMonthly={newMonthly}
        monthlySaving={monthlySaving} totalSaving={totalSaving}
      />
    );
    console.log("[pdf-consolidation] renderToBuffer OK, size:", buffer.byteLength);

    // Fire-and-forget: send PDF by email if address provided
    console.log("[pdf-consolidation] emailTo:", emailTo, "WORDPRESS_API_URL set:", !!process.env.WORDPRESS_API_URL);
    if (emailTo && process.env.WORDPRESS_API_URL) {
      const sendPdfUrl = `${process.env.WORDPRESS_API_URL}/wp-json/ph24/v1/send-pdf`;
      console.log("[pdf-consolidation] sending PDF email to:", emailTo, "via:", sendPdfUrl);
      fetch(sendPdfUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTo,
          filename: "konsolidacja-podhipoteke24.pdf",
          pdf_base64: Buffer.from(buffer).toString("base64"),
          subject: "Twój plan konsolidacji – PodHipoteke24",
        }),
        signal: AbortSignal.timeout(10_000),
      }).then(async (r) => {
        console.log("[pdf-consolidation] send-pdf response status:", r.status);
        if (!r.ok) {
          const body = await r.text().catch(() => "");
          console.error("[pdf-consolidation] send-pdf error body:", body);
        }
      }).catch((e) => {
        console.error("[pdf-consolidation] send-pdf fetch error:", e);
      });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=konsolidacja-podhipoteke24.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf-consolidation] renderToBuffer FAILED:", err);
    console.error("[pdf-consolidation] error name:", (err as Error)?.name);
    console.error("[pdf-consolidation] error message:", (err as Error)?.message);
    console.error("[pdf-consolidation] error stack:", (err as Error)?.stack);
    return NextResponse.json({ error: "PDF generation failed", detail: String(err) }, { status: 500 });
  }
}
