// Fallback content dla stron ofertowych i lokalnych gdy WP content jest pusty (Divi)

export interface PageTemplate {
  heroSubtitle: string;
  introHeading: string;
  introText: string;
  features: { icon: string; title: string; text: string }[];
  ctaHeading: string;
  ctaText: string;
}

// Szablony per typ strony ofertowej
export const SERVICE_TEMPLATES: Record<string, PageTemplate> = {
  'kredyt-hipoteczny': {
    heroSubtitle: 'Finansowanie zakupu nieruchomości na atrakcyjnych warunkach',
    introHeading: 'Kredyt hipoteczny – co oferujemy?',
    introText: 'Pomagamy uzyskać kredyt hipoteczny osobom, które nie mogą skorzystać z tradycyjnej oferty bankowej. Oferujemy elastyczne warunki, szybką decyzję i indywidualne podejście do każdego klienta.',
    features: [
      { icon: 'Clock', title: 'Szybka decyzja', text: 'Decyzja kredytowa nawet w 24 godziny.' },
      { icon: 'ShieldCheck', title: 'Bez BIK', text: 'Nie sprawdzamy historii w BIK, KRD, BIG ani ERIF.' },
      { icon: 'Banknote', title: 'Kwoty do 2 mln zł', text: 'Finansowanie od 50 000 do 2 000 000 złotych.' },
      { icon: 'FileText', title: 'Minimum formalności', text: 'Potrzebujesz tylko dowodu osobistego i księgi wieczystej.' },
    ],
    ctaHeading: 'Potrzebujesz kredytu hipotecznego?',
    ctaText: 'Skontaktuj się z nami i otrzymaj ofertę dopasowaną do Twoich potrzeb.',
  },
  'kredyt-pod-zastaw-nieruchomosci': {
    heroSubtitle: 'Pożyczka zabezpieczona nieruchomością – szybko i bez BIK',
    introHeading: 'Kredyt pod zastaw nieruchomości – jak to działa?',
    introText: 'Kredyt pod zastaw nieruchomości to forma finansowania, w której Twoja nieruchomość stanowi zabezpieczenie pożyczki. Dzięki temu możesz uzyskać środki nawet bez zdolności kredytowej.',
    features: [
      { icon: 'Home', title: 'Różne nieruchomości', text: 'Przyjmujemy mieszkania, domy, działki, grunty rolne i lokale usługowe.' },
      { icon: 'Clock', title: 'Ekspresowa wypłata', text: 'Pieniądze na koncie nawet w 48 godzin.' },
      { icon: 'Target', title: 'Dowolny cel', text: 'Pożyczka na dowolny cel – spłata długów, remont, inwestycja.' },
      { icon: 'ShieldCheck', title: 'Bez weryfikacji BIK', text: 'Negatywna historia kredytowa nie stanowi przeszkody.' },
    ],
    ctaHeading: 'Sprawdź ile możesz pożyczyć pod zastaw',
    ctaText: 'Skorzystaj z naszego estymatora lub skontaktuj się z doradcą.',
  },
  'kredyt-pod-zastaw-mieszkania': {
    heroSubtitle: 'Wykorzystaj wartość swojego mieszkania jako zabezpieczenie pożyczki',
    introHeading: 'Pożyczka pod zastaw mieszkania',
    introText: 'Posiadasz mieszkanie? Możesz je wykorzystać jako zabezpieczenie pożyczki i uzyskać środki na dowolny cel. Nie sprawdzamy BIK i nie wymagamy zdolności kredytowej.',
    features: [
      { icon: 'Building2', title: 'Mieszkanie jako zabezpieczenie', text: 'Twoje mieszkanie pozostaje Twoją własnością przez cały okres spłaty.' },
      { icon: 'Banknote', title: 'Do 55% wartości', text: 'Pożyczka do 55% wartości rynkowej mieszkania.' },
      { icon: 'Clock', title: 'Szybki proces', text: 'Od kontaktu do wypłaty nawet w 48 godzin.' },
      { icon: 'Lock', title: 'Dyskrecja', text: 'Pełna poufność – Twoje dane są bezpieczne.' },
    ],
    ctaHeading: 'Ile możesz pożyczyć pod zastaw mieszkania?',
    ctaText: 'Sprawdź w naszym estymatorze lub zadzwoń.',
  },
  'pozyczki-pod-zastaw-nieruchomosci': {
    heroSubtitle: 'Ekspresowe pożyczki zabezpieczone hipoteką – bez BIK',
    introHeading: 'Pożyczki pod zastaw nieruchomości',
    introText: 'Oferujemy pozabankowe pożyczki pod zastaw nieruchomości. Jedynym wymaganym zabezpieczeniem jest wpisanie hipoteki w księdze wieczystej. Nie weryfikujemy BIK, KRD ani ERIF.',
    features: [
      { icon: 'Home', title: 'Każda nieruchomość', text: 'Mieszkania, domy, działki budowlane i rolne, lokale usługowe.' },
      { icon: 'Clock', title: 'Decyzja w 24h', text: 'Szybka analiza wniosku i błyskawiczna decyzja.' },
      { icon: 'Banknote', title: 'Do 2 000 000 zł', text: 'Kwoty od 50 000 do 2 000 000 złotych.' },
      { icon: 'FileText', title: 'Minimum dokumentów', text: 'Dowód osobisty i numer księgi wieczystej.' },
    ],
    ctaHeading: 'Złóż wniosek o pożyczkę',
    ctaText: 'Skontaktuj się z nami – pomożemy dobrać najlepsze rozwiązanie.',
  },
  'pozyczki-oddluzeniowe': {
    heroSubtitle: 'Wyjdź z pętli zadłużenia – spłacimy Twoje zobowiązania',
    introHeading: 'Pożyczki oddłużeniowe',
    introText: 'Masz zajęcia komornicze, zadłużone hipoteki lub wiele różnych zobowiązań? Pomagamy wyjść z trudnej sytuacji finansowej. Spłacimy Twoje długi i konsolidujemy je w jedną pożyczkę pod zastaw nieruchomości.',
    features: [
      { icon: 'RefreshCcw', title: 'Konsolidacja długów', text: 'Wszystkie zobowiązania w jednej pożyczce o niższej racie.' },
      { icon: 'ShieldCheck', title: 'Bez BIK', text: 'Akceptujemy klientów z negatywną historią kredytową.' },
      { icon: 'Clock', title: 'Szybka pomoc', text: 'Działamy ekspresowo – nawet w 48 godzin.' },
      { icon: 'CheckCircle', title: 'Spłata komornika', text: 'Spłacamy zajęcia komornicze i hipoteki przymusowe.' },
    ],
    ctaHeading: 'Wyjdź z zadłużenia już dziś',
    ctaText: 'Skontaktuj się z nami – pomożemy Ci odzyskać finansową stabilność.',
  },
  'pozyczki-hipoteczne-dla-firm': {
    heroSubtitle: 'Finansowanie dla firm pod zastaw nieruchomości',
    introHeading: 'Pożyczki hipoteczne dla firm',
    introText: 'Oferujemy pożyczki hipoteczne dla firm każdego rodzaju. Bez względu na kondycję finansową firmy – liczy się wartość nieruchomości. Środki możesz przeznaczyć na dowolny cel biznesowy.',
    features: [
      { icon: 'Building2', title: 'Każda forma prawna', text: 'Spółki z o.o., akcyjne, jawne, jednoosobowa DG.' },
      { icon: 'Banknote', title: 'Wysokie kwoty', text: 'Od 50 000 do 2 000 000 złotych na rozwój firmy.' },
      { icon: 'Clock', title: 'Szybka decyzja', text: 'Decyzja kredytowa w 24 godziny.' },
      { icon: 'Target', title: 'Dowolny cel', text: 'Inwestycja, płynność, spłata zobowiązań firmowych.' },
    ],
    ctaHeading: 'Finansowanie dla Twojej firmy',
    ctaText: 'Skontaktuj się z nami i omów warunki z naszym doradcą.',
  },
  // Default dla pozostałych stron ofertowych
  'default-service': {
    heroSubtitle: 'Pozabankowe pożyczki pod zastaw nieruchomości bez BIK',
    introHeading: 'Co oferujemy?',
    introText: 'Oferujemy pozabankowe pożyczki pod zastaw nieruchomości dla osób prywatnych i firm. Nie sprawdzamy BIK, nie wymagamy zdolności kredytowej. Decyzja w 24h, wypłata nawet w 48h.',
    features: [
      { icon: 'Clock', title: 'Decyzja w 24h', text: 'Szybka analiza wniosku i błyskawiczna decyzja.' },
      { icon: 'ShieldCheck', title: 'Bez BIK', text: 'Nie weryfikujemy historii kredytowej.' },
      { icon: 'Banknote', title: 'Do 2 000 000 zł', text: 'Kwoty od 50 000 do 2 000 000 złotych.' },
      { icon: 'FileText', title: 'Minimum dokumentów', text: 'Dowód osobisty i księga wieczysta.' },
    ],
    ctaHeading: 'Potrzebujesz finansowania?',
    ctaText: 'Skontaktuj się z nami – pomożemy dobrać najlepsze rozwiązanie.',
  },
};

// Szablon strony lokalnej – dynamiczny z nazwą miasta
export function getCityTemplate(cityName: string): PageTemplate {
  return {
    heroSubtitle: `Pozabankowe pożyczki pod zastaw nieruchomości w mieście ${cityName}`,
    introHeading: `Pożyczki pod hipotekę ${cityName}`,
    introText: `Szukasz pożyczki pod zastaw nieruchomości w mieście ${cityName}? Oferujemy ekspresowe finansowanie bez BIK, bez zdolności kredytowej, z decyzją w 24 godziny. Obsługujemy klientów z ${cityName} i okolic.`,
    features: [
      { icon: 'MapPin', title: `Obsługujemy ${cityName}`, text: `Pełna obsługa klientów z ${cityName} i okolicznych miejscowości.` },
      { icon: 'Clock', title: 'Szybka decyzja', text: 'Decyzja kredytowa nawet w 24 godziny od złożenia wniosku.' },
      { icon: 'ShieldCheck', title: 'Bez BIK', text: 'Nie sprawdzamy BIK, KRD, BIG ani ERIF.' },
      { icon: 'Banknote', title: 'Kwoty do 2 mln zł', text: 'Finansowanie od 50 000 do 2 000 000 złotych.' },
    ],
    ctaHeading: `Szukasz pożyczki w mieście ${cityName}?`,
    ctaText: 'Skontaktuj się z nami – doradca oddzwoni w ciągu 15 minut.',
  };
}

// Mapa miast: slug → nazwa
const cityMap: Record<string, string> = {
  'pozyczki-warszawa': 'Warszawa',
  'pozyczki-krakow': 'Kraków',
  'pozyczki-lodz': 'Łódź',
  'pozyczki-wroclaw': 'Wrocław',
  'pozyczki-poznan': 'Poznań',
  'pozyczki-gdansk': 'Gdańsk',
  'pozyczki-szczecin': 'Szczecin',
  'pozyczki-bydgoszcz': 'Bydgoszcz',
  'pozyczki-lublin': 'Lublin',
  'pozyczki-katowice': 'Katowice',
  'pozyczki-bialystok': 'Białystok',
  'pozyczki-gdynia': 'Gdynia',
  'pozyczki-czestochowa': 'Częstochowa',
  'pozyczki-radom': 'Radom',
  'pozyczki-torun': 'Toruń',
  'pozyczki-sosnowiec': 'Sosnowiec',
  'pozyczki-rzeszow': 'Rzeszów',
  'pozyczki-kielce': 'Kielce',
  'pozyczki-gliwice': 'Gliwice',
  'pozyczki-zabrze': 'Zabrze',
  'pozyczki-olsztyn': 'Olsztyn',
  'pozyczki-bielsko-biala': 'Bielsko-Biała',
  'pozyczki-bytom': 'Bytom',
  'pozyczki-zielona-gora': 'Zielona Góra',
  'pozyczki-rybnik': 'Rybnik',
  'pozyczki-opole': 'Opole',
  'pozyczki-tychy': 'Tychy',
  'pozyczki-elblag': 'Elbląg',
  'pozyczki-nowy-sacz': 'Nowy Sącz',
  'pozyczki-koszalin': 'Koszalin',
  'pozyczki-kalisz': 'Kalisz',
  'pozyczki-konin': 'Konin',
  'pozyczki-suwalki': 'Suwałki',
  'pozyczki-legnica': 'Legnica',
  'pozyczki-inowroclaw': 'Inowrocław',
  'pozyczki-pila': 'Piła',
  'pozyczki-dabrowa-gornicza': 'Dąbrowa Górnicza',
};

export function getCityNameFromSlug(slug: string): string {
  if (cityMap[slug]) return cityMap[slug];
  // Fallback: remove 'pozyczki-' prefix and capitalize
  return slug
    .replace('pozyczki-', '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Dopasuj szablon do sluga strony ofertowej
export function getServiceTemplate(slug: string): PageTemplate {
  if (SERVICE_TEMPLATES[slug]) return SERVICE_TEMPLATES[slug];
  for (const [key, template] of Object.entries(SERVICE_TEMPLATES)) {
    if (key !== 'default-service' && slug.includes(key)) return template;
  }
  return SERVICE_TEMPLATES['default-service'];
}

// Poprawna detekcja strony lokalnej
export function isCityPageSlug(slug: string): boolean {
  if (
    slug.startsWith('pozyczki-pod-') ||
    slug.startsWith('pozyczki-hipoteczne') ||
    slug.startsWith('pozyczki-oddluzeniowe')
  ) {
    return false;
  }
  return slug.startsWith('pozyczki-');
}

// Detekcja strony ofertowej
export function isServicePageSlug(slug: string): boolean {
  const servicePatterns = [
    'pozyczki-pod-zastaw',
    'pozyczki-hipoteczne',
    'pozyczki-oddluzeniowe',
    'kredyt-',
    'pozyczka-pod-zastaw',
    'pozyczki-pod-hipoteke',
  ];
  return servicePatterns.some((p) => slug.startsWith(p));
}
