export const dynamic = "force-dynamic";

import path from "path";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import {
  Document,
  Font,
  Page,
  View,
  Text,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

// ─── Inter font – local WOFF files, no network dependency, full Polish character support ───
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");
Font.register({ family: "Inter",     src: path.join(FONTS_DIR, "Inter-Regular.woff") });
Font.register({ family: "Inter-Bold", src: path.join(FONTS_DIR, "Inter-Bold.woff") });

// ── Stylesheetowanie PDF ────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    color: "#111827",
    padding: "30 40 40 40",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#1c435e",
  },
  headerLeft: { flexDirection: "column" },
  headerTitle: { fontSize: 18, fontFamily: "Inter-Bold", color: "#1c435e" },
  headerSubtitle: { fontSize: 9, color: "#6b7280", marginTop: 2 },
  headerRight: { fontSize: 8, color: "#6b7280", textAlign: "right" },
  // Params
  paramsGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16, gap: 6 },
  paramCard: {
    width: "23%",
    backgroundColor: "#f0fafb",
    borderRadius: 6,
    padding: "8 10",
  },
  paramLabel: { fontSize: 7, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 },
  paramValue: { fontSize: 11, fontFamily: "Inter-Bold", color: "#1c435e" },
  // Summary
  summaryRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  summaryCard: { flex: 1, backgroundColor: "#1c435e", borderRadius: 6, padding: "8 10" },
  summaryLabel: { fontSize: 7, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 3 },
  summaryValue: { fontSize: 13, fontFamily: "Inter-Bold", color: "#5bd0e0" },
  // Table
  tableSection: { marginBottom: 16 },
  tableSectionTitle: { fontSize: 10, fontFamily: "Inter-Bold", color: "#1c435e", marginBottom: 6 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1c435e",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginBottom: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 3.5,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  tableRowEven: { backgroundColor: "#f9fafb" },
  thText: { fontSize: 7.5, fontFamily: "Inter-Bold", color: "#ffffff" },
  tdText: { fontSize: 8, color: "#374151" },
  col0: { width: "8%"  },
  col1: { width: "20%" },
  col2: { width: "20%" },
  col3: { width: "20%" },
  col4: { width: "32%" },
  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
    paddingTop: 6,
  },
  footerText: { fontSize: 7, color: "#9ca3af" },
  pageNum: { fontSize: 7, color: "#9ca3af" },
});

// ── Obliczenia (zduplikowane po stronie serwera) ────────────────
interface ScheduleRow {
  month: number;
  capital: number;
  interest: number;
  balance: number;
  total: number;
}

function round2(n: number) { return Math.round(n * 100) / 100; }

function calcSchedule(
  principal: number,
  months: number,
  annualRate: number,
  type: "equal" | "declining" | "balloon"
): { schedule: ScheduleRow[]; totalInterest: number; totalPayment: number; monthly: number } {
  const r = annualRate / 100 / 12;

  if (type === "equal") {
    const monthly = r === 0 ? principal / months : (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
    let balance = principal;
    let totalInterest = 0;
    const schedule: ScheduleRow[] = [];
    for (let i = 1; i <= months; i++) {
      const interest = balance * r;
      const capital = monthly - interest;
      totalInterest += interest;
      balance = Math.max(0, balance - capital);
      schedule.push({ month: i, capital: round2(capital), interest: round2(interest), balance: round2(balance), total: round2(monthly) });
    }
    return { schedule, totalInterest: round2(totalInterest), totalPayment: round2(monthly * months), monthly: round2(monthly) };
  } else if (type === "declining") {
    const cap = principal / months;
    let balance = principal;
    let totalInterest = 0;
    let firstTotal = 0;
    const schedule: ScheduleRow[] = [];
    for (let i = 1; i <= months; i++) {
      const interest = balance * r;
      const total = cap + interest;
      if (i === 1) firstTotal = total;
      totalInterest += interest;
      balance = Math.max(0, balance - cap);
      schedule.push({ month: i, capital: round2(cap), interest: round2(interest), balance: round2(balance), total: round2(total) });
    }
    return { schedule, totalInterest: round2(totalInterest), totalPayment: round2(principal + totalInterest), monthly: round2(firstTotal) };
  } else {
    // balloon: only interest each month, full capital on last payment
    const monthlyInterest = round2(principal * r);
    let totalInterest = 0;
    const schedule: ScheduleRow[] = [];
    for (let i = 1; i <= months; i++) {
      const isLast = i === months;
      const capital = isLast ? principal : 0;
      const total = capital + monthlyInterest;
      totalInterest += monthlyInterest;
      const balance = isLast ? 0 : principal;
      schedule.push({ month: i, capital: round2(capital), interest: monthlyInterest, balance: round2(balance), total: round2(total) });
    }
    return { schedule, totalInterest: round2(totalInterest), totalPayment: round2(principal + totalInterest), monthly: monthlyInterest };
  }
}

function fmtPln(n: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);
}

// ── Dokument PDF ────────────────────────────────────────────────
interface DocProps {
  kwota: number;
  okres: number;
  oprocentowanie: number;
  typ_rat: "equal" | "declining" | "balloon";
  schedule: ScheduleRow[];
  totalInterest: number;
  totalPayment: number;
  monthly: number;
  date: string;
}

function ScheduleDocument({ kwota, okres, oprocentowanie, typ_rat, schedule, totalInterest, totalPayment, monthly, date }: DocProps) {
  const typLabel = typ_rat === "equal" ? "Równe (annuitetowe)" : typ_rat === "declining" ? "Malejące" : "Balonowe";

  return (
    <Document title="Harmonogram spłat – PodHipoteke24.pl" author="PodHipoteke24.pl">
      <Page size="A4" style={styles.page}>
        {/* Nagłówek */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>PodHipoteke24.pl</Text>
            <Text style={styles.headerSubtitle}>Harmonogram spłat pożyczki hipotecznej</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>Data wygenerowania: {date}</Text>
            <Text>Tel: 577 873 616</Text>
          </View>
        </View>

        {/* Parametry */}
        <View style={styles.paramsGrid}>
          {[
            { label: "Kwota pożyczki", value: fmtPln(kwota) },
            { label: "Okres spłaty", value: `${okres} miesięcy` },
            { label: "Oprocentowanie", value: `${oprocentowanie.toFixed(1)}% rocznie` },
            { label: "Typ rat", value: typLabel },
          ].map(({ label, value }) => (
            <View key={label} style={styles.paramCard}>
              <Text style={styles.paramLabel}>{label}</Text>
              <Text style={styles.paramValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Podsumowanie */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{typ_rat === "balloon" ? "Rata odsetkowa" : typ_rat === "equal" ? "Rata miesięczna" : "Pierwsza rata"}</Text>
            <Text style={styles.summaryValue}>{fmtPln(monthly)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Suma odsetek</Text>
            <Text style={styles.summaryValue}>{fmtPln(totalInterest)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Całkowita spłata</Text>
            <Text style={styles.summaryValue}>{fmtPln(totalPayment)}</Text>
          </View>
        </View>

        {/* Tabela */}
        <View style={styles.tableSection}>
          <Text style={styles.tableSectionTitle}>Harmonogram rat</Text>

          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.col0]}>Nr</Text>
            <Text style={[styles.thText, styles.col1]}>Rata łącznie</Text>
            <Text style={[styles.thText, styles.col2]}>Kapitał</Text>
            <Text style={[styles.thText, styles.col3]}>Odsetki</Text>
            <Text style={[styles.thText, styles.col4]}>Pozostało do spłaty</Text>
          </View>

          {/* Rows */}
          {schedule.map((row) => (
            <View
              key={row.month}
              style={[styles.tableRow, row.month % 2 === 0 ? styles.tableRowEven : {}]}
            >
              <Text style={[styles.tdText, styles.col0]}>{row.month}</Text>
              <Text style={[styles.tdText, styles.col1]}>{fmtPln(row.total)}</Text>
              <Text style={[styles.tdText, styles.col2]}>{fmtPln(row.capital)}</Text>
              <Text style={[styles.tdText, styles.col3]}>{fmtPln(row.interest)}</Text>
              <Text style={[styles.tdText, styles.col4]}>{fmtPln(row.balance)}</Text>
            </View>
          ))}
        </View>

        {/* Stopka */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Obliczenia mają charakter szacunkowy. Skontaktuj się z nami: 577 873 616 | kontakt@podhipoteke24.pl
          </Text>
          <Text
            style={styles.pageNum}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

// ── Handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const kwota         = Number(body.kwota)         || 200_000;
    const okres         = Number(body.okres)         || 60;
    const oprocentowanie = Number(body.oprocentowanie) || 12;
    const typ_rat       = (["equal", "declining", "balloon"].includes(body.typ_rat) ? body.typ_rat : "equal") as "equal" | "declining" | "balloon";

    const { schedule, totalInterest, totalPayment, monthly } = calcSchedule(kwota, okres, oprocentowanie, typ_rat);

    const date = new Date().toLocaleDateString("pl-PL");

    const buffer = await renderToBuffer(
      <ScheduleDocument
        kwota={kwota}
        okres={okres}
        oprocentowanie={oprocentowanie}
        typ_rat={typ_rat}
        schedule={schedule}
        totalInterest={totalInterest}
        totalPayment={totalPayment}
        monthly={monthly}
        date={date}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="harmonogram-splat.pdf"`,
      },
    });
  } catch (err) {
    console.error("[pdf-schedule]", err);
    return NextResponse.json({ error: "Błąd generowania PDF" }, { status: 500 });
  }
}
