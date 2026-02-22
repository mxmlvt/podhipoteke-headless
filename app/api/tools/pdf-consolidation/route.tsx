import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";

export const dynamic = "force-dynamic";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2", fontWeight: 700 },
  ],
});

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
  headerTitle: { color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 4 },
  headerSub: { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  body: { padding: "24 36" },
  sectionTitle: { fontSize: 9, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 },
  divider: { height: 1, backgroundColor: C.grayLight, marginVertical: 14 },

  /* Summary grid */
  summaryGrid: { flexDirection: "row", gap: 10, marginBottom: 16 },
  summaryBox: { flex: 1, borderRadius: 10, padding: "12 14" },
  summaryLabel: { fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 },
  summaryValue: { fontSize: 16, fontWeight: 700 },
  summarySub: { fontSize: 8, marginTop: 2 },

  /* Saving highlight */
  savingBox: { backgroundColor: C.mint, borderRadius: 12, padding: "14 20", marginBottom: 16, alignItems: "center" },
  savingLabel: { fontSize: 9, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  savingValue: { fontSize: 26, fontWeight: 700, color: C.primary },
  savingSub: { fontSize: 9, color: C.gray, marginTop: 3 },

  /* Table */
  tableHeader: { flexDirection: "row", backgroundColor: C.grayLight, borderRadius: "6 6 0 0", padding: "6 10" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.grayLight, padding: "7 10" },
  tableCell: { fontSize: 9, color: C.text, flex: 1 },
  tableCellBold: { fontSize: 9, fontWeight: 700, color: C.dark, flex: 1 },
  tableHeaderCell: { fontSize: 8, fontWeight: 700, color: C.gray, textTransform: "uppercase", flex: 1 },
  tableFooter: { flexDirection: "row", backgroundColor: C.primary, borderRadius: "0 0 6 6", padding: "8 10" },
  tableFooterCell: { fontSize: 9, fontWeight: 700, color: C.white, flex: 1 },

  /* CTA */
  ctaBox: { backgroundColor: C.primary, borderRadius: 12, padding: "16 20", marginTop: 12 },
  ctaText: { color: C.white, fontSize: 11, fontWeight: 700, marginBottom: 4 },
  ctaSub: { color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1.5 },

  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, borderTopColor: C.grayLight,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: "10 36", backgroundColor: C.white,
  },
  footerText: { fontSize: 8, color: C.gray },
});

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
  liabilities,
  term,
  rate,
  totalBalance,
  currentMonthly,
  newMonthly,
  monthlySaving,
  totalSaving,
}: {
  liabilities: LiabilityItem[];
  term: number;
  rate: number;
  totalBalance: number;
  currentMonthly: number;
  newMonthly: number;
  monthlySaving: number;
  totalSaving: number;
}) {
  const today = new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
  const years = Math.round(term / 12);
  const saving = monthlySaving > 0;

  return (
    <Document title="Plan konsolidacji – PodHipoteke24">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plan konsolidacji zobowiązań</Text>
          <Text style={styles.headerSub}>PODHIPOTEKE24.PL • podhipoteke24.pl • tel. 577 873 616</Text>
        </View>

        <View style={styles.body}>
          {/* Saving highlight */}
          {saving && (
            <View style={styles.savingBox}>
              <Text style={styles.savingLabel}>Miesięczna oszczędność</Text>
              <Text style={styles.savingValue}>{fmtPLN(monthlySaving)}</Text>
              {totalSaving > 0 && (
                <Text style={styles.savingSub}>Łącznie przez {term} mies.: {fmtPLN(totalSaving)}</Text>
              )}
            </View>
          )}

          {/* Summary grid */}
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

          {/* Liabilities table */}
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

          {/* Disclaimer + CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Umów bezpłatną konsultację z doradcą</Text>
            <Text style={styles.ctaSub}>
              Zadzwoń: 577 873 616 lub napisz na kontakt@podhipoteke24.pl{"\n"}
              Pracujemy pon–pt 8:00–18:00, sob 9:00–14:00
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
  let liabilities: LiabilityItem[] = [];
  try {
    liabilities = JSON.parse(p.get("liabilities") ?? "[]");
  } catch {
    liabilities = [];
  }

  try {
    const buffer = await renderToBuffer(
      <ConsolidationPDF
        liabilities={liabilities}
        term={term}
        rate={rate}
        totalBalance={totalBalance}
        currentMonthly={currentMonthly}
        newMonthly={newMonthly}
        monthlySaving={monthlySaving}
        totalSaving={totalSaving}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=konsolidacja-podhipoteke24.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf-consolidation] error:", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
