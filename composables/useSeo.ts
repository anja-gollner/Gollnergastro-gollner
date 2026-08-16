// Setzt Titel, Beschreibung, canonical und die Vorschau-Angaben fürs Teilen —
// pro Seite. Vorher standen Beschreibung und canonical global in nuxt.config,
// dadurch trug jede Unterseite denselben Text und verwies bei Google auf die
// Startseite (= Unterseiten wurden nicht indexiert).

import { BETRIEB, BEREICHE } from './useBetrieb'

type SeoOptionen = {
  title: string        // erscheint im Browser-Tab und als Google-Überschrift
  description: string  // der Satz unter dem Treffer in der Google-Liste
  bild?: string        // abweichendes Vorschaubild, sonst das Haus bei Nacht
}

export function useSeo(o: SeoOptionen) {
  const route = useRoute()
  // Nuxt erzeugt Ordner-URLs ("/restaurant/"); für canonical ohne Slash,
  // die Startseite bleibt die nackte Domain.
  const pfad = route.path.replace(/\/+$/, '')
  const url = BETRIEB.domain + pfad
  const bild = BETRIEB.domain + (o.bild || BETRIEB.vorschaubild)

  useHead({
    title: o.title,
    meta: [
      { name: 'description', content: o.description },
      { property: 'og:title', content: o.title },
      { property: 'og:description', content: o.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: bild },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: o.title },
      { name: 'twitter:description', content: o.description },
      { name: 'twitter:image', content: bild }
    ],
    link: [{ rel: 'canonical', href: url || BETRIEB.domain }]
  })
}

// Strukturierte Daten: der unsichtbare Datenblock, aus dem Google Firmenname,
// Adresse, Telefon und die angebotenen Leistungen liest. Anders als beim
// Schildbacherhof kein "Restaurant" mit Öffnungszeiten, sondern ein
// Dienstleister — deshalb FoodService statt Restaurant.
export function useFirmaSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    additionalType: 'https://schema.org/FoodService',
    name: BETRIEB.name,
    legalName: BETRIEB.name,
    description: 'Catering, Betriebsverpflegung und Golfrestaurant aus Hartberg. '
      + 'Österreichische Küche, saisonal und regional — von Graz bis Wien.',
    url: BETRIEB.domain,
    telephone: BETRIEB.telefonRoh,
    email: BETRIEB.email,
    image: BETRIEB.domain + BETRIEB.vorschaubild,
    servesCuisine: BETRIEB.kueche,
    priceRange: BETRIEB.preisklasse,
    vatID: BETRIEB.uid,
    foundingDate: '2025-12',
    founder: { '@type': 'Person', name: BETRIEB.geschaeftsfuehrer },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BETRIEB.adresse.strasse,
      postalCode: BETRIEB.adresse.plz,
      addressLocality: BETRIEB.adresse.ort,
      addressCountry: BETRIEB.adresse.landCode
    },
    areaServed: ['Steiermark', 'Graz', 'Wien'],
    sameAs: [...BETRIEB.social.map(s => s.url), BETRIEB.schwester.url],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: BEREICHE.map(b => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: b.titel, description: b.text }
      }))
    }
  }

  useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }] })
}
