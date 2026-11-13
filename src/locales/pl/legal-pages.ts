// Legal pages. Same keys in fr, en and pl (src/locales/parity.test.ts). Strings only.
// Identity and provider data come from src/lib/legal.data.ts; this file holds the prose around them.
// The French version prevails.
export const legalPages = {
  common: {
    updated: "Ostatnia aktualizacja",
    frenchPrevails: "Wersja francuska jest wiążąca.",
    seeAlso: "Zobacz także",
    moreInfo: "Polityka dostawcy",
    links: {
      mentions: "Informacje prawne",
      privacy: "Polityka prywatności",
      cookies: "Polityka plików cookie",
      terms: "Warunki korzystania",
    },
    label: {
      name: "Imię i nazwisko",
      address: "Adres",
      email: "E-mail",
      phone: "Telefon",
      director: "Dyrektor publikacji",
      siren: "SIREN",
      siret: "SIRET",
      company: "Firma",
      contact: "Kontakt",
    },
  },
  providers: {
    ovhContact: "1007 (z zagranicy: +33 9 72 10 10 07)",
    label: {
      role: "Rola",
      entity: "Podmiot",
      address: "Adres",
      country: "Kraj",
      transfers: "Transfer poza Unię Europejską",
      contact: "Kontakt",
    },
    vercel: {
      role: "Hosting strony",
      country: "Stany Zjednoczone",
      transfers:
        "Umowa powierzenia danych (DPA) Vercel jest częścią jego warunków. Opiera się na standardowych klauzulach umownych (2021) oraz na unijno-amerykańskich Ramach ochrony danych (Data Privacy Framework).",
    },
    ovh: {
      role: "Rejestrator nazwy domeny",
      country: "Francja",
      transfers: "Brak transferu poza Unię Europejską.",
    },
    cloudflare: {
      role: "DNS i serwer proxy przed stroną",
      country: "Stany Zjednoczone",
      transfers: "Data Privacy Framework; w razie jego braku standardowe klauzule umowne.",
    },
    resend: {
      role: "Wysyłka e-maili z formularza kontaktowego",
      country: "Stany Zjednoczone",
      transfers: "Standardowe klauzule umowne (2021) oraz Data Privacy Framework.",
    },
    google: {
      role: "Google Analytics i Google Tag Manager, wyłącznie po Twojej zgodzie",
      country: "Irlandia (Google Ireland Limited), z transferem do Stanów Zjednoczonych (Google LLC)",
      transfers:
        "Transfery do Google LLC opierają się na jego certyfikacji w Data Privacy Framework; w razie jej braku na standardowych klauzulach umownych.",
    },
    calcom: {
      role: "Rezerwacja spotkań, jeśli jest włączona",
      country: "Stany Zjednoczone",
      transfers: "Standardowe klauzule umowne oraz Data Privacy Framework, dopóki dostawca ma certyfikat.",
    },
  },
  mentions: {
    meta: {
      title: "Informacje prawne | Patrick Bartosik",
      description:
        "Wydawca, hosting i informacje prawne strony Patricka Bartosika, niezależnego programisty full stack.",
    },
    title: "Informacje prawne",
    intro:
      "Informacje o wydawcy i hostingu tej strony, zgodnie z francuską ustawą z 21 czerwca 2004 r. o zaufaniu w gospodarce cyfrowej.",
    publisher: {
      title: "Wydawca strony",
      text: "Stronę wydaje:",
    },
    host: {
      title: "Hosting",
      text: "Stronę hostuje Vercel Inc. Vercel nie publikuje numeru telefonu: opublikowane dane kontaktowe podano poniżej.",
    },
    domain: {
      title: "Nazwa domeny",
      text: "Nazwa domeny jest zarejestrowana w OVH SAS.",
    },
    network: {
      title: "Sieć i DNS",
      text: "Cloudflare obsługuje rozwiązywanie nazw DNS dla domeny i działa jako serwer proxy przed stroną: żądania odwiedzających przechodzą przez jego serwery, zanim dotrą do hostingu.",
    },
    ip: {
      title: "Własność intelektualna",
      text1:
        "O ile nie zaznaczono inaczej, teksty, obrazy, grafiki, logotypy, kod i inne elementy strony należą do Patricka Bartosika lub są używane za zgodą ich właścicieli.",
      text2:
        "Marki i logotypy wymienionych klientów i partnerów należą do ich właścicieli. Wszelkie powielanie lub ponowne wykorzystanie, w całości lub w części, bez uprzedniej pisemnej zgody jest zabronione.",
    },
    report: {
      title: "Zgłoszenie treści",
      text: "Aby zgłosić treść, która Twoim zdaniem jest niezgodna z prawem lub narusza Twoje prawa, napisz do mnie, podając adres strony i powody zgłoszenia:",
    },
    data: {
      title: "Dane osobowe i pliki cookie",
      privacy: "Przetwarzanie Twoich danych osobowych opisuje polityka prywatności.",
      cookies: "Pliki cookie i inne mechanizmy śledzące opisuje polityka plików cookie.",
    },
  },
  privacy: {
    meta: {
      title: "Polityka prywatności | Patrick Bartosik",
      description:
        "Jakie dane osobowe przetwarza ta strona, w jakim celu, jak długo, z którymi dostawcami i jak skorzystać ze swoich praw.",
    },
    title: "Polityka prywatności",
    intro:
      "Ta strona wyjaśnia, jakie dane osobowe są przetwarzane, gdy korzystasz z tej strony lub się ze mną kontaktujesz, w jakim celu, jak długo, kto je otrzymuje i jak skorzystać ze swoich praw.",
    label: {
      purpose: "Cel",
      basis: "Podstawa prawna",
      data: "Dane",
      required: "Czy podanie jest obowiązkowe",
      scoring: "Wskaźnik priorytetu",
      recipients: "Odbiorcy",
      retention: "Okres przechowywania",
    },
    controller: {
      title: "Administrator danych",
      text: "Administratorem Twoich danych jest Patrick Bartosik, przedsiębiorca prowadzący jednoosobową działalność (entrepreneur individuel). W każdej sprawie dotyczącej danych napisz na poniższy adres.",
    },
    contact: {
      title: "Zapytania kontaktowe",
      purpose:
        "Odpowiedzenie na Twoje zapytanie: zrozumienie potrzeby, ponowny kontakt i, jeśli sobie życzysz, przygotowanie propozycji.",
      basis:
        "Prawnie uzasadniony interes w odpowiadaniu osobom, które się ze mną kontaktują (art. 6 ust. 1 lit. f RODO). Gdy prosisz o propozycję: działania przed zawarciem umowy podejmowane na Twoją prośbę (art. 6 ust. 1 lit. b).",
      data: "Ścieżka prowadzona: potrzeba, etap projektu, pożądany start, deklarowany budżet (i kwota, jeśli ją podasz), wiadomość, ewentualny link, imię, nazwisko, adres e-mail, firma, telefon, preferowany sposób kontaktu, język oraz, jeśli ją podasz, informacja, skąd o mnie wiesz. Wiadomość bezpośrednia: imię i nazwisko, adres e-mail i wiadomość. Twój adres IP jest przechowywany w pamięci serwera, aby ograniczyć liczbę wysyłek (pięć na godzinę).",
      required:
        "W ścieżce prowadzonej potrzeba, etap, pożądany start, deklarowany budżet, wiadomość, imię i adres e-mail są wymagane: bez nich zapytania nie można wysłać. Pozostałe pola są dobrowolne. Możesz też napisać do mnie bezpośrednio e-mailem.",
      scoring:
        "Poziom priorytetu (zimny, ciepły lub gorący) jest obliczany automatycznie na podstawie Twoich odpowiedzi. Pojawia się tylko w e-mailu, który otrzymuję, i służy wyłącznie do ustalenia kolejności moich odpowiedzi.",
      recipients:
        "Ja sam. Resend, który wysyła e-mail z powiadomieniem, który otrzymuję, oraz e-mail z potwierdzeniem wysyłany do Ciebie.",
      retention: "Trzy lata od ostatniego kontaktu z Tobą.",
    },
    audience: {
      title: "Pomiar oglądalności, po Twojej zgodzie",
      purpose:
        "Zrozumienie, jak strona jest używana (odsłony, ścieżki, etapy formularza kontaktowego), aby ją ulepszać.",
      basis:
        "Twoja zgoda (art. 6 ust. 1 lit. a RODO), zbierana przez baner cookie. Bez zgody nic nie jest ładowane. Możesz ją wycofać w dowolnym momencie.",
      data: "Dane przeglądania: odwiedzone strony, informacje techniczne o przeglądarce i urządzeniu, identyfikatory zapisywane przez mechanizmy śledzące. Jeśli zgoda została udzielona, liczonych jest też kilka zdarzeń formularza kontaktowego: wyświetlony etap, wysłanie zapytania, odpowiedź na pytanie o źródło, kliknięcie przycisku rezerwacji. Nie zawierają one ani Twojej wiadomości, ani adresu e-mail.",
      recipients: "Google Ireland Limited (Google Analytics i Google Tag Manager).",
    },
    performance: {
      title: "Pomiar wydajności, bez plików cookie",
      purpose: "Pomiar szybkości i stabilności strony, aby wykrywać spowolnienia i je naprawiać.",
      basis: "Prawnie uzasadniony interes w utrzymaniu szybkiej i sprawnej strony (art. 6 ust. 1 lit. f RODO).",
      data: "Techniczne dane przeglądania i wydajności (odwiedzona strona, czas ładowania, typ urządzenia). Nie jest zapisywany żaden plik cookie.",
      recipients: "Vercel (Vercel Analytics i Speed Insights).",
    },
    booking: {
      title: "Rezerwacja spotkań, jeśli jest włączona",
      purpose: "Umożliwienie Ci zarezerwowania terminu rozmowy ze mną.",
      basis: "Działania przed zawarciem umowy podejmowane na Twoją prośbę (art. 6 ust. 1 lit. b RODO).",
      data: "Informacje, które wpisujesz na stronie rezerwacji (na przykład imię i nazwisko, adres e-mail i wybrany termin). Ta strona należy do Cal.com i podlega jego własnej polityce prywatności.",
      recipients: "Cal.com, Inc. oraz ja sam.",
    },
    logs: {
      title: "Dzienniki techniczne hostingu i sieci",
      purpose: "Zapewnienie działania, bezpieczeństwa i dostępności strony.",
      basis: "Prawnie uzasadniony interes w zapewnieniu bezpieczeństwa i prawidłowego działania strony (art. 6 ust. 1 lit. f RODO).",
      data: "Adres IP, data i godzina żądania, żądany adres, informacje techniczne o przeglądarce.",
      recipients: "Vercel (hosting) i Cloudflare (DNS i proxy).",
    },
    processors: {
      title: "Dostawcy i transfery poza Unię Europejską",
      text: "Ci dostawcy przetwarzają dane w moim imieniu. Kilku z nich ma siedzibę w Stanach Zjednoczonych: gdy dane są tam przekazywane, transfer opiera się na mechanizmie wskazanym przy każdym z nich.",
    },
    rights: {
      title: "Twoje prawa",
      text: "W dowolnym momencie możesz zażądać:",
      access: "dostępu do danych, które Cię dotyczą;",
      rectification: "ich sprostowania;",
      erasure: "ich usunięcia;",
      restriction: "ograniczenia ich przetwarzania;",
      objection: "sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie;",
      portability: "przenoszenia danych przekazanych przez Ciebie, gdy przewiduje to prawo;",
      withdrawal:
        "wycofania zgody, bez wpływu na to, co zostało zrobione wcześniej. W przypadku plików cookie wystarczy przycisk „Zarządzaj plikami cookie” w stopce.",
      how: "Aby skorzystać ze swoich praw, napisz do mnie e-mailem. Odpowiadam najpóźniej w ciągu miesiąca. W razie uzasadnionych wątpliwości co do Twojej tożsamości mogę poprosić o jej potwierdzenie.",
    },
    complaint: {
      title: "Skarga",
      text: "Jeśli po kontakcie ze mną uważasz, że Twoje prawa nie są przestrzegane, możesz złożyć skargę do francuskiego organu ochrony danych, Commission nationale de l'informatique et des libertés (CNIL):",
    },
  },
  cookies: {
    meta: {
      title: "Polityka plików cookie | Patrick Bartosik",
      description:
        "Jakich mechanizmów śledzących używa ta strona, na jakich warunkach i jak zaakceptować, odrzucić lub zmienić wybór.",
    },
    title: "Polityka plików cookie",
    intro:
      "Ta strona wyjaśnia, jakich mechanizmów śledzących może używać ta strona, na jakich warunkach i jak zmienić swój wybór. Mechanizm śledzący, czyli plik cookie, to informacja zapisywana w przeglądarce lub z niej odczytywana.",
    before: {
      title: "Przed Twoim wyborem",
      text: "Dopóki nie odpowiesz na baner, żaden mechanizm pomiaru oglądalności nie jest zapisywany ani odczytywany, a narzędzia Google nie są ładowane.",
    },
    necessary: {
      title: "Co jest ściśle niezbędne",
      text1:
        "Sam Twój wybór jest zapisywany w pamięci lokalnej przeglądarki (zgoda lub odmowa, z datą), aby nie pytać Cię na każdej stronie. Zostaje na Twoim urządzeniu, nie służy do niczego innego i nie jest wysyłany do żadnej strony trzeciej.",
      text2: "Pomiar wydajności Vercel (Vercel Analytics i Speed Insights) działa bez plików cookie.",
    },
    after: {
      title: "Po Twojej zgodzie",
      text1:
        "Jeśli się zgodzisz, strona ładuje Google Tag Manager i Google Analytics, dostarczane przez Google Ireland Limited. Służą do pomiaru oglądalności: odwiedzone strony, ścieżki, etapy formularza kontaktowego.",
      text2:
        "Mogą zapisywać mechanizmy śledzące w Twojej przeglądarce i przekazywać informacje do Google, także do Stanów Zjednoczonych. Gwarancje dla tego transferu opisuje polityka prywatności.",
    },
    choice: {
      title: "Zaakceptuj lub odrzuć",
      text1:
        "Przyciski „Akceptuję” i „Odrzucam” są przedstawione równie prosto. Odmowa nie ogranicza dostępu do żadnej części strony.",
      text2:
        "Twój wybór, zgoda lub odmowa, jest przechowywany przez sześć miesięcy. Potem baner pojawia się ponownie.",
    },
    change: {
      title: "Zmień swój wybór",
      text1:
        "W dowolnym momencie możesz zmienić zdanie: przycisk „Zarządzaj plikami cookie” na dole każdej strony ponownie otwiera baner.",
      text2:
        "Wycofanie zgody zatrzymuje ładowanie narzędzi Google. Mechanizmy śledzące już obecne w Twojej przeglądarce mogą w niej pozostać do wygaśnięcia: możesz je usunąć w ustawieniach przeglądarki.",
    },
  },
  terms: {
    meta: {
      title: "Warunki korzystania | Patrick Bartosik",
      description:
        "Warunki korzystania ze strony wizytówki Patricka Bartosika, niezależnego programisty full stack.",
    },
    title: "Warunki korzystania",
    intro:
      "Te warunki regulują korzystanie z tej strony. To strona wizytówka: nie oferuje konta użytkownika ani sprzedaży online.",
    object: {
      title: "Cel strony",
      text: "Ta strona przedstawia działalność Patricka Bartosika, niezależnego programisty full stack: jego usługi, projekty i sposób kontaktu z nim.",
    },
    access: {
      title: "Dostęp do strony",
      text: "Strona jest bezpłatnie dostępna dla każdego, kto ma dostęp do internetu. Koszty dostępu (łącze, sprzęt) ponosisz Ty. Dostęp może zostać zawieszony lub przerwany w dowolnym momencie, w szczególności z powodu prac konserwacyjnych, bez gwarancji ciągłej dostępności.",
    },
    ip: {
      title: "Własność intelektualna",
      text: "Treści strony (teksty, obrazy, kod, grafiki, logotypy) są chronione. O ile nie zaznaczono inaczej, należą do Patricka Bartosika lub są używane za zgodą ich właścicieli. Wszelkie powielanie lub ponowne wykorzystanie bez uprzedniej pisemnej zgody jest zabronione.",
    },
    accuracy: {
      title: "Dokładność informacji",
      text: "Staram się publikować dokładne i aktualne informacje, ale strona może zawierać błędy lub pominięcia. Przedstawione informacje (usługi, projekty, terminy) mają charakter orientacyjny i nie stanowią wiążącej oferty: zobowiązuje mnie wyłącznie pisemne porozumienie między nami.",
    },
    liability: {
      title: "Odpowiedzialność",
      text: "W granicach dozwolonych przez prawo Patrick Bartosik nie ponosi odpowiedzialności za szkody wynikające z korzystania ze strony lub z braku dostępu do niej. Nie ogranicza to praw, które przyznaje Ci prawo.",
    },
    links: {
      title: "Linki zewnętrzne",
      text: "Strona odsyła do serwisów stron trzecich (media społecznościowe, zrealizowane projekty, strona rezerwacji). Nie kontroluję ich treści i nie odpowiadam za ich praktyki: obowiązują ich własne warunki.",
    },
    law: {
      title: "Prawo właściwe",
      text: "Te warunki podlegają prawu francuskiemu. W razie nieporozumienia napisz najpierw do mnie: poszukamy rozwiązania polubownego.",
    },
  },
} as const;
