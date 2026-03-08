// Dane miast do podstron /pozyczki-pod-zastaw-[miasto]
// Ceny nieruchomości: rynek wtórny, dane transakcyjne NBP / rejestr cen Q4 2025–Q1 2026

export interface CityData {
  name: string;           // Warszawa
  genitive: string;       // Warszawy   → "pożyczki pod zastaw nieruchomości Warszawy"
  locative: string;       // Warszawie  → "w Warszawie"
  oldSlug: string;        // pozyczki-warszawa
  newSlug: string;        // pozyczki-pod-zastaw-warszawa
  priceSecondary: number; // avg zł/m² rynek wtórny
  pricePrimary: number;   // avg zł/m² rynek pierwotny
  districts: string[];
}

export const CITIES: CityData[] = [
  {
    name: "Warszawa",
    genitive: "Warszawy",
    locative: "Warszawie",
    oldSlug: "pozyczki-warszawa",
    newSlug: "pozyczki-pod-zastaw-warszawa",
    priceSecondary: 14800,
    pricePrimary: 16500,
    districts: [
      "Śródmieście", "Mokotów", "Ursynów", "Wola", "Praga-Południe",
      "Praga-Północ", "Bemowo", "Bielany", "Białołęka", "Ochota",
      "Targówek", "Żoliborz", "Ursus", "Wilanów", "Włochy",
      "Wawer", "Wesoła", "Rembertów",
    ],
  },
  {
    name: "Kraków",
    genitive: "Krakowa",
    locative: "Krakowie",
    oldSlug: "pozyczki-krakow",
    newSlug: "pozyczki-pod-zastaw-krakow",
    priceSecondary: 13500,
    pricePrimary: 15200,
    districts: [
      "Śródmieście", "Krowodrza", "Podgórze", "Nowa Huta",
      "Prądnik Czerwony", "Prądnik Biały", "Bronowice", "Zwierzyniec",
      "Łagiewniki-Borek Fałęcki", "Bieżanów-Prokocim", "Czyżyny",
      "Dębniki", "Mistrzejowice", "Swoszowice", "Bieńczyce",
    ],
  },
  {
    name: "Wrocław",
    genitive: "Wrocławia",
    locative: "Wrocławiu",
    oldSlug: "pozyczki-wroclaw",
    newSlug: "pozyczki-pod-zastaw-wroclaw",
    priceSecondary: 12200,
    pricePrimary: 13800,
    districts: [
      "Stare Miasto", "Śródmieście", "Krzyki", "Fabryczna",
      "Psie Pole", "Jagodno", "Ołbin", "Klecina",
      "Gądów-Popowice Południe", "Gajowice", "Brochów",
    ],
  },
  {
    name: "Łódź",
    genitive: "Łodzi",
    locative: "Łodzi",
    oldSlug: "pozyczki-lodz",
    newSlug: "pozyczki-pod-zastaw-lodz",
    priceSecondary: 8200,
    pricePrimary: 9300,
    districts: [
      "Bałuty", "Górna", "Polesie", "Śródmieście", "Widzew",
      "Retkinia", "Teofilów", "Chojny", "Zarzew",
    ],
  },
  {
    name: "Poznań",
    genitive: "Poznania",
    locative: "Poznaniu",
    oldSlug: "pozyczki-poznan",
    newSlug: "pozyczki-pod-zastaw-poznan",
    priceSecondary: 11400,
    pricePrimary: 12800,
    districts: [
      "Stare Miasto", "Grunwald", "Jeżyce", "Nowe Miasto", "Wilda",
      "Piątkowo", "Rataje", "Winiary", "Dębiec",
    ],
  },
  {
    name: "Gdańsk",
    genitive: "Gdańska",
    locative: "Gdańsku",
    oldSlug: "pozyczki-gdansk",
    newSlug: "pozyczki-pod-zastaw-gdansk",
    priceSecondary: 13000,
    pricePrimary: 14500,
    districts: [
      "Śródmieście", "Wrzeszcz", "Oliwa", "Przymorze", "Zaspa",
      "Suchanino", "Morena", "Chełm", "Nowy Port", "Letnica",
    ],
  },
  {
    name: "Gdynia",
    genitive: "Gdyni",
    locative: "Gdyni",
    oldSlug: "pozyczki-gdynia",
    newSlug: "pozyczki-pod-zastaw-gdynia",
    priceSecondary: 12300,
    pricePrimary: 13700,
    districts: [
      "Śródmieście", "Chylonia", "Grabówek", "Działki Leśne",
      "Karwiny", "Wielki Kack", "Wzgórze Św. Maksymiliana",
      "Oksywie", "Cisowa",
    ],
  },
  {
    name: "Szczecin",
    genitive: "Szczecina",
    locative: "Szczecinie",
    oldSlug: "pozyczki-szczecin",
    newSlug: "pozyczki-pod-zastaw-szczecin",
    priceSecondary: 10200,
    pricePrimary: 11400,
    districts: [
      "Śródmieście", "Prawobrzeże", "Pogodno", "Niebuszewo",
      "Zawadzkiego-Klonowica", "Bukowo", "Drzetowo",
    ],
  },
  {
    name: "Bydgoszcz",
    genitive: "Bydgoszczy",
    locative: "Bydgoszczy",
    oldSlug: "pozyczki-bydgoszcz",
    newSlug: "pozyczki-pod-zastaw-bydgoszcz",
    priceSecondary: 8800,
    pricePrimary: 9900,
    districts: [
      "Śródmieście", "Fordon", "Bartodzieje", "Górzyskowo",
      "Kapuściska", "Wyżyny", "Szwederowo", "Osowa Góra",
    ],
  },
  {
    name: "Lublin",
    genitive: "Lublina",
    locative: "Lublinie",
    oldSlug: "pozyczki-lublin",
    newSlug: "pozyczki-pod-zastaw-lublin",
    priceSecondary: 10400,
    pricePrimary: 11700,
    districts: [
      "Śródmieście", "LSM", "Czuby", "Bronowice", "Dziesiąta",
      "Felin", "Wrotków", "Rury", "Tatary",
    ],
  },
  {
    name: "Katowice",
    genitive: "Katowic",
    locative: "Katowicach",
    oldSlug: "pozyczki-katowice",
    newSlug: "pozyczki-pod-zastaw-katowice",
    priceSecondary: 10600,
    pricePrimary: 11800,
    districts: [
      "Śródmieście", "Bogucice", "Piotrowice-Ochojec", "Panewniki",
      "Dąb", "Ligota", "Brynów", "Kostuchna", "Koszutka",
    ],
  },
  {
    name: "Białystok",
    genitive: "Białegostoku",
    locative: "Białymstoku",
    oldSlug: "pozyczki-bialystok",
    newSlug: "pozyczki-pod-zastaw-bialystok",
    priceSecondary: 9800,
    pricePrimary: 11200,
    districts: [
      "Śródmieście", "Bema", "Nowe Miasto", "Słoneczny Stok",
      "Leśna Dolina", "Dziesięciny", "Antoniuk", "Starosielce",
    ],
  },
  {
    name: "Częstochowa",
    genitive: "Częstochowy",
    locative: "Częstochowie",
    oldSlug: "pozyczki-czestochowa",
    newSlug: "pozyczki-pod-zastaw-czestochowa",
    priceSecondary: 7800,
    pricePrimary: 8800,
    districts: [
      "Śródmieście", "Tysiąclecie", "Ostatni Grosz", "Wrzosowiak",
      "Dźbów", "Raków", "Lisiniec", "Gnaszyn",
    ],
  },
  {
    name: "Radom",
    genitive: "Radomia",
    locative: "Radomiu",
    oldSlug: "pozyczki-radom",
    newSlug: "pozyczki-pod-zastaw-radom",
    priceSecondary: 6900,
    pricePrimary: 7800,
    districts: [
      "Śródmieście", "Ustronie", "Południe", "Planty",
      "Gołębiów", "Zamłynie", "Pruszaków", "Halinów",
    ],
  },
  {
    name: "Toruń",
    genitive: "Torunia",
    locative: "Toruniu",
    oldSlug: "pozyczki-torun",
    newSlug: "pozyczki-pod-zastaw-torun",
    priceSecondary: 9200,
    pricePrimary: 10400,
    districts: [
      "Śródmieście", "Rubinkowo", "Na Skarpie", "Jar",
      "Bydgoskie Przedmieście", "Mokre", "Stawki", "Chełmińskie Przedmieście",
    ],
  },
  {
    name: "Sosnowiec",
    genitive: "Sosnowca",
    locative: "Sosnowcu",
    oldSlug: "pozyczki-sosnowiec",
    newSlug: "pozyczki-pod-zastaw-sosnowiec",
    priceSecondary: 7400,
    pricePrimary: 8200,
    districts: [
      "Śródmieście", "Zagórze", "Pogoń", "Kazimierz",
      "Milowice", "Klimontów", "Maczki", "Porąbka",
    ],
  },
  {
    name: "Rzeszów",
    genitive: "Rzeszowa",
    locative: "Rzeszowie",
    oldSlug: "pozyczki-rzeszow",
    newSlug: "pozyczki-pod-zastaw-rzeszow",
    priceSecondary: 10800,
    pricePrimary: 12200,
    districts: [
      "Śródmieście", "Wilkowyja", "Biała", "Budziwój",
      "Zwięczyca", "Staroniwa", "Słocina", "Przybyszówka",
    ],
  },
  {
    name: "Kielce",
    genitive: "Kielc",
    locative: "Kielcach",
    oldSlug: "pozyczki-kielce",
    newSlug: "pozyczki-pod-zastaw-kielce",
    priceSecondary: 8800,
    pricePrimary: 10100,
    districts: [
      "Śródmieście", "KSM", "Herby", "Czarnów",
      "Zagórze", "Nowa Słoneczna", "Baranówek", "Pakosz",
    ],
  },
  {
    name: "Gliwice",
    genitive: "Gliwic",
    locative: "Gliwicach",
    oldSlug: "pozyczki-gliwice",
    newSlug: "pozyczki-pod-zastaw-gliwice",
    priceSecondary: 9200,
    pricePrimary: 10400,
    districts: [
      "Śródmieście", "Łabędy", "Sośnica", "Bojków",
      "Stare Gliwice", "Trynek", "Żerniki", "Wilcze Gardło",
    ],
  },
  {
    name: "Zabrze",
    genitive: "Zabrza",
    locative: "Zabrzu",
    oldSlug: "pozyczki-zabrze",
    newSlug: "pozyczki-pod-zastaw-zabrze",
    priceSecondary: 7800,
    pricePrimary: 8900,
    districts: [
      "Śródmieście", "Zaborze", "Biskupice", "Rokitnica",
      "Mikulczyce", "Helenka", "Pawłów", "Grzybowice",
    ],
  },
  {
    name: "Olsztyn",
    genitive: "Olsztyna",
    locative: "Olsztynie",
    oldSlug: "pozyczki-olsztyn",
    newSlug: "pozyczki-pod-zastaw-olsztyn",
    priceSecondary: 9400,
    pricePrimary: 10700,
    districts: [
      "Śródmieście", "Zatorze", "Kortowo", "Pojezierze",
      "Dajtki", "Jaroty", "Kormoran", "Gutkowo",
    ],
  },
  {
    name: "Bielsko-Biała",
    genitive: "Bielska-Białej",
    locative: "Bielsku-Białej",
    oldSlug: "pozyczki-bielsko-biala",
    newSlug: "pozyczki-pod-zastaw-bielsko-biala",
    priceSecondary: 9700,
    pricePrimary: 11100,
    districts: [
      "Śródmieście", "Aleksandrowice", "Komorowice", "Lipnik",
      "Stare Bielsko", "Wapienica", "Mikuszowice", "Hałcnów",
    ],
  },
  {
    name: "Bytom",
    genitive: "Bytomia",
    locative: "Bytomiu",
    oldSlug: "pozyczki-bytom",
    newSlug: "pozyczki-pod-zastaw-bytom",
    priceSecondary: 5800,
    pricePrimary: 7200,
    districts: [
      "Śródmieście", "Bobrek", "Miechowice", "Szombierki",
      "Stroszek", "Łagiewniki", "Rozbark", "Stolarzowice",
    ],
  },
  {
    name: "Zielona Góra",
    genitive: "Zielonej Góry",
    locative: "Zielonej Górze",
    oldSlug: "pozyczki-zielona-gora",
    newSlug: "pozyczki-pod-zastaw-zielona-gora",
    priceSecondary: 8600,
    pricePrimary: 9800,
    districts: [
      "Śródmieście", "Łężyca", "Nowe Miasto", "Osiedle Piastowskie",
      "Zacisze", "Stary Kisielin", "Przylep",
    ],
  },
  {
    name: "Rybnik",
    genitive: "Rybnika",
    locative: "Rybniku",
    oldSlug: "pozyczki-rybnik",
    newSlug: "pozyczki-pod-zastaw-rybnik",
    priceSecondary: 7900,
    pricePrimary: 8900,
    districts: [
      "Śródmieście", "Boguszowice", "Chwałęcice", "Nowiny",
      "Paruszowiec", "Niedobczyce", "Zebrzydowice", "Kłokocin",
    ],
  },
  {
    name: "Opole",
    genitive: "Opola",
    locative: "Opolu",
    oldSlug: "pozyczki-opole",
    newSlug: "pozyczki-pod-zastaw-opole",
    priceSecondary: 9300,
    pricePrimary: 10500,
    districts: [
      "Śródmieście", "Nowa Wieś Królewska", "Zaodrze", "Malinka",
      "Grudzice", "Chmielowice", "Wróblin", "Gosławice",
    ],
  },
  {
    name: "Tychy",
    genitive: "Tychów",
    locative: "Tychach",
    oldSlug: "pozyczki-tychy",
    newSlug: "pozyczki-pod-zastaw-tychy",
    priceSecondary: 9400,
    pricePrimary: 10800,
    districts: [
      "Śródmieście", "Żwaków", "Urbanowice", "Cielmice",
      "Wartogłowiec", "Paprocany", "Stare Tychy",
    ],
  },
  {
    name: "Elbląg",
    genitive: "Elbląga",
    locative: "Elblągu",
    oldSlug: "pozyczki-elblag",
    newSlug: "pozyczki-pod-zastaw-elblag",
    priceSecondary: 7200,
    pricePrimary: 8200,
    districts: [
      "Śródmieście", "Zawada", "Zatorze", "Nad Jarem",
      "Kępa", "Bielany", "Modrzewin",
    ],
  },
  {
    name: "Nowy Sącz",
    genitive: "Nowego Sącza",
    locative: "Nowym Sączu",
    oldSlug: "pozyczki-nowy-sacz",
    newSlug: "pozyczki-pod-zastaw-nowy-sacz",
    priceSecondary: 8300,
    pricePrimary: 9300,
    districts: [
      "Śródmieście", "Chruślice", "Łazy", "Nawojowska",
      "Przetakówka", "Biegonice", "Helena",
    ],
  },
  {
    name: "Koszalin",
    genitive: "Koszalina",
    locative: "Koszalinie",
    oldSlug: "pozyczki-koszalin",
    newSlug: "pozyczki-pod-zastaw-koszalin",
    priceSecondary: 7800,
    pricePrimary: 8700,
    districts: [
      "Śródmieście", "Rokosowo", "Jamno", "Mycelin",
      "Dzierżęcino", "Morskie", "Raduszka",
    ],
  },
  {
    name: "Kalisz",
    genitive: "Kalisza",
    locative: "Kaliszu",
    oldSlug: "pozyczki-kalisz",
    newSlug: "pozyczki-pod-zastaw-kalisz",
    priceSecondary: 7100,
    pricePrimary: 8100,
    districts: [
      "Śródmieście", "Winiary", "Dobrzec", "Tyniec",
      "Rajsków", "Żydówek", "Majków",
    ],
  },
  {
    name: "Konin",
    genitive: "Konina",
    locative: "Koninie",
    oldSlug: "pozyczki-konin",
    newSlug: "pozyczki-pod-zastaw-konin",
    priceSecondary: 6400,
    pricePrimary: 7200,
    districts: [
      "Śródmieście", "Gosławice", "Glinka", "Zatorze",
      "Chorzeń", "Grójec", "Niesłusz",
    ],
  },
  {
    name: "Suwałki",
    genitive: "Suwałk",
    locative: "Suwałkach",
    oldSlug: "pozyczki-suwalki",
    newSlug: "pozyczki-pod-zastaw-suwalki",
    priceSecondary: 7000,
    pricePrimary: 8000,
    districts: [
      "Śródmieście", "Szwajcaria", "Waryńskiego",
      "Hrubieszowska", "Północ", "Południe",
    ],
  },
  {
    name: "Legnica",
    genitive: "Legnicy",
    locative: "Legnicy",
    oldSlug: "pozyczki-legnica",
    newSlug: "pozyczki-pod-zastaw-legnica",
    priceSecondary: 7800,
    pricePrimary: 8700,
    districts: [
      "Śródmieście", "Tarninów", "Zosinek", "Złotoryja",
      "Piekary", "Nowe Miasto", "Rycerska",
    ],
  },
  {
    name: "Inowrocław",
    genitive: "Inowrocławia",
    locative: "Inowrocławiu",
    oldSlug: "pozyczki-inowroclaw",
    newSlug: "pozyczki-pod-zastaw-inowroclaw",
    priceSecondary: 6200,
    pricePrimary: 7000,
    districts: [
      "Śródmieście", "Mątwy", "Rąbin", "Solec",
      "Szymborze", "Balczewo",
    ],
  },
  {
    name: "Piła",
    genitive: "Piły",
    locative: "Pile",
    oldSlug: "pozyczki-pila",
    newSlug: "pozyczki-pod-zastaw-pila",
    priceSecondary: 6300,
    pricePrimary: 7200,
    districts: [
      "Śródmieście", "Zamość", "Motylinek", "Jadwiżyn",
      "Górne", "Staszyce",
    ],
  },
  {
    name: "Dąbrowa Górnicza",
    genitive: "Dąbrowy Górniczej",
    locative: "Dąbrowie Górniczej",
    oldSlug: "pozyczki-dabrowa-gornicza",
    newSlug: "pozyczki-pod-zastaw-dabrowa-gornicza",
    priceSecondary: 7200,
    pricePrimary: 8300,
    districts: [
      "Śródmieście", "Ząbkowice", "Gołonóg", "Strzemieszyce",
      "Tucznawa", "Łęknice", "Ratajewo",
    ],
  },
];

// Lookup helpers
export const CITY_BY_NEW_SLUG = new Map<string, CityData>(
  CITIES.map((c) => [c.newSlug, c])
);
export const CITY_BY_OLD_SLUG = new Map<string, CityData>(
  CITIES.map((c) => [c.oldSlug, c])
);
export const ALL_CITY_SLUGS = new Set<string>([
  ...CITIES.map((c) => c.newSlug),
  ...CITIES.map((c) => c.oldSlug),
]);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITY_BY_NEW_SLUG.get(slug) ?? CITY_BY_OLD_SLUG.get(slug);
}

// Format price with thousands separator
export function fmt(n: number): string {
  return n.toLocaleString("pl-PL");
}

// Calculate max loan for given property value (LTV 55%)
export function maxLoan(propertyValue: number): number {
  return Math.round(propertyValue * 0.55);
}
