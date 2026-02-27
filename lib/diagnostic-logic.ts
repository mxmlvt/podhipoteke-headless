import { LTV_CONFIG } from "./ltv-config";

export interface QuizAnswers {
  has_property: boolean;
  property_type: "mieszkanie" | "dom" | "dzialka" | "grunt_rolny" | "lokal" | null;
  property_value: number;
  has_bik_issues: "tak" | "nie" | "nie_wiem";
  has_bailiff: boolean;
  is_business: boolean;
  loan_purpose: string[];
}

export interface DiagnosticResult {
  status: "qualified" | "conditional" | "not_qualified";
  title: string;
  description: string;
  recommended_product: string;
  estimated_amount: { min: number; max: number } | null;
  next_steps: string[];
  required_documents: string[];
}

function getPropertyTypeDocs(propertyType: QuizAnswers["property_type"]): string[] {
  if (!propertyType) return [];
  if (propertyType === "mieszkanie" || propertyType === "dom" || propertyType === "lokal") {
    return ["Zdjęcia nieruchomości"];
  }
  if (propertyType === "dzialka") {
    return [
      "Wypis z rejestru gruntów",
      "Zaświadczenie o przeznaczeniu działki w MPZP lub warunki zabudowy",
    ];
  }
  // grunt_rolny – Wypis z rejestru gruntów jest już w docs bazowych
  return [];
}

function round1k(n: number) {
  return Math.round(n / 1000) * 1000;
}

function getRecommendedProduct(answers: QuizAnswers): string {
  if (answers.is_business) return "Pożyczka hipoteczna dla firm";
  if (answers.loan_purpose.includes("Spłata zobowiązań") || answers.loan_purpose.includes("Remont")) {
    return "Pożyczka oddłużeniowa pod zastaw nieruchomości";
  }
  if (answers.loan_purpose.includes("Zakup nieruchomości")) {
    return "Kredyt pod zastaw posiadanej nieruchomości";
  }
  return "Pożyczka pod zastaw nieruchomości";
}

function getEstimatedAmount(answers: QuizAnswers): { min: number; max: number } | null {
  if (!answers.property_type || answers.property_value < 50_000) return null;

  const ltvMap: Record<string, { min: number; max: number }> = {
    mieszkanie: LTV_CONFIG.mieszkanie,
    dom:        LTV_CONFIG.dom,
    dzialka:    LTV_CONFIG.dzialka_budowlana,
    grunt_rolny: LTV_CONFIG.grunt_rolny,
    lokal:      LTV_CONFIG.lokal_uslugowy,
  };

  const ltv = ltvMap[answers.property_type];
  if (!ltv) return null;

  return {
    min: round1k(answers.property_value * ltv.min),
    max: round1k(answers.property_value * ltv.max),
  };
}

export function evaluateDiagnostic(answers: QuizAnswers): DiagnosticResult {
  // NOT QUALIFIED – brak nieruchomości
  if (!answers.has_property) {
    return {
      status: "not_qualified",
      title: "Niestety, nie spełniasz podstawowego kryterium",
      description:
        "Pożyczka pod zastaw nieruchomości wymaga posiadania nieruchomości jako zabezpieczenia. Bez nieruchomości nie możemy udzielić takiej pożyczki.",
      recommended_product: "",
      estimated_amount: null,
      next_steps: [
        "Skontaktuj się z nami – być może masz inne rozwiązanie",
        "Zapytaj o inne formy finansowania",
      ],
      required_documents: [],
    };
  }

  const product = getRecommendedProduct(answers);
  const estimated = getEstimatedAmount(answers);

  // CONDITIONAL – sytuacja wymaga analizy
  const isConditional =
    (answers.has_bailiff && answers.property_value < 150_000) ||
    answers.property_type === "grunt_rolny" ||
    (answers.has_bik_issues === "tak" && answers.has_bailiff) ||
    (estimated !== null && estimated.min < 20_000);

  if (isConditional) {
    const requiredDocs = [
      "Numer księgi wieczystej nieruchomości",
      "Dowód osobisty",
      ...getPropertyTypeDocs(answers.property_type),
      ...(answers.is_business
        ? ["Dokumenty rejestrowe firmy (KRS lub CEIDG)", "NIP, REGON"]
        : []),
      ...(answers.has_bailiff ? ["Informacja o zajęciach komorniczych"] : []),
    ];

    return {
      status: "conditional",
      title: "Twoja sytuacja wymaga indywidualnej analizy",
      description:
        "Wstępna ocena wskazuje na możliwość udzielenia pożyczki, jednak Twoja sytuacja wymaga dokładniejszej analizy przez naszego doradcę. Czynniki takie jak niższe LTV dla gruntu rolnego lub zajęcia komornicze mogą wpłynąć na warunki.",
      recommended_product: product,
      estimated_amount: estimated,
      next_steps: [
        "Skontaktuj się z naszym doradcą (bezpłatna konsultacja)",
        "Przygotuj numer księgi wieczystej nieruchomości",
        "Doradca przeprowadzi wstępną analizę Twojej sytuacji",
        "Decyzja wstępna w ciągu 24 godzin",
      ],
      required_documents: requiredDocs,
    };
  }

  // QUALIFIED – spełnia warunki
  const docs = [
    "Numer księgi wieczystej nieruchomości (KW)",
    "Wypis z rejestru gruntów",
    "Dowód osobisty / paszport",
    ...getPropertyTypeDocs(answers.property_type),
    ...(answers.is_business
      ? ["Dokumenty rejestrowe firmy (KRS lub CEIDG)", "NIP, REGON"]
      : []),
  ];

  return {
    status: "qualified",
    title: "Kwalifikujesz się na pożyczkę pod zastaw nieruchomości!",
    description:
      answers.has_bik_issues !== "nie"
        ? "Dobra wiadomość – wpisy w BIK, KRD czy BIG nie mają znaczenia. Udzielamy pożyczek bez weryfikacji historii kredytowej. Jedynym kryterium jest wartość nieruchomości."
        : "Twoja sytuacja spełnia wszystkie podstawowe kryteria. Możemy przystąpić do wstępnej analizy i przygotować ofertę.",
    recommended_product: product,
    estimated_amount: estimated,
    next_steps: [
      "Zostaw dane kontaktowe – doradca skontaktuje się w 24h",
      "Przygotuj numer księgi wieczystej nieruchomości",
      "Decyzja kredytowa w ciągu 24 godzin",
      "Środki na koncie w 2–4 dni robocze",
    ],
    required_documents: docs,
  };
}
