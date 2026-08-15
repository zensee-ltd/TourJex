(function () {
    var STORAGE_KEY = 'vs-lang';
    var SUPPORTED = ['en', 'de'];

    var STRINGS = {
        en: {
            // Nav / shared CTAs
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.destinations': 'Destinations',
            'nav.contact': 'Contact',
            'nav.planTour': 'Plan Your Tour',
            'nav.getQuote': 'Get a Quote',
            'nav.lang': 'Language',

            // Footer
            'footer.tagline': 'Your trusted local partner for tailor-made Sri Lankan adventures — beaches, wildlife, tea country, and culture since 1997.',
            'footer.badge': 'Local experts since 1997',
            'footer.explore': 'Explore',
            'footer.destinations': 'Destinations',
            'footer.contact': 'Contact',
            'footer.tourPackages': 'Tour Packages',
            'footer.getQuote': 'Get a Quote',
            'footer.downSouth': 'Down South',
            'footer.hillCountry': 'Hill Country',
            'footer.wildlife': 'Wildlife',
            'footer.colombo': 'Colombo',
            'footer.culture': 'Culture',
            'footer.rights': 'Visit Siyenga. All rights reserved.',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'wa.chat': 'Chat on WhatsApp',

            // Home
            'home.heroTitle': 'One Island. Three Worlds. Endless Experiences.',
            'home.heroSubtitle': 'Travel from golden beaches to misty mountains and lush wildlife parks all within a few hours in Sri Lanka.',
            'home.planTour': 'Plan Your Tour',
            'home.whyTitle': 'Why Visit Sri Lanka?',
            'home.whySubtitle': 'One island — beaches, wilderness, and highlands, woven together on one unforgettable route.',
            'home.beachTitle': 'Beaches & Coastlines',
            'home.beachText': 'Relax on golden beaches with warm tropical weather all year round.',
            'home.wildlifeTitle': 'Wildlife & Nature',
            'home.wildlifeText': 'Experience safaris, elephants, and rich biodiversity in national parks.',
            'home.mountainsTitle': 'Mountains & Tea Hills',
            'home.mountainsText': 'Enjoy cool climate, scenic train rides, and breathtaking landscapes.',
            'home.cityTitle': 'City & Heritage',
            'home.cityText': 'Explore Colombo, colonial forts, temples, and vibrant local markets — ideal for arrival or departure days.',
            'home.highlight': 'Experience beaches, wildlife, tea country, and city heritage in just one journey — something unique only to Sri Lanka.',
            'home.whyUsTitle': 'Why Travel With Us?',
            'home.whyUsDesc': 'Local experts, private itineraries, and care from first message to farewell — so you see Sri Lanka with confidence.',
            'home.expertTitle': 'Local Experts Since 1997',
            'home.expertText': 'We know Sri Lanka inside out — hidden gems, best routes, best timing.',
            'home.privateTitle': 'Private & Tailor-Made Tours',
            'home.privateText': 'Every trip is customized to your needs — no fixed packages.',
            'home.careTitle': 'Personal Care & Support',
            'home.careText': 'From planning to travel, we are with you every step.',
            'home.trustedTitle': 'Trusted by International Travelers',
            'home.trustedText': 'Happy clients from Europe and around the world.',
            'home.flexTitle': 'Flexible & Easy Communication',
            'home.flexText': 'Quick replies via WhatsApp, email, or call.',
            'home.featuredTitle': 'Featured Tours',
            'home.featuredSubtitle': 'Popular routes — every itinerary can be adjusted to your pace and interests.',
            'home.requestTour': 'Request this tour',
            'home.experienceTitle': 'Experience Sri Lanka',
            'home.reviewsTitle': 'What Our Travelers Say',
            'home.ctaTitle': 'Ready to start your Sri Lanka journey?',
            'home.ctaText': 'Let us create your perfect itinerary — stress-free and personalized.',
            'home.sendInquiry': 'Send Inquiry',

            // Destinations listing
            'tours.title': 'Tour Packages',
            'tours.subtitle': 'Tailor-made Sri Lanka journeys — pick a region and we’ll build your perfect itinerary.',
            'tours.all': 'All Tours',
            'tours.beach': 'Beach & Coast',
            'tours.hills': 'Hill Country',
            'tours.culture': 'Culture',
            'tours.wildlife': 'Wildlife',
            'tours.city': 'City',
            'tours.tailorMade': 'Tailor Made',
            'tours.startingFrom': 'Starting From',
            'tours.onRequest': 'On request',
            'tours.addToTrip': 'Add to trip',
            'tours.bookList': 'Your Book List',
            'tours.emptyList': 'Your book list is empty. Add tours to continue.',
            'tours.proceed': 'Proceed to Booking',
            'tours.clear': 'Clear all',

            // Quote / contact
            'quote.title': 'Get a quote',
            'quote.subtitle': 'Our dedicated team of local experts are available 24/7, ready to provide assistance whenever you need it.',
            'quote.fullName': 'Full Name',
            'quote.email': 'Email Address',
            'quote.destination': 'Destination',
            'quote.selectDestination': 'Select a Destination',
            'quote.phone': 'Phone Number',
            'quote.countryCode': 'Country code',
            'quote.startDate': 'Travel start date',
            'quote.endDate': 'Travel end date',
            'quote.datesHint': 'Optional — approximate dates are fine',
            'quote.confirmHint': 'Optional — we’ll confirm when quoting',
            'quote.coupon': 'Coupon code',
            'quote.couponPlaceholder': 'Enter your coupon',
            'quote.haveCoupon': 'Have a coupon?',
            'quote.submit': 'Submit',
            'quote.sending': 'Sending…',
            'quote.promise': 'Get a personalised quote in 2 hours.',
            'quote.privacy': 'We guarantee that your information will not be shared with any third parties.',
            'quote.success': 'Thank you! Your quote request was sent. We’ll reply within 2 hours.',
            'quote.required': 'Please fill in all required fields.',
            'quote.fullIsland': 'Full island tour — tailor-made',
            'quote.sendError': 'Could not send your request. Please WhatsApp us at +94 77 996 1170 or email visitsiyenga@gmail.com.',

            // About / services common
            'about.hero': 'About Visit Siyenga Lanka',
            'about.story': 'Our Story',
            'about.mission': 'Our Mission',
            'services.hero': 'Our Premium Services',
            'services.offer': 'What We Offer',
            'services.how': 'How It Works',
            'services.cta': 'Ready to start your Sri Lankan adventure?',
            'common.learnMore': 'Learn more',
            'common.close': 'Close',
            'common.loading': 'Loading...'
        },
        de: {
            'nav.home': 'Startseite',
            'nav.about': 'Über uns',
            'nav.services': 'Leistungen',
            'nav.destinations': 'Reiseziele',
            'nav.contact': 'Kontakt',
            'nav.planTour': 'Tour planen',
            'nav.getQuote': 'Angebot anfordern',
            'nav.lang': 'Sprache',

            'footer.tagline': 'Ihr lokaler Partner für maßgeschneiderte Abenteuer in Sri Lanka — Strände, Wildtiere, Teeplantagen und Kultur seit 1997.',
            'footer.badge': 'Lokale Experten seit 1997',
            'footer.explore': 'Entdecken',
            'footer.destinations': 'Reiseziele',
            'footer.contact': 'Kontakt',
            'footer.tourPackages': 'Tourpakete',
            'footer.getQuote': 'Angebot anfordern',
            'footer.downSouth': 'Südküste',
            'footer.hillCountry': 'Bergland',
            'footer.wildlife': 'Wildtiere',
            'footer.colombo': 'Colombo',
            'footer.culture': 'Kultur',
            'footer.rights': 'Visit Siyenga. Alle Rechte vorbehalten.',
            'footer.privacy': 'Datenschutz',
            'footer.terms': 'Nutzungsbedingungen',
            'wa.chat': 'Per WhatsApp chatten',

            'home.heroTitle': 'Eine Insel. Drei Welten. Unendliche Erlebnisse.',
            'home.heroSubtitle': 'Reisen Sie in Sri Lanka innerhalb weniger Stunden von goldenen Stränden zu nebligen Bergen und üppigen Nationalparks.',
            'home.planTour': 'Tour planen',
            'home.whyTitle': 'Warum Sri Lanka besuchen?',
            'home.whySubtitle': 'Eine Insel — Strände, Wildnis und Hochland, verbunden auf einer unvergesslichen Route.',
            'home.beachTitle': 'Strände & Küsten',
            'home.beachText': 'Entspannen Sie an goldenen Stränden bei warmem tropischem Wetter das ganze Jahr.',
            'home.wildlifeTitle': 'Wildtiere & Natur',
            'home.wildlifeText': 'Erleben Sie Safaris, Elefanten und reiche Artenvielfalt in Nationalparks.',
            'home.mountainsTitle': 'Berge & Teehügel',
            'home.mountainsText': 'Genießen Sie kühles Klima, malerische Zugfahrten und atemberaubende Landschaften.',
            'home.cityTitle': 'Stadt & Erbe',
            'home.cityText': 'Entdecken Sie Colombo, koloniale Forts, Tempel und lebendige Märkte — ideal für An- und Abreisetage.',
            'home.highlight': 'Erleben Sie Strände, Wildtiere, Teelandschaften und städtisches Erbe auf einer einzigen Reise — etwas Einzigartiges nur in Sri Lanka.',
            'home.whyUsTitle': 'Warum mit uns reisen?',
            'home.whyUsDesc': 'Lokale Experten, private Reiserouten und Betreuung von der ersten Nachricht bis zum Abschied — damit Sie Sri Lanka mit Vertrauen erleben.',
            'home.expertTitle': 'Lokale Experten seit 1997',
            'home.expertText': 'Wir kennen Sri Lanka in- und auswendig — Geheimtipps, beste Routen, bestes Timing.',
            'home.privateTitle': 'Private & maßgeschneiderte Touren',
            'home.privateText': 'Jede Reise wird nach Ihren Wünschen gestaltet — keine festen Pakete.',
            'home.careTitle': 'Persönliche Betreuung & Support',
            'home.careText': 'Von der Planung bis zur Reise sind wir an Ihrer Seite.',
            'home.trustedTitle': 'Vertraut von internationalen Reisenden',
            'home.trustedText': 'Zufriedene Gäste aus Europa und der ganzen Welt.',
            'home.flexTitle': 'Flexible & einfache Kommunikation',
            'home.flexText': 'Schnelle Antworten per WhatsApp, E-Mail oder Telefon.',
            'home.featuredTitle': 'Empfohlene Touren',
            'home.featuredSubtitle': 'Beliebte Routen — jede Reiseroute lässt sich an Ihr Tempo und Ihre Interessen anpassen.',
            'home.requestTour': 'Diese Tour anfragen',
            'home.experienceTitle': 'Sri Lanka erleben',
            'home.reviewsTitle': 'Was unsere Reisenden sagen',
            'home.ctaTitle': 'Bereit für Ihre Sri-Lanka-Reise?',
            'home.ctaText': 'Wir erstellen Ihre perfekte Reiseroute — stressfrei und persönlich.',
            'home.sendInquiry': 'Anfrage senden',

            'tours.title': 'Tourpakete',
            'tours.subtitle': 'Maßgeschneiderte Reisen durch Sri Lanka — wählen Sie eine Region und wir planen Ihre ideale Route.',
            'tours.all': 'Alle Touren',
            'tours.beach': 'Strand & Küste',
            'tours.hills': 'Bergland',
            'tours.culture': 'Kultur',
            'tours.wildlife': 'Wildtiere',
            'tours.city': 'Stadt',
            'tours.tailorMade': 'Maßgeschneidert',
            'tours.startingFrom': 'Ab',
            'tours.onRequest': 'Auf Anfrage',
            'tours.addToTrip': 'Zur Reise hinzufügen',
            'tours.bookList': 'Ihre Merkliste',
            'tours.emptyList': 'Ihre Merkliste ist leer. Fügen Sie Touren hinzu, um fortzufahren.',
            'tours.proceed': 'Zur Buchung',
            'tours.clear': 'Alles löschen',

            'quote.title': 'Angebot anfordern',
            'quote.subtitle': 'Unser Team lokaler Experten ist rund um die Uhr erreichbar und hilft Ihnen jederzeit weiter.',
            'quote.fullName': 'Vollständiger Name',
            'quote.email': 'E-Mail-Adresse',
            'quote.destination': 'Reiseziel',
            'quote.selectDestination': 'Reiseziel auswählen',
            'quote.phone': 'Telefonnummer',
            'quote.countryCode': 'Ländervorwahl',
            'quote.startDate': 'Reisebeginn',
            'quote.endDate': 'Reiseende',
            'quote.datesHint': 'Optional — ungefähre Daten reichen aus',
            'quote.confirmHint': 'Optional — wir bestätigen beim Angebot',
            'quote.coupon': 'Gutscheincode',
            'quote.couponPlaceholder': 'Gutschein eingeben',
            'quote.haveCoupon': 'Haben Sie einen Gutschein?',
            'quote.submit': 'Absenden',
            'quote.sending': 'Wird gesendet…',
            'quote.promise': 'Persönliches Angebot in 2 Stunden.',
            'quote.privacy': 'Wir garantieren, dass Ihre Daten nicht an Dritte weitergegeben werden.',
            'quote.success': 'Vielen Dank! Ihre Anfrage wurde gesendet. Wir antworten innerhalb von 2 Stunden.',
            'quote.required': 'Bitte füllen Sie alle Pflichtfelder aus.',
            'quote.fullIsland': 'Rundreise — maßgeschneidert',
            'quote.sendError': 'Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns per WhatsApp an +94 77 996 1170 oder per E-Mail an visitsiyenga@gmail.com.',

            'about.hero': 'Über Visit Siyenga Lanka',
            'about.story': 'Unsere Geschichte',
            'about.mission': 'Unsere Mission',
            'services.hero': 'Unsere Premium-Leistungen',
            'services.offer': 'Was wir anbieten',
            'services.how': 'So funktioniert’s',
            'services.cta': 'Bereit für Ihr Abenteuer in Sri Lanka?',
            'common.learnMore': 'Mehr erfahren',
            'common.close': 'Schließen',
            'common.loading': 'Wird geladen...'
        }
    };

    function preferredLang() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (SUPPORTED.indexOf(stored) !== -1) return stored;
        } catch (e) { /* ignore */ }
        var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
        return nav === 'de' ? 'de' : 'en';
    }

    function t(key, lang) {
        var dict = STRINGS[lang] || STRINGS.en;
        if (dict[key] != null) return dict[key];
        if (STRINGS.en[key] != null) return STRINGS.en[key];
        return null;
    }

    function applyAttr(el, attr, key, lang) {
        var value = t(key, lang);
        if (value == null) return;
        el.setAttribute(attr, value);
    }

    function applyLanguage(lang) {
        var next = SUPPORTED.indexOf(lang) !== -1 ? lang : 'en';
        document.documentElement.setAttribute('lang', next);
        document.documentElement.setAttribute('data-lang', next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) { /* ignore */ }

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var value = t(key, next);
            if (value == null) return;
            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var value = t(el.getAttribute('data-i18n-placeholder'), next);
            if (value != null) el.setAttribute('placeholder', value);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            applyAttr(el, 'title', el.getAttribute('data-i18n-title'), next);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            applyAttr(el, 'aria-label', el.getAttribute('data-i18n-aria'), next);
        });

        // Keep icon + translated label for footer CTA / WhatsApp buttons
        document.querySelectorAll('[data-i18n-keep-icon]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-keep-icon');
            var value = t(key, next);
            if (value == null) return;
            var icon = el.querySelector('i, svg');
            if (icon) {
                el.innerHTML = '';
                el.appendChild(icon);
                el.appendChild(document.createTextNode(' ' + value));
            } else {
                el.textContent = value;
            }
        });

        document.querySelectorAll('[data-lang-select]').forEach(function (sel) {
            sel.value = next;
        });
    }

    function init() {
        applyLanguage(preferredLang());

        document.addEventListener('change', function (e) {
            var sel = e.target.closest('[data-lang-select]');
            if (!sel) return;
            applyLanguage(sel.value);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.VisitSiyengaI18n = {
        apply: applyLanguage,
        t: function (key) {
            return t(key, document.documentElement.getAttribute('data-lang') || preferredLang());
        },
        current: function () {
            return document.documentElement.getAttribute('data-lang') || preferredLang();
        }
    };
})();
