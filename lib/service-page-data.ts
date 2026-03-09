// Dane i treści dla 9 stron ofertowych – rewrite bez Divi/WP content

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface AcceptedType {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceData {
  slug: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  heroSubtitle: string;
  badge: string;
  introHeading: string;
  introText: string;
  keyFacts: { value: string; label: string }[];
  acceptedTypes: AcceptedType[];
  requirements: string[];
  faqs: ServiceFaq[];
  ctaHeading: string;
  ctaText: string;
}

export const SERVICE_PAGES_DATA: Record<string, ServiceData> = {

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-pod-zastaw-nieruchomosci": {
    slug: "pozyczki-pod-zastaw-nieruchomosci",
    metaTitle: "Pożyczki pod zastaw nieruchomości bez BIK – ekspresowo | PODHIPOTEKE24.PL",
    metaDesc:
      "Pozabankowe pożyczki pod zastaw nieruchomości. Mieszkania, domy, działki, grunty. Bez BIK, bez zdolności kredytowej. Decyzja w 24h, kwoty 50 000–2 000 000 zł.",
    h1: "Pożyczki pod zastaw nieruchomości",
    heroSubtitle:
      "Pozabankowe finansowanie zabezpieczone hipoteką. Decyzja w 24h, bez BIK i bez zbędnych formalności.",
    badge: "Oferta",
    introHeading: "Co to jest pożyczka pod zastaw nieruchomości?",
    introText:
      "Pożyczka pod zastaw nieruchomości to forma finansowania pozabankowego, w której jedynym zabezpieczeniem jest wpis hipoteki w księdze wieczystej. W przeciwieństwie do kredytu bankowego – nie sprawdzamy BIK, KRD, BIG ani ERIF. Liczy się wyłącznie wartość nieruchomości. Udzielamy pożyczek od 50 000 do 2 000 000 zł, a decyzja zapada zazwyczaj w ciągu 24 godzin od złożenia wniosku.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "20 lat", label: "Doświadczenia" },
    ],
    acceptedTypes: [
      { icon: "🏠", title: "Mieszkania", desc: "Lokale w bloku, kamienicy, spółdzielcze z KW, apartamenty" },
      { icon: "🏡", title: "Domy jednorodzinne", desc: "Wolnostojące, szeregowe, bliźniaki, domy z garażem" },
      { icon: "🏗️", title: "Działki budowlane", desc: "Z warunkami zabudowy lub MPZP, uzbrojone i nieuzbrojone" },
      { icon: "🌾", title: "Grunty rolne", desc: "Z KW, klasa ≥IV, z możliwością przekształcenia lub zabudowy" },
      { icon: "🏢", title: "Lokale usługowe", desc: "Sklepy, biura, magazyny, hale produkcyjne z KW" },
      { icon: "🏘️", title: "Kamienice", desc: "Budynki wielorodzinne i obiekty inwestycyjne" },
    ],
    requirements: [
      "Nieruchomość z założoną księgą wieczystą (KW)",
      "Wiek kredytobiorcy: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak syndyka lub zarządcy sądowego na nieruchomości",
      "Nieruchomość na terenie Polski (obsługujemy cały kraj)",
    ],
    faqs: [
      {
        question: "Ile mogę pożyczyć pod zastaw nieruchomości?",
        answer:
          "Kwota pożyczki zależy od wartości rynkowej nieruchomości. Udzielamy pożyczek do 55% wartości (LTV). Przykład: dla mieszkania wartego 500 000 zł możesz uzyskać nawet 275 000 zł. Minimalna kwota to 50 000 zł, maksymalna – 2 000 000 zł.",
      },
      {
        question: "Czy sprawdzacie BIK, KRD i inne rejestry?",
        answer:
          "Nie. Nie weryfikujemy BIK, KRD, BIG ani ERIF. Udzielamy pożyczek osobom z zajęciami komorniczymi, zadłużonymi hipotekami, po upadłości konsumenckiej lub z negatywną historią kredytową. Jedynym kryterium jest wartość nieruchomości.",
      },
      {
        question: "Jak długo trwa procedura udzielenia pożyczki?",
        answer:
          "Wstępna decyzja zapada w ciągu 24–48 godzin od złożenia wniosku. Podpisanie umowy i wpis hipoteki odbywa się u notariusza, zazwyczaj w ciągu 3–7 dni roboczych. Pieniądze trafiają na konto w dniu podpisania aktu notarialnego.",
      },
      {
        question: "Jakie dokumenty są potrzebne?",
        answer:
          "Do złożenia wniosku wystarczą: dowód osobisty (lub paszport) oraz numer księgi wieczystej nieruchomości. Nie wymagamy zaświadczeń o dochodach, wyciągów bankowych ani dokumentów od pracodawcy.",
      },
      {
        question: "Czy można pożyczyć pod zastaw nieruchomości z hipoteką?",
        answer:
          "Tak, w wielu przypadkach jest to możliwe. Jeśli wartość nieruchomości jest wystarczająco wysoka, z uzyskanej pożyczki możemy spłacić istniejącą hipotekę i wpisać naszą. Każda sprawa jest rozpatrywana indywidualnie.",
      },
      {
        question: "Czy oferta dotyczy tylko osób prywatnych?",
        answer:
          "Nie. Udzielamy pożyczek zarówno osobom prywatnym, jak i przedsiębiorcom (JDG, spółki osobowe, sp. z o.o.). Warunkiem jest posiadanie nieruchomości z KW, która może stanowić zabezpieczenie.",
      },
    ],
    ctaHeading: "Sprawdź ile możesz pożyczyć",
    ctaText: "Złóż wniosek online lub zadzwoń – doradca oddzwoni w ciągu 15 minut.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-pod-zastaw-domu": {
    slug: "pozyczki-pod-zastaw-domu",
    metaTitle: "Pożyczki pod zastaw domu bez BIK – szybka decyzja | PODHIPOTEKE24.PL",
    metaDesc:
      "Pożyczka pod zastaw domu jednorodzinnego. Bez BIK, bez zdolności kredytowej. Domy wolnostojące, szeregowe, bliźniaki. Decyzja w 24h, kwoty do 2 000 000 zł.",
    h1: "Pożyczki pod zastaw domu",
    heroSubtitle:
      "Twój dom jako zabezpieczenie – bez BIK, bez zaświadczeń o dochodach. Decyzja w 24 godziny.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Pożyczka pod zastaw domu – jak to działa?",
    introText:
      "Jeśli jesteś właścicielem domu jednorodzinnego, możesz go wykorzystać jako zabezpieczenie pożyczki pozabankowej. Nie wymagamy zdolności kredytowej ani zaświadczeń o dochodach. Wpis hipoteki w księdze wieczystej to jedyne zabezpieczenie, którego potrzebujemy. Dom przez cały czas pozostaje Twoją własnością – możesz w nim mieszkać i z niego korzystać.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "20 lat", label: "Maks. okres" },
    ],
    acceptedTypes: [
      { icon: "🏡", title: "Domy wolnostojące", desc: "W pełni wykończone lub w budowie (z pozwoleniem)" },
      { icon: "🏘️", title: "Domy szeregowe", desc: "Segmenty, szeregowce z wyodrębnioną KW" },
      { icon: "🏠", title: "Bliźniaki", desc: "Połówki bliźniaka z osobną KW i działką" },
      { icon: "🛖", title: "Domy letniskowe", desc: "Z KW i numerem działki, całoroczne lub sezonowe" },
      { icon: "🏗️", title: "Domy w budowie", desc: "Z ważnym pozwoleniem na budowę i KW gruntu" },
      { icon: "🌳", title: "Domy z działką", desc: "Nieruchomości zabudowane z dużymi działkami" },
    ],
    requirements: [
      "Dom z założoną księgą wieczystą (KW)",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak syndyka lub zarządcy sądowego na nieruchomości",
      "Stan techniczny umożliwiający wycenę rynkową",
    ],
    faqs: [
      {
        question: "Ile mogę pożyczyć pod zastaw domu jednorodzinnego?",
        answer:
          "Maksymalna kwota pożyczki to 55% wartości rynkowej domu (LTV 55%). Dla domu wartego 800 000 zł możesz uzyskać nawet 440 000 zł. Minimalna kwota pożyczki to 50 000 zł, maksymalna – 2 000 000 zł.",
      },
      {
        question: "Czy dom musi być w pełni wykończony?",
        answer:
          "Nie musi być w pełni wykończony, ale musi być wycenialny rynkowo. Finansujemy również domy w budowie, jeśli mają ważne pozwolenie na budowę i założoną KW. Wycena uwzględnia aktualny stopień zaawansowania budowy.",
      },
      {
        question: "Czy mogę pożyczyć pod zastaw domu, jeśli mam zajęcie komornicze?",
        answer:
          "Tak. Nie sprawdzamy BIK ani rejestrów dłużników. Jeśli dom nie jest bezpośrednio przedmiotem zajęcia komorniczego (zajęcie egzekucyjne na nieruchomości), a jego wartość pozwala na udzielenie pożyczki – możemy pomóc. Skontaktuj się z nami, aby omówić swoją sytuację.",
      },
      {
        question: "Czy mogę nadal mieszkać w domu, na który biorę pożyczkę?",
        answer:
          "Tak. Pożyczka pod zastaw domu nie pozbawia Cię własności ani prawa do zamieszkania. Jedyną zmianą w KW jest wpis hipoteki na rzecz pożyczkodawcy. Dom pozostaje Twój przez cały okres spłaty.",
      },
      {
        question: "Jakie dokumenty potrzebuję do złożenia wniosku?",
        answer:
          "Do złożenia wniosku wystarczą: dowód osobisty oraz numer KW nieruchomości. Na etapie finalizacji umowy notarialnej potrzebne będą: aktualny odpis z KW, zaświadczenie o braku zaległości podatkowych (lub spłata z pożyczki) oraz dokument potwierdzający własność.",
      },
      {
        question: "Na jak długo mogę wziąć pożyczkę pod zastaw domu?",
        answer:
          "Oferujemy pożyczki od 6 miesięcy do 20 lat. Dopasowujemy okres spłaty do Twoich możliwości finansowych i celu pożyczki. Możliwe jest przedterminowe spłacenie pożyczki bez dodatkowych opłat.",
      },
    ],
    ctaHeading: "Potrzebujesz pożyczki pod zastaw domu?",
    ctaText: "Wypełnij formularz lub zadzwoń – doradca wyceni Twoją nieruchomość tego samego dnia.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-pod-zastaw-dzialki": {
    slug: "pozyczki-pod-zastaw-dzialki",
    metaTitle: "Pożyczki pod zastaw działki budowlanej – bez BIK | PODHIPOTEKE24.PL",
    metaDesc:
      "Pożyczka pod zastaw działki budowlanej lub rekreacyjnej. Bez BIK, bez zdolności kredytowej. Decyzja w 24h. Uzbrojone i nieuzbrojone, z MPZP i WZ.",
    h1: "Pożyczki pod zastaw działki",
    heroSubtitle:
      "Działka budowlana lub rekreacyjna jako zabezpieczenie pożyczki pozabankowej. Bez BIK, decyzja w 24h.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Pożyczka pod zastaw działki – co musisz wiedzieć?",
    introText:
      "Działka budowlana, rekreacyjna lub usługowa z założoną księgą wieczystą może stanowić zabezpieczenie pożyczki pozabankowej. Chociaż LTV dla działek jest zwykle niższy niż dla zabudowanych nieruchomości, udzielamy finansowania nawet na niezabudowane grunty. Nie wymagamy zdolności kredytowej – jedynym kryterium jest wartość rynkowa działki.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "50%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "0", label: "Weryfikacji BIK" },
    ],
    acceptedTypes: [
      { icon: "🏗️", title: "Działki budowlane", desc: "Z MPZP lub warunkami zabudowy (WZ)" },
      { icon: "🌲", title: "Działki rekreacyjne", desc: "Letniskowe, wypoczynkowe, ROD z KW" },
      { icon: "🏢", title: "Działki usługowe", desc: "Pod zabudowę komercyjną, usługowo-mieszkaniową" },
      { icon: "🛣️", title: "Działki inwestycyjne", desc: "Przy drogach, w strefach przemysłowych, przy miastach" },
      { icon: "🔌", title: "Działki uzbrojone", desc: "Z przyłączami wody, prądu, kanalizacji" },
      { icon: "📋", title: "Działki z WZ", desc: "Z wydanymi warunkami zabudowy dla planowanej inwestycji" },
    ],
    requirements: [
      "Działka z założoną księgą wieczystą (KW)",
      "Przeznaczenie: budowlane, rekreacyjne lub usługowe (nie rolne)",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak syndyka lub zarządcy sądowego",
    ],
    faqs: [
      {
        question: "Ile mogę pożyczyć pod zastaw działki budowlanej?",
        answer:
          "Dla działek budowlanych udzielamy pożyczek do 50% wartości rynkowej (LTV 50%). Dla działki wartej 400 000 zł możliwa kwota pożyczki to do 200 000 zł. LTV może być wyższy dla działek w atrakcyjnych lokalizacjach z MPZP.",
      },
      {
        question: "Czy działka musi być uzbrojona?",
        answer:
          "Nie. Przyjmujemy zarówno działki uzbrojone, jak i nieuzbrojone. Działki uzbrojone (z dostępem do wody, prądu, kanalizacji) zazwyczaj mają wyższą wartość rynkową, co przekłada się na wyższą możliwą kwotę pożyczki.",
      },
      {
        question: "Czy przyjmujecie działki bez MPZP?",
        answer:
          "Tak. Przyjmujemy działki zarówno z planem miejscowym (MPZP), jak i z wydanymi warunkami zabudowy (WZ) lub bez nich – jeśli mają przeznaczenie budowlane lub rekreacyjne potwierdzone dokumentami gminy.",
      },
      {
        question: "Czy pożyczka pod zastaw działki jest możliwa bez dochodów?",
        answer:
          "Tak. Nie wymagamy zaświadczeń o dochodach ani wyciągów bankowych. Pożyczka jest udzielana na podstawie wartości działki, nie Twojej zdolności kredytowej.",
      },
      {
        question: "Jak wyceniana jest działka na potrzeby pożyczki?",
        answer:
          "Wycena jest przeprowadzana przez rzeczoznawcę majątkowego na podstawie aktualnych transakcji rynkowych dla podobnych działek w danej lokalizacji. Koszt wyceny może być pokryty z udzielonej pożyczki.",
      },
      {
        question: "Jak długo trwa udzielenie pożyczki pod zastaw działki?",
        answer:
          "Wstępna decyzja zapada w ciągu 24–48 godzin. Finalizacja (umowa notarialna, wpis hipoteki) trwa zazwyczaj 3–7 dni roboczych. Pieniądze są wypłacane w dniu podpisania aktu notarialnego.",
      },
    ],
    ctaHeading: "Masz działkę i potrzebujesz gotówki?",
    ctaText: "Złóż wniosek online lub zadzwoń – bezpłatna wycena działki w 24h.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-pod-zastaw-gruntow-rolnych": {
    slug: "pozyczki-pod-zastaw-gruntow-rolnych",
    metaTitle: "Pożyczki pod zastaw gruntów rolnych bez BIK | PODHIPOTEKE24.PL",
    metaDesc:
      "Pożyczka pod zastaw gruntu rolnego z KW. Bez BIK, bez zdolności kredytowej. Grunty rolne klasy I–IV, z możliwością zabudowy. Decyzja w 24–48h.",
    h1: "Pożyczki pod zastaw gruntów rolnych",
    heroSubtitle:
      "Grunt rolny z KW jako zabezpieczenie pożyczki pozabankowej. Bez BIK, bez dochodów, decyzja w 48h.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Pożyczka pod zastaw gruntu rolnego – jak to działa?",
    introText:
      "Grunty rolne z założoną księgą wieczystą mogą stanowić zabezpieczenie pożyczki pozabankowej, choć wymagania są tu nieco inne niż dla działek budowlanych. Akceptujemy grunty rolne o różnej klasie bonitacyjnej, szczególnie te zlokalizowane w pobliżu miast lub z potencjałem inwestycyjnym. Nie sprawdzamy BIK – liczy się wyłącznie wartość rynkowa gruntu.",
    keyFacts: [
      { value: "48h", label: "Czas decyzji" },
      { value: "45%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "0", label: "Weryfikacji BIK" },
    ],
    acceptedTypes: [
      { icon: "🌾", title: "Grunty orne", desc: "Klasy I–IV, duże areały, ziemia uprawna" },
      { icon: "🌳", title: "Grunty z drzewostanem", desc: "Sad, ogród, zadrzewiona ziemia rolna z KW" },
      { icon: "🏘️", title: "Grunty w pobliżu miast", desc: "Potencjał inwestycyjny, wysokie ceny transakcyjne" },
      { icon: "📄", title: "Grunty z MPZP rolnym", desc: "Z planem zagospodarowania, w trakcie odrolnienia" },
      { icon: "🔄", title: "Grunty do przekształcenia", desc: "Wnioskowane lub decyzja o odrolnieniu w toku" },
      { icon: "🗺️", title: "Ziemia z dostępem do drogi", desc: "Działki z bezpośrednim dostępem do drogi publicznej" },
    ],
    requirements: [
      "Grunt z założoną księgą wieczystą (KW)",
      "Klasa bonitacyjna: preferowana I–IVb (inne indywidualnie)",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak sądowych ograniczeń w rozporządzaniu nieruchomością",
    ],
    faqs: [
      {
        question: "Czy grunt rolny bez budynków może być zabezpieczeniem pożyczki?",
        answer:
          "Tak. Niezabudowany grunt rolny z KW może stanowić zabezpieczenie pożyczki pozabankowej. Wartość zależy od klasy gruntu, lokalizacji, dostępu do drogi i potencjału inwestycyjnego.",
      },
      {
        question: "Jaka klasa gruntu rolnego jest akceptowana?",
        answer:
          "Preferujemy grunty klasy I–IVb. Grunty niższych klas (V, VI) mogą być akceptowane, jeśli leżą w atrakcyjnej lokalizacji lub posiadają potencjał do przekształcenia na cele budowlane.",
      },
      {
        question: "Czy mogę pożyczyć pod zastaw gruntu, który jest w trakcie odrolnienia?",
        answer:
          "Tak, rozpatrujemy takie przypadki indywidualnie. Grunt w trakcie odrolnienia (z decyzją o wyłączeniu z produkcji rolnej lub MPZP zmienianym na budowlany) może mieć wyższą wartość rynkową.",
      },
      {
        question: "Ile mogę pożyczyć pod zastaw gruntu rolnego?",
        answer:
          "Kwota pożyczki to zazwyczaj 40–45% wartości rynkowej gruntu. LTV dla gruntów rolnych jest niższy niż dla nieruchomości zabudowanych ze względu na mniejszą płynność rynkową.",
      },
      {
        question: "Czy wymagana jest zgoda KOWR (Krajowego Ośrodka Wsparcia Rolnictwa)?",
        answer:
          "Nie. Ustanowienie hipoteki na gruncie rolnym nie wymaga zgody KOWR – ograniczenia te dotyczą wyłącznie sprzedaży gruntów rolnych. Pożyczka pod zastaw nie zmienia własności gruntu.",
      },
      {
        question: "Jak szybko mogę dostać pieniądze pod zastaw gruntu rolnego?",
        answer:
          "Wstępna decyzja zapada w ciągu 48 godzin. Ze względu na specyfikę wyceny gruntów rolnych, cały proces trwa zazwyczaj 5–10 dni roboczych. Pieniądze są wypłacane w dniu podpisania aktu notarialnego.",
      },
    ],
    ctaHeading: "Masz grunt rolny i potrzebujesz finansowania?",
    ctaText: "Skontaktuj się z nami – ocenimy możliwości indywidualnie i bezpłatnie.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-hipoteczne-dla-firm": {
    slug: "pozyczki-hipoteczne-dla-firm",
    metaTitle: "Pożyczki hipoteczne dla firm – szybkie finansowanie pod zastaw | PODHIPOTEKE24.PL",
    metaDesc:
      "Pożyczki hipoteczne dla firm każdego rodzaju. JDG, spółki z o.o., spółki osobowe. Bez weryfikacji kondycji finansowej. Decyzja w 24h, kwoty do 2 000 000 zł.",
    h1: "Pożyczki hipoteczne dla firm",
    heroSubtitle:
      "Szybkie finansowanie dla przedsiębiorców pod zastaw nieruchomości. Bez analizy kondycji finansowej firmy.",
    badge: "Dla przedsiębiorców",
    introHeading: "Pożyczka hipoteczna dla firmy – kiedy bank odmawia?",
    introText:
      "Banki coraz częściej odmawiają finansowania firmom ze stratą, z krótką historią, z zajęciami komorniczymi lub zaległościami w ZUS/US. Nasza pożyczka hipoteczna dla firm omija te ograniczenia – jedynym kryterium jest wartość nieruchomości stanowiącej zabezpieczenie. Obsługujemy JDG, spółki z o.o., spółki jawne, komandytowe i akcyjne.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "Każda", label: "Forma prawna" },
    ],
    acceptedTypes: [
      { icon: "🏢", title: "JDG", desc: "Jednoosobowa działalność gospodarcza – właściciel zabezpiecza nieruchomością prywatną" },
      { icon: "🏭", title: "Spółka z o.o.", desc: "Nieruchomość firmowa lub prywatna wspólnika jako zabezpieczenie" },
      { icon: "🤝", title: "Spółki osobowe", desc: "Spółka jawna, komandytowa, partnerska" },
      { icon: "📈", title: "Spółka akcyjna", desc: "Nieruchomości firmowe lub akcjonariuszy" },
      { icon: "🔄", title: "Firmy w restrukturyzacji", desc: "Finansowanie pomimo trwającej restrukturyzacji" },
      { icon: "⚡", title: "Startupy", desc: "Firmy bez historii kredytowej, ale z nieruchomością" },
    ],
    requirements: [
      "Nieruchomość z KW (firmowa lub prywatna właściciela/wspólnika)",
      "Aktywna działalność gospodarcza lub osoba fizyczna jako pożyczkobiorca",
      "Dowód osobisty właściciela/reprezentanta firmy",
      "Dane firmy (NIP, KRS lub CEIDG)",
      "Brak postępowania upadłościowego zakończonego wyrokiem sądu",
    ],
    faqs: [
      {
        question: "Czy firma z zadłużeniami w ZUS/US może dostać pożyczkę hipoteczną?",
        answer:
          "Tak. Nie wymagamy zaświadczeń o niezaleganiu z ZUS i US. Z uzyskanej pożyczki możesz samodzielnie spłacić zaległości podatkowe lub ubezpieczeniowe. Oceniamy wyłącznie wartość nieruchomości, nie historię zobowiązań firmy.",
      },
      {
        question: "Jaka nieruchomość może zabezpieczać pożyczkę dla firmy?",
        answer:
          "Może to być nieruchomość firmowa (lokal biurowy, magazyn, hala) lub prywatna nieruchomość właściciela czy wspólnika (mieszkanie, dom, działka). Ważne, żeby nieruchomość miała KW i by właściciel wyraził zgodę na ustanowienie hipoteki.",
      },
      {
        question: "Czy spółka z o.o. może zaciągnąć pożyczkę hipoteczną?",
        answer:
          "Tak. Spółka z o.o. może zaciągnąć pożyczkę, jeśli dysponuje nieruchomością z KW, lub jeśli wspólnik/udziałowiec wyrazi zgodę na zabezpieczenie prywatną nieruchomością. Decyzja zapada w 24–48 godzin.",
      },
      {
        question: "Na co firma może przeznaczyć środki z pożyczki hipotecznej?",
        answer:
          "Środki można przeznaczyć na dowolny cel: spłatę zobowiązań (ZUS, US, kontrahenci), zakup wyposażenia lub maszyn, finansowanie kontraktu, wypłatę wynagrodzeń, inwestycje w rozwój firmy. Nie narzucamy celu pożyczki.",
      },
      {
        question: "Ile czasu zajmuje udzielenie pożyczki dla firmy?",
        answer:
          "Wstępna decyzja zapada w ciągu 24 godzin. Cały proces – od złożenia wniosku do wypłaty środków – trwa zazwyczaj 3–7 dni roboczych. Umowa podpisywana jest u notariusza.",
      },
      {
        question: "Czy firma musi mieć zdolność kredytową?",
        answer:
          "Nie. Nie badamy zdolności kredytowej firmy, rentowności, cashflow ani historii kredytowej. Jedynym kryterium jest wartość nieruchomości stanowiącej zabezpieczenie pożyczki.",
      },
    ],
    ctaHeading: "Twoja firma potrzebuje szybkiego finansowania?",
    ctaText: "Skontaktuj się z nami – doradca omówi warunki dostosowane do Twojej firmy.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "pozyczki-oddluzeniowe-2": {
    slug: "pozyczki-oddluzeniowe-2",
    metaTitle: "Pożyczki oddłużeniowe pod zastaw nieruchomości – wyjdź z długów | PODHIPOTEKE24.PL",
    metaDesc:
      "Pożyczki oddłużeniowe i konsolidacyjne pod zastaw nieruchomości. Spłacamy zajęcia komornicze, hipoteki przymusowe, chwilówki. Bez BIK. Decyzja w 24h.",
    h1: "Pożyczki oddłużeniowe",
    heroSubtitle:
      "Wyjdź z pętli zadłużenia – spłacimy Twoje zobowiązania, konsolidując je w jedną pożyczkę pod zastaw nieruchomości.",
    badge: "Pomoc finansowa",
    introHeading: "Pożyczka oddłużeniowa – jak możemy pomóc?",
    introText:
      "Zadłużenie może narastać bardzo szybko: zajęcia komornicze, chwilówki, kredyty bankowe, zaległości czynszowe. Nasza pożyczka oddłużeniowa pod zastaw nieruchomości pozwala skonsolidować wszystkie te zobowiązania w jedną, łatwą do spłaty ratę. Nie oceniamy – pomagamy. Nie patrzymy na przeszłość kredytową, tylko na to, co możemy dla Ciebie zrobić dziś.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "1 rata", label: "Zamiast wielu" },
    ],
    acceptedTypes: [
      { icon: "⚖️", title: "Zajęcia komornicze", desc: "Spłacamy aktywne zajęcia komornicze z udzielonej pożyczki" },
      { icon: "🏦", title: "Hipoteki przymusowe", desc: "Refinansowanie hipotek przymusowych wpisanych do KW" },
      { icon: "💳", title: "Chwilówki i pożyczki", desc: "Konsolidacja chwilówek, pożyczek gotówkowych, kart kredytowych" },
      { icon: "🏠", title: "Kredyty hipoteczne", desc: "Refinansowanie kredytu bankowego na naszą pożyczkę" },
      { icon: "📋", title: "Zaległości ZUS/US", desc: "Spłata zaległości podatkowych i składek ZUS" },
      { icon: "🔄", title: "Konsolidacja mix", desc: "Łączenie różnych typów zobowiązań w jedną pożyczkę" },
    ],
    requirements: [
      "Nieruchomość z założoną KW (mieszkanie, dom, działka)",
      "Posiadanie zobowiązań do skonsolidowania",
      "Wiek: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Nieruchomość nie może być przedmiotem postępowania upadłościowego",
    ],
    faqs: [
      {
        question: "Czy mogę dostać pożyczkę oddłużeniową, jeśli mam komornika?",
        answer:
          "Tak. Specjalizujemy się w obsłudze klientów z aktywnym postępowaniem komorniczym. Z udzielonej pożyczki spłacamy komornika bezpośrednio – Ty odzyskujesz spokój, a komornik zamyka postępowanie. Ważne, żeby zajęcie nie dotyczyło samej nieruchomości mającej stanowić zabezpieczenie.",
      },
      {
        question: "Czy pożyczka oddłużeniowa jest możliwa po upadłości konsumenckiej?",
        answer:
          "Tak, w wielu przypadkach jest to możliwe – zależy od etapu postępowania upadłościowego i statusu nieruchomości. Jeśli upadłość jest już zakończona i odzyskałeś prawo do dysponowania nieruchomością, możemy pomóc. Każdą sprawę oceniamy indywidualnie.",
      },
      {
        question: "Ile mogę zaoszczędzić na konsolidacji długów?",
        answer:
          "Zależy to od struktury obecnych zobowiązań. Chwilówki i pożyczki gotówkowe mają RRSO sięgające 200–300%, podczas gdy nasza pożyczka pod zastaw nieruchomości jest znacznie tańsza. Konsolidacja może obniżyć łączną miesięczną ratę nawet o 50–70%.",
      },
      {
        question: "Czy mogę skonsolidować zadłużenie bez zaświadczeń o dochodach?",
        answer:
          "Tak. Nie wymagamy zaświadczeń o dochodach, wyciągów bankowych ani dokumentów od pracodawcy. Pożyczkę udzielamy na podstawie wartości nieruchomości, nie Twojej zdolności kredytowej.",
      },
      {
        question: "Co się stanie z hipoteką przymusową wpisaną do KW?",
        answer:
          "Z kwoty udzielonej pożyczki spłacamy wierzyciela, który wpisał hipotekę przymusową. Po spłacie składamy wniosek o wykreślenie hipoteki przymusowej i wpisanie hipoteki umownej na rzecz naszej firmy. Całym procesem zajmujemy się my.",
      },
      {
        question: "Jak szybko mogę wyjść z zadłużenia korzystając z Waszej pożyczki?",
        answer:
          "Już w dniu podpisania aktu notarialnego spłacamy wskazane przez Ciebie zobowiązania bezpośrednio na konta wierzycieli. Cały proces od złożenia wniosku do wypłaty trwa zazwyczaj 3–7 dni roboczych.",
      },
    ],
    ctaHeading: "Chcesz wyjść z zadłużenia?",
    ctaText: "Nie czekaj – im szybciej zadzwonisz, tym szybciej odetchniesz. Doradca oceni sytuację bezpłatnie.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "kredyt-pod-zastaw-mieszkania": {
    slug: "kredyt-pod-zastaw-mieszkania",
    metaTitle: "Kredyt pod zastaw mieszkania bez BIK – szybka gotówka | PODHIPOTEKE24.PL",
    metaDesc:
      "Kredyt (pożyczka) pod zastaw mieszkania. Bez BIK, bez zdolności kredytowej. Pozostajesz właścicielem. Decyzja w 24h, kwoty 50 000–2 000 000 zł.",
    h1: "Kredyt pod zastaw mieszkania",
    heroSubtitle:
      "Twoje mieszkanie jako zabezpieczenie – bez BIK, bez zdolności kredytowej. Decyzja w 24 godziny.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Kredyt pod zastaw mieszkania – pozabankowe rozwiązanie",
    introText:
      "Potocznie nazywany 'kredytem pod zastaw mieszkania', nasz produkt to w rzeczywistości pożyczka pozabankowa zabezpieczona hipoteką na Twoim mieszkaniu. Oznacza to, że nie obowiązują tu bankowe wymogi zdolności kredytowej, BIK ani zaświadczenia o dochodach. Twoje mieszkanie pozostaje Twoje – wpisujemy jedynie hipotekę, a Ty korzystasz ze środków na dowolny cel.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "20 lat", label: "Maks. okres" },
    ],
    acceptedTypes: [
      { icon: "🏠", title: "Mieszkania w bloku", desc: "Lokale w budownictwie wielorodzinnym z KW odrębną" },
      { icon: "🏛️", title: "Mieszkania w kamienicy", desc: "Lokale w zabytkowych i przedwojennych kamienicach" },
      { icon: "✨", title: "Apartamenty", desc: "Mieszkania premium w prestiżowych lokalizacjach" },
      { icon: "🔑", title: "Lokale spółdzielcze", desc: "Własnościowe spółdzielcze prawo do lokalu z KW" },
      { icon: "🏗️", title: "Mieszkania w budowie", desc: "Na etapie budowy – z umową deweloperską i KW gruntu" },
      { icon: "📐", title: "Kawalerki", desc: "Małe lokale 1-pokojowe z wyodrębnioną KW" },
    ],
    requirements: [
      "Mieszkanie z założoną księgą wieczystą (KW)",
      "Wyodrębniona własność lokalu (nie spółdzielcze bez KW)",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Mieszkanie w Polsce (zasięg ogólnopolski)",
    ],
    faqs: [
      {
        question: "Ile mogę pożyczyć pod zastaw mieszkania?",
        answer:
          "Maksymalna kwota to 55% wartości rynkowej mieszkania (LTV 55%). Dla mieszkania wartego 400 000 zł możesz uzyskać do 220 000 zł. Minimalna kwota pożyczki to 50 000 zł.",
      },
      {
        question: "Czy mogę nadal mieszkać w mieszkaniu, na które biorę kredyt?",
        answer:
          "Tak. Pożyczka pod zastaw mieszkania nie zmienia Twojego prawa własności ani prawa do zamieszkania. W księdze wieczystej pojawia się jedynie wpis hipoteki. Możesz normalnie mieszkać, wynajmować lokal lub nim dysponować.",
      },
      {
        question: "Czy mieszkanie w bloku jest akceptowane jako zabezpieczenie?",
        answer:
          "Tak. Przyjmujemy mieszkania w blokach z wielkiej płyty, kamienicach, budynkach deweloperskich i apartamentowcach. Kluczowe jest posiadanie wyodrębnionej KW i możliwości wyceny rynkowej.",
      },
      {
        question: "Czy pożyczka pod zastaw mieszkania jest dostępna dla emerytów?",
        answer:
          "Tak. Nie sprawdzamy zdolności kredytowej ani wysokości dochodu – emerytura nie jest kryterium. Ważne jest, żeby właściciel mieszkania miał nie więcej niż 75 lat w chwili zawarcia umowy.",
      },
      {
        question: "Czy można pożyczyć pod zastaw mieszkania będącego współwłasnością?",
        answer:
          "Tak, ale wymagana jest zgoda wszystkich współwłaścicieli na ustanowienie hipoteki. Oboje/wszyscy współwłaściciele muszą podpisać umowę pożyczki u notariusza.",
      },
      {
        question: "Co się dzieje z mieszkaniem, jeśli nie spłacę pożyczki?",
        answer:
          "W przypadku braku spłaty pożyczkodawca ma prawo dochodzić zaspokojenia z nieruchomości w drodze postępowania egzekucyjnego. Dlatego zawsze rekomendujemy staranne przemyślenie decyzji i dostosowanie kwoty pożyczki do realnych możliwości spłaty. Jeśli masz trudności ze spłatą – skontaktuj się z nami wcześnie, a poszukamy rozwiązania.",
      },
    ],
    ctaHeading: "Masz mieszkanie i potrzebujesz gotówki?",
    ctaText: "Złóż wniosek – wycenimy Twoje mieszkanie bezpłatnie i odpowiemy w ciągu 24 godzin.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "kredyt-pod-zastaw-dzialki": {
    slug: "kredyt-pod-zastaw-dzialki",
    metaTitle: "Kredyt pod zastaw działki – szybka gotówka bez BIK | PODHIPOTEKE24.PL",
    metaDesc:
      "Kredyt (pożyczka) pod zastaw działki budowlanej lub rekreacyjnej. Bez BIK, bez zdolności kredytowej. Decyzja w 24–48h. Działki uzbrojone i nieuzbrojone.",
    h1: "Kredyt pod zastaw działki",
    heroSubtitle:
      "Twoja działka jako zabezpieczenie pożyczki pozabankowej. Bez BIK, bez zaświadczeń o dochodach.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Kredyt pod zastaw działki – co warto wiedzieć?",
    introText:
      "Działka budowlana lub rekreacyjna z KW może być skutecznym zabezpieczeniem pożyczki, której bank Ci odmówił. Nasz produkt – potocznie zwany 'kredytem pod zastaw działki' – to pożyczka pozabankowa bez weryfikacji BIK i bez analizy zdolności kredytowej. Akceptujemy działki budowlane, rekreacyjne i usługowe na terenie całej Polski.",
    keyFacts: [
      { value: "48h", label: "Czas decyzji" },
      { value: "50%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "0", label: "Weryfikacji BIK" },
    ],
    acceptedTypes: [
      { icon: "🏗️", title: "Działki budowlane", desc: "Z MPZP lub WZ, uzbrojone i nieuzbrojone" },
      { icon: "🌲", title: "Działki rekreacyjne", desc: "Letniskowe, ROD, wypoczynkowe z KW" },
      { icon: "🏢", title: "Działki usługowe", desc: "Pod zabudowę komercyjną lub usługową" },
      { icon: "🛣️", title: "Działki przy drogach", desc: "Lokalizacje przy drogach krajowych i ekspresowych" },
      { icon: "🔌", title: "Działki uzbrojone", desc: "Z pełnym uzbrojeniem – prąd, woda, kanalizacja" },
      { icon: "📋", title: "Działki z pozwoleniem", desc: "Z wydanym pozwoleniem na budowę" },
    ],
    requirements: [
      "Działka z założoną KW",
      "Przeznaczenie: budowlane, rekreacyjne lub usługowe",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak ograniczeń sądowych w dysponowaniu nieruchomością",
    ],
    faqs: [
      {
        question: "Czym różni się 'kredyt pod zastaw działki' od pożyczki?",
        answer:
          "Potocznie używa się słowa 'kredyt', ale w praktyce jest to pożyczka pozabankowa zabezpieczona hipoteką na działce. Nie jest to kredyt bankowy – dlatego nie obowiązują tu przepisy o kredycie konsumenckim ani wymogi bankowej zdolności kredytowej.",
      },
      {
        question: "Ile mogę pożyczyć pod zastaw działki?",
        answer:
          "Maksymalna kwota to zazwyczaj 50% wartości rynkowej działki. Dla działki budowlanej wartej 300 000 zł możesz uzyskać do 150 000 zł. Im atrakcyjniejsza lokalizacja i wyższy potencjał inwestycyjny – tym wyższa możliwa kwota.",
      },
      {
        question: "Czy działka bez budynku może być zabezpieczeniem?",
        answer:
          "Tak. Przyjmujemy niezabudowane działki budowlane i rekreacyjne. Kluczowe jest posiadanie KW i możliwość przeprowadzenia wyceny rynkowej przez rzeczoznawcę.",
      },
      {
        question: "Jak długo trwa procedura?",
        answer:
          "Wstępna decyzja zapada w ciągu 48 godzin. Cały proces – od złożenia wniosku do wypłaty środków – trwa 5–7 dni roboczych. Umowa jest podpisywana u notariusza.",
      },
      {
        question: "Czy działka z długiem na KW może być zabezpieczeniem?",
        answer:
          "Tak, jeśli wartość działki jest wystarczająco wysoka. Z udzielonej pożyczki możemy spłacić istniejące zadłużenie i wpisać naszą hipotekę. Każdy przypadek oceniamy indywidualnie.",
      },
      {
        question: "Czy potrzebuję zaświadczeń o dochodach?",
        answer:
          "Nie. Nie wymagamy zaświadczeń o zarobkach, wyciągów bankowych ani żadnych dokumentów finansowych. Pożyczka jest udzielana na podstawie wartości działki.",
      },
    ],
    ctaHeading: "Masz działkę i potrzebujesz finansowania?",
    ctaText: "Zadzwoń lub złóż wniosek online – wycenimy działkę bezpłatnie w 24h.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  "kredyt-pod-zastaw-nieruchomosci": {
    slug: "kredyt-pod-zastaw-nieruchomosci",
    metaTitle: "Kredyt pod zastaw nieruchomości bez BIK – ekspresowo | PODHIPOTEKE24.PL",
    metaDesc:
      "Kredyt (pożyczka) pod zastaw nieruchomości. Mieszkania, domy, działki, grunty. Bez BIK, bez zdolności kredytowej. Decyzja w 24h, kwoty do 2 000 000 zł.",
    h1: "Kredyt pod zastaw nieruchomości",
    heroSubtitle:
      "Pozabankowe finansowanie pod zastaw każdego rodzaju nieruchomości. Bez BIK, decyzja w 24h.",
    badge: "Pożyczki pozabankowe",
    introHeading: "Kredyt pod zastaw nieruchomości – jak działa nasz produkt?",
    introText:
      "Choć potocznie mówimy 'kredyt pod zastaw nieruchomości', nasz produkt to pożyczka pozabankowa zabezpieczona hipoteką. Nie jesteśmy bankiem – dlatego nie obowiązują nas bankowe wymogi dotyczące zdolności kredytowej, historii kredytowej w BIK ani zaświadczeń o dochodach. Udzielamy finansowania od 50 000 do 2 000 000 zł pod zastaw mieszkania, domu, działki lub gruntu rolnego.",
    keyFacts: [
      { value: "24h", label: "Czas decyzji" },
      { value: "55%", label: "Maks. LTV" },
      { value: "2 mln zł", label: "Maks. kwota" },
      { value: "20 lat", label: "Maks. okres" },
    ],
    acceptedTypes: [
      { icon: "🏠", title: "Mieszkania", desc: "Lokale w bloku, kamienicy, spółdzielcze z KW" },
      { icon: "🏡", title: "Domy jednorodzinne", desc: "Wolnostojące, szeregowe, bliźniaki" },
      { icon: "🏗️", title: "Działki budowlane", desc: "Z MPZP lub warunkami zabudowy (WZ)" },
      { icon: "🌾", title: "Grunty rolne", desc: "Klasy I–IV z potencjałem inwestycyjnym" },
      { icon: "🏢", title: "Lokale usługowe", desc: "Biura, sklepy, magazyny, hale z KW" },
      { icon: "🏘️", title: "Kamienice", desc: "Budynki wielorodzinne i inwestycyjne" },
    ],
    requirements: [
      "Nieruchomość z założoną KW",
      "Wiek właściciela: 18–75 lat",
      "Dowód osobisty lub paszport",
      "Brak postępowania upadłościowego na nieruchomości",
      "Nieruchomość na terenie Polski",
    ],
    faqs: [
      {
        question: "Czym różni się 'kredyt pod zastaw nieruchomości' od pożyczki hipotecznej?",
        answer:
          "To potoczne określenia tego samego produktu – pożyczki pozabankowej zabezpieczonej hipoteką. Nie jesteśmy bankiem, więc formalnie udzielamy pożyczki, a nie kredytu. Efekt jest jednak ten sam: otrzymujesz gotówkę, a my wpisujemy hipotekę do KW Twojej nieruchomości.",
      },
      {
        question: "Czy dostanę kredyt pod zastaw nieruchomości bez zdolności kredytowej?",
        answer:
          "Tak. Nie badamy zdolności kredytowej. Nie wymagamy zaświadczeń o dochodach, wyciągów bankowych ani żadnych dokumentów finansowych. Pożyczka jest udzielana wyłącznie na podstawie wartości nieruchomości.",
      },
      {
        question: "Jakie nieruchomości przyjmujecie jako zabezpieczenie?",
        answer:
          "Akceptujemy: mieszkania, domy jednorodzinne, działki budowlane, grunty rolne z KW, lokale usługowe, biurowe i magazynowe, a także kamienice i budynki wielorodzinne. Kluczowe jest posiadanie założonej KW.",
      },
      {
        question: "Czy mogę wziąć kredyt pod zastaw nieruchomości z zajęciem komorniczym?",
        answer:
          "Tak. Nie sprawdzamy BIK ani rejestrów dłużników. Akceptujemy klientów z zajęciami komorniczymi – z udzielonej pożyczki możemy spłacić komornika bezpośrednio. Ważne, żeby zajęcie nie dotyczyło samej nieruchomości.",
      },
      {
        question: "Ile mogę pożyczyć pod zastaw nieruchomości?",
        answer:
          "Kwota zależy od wartości rynkowej nieruchomości. Udzielamy pożyczek do 55% wartości (LTV 55%). Minimalna kwota to 50 000 zł, maksymalna – 2 000 000 zł.",
      },
      {
        question: "Jak szybko dostanę pieniądze?",
        answer:
          "Wstępna decyzja zapada w 24 godzinach. Wypłata środków następuje w dniu podpisania umowy notarialnej, zazwyczaj 3–7 dni roboczych od złożenia wniosku.",
      },
    ],
    ctaHeading: "Potrzebujesz kredytu pod zastaw nieruchomości?",
    ctaText: "Złóż wniosek lub zadzwoń – doradca wyceni nieruchomość i odpowie w ciągu 24h.",
  },
};

export function getServicePageData(slug: string): ServiceData | null {
  return SERVICE_PAGES_DATA[slug] ?? null;
}
