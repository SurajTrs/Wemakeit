import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp, Footer, HomeSections } from "@/components/Sections";
import { brand, currentPrice, EMAIL, faq, hasEmail, hasWhatsApp, legalEntity, liveSocials, pricing, seo, servicePages, SITE_URL, team, WHATSAPP_NUMBER, WHATSAPP_NUMBERS_EXTRA } from "@/content/site";

// Structured data helps Google understand the business + shows FAQ info.
// Built per render so offer prices stay current (see festiveOffer in content/site.ts).
const buildJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: brand.name,
    description: seo.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#business` },
  },
  {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: brand.name,
    legalName: legalEntity.name,
    description: seo.description,
    slogan: "From idea to income.",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/wemakeit-icon-square-dark.png`,
    image: `${SITE_URL}/opengraph-image`,
    ...(hasEmail && { email: EMAIL }),
    ...(hasWhatsApp && { telephone: [WHATSAPP_NUMBER, ...WHATSAPP_NUMBERS_EXTRA].map((n) => `+${n}`) }),
    ...(liveSocials.length > 0 && { sameAs: liveSocials.map((s) => s.url) }),
    areaServed: [{ "@type": "City", name: "Gurugram" }, { "@type": "State", name: "Haryana" }, { "@type": "Country", name: "India" }],
    knowsAbout: servicePages.map((p) => p.title),
    employee: team.members.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, knowsAbout: m.skills.map((k) => k.label) })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web design, app development and digital marketing services",
      itemListElement: [
        ...pricing.plans
          .filter((p) => /^₹[\d,]+$/.test(p.price))
          .map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.description,
            price: currentPrice({ regular: p.price, offer: p.offerPrice }).replace(/[^\d]/g, ""),
            priceCurrency: "INR",
          })),
        ...servicePages.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.title, url: `${SITE_URL}/services/${p.slug}` },
        })),
      ],
    },
    address: { "@type": "PostalAddress", streetAddress: "Sector 24", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    priceRange: "₹₹",
  },
  {
    "@type": "FAQPage",
    mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  },
  ],
});

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <div id="top" />
      <Navbar />
      <main id="main">
        <HomeSections />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
    </>
  );
}
