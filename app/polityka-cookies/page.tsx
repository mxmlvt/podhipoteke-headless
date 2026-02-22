import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Polityka plików cookies | PODHIPOTEKE24.PL",
  description:
    "Informacje o plikach cookies używanych przez serwis podhipoteke24.pl. Dowiedz się jak zarządzać plikami cookies i jakie dane zbieramy.",
};

export default function PolitykaCookiesPage() {
  return (
    <main>
      <PageHero
        heading="Polityka plików cookies"
        text="Informacje o plikach cookies używanych w serwisie podhipoteke24.pl"
        bgImage="/images/faq-bg.jpg"
        breadcrumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Polityka cookies" },
        ]}
      />

      <section className="py-14 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6">
          <div className="prose prose-slate max-w-none wp-content">

            <h2>1. Czym są pliki cookies?</h2>
            <p>
              Pliki cookies (tzw. „ciasteczka") to małe pliki tekstowe, które są zapisywane na Twoim urządzeniu (komputerze, tablecie, smartfonie) przez odwiedzane przez Ciebie strony internetowe. Cookies pozwalają stronom internetowym zapamiętać Twoje preferencje i dostarczać spersonalizowane treści.
            </p>

            <h2>2. Jakie pliki cookies używamy?</h2>

            <h3>Cookies niezbędne</h3>
            <p>
              Te pliki cookies są niezbędne do prawidłowego funkcjonowania serwisu. Bez nich strona nie może działać poprawnie. Nie można ich wyłączyć w naszych systemach. Obejmują one:
            </p>
            <ul>
              <li>Pliki sesyjne – przechowują informacje podczas jednej sesji przeglądania</li>
              <li>Pliki uwierzytelniające – zapewniają bezpieczne logowanie</li>
              <li>Pliki preferencji cookies – zapamiętują Twój wybór dotyczący cookies</li>
            </ul>

            <h3>Cookies analityczne</h3>
            <p>
              Używamy narzędzi analitycznych (np. Google Analytics) do zbierania anonimowych informacji o sposobie korzystania z serwisu. Dane te pomagają nam ulepszać witrynę i dostosowywać ją do potrzeb użytkowników. Informacje te są agregowane i anonimowe – nie można na ich podstawie zidentyfikować konkretnej osoby.
            </p>

            <h3>Cookies marketingowe</h3>
            <p>
              Te pliki cookies służą do wyświetlania reklam dopasowanych do Twoich zainteresowań. Mogą być ustawiane przez naszych partnerów reklamowych. Jeśli nie wyrazisz zgody na te pliki, nadal będziesz widzieć reklamy, jednak nie będą one spersonalizowane.
            </p>

            <h2>3. Jak zarządzać plikami cookies?</h2>
            <p>
              Możesz zarządzać ustawieniami cookies na kilka sposobów:
            </p>
            <ul>
              <li>
                <strong>Ustawienia przeglądarki</strong> – Większość przeglądarek internetowych pozwala na zarządzanie plikami cookies w ustawieniach. Możesz ustawić przeglądarkę tak, aby blokowała pliki cookies lub informowała o ich zapisywaniu.
              </li>
              <li>
                <strong>Baner cookies</strong> – Przy pierwszej wizycie na naszej stronie wyświetlamy baner z możliwością wyboru zakresu akceptowanych cookies.
              </li>
              <li>
                <strong>Narzędzia opt-out</strong> – Dla narzędzi analitycznych możesz skorzystać z narzędzia opt-out dostarczonego przez dostawcę, np. Google Analytics Opt-out Browser Add-on.
              </li>
            </ul>
            <p>
              Pamiętaj, że wyłączenie wszystkich plików cookies może wpłynąć na funkcjonalność strony i uniemożliwić korzystanie z niektórych jej funkcji.
            </p>

            <h2>4. Jak długo przechowywane są pliki cookies?</h2>
            <p>
              Czas przechowywania plików cookies zależy od ich rodzaju:
            </p>
            <ul>
              <li><strong>Cookies sesyjne</strong> – są usuwane automatycznie po zamknięciu przeglądarki</li>
              <li><strong>Cookies trwałe</strong> – pozostają na urządzeniu przez określony czas (od kilku dni do kilku lat), chyba że zostaną wcześniej usunięte</li>
            </ul>

            <h2>5. Dane administratora</h2>
            <p>
              Administratorem danych osobowych zbieranych za pośrednictwem plików cookies jest:
            </p>
            <ul>
              <li><strong>Firma:</strong> PODHIPOTEKE24.PL</li>
              <li><strong>NIP:</strong> 5261073354</li>
              <li><strong>REGON:</strong> 220048812</li>
              <li><strong>E-mail:</strong> kontakt@podhipoteke24.pl</li>
              <li><strong>Telefon:</strong> 577 873 616</li>
            </ul>

            <h2>6. Zmiany w polityce cookies</h2>
            <p>
              Zastrzegamy sobie prawo do zmiany niniejszej polityki cookies w dowolnym czasie. Wszelkie zmiany zostaną opublikowane na tej stronie. Zachęcamy do regularnego sprawdzania treści niniejszego dokumentu.
            </p>
            <p>
              Niniejsza polityka cookies jest zgodna z Rozporządzeniem (UE) 2016/679 (RODO) oraz ustawą z dnia 16 lipca 2004 r. – Prawo telekomunikacyjne (Dz.U. 2004 nr 171 poz. 1800 z późn. zm.).
            </p>
            <p>
              Data ostatniej aktualizacji: 22 lutego 2026 r.
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}
