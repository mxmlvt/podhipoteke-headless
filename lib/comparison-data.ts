export interface LoanProduct {
  id: string;
  name: string;
  provider: string;
  /** Annual interest rate as percent */
  rate_min: number;
  rate_max: number;
  /** LTV as percent */
  ltv_max: number;
  /** Loan amount range in PLN */
  amount_min: number;
  amount_max: number;
  /** Term range in months */
  term_min: number;
  term_max: number;
  /** One-time fee as percent of loan */
  commission: number;
  /** Monthly admin fee in PLN */
  monthly_fee: number;
  bik_check: boolean;
  income_check: boolean;
  property_types: string[];
  advantages: string[];
  note?: string;
  highlighted?: boolean;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "ph24-podstawowa",
    name: "Pożyczka pod zastaw nieruchomości",
    provider: "PodHipoteke24",
    rate_min: 8.9,
    rate_max: 12.9,
    ltv_max: 55,
    amount_min: 30_000,
    amount_max: 3_000_000,
    term_min: 12,
    term_max: 240,
    commission: 2.5,
    monthly_fee: 0,
    bik_check: false,
    income_check: false,
    property_types: ["Mieszkanie", "Dom", "Lokal usługowy", "Działka budowlana"],
    advantages: ["Bez BIK", "Bez zaświadczeń o dochodach", "Decyzja w 24h", "Środki w 2–4 dni"],
    highlighted: true,
  },
  {
    id: "ph24-oddluzeniowa",
    name: "Pożyczka oddłużeniowa",
    provider: "PodHipoteke24",
    rate_min: 9.9,
    rate_max: 14.9,
    ltv_max: 50,
    amount_min: 20_000,
    amount_max: 1_500_000,
    term_min: 12,
    term_max: 180,
    commission: 3.0,
    monthly_fee: 0,
    bik_check: false,
    income_check: false,
    property_types: ["Mieszkanie", "Dom", "Lokal usługowy"],
    advantages: ["Akceptujemy wpisy BIK/KRD", "Bez zaświadczeń", "Spłata zajęć komorniczych"],
    highlighted: true,
  },
  {
    id: "bank-hipoteczny",
    name: "Kredyt hipoteczny bankowy",
    provider: "Bank hipoteczny",
    rate_min: 7.5,
    rate_max: 9.5,
    ltv_max: 80,
    amount_min: 100_000,
    amount_max: 5_000_000,
    term_min: 60,
    term_max: 360,
    commission: 1.5,
    monthly_fee: 15,
    bik_check: true,
    income_check: true,
    property_types: ["Mieszkanie", "Dom"],
    advantages: ["Niskie oprocentowanie", "Wysoki LTV"],
    note: "Wymaga czystej historii kredytowej i udokumentowanych dochodów",
  },
  {
    id: "pozabankowa",
    name: "Pożyczka pozabankowa (bez hipoteki)",
    provider: "Instytucja pozabankowa",
    rate_min: 18.0,
    rate_max: 36.0,
    ltv_max: 0,
    amount_min: 5_000,
    amount_max: 200_000,
    term_min: 3,
    term_max: 84,
    commission: 4.0,
    monthly_fee: 0,
    bik_check: false,
    income_check: false,
    property_types: [],
    advantages: ["Brak hipoteki"],
    note: "Bardzo wysokie oprocentowanie. Brak wymagań co do nieruchomości.",
  },
];

export function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function calcTotalCost(
  principal: number,
  annualRate: number,
  months: number,
  commission: number,
  monthlyFee: number
): number {
  const monthly = calcMonthlyPayment(principal, annualRate, months);
  const commissionAmt = (principal * commission) / 100;
  return monthly * months + commissionAmt + monthlyFee * months;
}
