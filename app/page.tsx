import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp, Footer, HomeSections } from "@/components/Sections";
import { brand, EMAIL, faq, hasEmail, hasWhatsApp, liveSocials, SITE_URL, WHATSAPP_NUMBER, WHATSAPP_NUMBERS_EXTRA } from "@/content/site";

// Structured data helps Google understand the business + shows FAQ info.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "ProfessionalService",
    name: brand.name,
    description: brand.tagline,
    url: SITE_URL,
    ...(hasEmail && { email: EMAIL }),
    ...(hasWhatsApp && { telephone: [WHATSAPP_NUMBER, ...WHATSAPP_NUMBERS_EXTRA].map((n) => `+${n}`) }),
    ...(liveSocials.length > 0 && { sameAs: liveSocials.map((s) => s.url) }),
    areaServed: "IN",
    address: { "@type": "PostalAddress", streetAddress: "Sector 24", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    priceRange: "₹₹",
  },
  {
    "@type": "FAQPage",
    mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  },
  ],
};

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
