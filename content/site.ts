/**
 * ─────────────────────────────────────────────────────────────
 *  WeMakeIt — ALL SITE COPY, PRICES AND CONTACT DETAILS LIVE HERE.
 *  Edit this file only; the components read from it.
 *  Anything in [BRACKETS] is a placeholder you still need to fill.
 * ─────────────────────────────────────────────────────────────
 */

// ── Contact details ─────────────────────────────────────────
// WhatsApp number in international format, digits only, no "+" or spaces.
// Example: "919876543210"
export const WHATSAPP_NUMBER = "917300969491"; // main number — all WhatsApp buttons open this one
// Extra WhatsApp numbers, listed in the footer alongside the main one.
export const WHATSAPP_NUMBERS_EXTRA: string[] = ["919555219911"];
export const EMAIL = "wemakeit.in@gmail.com";
export const INSTAGRAM_HANDLE = "wemakeit._"; // without the "@"
export const BOOKING_URL = ""; // empty = "Book a free call" buttons open WhatsApp. Add a Calendly link here later if you want one
// Canonical domain (www). Must match the domain Vercel serves without redirecting, or Google sees
// canonicals and sitemap URLs that redirect. Used for canonicals, sitemap, robots.txt, Open Graph and schema.
export const SITE_URL = "https://www.wemakeit.in";

// ── Festive offer (Diwali) ──────────────────────────────────
// While enabled, the site shows the regular price crossed out and the offer price.
// Set enabled: false when the offer ends: every price on the site goes back to the regular price.
export const festiveOffer = {
  enabled: true,
  name: "Diwali offer",
  badge: "Diwali offer",
  banner: "Diwali offer: ₹1,000 off every website package",
  bannerShort: "Diwali offer: ₹1,000 off websites", // shown on phones
  bannerCta: "See prices",
};

// Package prices: change them here only (pricing cards, FAQs, WhatsApp messages and SEO all read these).
export const packagePrices = {
  starter: { regular: "₹5,999", offer: "₹4,999" },
  growth: { regular: "₹8,999", offer: "₹7,999" },
};
/** The price customers pay right now: the offer price while the festive offer is on. */
export const currentPrice = (p: { regular: string; offer?: string }) =>
  festiveOffer.enabled && p.offer ? p.offer : p.regular;
const STARTER = currentPrice(packagePrices.starter);
const GROWTH = currentPrice(packagePrices.growth);

// ── Legal details (used on the Privacy, Terms and Refund pages) ──
// Fill these before going live. If you're a sole proprietor, the legal name is
// usually your own name, e.g. "Suraj Rawat (trading as WeMakeIt)".
export const legalEntity = {
  name: "WeMakeIt",
  address: "Sector 24, Gurgaon, Haryana, India",
  city: "Gurugram, Haryana", // courts of this city have jurisdiction over disputes
  grievanceOfficer: "Suraj Rawat", // the person who handles privacy complaints (can be you)
  updated: "8 November 2026", // change this whenever you edit a policy
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi WeMakeIt, I would like to discuss my business requirements";

// ── Link helpers ────────────────────────────────────────────
// These keep every button working even while a detail above is still a
// [PLACEHOLDER]: WhatsApp falls back to email, then to the contact form.
export const isPlaceholder = (v: string) => !v.trim() || /\[[^\]]*\]/.test(v);

export const hasWhatsApp = !isPlaceholder(WHATSAPP_NUMBER) && /^\d{8,15}$/.test(WHATSAPP_NUMBER);
export const hasEmail = !isPlaceholder(EMAIL) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL);
export const hasInstagram = !isPlaceholder(INSTAGRAM_HANDLE);
export const hasBooking = !isPlaceholder(BOOKING_URL) && /^https?:\/\//.test(BOOKING_URL);

export const mailtoLink = (body?: string, subject = "Business enquiry | WeMakeIt") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/** Best available "message us" link: WhatsApp → email → the on-page contact form. */
/** "919876543210" → "+91 98765 43210" */
export const formatPhone = (n: string) =>
  n.length === 12 && n.startsWith("91") ? `+91 ${n.slice(2, 7)} ${n.slice(7)}` : `+${n}`;

export const allWhatsAppNumbers = hasWhatsApp
  ? [WHATSAPP_NUMBER, ...WHATSAPP_NUMBERS_EXTRA.filter((n) => /^\d{8,15}$/.test(n))]
  : [];

export const whatsappLinkFor = (number: string, message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const whatsappLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  hasWhatsApp
    ? whatsappLinkFor(WHATSAPP_NUMBER, message)
    : hasEmail
      ? mailtoLink(message)
      : "/#contact";

/** Link attributes: open in a new tab only for real external URLs. */
export const linkProps = (href: string) =>
  /^https?:\/\//.test(href) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};

export const bookingLink = hasBooking ? BOOKING_URL : whatsappLink("Hi WeMakeIt, I'd like to book a free call");

export const instagramLink = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// ── Social media (footer "Follow us" + Google structured data) ──
// Paste full profile links. Any left as [PLACEHOLDER] are hidden on the live site.
// icon keys must match components/Icon.tsx
export const socials = [
  { name: "Instagram", icon: "instagram", url: hasInstagram ? instagramLink : "" },
  { name: "Facebook", icon: "facebook", url: "" }, // add your page link, e.g. https://www.facebook.com/wemakeit (empty = hidden)
  { name: "LinkedIn", icon: "linkedin", url: "" }, // e.g. https://linkedin.com/company/wemakeit (empty = hidden)
  { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@wemakeit-in" },
];
export const liveSocials = socials.filter((s) => !isPlaceholder(s.url) && /^https?:\/\//.test(s.url));

// ── SEO ─────────────────────────────────────────────────────
// Titles: keep under ~60 characters and descriptions under ~160, or Google cuts them off.
// Page titles get " | WeMakeIt" added automatically (see app/layout.tsx).
export const seo = {
  title: "Web Design & Digital Marketing Agency in Gurgaon | WeMakeIt",
  description:
    `Website design, apps, SEO, ads and social media from one team in Gurgaon. Websites live in 7 days from ${STARTER} at fixed prices. Serving businesses across India.`,
  // Google Search Console → Add property → "HTML tag" method → paste only the content="..." value here.
  googleVerification: "",
  keywords: [
    "website development company in Gurgaon",
    "web design agency Gurgaon",
    "digital marketing agency Gurgaon",
    "ecommerce website development",
    "mobile app development company",
    "SEO services Gurgaon",
    "small business website India",
  ],
  ogTitle: "WeMakeIt | From idea to income",
  ogDescription:
    "Website, app, SEO, ads and marketing under one roof. No more chasing five freelancers.",
};

// Headings: wrap words in *asterisks* to show them in lime italics.

// ── Brand ───────────────────────────────────────────────────
export const brand = {
  name: "WeMakeIt",
  tagline: "From idea to income. We build, launch and grow your business.",
  footerLine:
    "One team to build, launch and grow your business online. Based in India, working with businesses everywhere.",
};

// ── Navbar ──────────────────────────────────────────────────
export const nav = {
  links: [
    { label: "Services", href: "/#offer" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Work", href: "/#work" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: "WhatsApp us",
  ctaFallback: "Contact us", // shown when WHATSAPP_NUMBER isn't set yet
};

// ── Hero ────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Web design & digital marketing agency · Gurgaon",
  headline: "From idea to income.", // add "\n" for a line break
  highlight: "income", // the words in the headline that get the lime highlight
  subtext: "Your entire business online. Built, launched and grown by one team.",
  primaryCta: "Get a free consultation",
  primaryCtaMessage: "Hi WeMakeIt, I'd like a free consultation for my business",
  secondaryCta: "See our services",
  trustLine: "Live in 7 days · Fixed prices",
  // Quick facts — shown on the service pages (keep these true!)
  stats: [
    { value: "7 days", label: "To go live" },
    { value: "3 months", label: "Free support" },
    { value: "10", label: "Services in-house" },
    { value: "1 team", label: "One point of contact" },
  ],
  // Product-style "dashboard window" under the hero (decorative; keep claims true).
  // icon keys must match components/Icon.tsx
  preview: {
    title: "Your business",
    status: "On track",
    scope: {
      label: "Scope",
      tag: "Included",
      items: [
        { label: "Website", icon: "globe" },
        { label: "App", icon: "phone" },
        { label: "SEO", icon: "search" },
        { label: "Ads", icon: "megaphone" },
        { label: "Social media", icon: "heart" },
        { label: "Branding", icon: "pen" },
      ],
    },
    timeline: {
      label: "Timeline",
      summary: "Idea to live website",
      days: 7,
      today: "Today",
      // start/end in days (0–7). The last step keeps going after launch.
      steps: [
        { start: 0, end: 1, state: "done" },
        { start: 1, end: 2, state: "done" },
        { start: 2, end: 6, state: "active" },
        { start: 6, end: 7, state: "next" },
      ],
    },
    team: {
      label: "Your team",
      role: "Your account manager",
      points: [
        { icon: "whatsapp", text: "One shared WhatsApp group" },
        { icon: "tag", text: "Fixed quote, agreed upfront" },
        { icon: "userCheck", text: "One person accountable" },
      ],
    },
  },
};

// ── The problem ─────────────────────────────────────────────
export const problem = {
  label: "The problem",
  question:
    "Tired of juggling a web developer, a designer, an SEO guy and an ads person who never talk to each other?",
  people: ["Web developer", "Designer", "SEO guy", "Ads person"],
  answer: "WeMakeIt is one accountable partner for all of it.",
  answerSub:
    "One team, one WhatsApp group, one person who answers for the result.",
};

// ── Three ways we work ──────────────────────────────────────
export const ways = {
  label: "Three ways we work",
  heading: "Starting out, levelling up, or just need *one thing* done?",
  items: [
    {
      number: "01",
      title: "Launch from scratch",
      intro: "Have an idea or an offline business? We take you all the way to online and selling.",
      points: [
        "Branding: logo, colours and brand voice",
        "Website or e-commerce store",
        "Web apps & mobile apps",
        "Google Business & WhatsApp Business setup",
        "Launch marketing: SEO, Meta & Google ads, social media",
      ],
      cta: "Start my launch",
      ctaMessage: "Hi WeMakeIt, I want to launch my business online from scratch",
    },
    {
      number: "02",
      title: "Upgrade your existing product",
      intro: "Already have a website or web app? We make it faster, better looking and better at selling.",
      points: [
        "Audit of speed, UI/UX, SEO, conversions and security",
        "Redesign & new features",
        "Bug fixes & performance fixes",
        "AI features like chatbots, automation and smart search",
        "Monthly maintenance & growth retainers",
      ],
      cta: "Audit my website",
      ctaMessage: "Hi WeMakeIt, I want an audit of my existing website / web app",
    },
    {
      number: "03",
      title: "One-off tasks & fixed-scope work",
      intro: "Need just one task done, done right and done fast? We do that too.",
      points: [
        "A landing page or a single feature",
        "An integration or an API",
        "A bug fix",
        "An ad campaign",
        "Fixed price or hourly · White-label for agencies",
      ],
      cta: "Get a quick quote",
      ctaMessage: "Hi WeMakeIt, I need a quote for a one-off task",
    },
  ],
};

// ── What we offer (each card links to its own page at /services/<slug>) ──
// icon keys must match components/Icon.tsx
export const offer = {
  label: "What we offer",
  heading: "Everything your business needs *online*.",
  sub: "From a simple business site to a full e-commerce store, we build it all, fast and right.",
  learnMore: "Learn more",
  items: [
    {
      slug: "web-design",
      icon: "palette",
      title: "Web Design",
      line: "Interfaces designed to impress visitors and convert them into customers from first click.",
      intro:
        "Your website is often the first thing a customer sees. We design clean, modern pages around one goal: turning visitors into enquiries and sales.",
      includes: [
        "Page designs matched to your brand colours, logo and style",
        "Clear WhatsApp, call and enquiry buttons where people look",
        "Layouts designed for phones first, then tablets and desktops",
        "A design preview you approve before we start building",
        "Feedback rounds so the final design feels right to you",
      ],
      goodFor: ["New businesses that need a professional first impression", "Existing sites that look outdated or don't bring enquiries"],
      seoTitle: "Website Design Company in Gurgaon",
      seoDescription:
        `Custom, mobile-first website design for small businesses in Gurgaon and across India. Designs built to turn visitors into enquiries. Websites from ${STARTER}.`,
      faqs: [
        { q: "How much does website design cost?", a: `Our Starter Website is ${STARTER} one-time and the Business Growth package is ${GROWTH}${festiveOffer.enabled ? ` (${festiveOffer.name} prices)` : ""}, both with a mobile-friendly design. Bigger websites and online stores get a fixed quote before we start, so there are no surprises.` },
        { q: "Will I see the design before you build it?", a: "Yes. You get a design preview to approve before we start building, plus feedback rounds so the final design feels right to you." },
        { q: "Can you redesign my existing website?", a: "Yes. We start with an audit of speed, design, SEO and conversions, then share what to change and what it will cost. You decide what we work on." },
      ],
    },
    {
      slug: "development",
      icon: "zap",
      title: "Development",
      line: "Fast, clean, mobile-first code. Every site loads in under 2 seconds on any device.",
      intro:
        "A beautiful design only works if the site is fast and reliable. We build with modern, clean code so your pages load quickly and work smoothly everywhere.",
      includes: [
        "Mobile-first build that loads in under 2 seconds",
        "Optimised images and caching for speed",
        "Secure HTTPS and up-to-date code",
        "Contact forms and WhatsApp chat built in",
        "Help connecting your domain and hosting",
      ],
      goodFor: ["Business websites and landing pages", "Custom features a template can't do"],
      seoTitle: "Website Development Company in Gurgaon",
      seoDescription:
        "Website development for businesses in Gurgaon and across India: fast, secure, mobile-first sites that load in under 2 seconds. Live in 7 days at fixed prices.",
      faqs: [
        { q: "How long does it take to build a website?", a: "A small business website goes live in 7 days once we have your content (text, logo and photos). Larger websites get a clear timeline in your quote." },
        { q: "Do I own my website and domain?", a: "Yes. Once payment is complete, the website, domain and all logins are in your name. You're never locked in with us." },
        { q: "Can you help with my domain and hosting?", a: "Yes. We help you choose and connect your domain and hosting, and set up secure HTTPS so your site shows the padlock in browsers." },
      ],
    },
    {
      slug: "e-commerce",
      icon: "cart",
      title: "E-Commerce",
      line: "Complete online stores with Razorpay payment gateway, catalog, and order management.",
      intro:
        "Sell online without the headache. We set up a complete store with products, cart, checkout and payments, so you can start taking orders.",
      includes: [
        "Razorpay payments: UPI, cards, net banking and wallets",
        "Product catalogue with categories, photos, prices and stock",
        "Cart and smooth mobile checkout",
        "Order management so you can track and fulfil orders",
        "Shipping and delivery settings for your products",
      ],
      goodFor: ["Shops and brands moving online", "Instagram sellers who want their own store"],
      seoTitle: "E-commerce Website Development in Gurgaon",
      seoDescription:
        "Online store development with Razorpay payments (UPI, cards, net banking), product catalogue, cart and order management. For shops and sellers across India.",
      faqs: [
        { q: "Which payment methods can my online store accept?", a: "We set up Razorpay, so customers can pay by UPI, debit and credit cards, net banking and wallets." },
        { q: "Can I add and edit products myself?", a: "Yes. You can manage products, categories, photos, prices and stock yourself, and track orders as they come in." },
        { q: "How long does an e-commerce website take?", a: "It depends on how many products and features you need. You get a clear timeline and a fixed price in your quote before we start." },
      ],
    },
    {
      slug: "seo",
      icon: "trending",
      title: "SEO",
      line: "On-page SEO, Google Search Console setup and sitemap. Rank higher and get found faster.",
      intro:
        "A website only helps if people can find it. We set up the foundations Google looks for, so you show up when customers search for what you sell.",
      includes: [
        "On-page SEO: page titles, descriptions, headings and content structure",
        "Google Search Console setup and verification",
        "XML sitemap submitted to Google",
        "Structured data so Google understands your business",
        "Local SEO and Google Business profile (in the Business Growth plan)",
      ],
      goodFor: ["Local businesses that want customers nearby", "Any site that isn't showing up on Google yet"],
      seoTitle: "SEO Services in Gurgaon for Small Businesses",
      seoDescription:
        "SEO services for businesses in Gurgaon and across India: on-page SEO, Google Search Console, sitemaps, structured data and Google Business Profile setup.",
      faqs: [
        { q: "How long does SEO take to show results?", a: "SEO builds up over time. Most sites start seeing movement within a few weeks to a few months, depending on how competitive your keywords and area are. We set up the foundations from day one." },
        { q: "What is local SEO?", a: "Local SEO helps you show up when people nearby search for what you sell, for example \"bakery near me\". It covers your Google Business Profile, location pages and consistent business details across the web." },
        { q: "Is SEO included with my website?", a: "Every Starter Website includes basic SEO setup. The Business Growth package adds Google Business Profile setup and SEO to rank locally." },
      ],
    },
    {
      slug: "mobile-first",
      icon: "phone",
      title: "Mobile-First",
      line: "Tested on every screen: phones, tablets, laptops and widescreen monitors.",
      intro:
        "Most of your customers will visit from their phone. We design for small screens first and test on every size, so your site always looks right.",
      includes: [
        "Designed for phones first, then scaled up",
        "Tested on phones, tablets, laptops and widescreen monitors",
        "Checked in Chrome, Safari and other popular browsers",
        "Large, tap-friendly buttons and easy-to-read text",
        "Fast loading even on slower mobile data",
      ],
      goodFor: ["Every business, since most visitors come from mobile", "Sites that look broken or tiny on phones"],
      seoTitle: "Mobile-Friendly Responsive Website Design",
      seoDescription:
        "Responsive, mobile-first websites tested on phones, tablets, laptops and widescreens. Fast even on slow mobile data. For businesses across India.",
      faqs: [
        { q: "Why does a mobile-friendly website matter for Google?", a: "Google mainly looks at the mobile version of your site when deciding where to rank it. A slow or broken mobile site can hold back your rankings as well as your sales." },
        { q: "Will my website work on slow mobile data?", a: "Yes. We optimise images and code so pages load quickly even on slower connections." },
      ],
    },
    {
      slug: "free-support",
      icon: "shield",
      title: "Free Support",
      line: "Up to 3 months of post-launch support, bug fixes and content updates included.",
      intro:
        "Launch day isn't the end. You get up to 3 months of support after launch, so small fixes and updates are taken care of while you settle in.",
      includes: [
        "Up to 3 months of post-launch support included",
        "Bug fixes if anything isn't working as it should",
        "Content updates for text, images, prices and contact details",
        "Help with basic questions about managing your site",
        "Optional monthly maintenance plans after the free period",
      ],
      goodFor: ["Business owners who don't want to deal with tech", "Anyone launching their first website"],
      seoTitle: "Website Maintenance & Support in Gurgaon",
      seoDescription:
        "Up to 3 months of free post-launch support: bug fixes, content updates and help. Then optional monthly website maintenance plans for businesses across India.",
      faqs: [
        { q: "What happens after the free support period?", a: "You can carry on with an optional monthly maintenance plan, or manage the site yourself. There's no obligation." },
        { q: "What does website maintenance cover?", a: "Updates, backups, security checks, small changes and bug fixes. Growth retainers can add ongoing SEO and ads." },
      ],
    },
  ],
};

// ── More service pages (own page at /services/<slug>, not shown in "What we offer") ──
// These target what people search on Google. Linked from the Services grid and the footer.
// [REVIEW] New copy: check each page matches what you actually deliver before going live.
export const moreServices = [
    {
      slug: "mobile-app-development",
      icon: "phone",
      title: "Mobile App Development",
      line: "Android and iOS apps, designed, built and published to the Play Store and App Store.",
      intro: "Turn your idea or business into an app your customers keep on their phone. We design, build and publish Android and iOS apps, then help you improve them after launch.",
      includes: [
        "Android and iOS apps from one team",
        "App screens designed and approved by you before we build",
        "Logins, payments, notifications and other features your app needs",
        "Publishing to the Google Play Store and Apple App Store",
        "Support and updates after launch",
      ],
      goodFor: ["Startups launching a new app idea", "Businesses that want customers to order or book from their phone"],
      seoTitle: "Mobile App Development Company in Gurgaon",
      seoDescription:
        "Android and iOS app development in Gurgaon for startups and businesses across India. Design, build and Play Store / App Store publishing, at a fixed quote.",
      faqs: [
        { q: "How much does it cost to build a mobile app?", a: "It depends on the screens and features you need. After a free call we send a fixed quote with a clear scope and timeline, so the price we agree is the price you pay." },
        { q: "Do you build for both Android and iOS?", a: "Yes. We build apps for both Android and iOS and publish them to the Google Play Store and Apple App Store." },
        { q: "Will I own the app's code?", a: "Yes. Once payment is complete, the code and store accounts are yours." },
      ],
    },
    {
      slug: "web-app-development",
      icon: "layout",
      title: "Web App Development",
      line: "Custom dashboards, portals and MVPs built to grow with your business.",
      intro: "When a template or off-the-shelf tool doesn't fit how you work, we build a web app that does: from a quick MVP to test an idea to a full customer portal or internal dashboard.",
      includes: [
        "MVPs to test a startup idea quickly",
        "Customer portals, booking systems and dashboards",
        "Integrations with payments, WhatsApp, email and other APIs",
        "Secure logins and user roles",
        "Room to add features as you grow",
      ],
      goodFor: ["Startups that need an MVP fast", "Businesses running on spreadsheets and manual work"],
      seoTitle: "Web App & MVP Development in Gurgaon",
      seoDescription:
        "Custom web app development in Gurgaon: MVPs, dashboards, portals and booking systems built by full-stack developers. Fixed quotes for startups and businesses.",
      faqs: [
        { q: "What is an MVP?", a: "An MVP (minimum viable product) is the simplest version of your product that real users can try. It lets you test your idea and get feedback before spending on every feature." },
        { q: "Can you connect my web app to other tools?", a: "Yes. We can integrate payments, WhatsApp, email, CRMs and most tools that offer an API." },
      ],
    },
    {
      slug: "ai-chatbots-automation",
      icon: "bot",
      title: "AI Chatbots & Automation",
      line: "Answer customers 24/7 and cut repetitive manual work with AI.",
      intro: "Let AI handle the repetitive work. We add chatbots that answer common customer questions any time of day, and automations that move data between your tools so your team doesn't have to.",
      includes: [
        "AI chatbots for your website or WhatsApp",
        "Answers trained on your own products, prices and FAQs",
        "Automations for leads, orders, reminders and follow-ups",
        "Smart search for your website or app",
        "Hand-off to a real person when the bot can't help",
      ],
      goodFor: ["Businesses answering the same questions every day", "Teams losing hours to copy-paste and manual follow-ups"],
      seoTitle: "AI Chatbot & Automation Services in India",
      seoDescription:
        "AI chatbots for websites and WhatsApp plus business automation for leads, orders and follow-ups. Built by an in-house AI team in Gurgaon for businesses in India.",
      faqs: [
        { q: "Can an AI chatbot answer questions about my business?", a: "Yes. We set it up with your own products, prices and FAQs so it answers like your team would, and passes the chat to a person when needed." },
        { q: "Can I add AI to my existing website?", a: "Yes. We can add a chatbot, smart search or automations to most existing websites and web apps." },
      ],
    },
    {
      slug: "google-meta-ads",
      icon: "megaphone",
      title: "Google & Meta Ads",
      line: "Ad campaigns on Google, Facebook and Instagram that bring leads, tracked down to the rupee.",
      intro: "Get in front of people who are ready to buy. We plan, run and improve ad campaigns on Google, Facebook and Instagram, and track every lead so you know what your money is doing.",
      includes: [
        "Google Search and Maps ads for people searching for what you sell",
        "Facebook and Instagram ads to reach the right audience",
        "Ad copy and creatives made for your brand",
        "Conversion tracking for calls, WhatsApp chats and forms",
        "Clear reports on spend, leads and cost per lead",
      ],
      goodFor: ["Businesses that want enquiries quickly", "Anyone who has tried ads before without seeing results"],
      seoTitle: "Google Ads & Meta Ads Agency in Gurgaon",
      seoDescription:
        "Google Ads, Facebook and Instagram ads management in Gurgaon. Campaigns, creatives and conversion tracking that show your cost per lead. For businesses across India.",
      faqs: [
        { q: "How much should I spend on ads?", a: "It depends on your business and area. We suggest a starting budget on our free call, then adjust based on what brings leads at the best cost." },
        { q: "Is the ad budget included in your fee?", a: "No. Your ad budget is paid directly to Google or Meta, so you always see exactly what was spent." },
      ],
    },
    {
      slug: "social-media-marketing",
      icon: "heart",
      title: "Social Media Marketing",
      line: "Consistent posts and reels that keep your brand visible on Instagram and Facebook.",
      intro: "Stay visible without spending your evenings making posts. We plan, design and publish content for Instagram and Facebook that fits your brand and keeps customers coming back.",
      includes: [
        "Monthly content plan for Instagram and Facebook",
        "Post and reel designs in your brand style",
        "Captions and hashtags written for you",
        "Scheduled posting so your page stays active",
        "Monthly summary of what worked",
      ],
      goodFor: ["Businesses whose page hasn't been updated in months", "Brands that want to look established online"],
      seoTitle: "Social Media Marketing Agency in Gurgaon",
      seoDescription:
        "Social media marketing in Gurgaon: Instagram and Facebook content plans, post and reel designs, captions and scheduling. Included for 1 month in Business Growth.",
      faqs: [
        { q: "Which platforms do you manage?", a: "We focus on Instagram and Facebook, where most local customers in India spend their time." },
        { q: "Is social media included in any package?", a: "Yes. The Business Growth package includes 1 month of social media. After that you can continue monthly." },
      ],
    },
    {
      slug: "branding-logo-design",
      icon: "pen",
      title: "Branding & Logo Design",
      line: "A logo, colours and brand voice that make your business look established.",
      intro: "People judge a business in seconds. We design a logo, colours and a simple brand style that make you look professional everywhere: on your website, social media, shop and packaging.",
      includes: [
        "Logo design with a few directions to choose from",
        "Brand colours and fonts",
        "Brand voice: how your business sounds in words",
        "Files ready for web, social media and print",
        "Social media profile and cover images",
      ],
      goodFor: ["New businesses that need an identity", "Businesses with a logo that looks dated or homemade"],
      seoTitle: "Logo Design & Branding Agency in Gurgaon",
      seoDescription:
        "Logo design and branding in Gurgaon: logo, colours, fonts and brand voice, with files ready for web, social media and print. For new and growing Indian businesses.",
      faqs: [
        { q: "Will I get the logo files?", a: "Yes. You get your logo in all the formats you need for web, social media and print, and you own them." },
        { q: "Can you refresh my existing logo?", a: "Yes. We can modernise your current logo while keeping what customers already recognise." },
      ],
    },
];

/** Every service page, used by the /services/<slug> route, sitemap and footer. */
export const servicePages = [...offer.items, ...moreServices];

// ── Services grid ───────────────────────────────────────────
// icon keys must match components/Icon.tsx
export const services = {
  label: "Services",
  heading: "Everything we do, *under one roof*.",
  cta: "Learn more", // small link text on each card; clicking a card opens its service page
  ctaMessage: (service: string) => `Hi WeMakeIt, I'm interested in ${service}. Can you share details and pricing?`,
  items: [
    { icon: "globe", slug: "development", title: "Website Development", line: "Fast, mobile-friendly websites that turn visitors into enquiries." },
    { icon: "cart", slug: "e-commerce", title: "E-commerce Stores", line: "Online stores with payments, shipping and easy product management." },
    { icon: "layout", slug: "web-app-development", title: "Web Apps", line: "Custom dashboards, portals and MVPs built to grow with you." },
    { icon: "phone", slug: "mobile-app-development", title: "Mobile Apps", line: "Android and iOS apps, built and published to the stores." },
    { icon: "bot", slug: "ai-chatbots-automation", title: "AI Chatbots & Automation", line: "Answer customers 24/7 and cut repetitive manual work." },
    { icon: "search", slug: "seo", title: "SEO", line: "Show up on Google when people search for what you sell." },
    { icon: "megaphone", slug: "google-meta-ads", title: "Meta & Google Ads", line: "Ad campaigns that bring leads, tracked down to the rupee." },
    { icon: "heart", slug: "social-media-marketing", title: "Social Media Marketing", line: "Consistent posts and reels that keep your brand visible." },
    { icon: "pen", slug: "branding-logo-design", title: "Branding & Logo", line: "A logo, colours and voice that make you look established." },
    { icon: "wrench", slug: "free-support", title: "Maintenance & Support", line: "Updates, backups and fixes so your site never lets you down." },
  ],
};

// ── How it works ────────────────────────────────────────────
export const process = {
  label: "How it works",
  heading: "Four simple steps. *No surprises.*",
  steps: [
    { title: "Free call", line: "We understand your business and goals." },
    { title: "Plan & quote", line: "Clear scope, timeline and fixed price." },
    { title: "Build & launch", line: "You see progress every few days." },
    { title: "Grow", line: "SEO, ads and ongoing improvements." },
  ],
};

// ── Pricing ─────────────────────────────────────────────────
export const pricing = {
  label: "Pricing",
  heading: "Simple, fixed prices. *No hidden charges.*",
  plans: [
    {
      name: "Starter Website",
      price: packagePrices.starter.regular,
      offerPrice: packagePrices.starter.offer as string | undefined, // shown while festiveOffer.enabled
      priceNote: "one-time",
      description: "Everything a small business needs to get online fast.",
      features: [
        "Mobile-friendly design",
        "WhatsApp chat button",
        "Basic SEO setup",
        "Live in 7 days",
      ],
      cta: "Get started",
      ctaMessage: `Hi WeMakeIt, I'm interested in the Starter Website (${festiveOffer.enabled ? `${festiveOffer.name} ` : ""}${STARTER})`,
      popular: false,
    },
    {
      name: "Business Growth",
      price: packagePrices.growth.regular,
      offerPrice: packagePrices.growth.offer as string | undefined,
      priceNote: "one-time",
      description: "Get online and start getting found by customers.",
      features: [
        "Everything in Starter",
        "Google Business profile setup",
        "SEO to rank locally",
        "1 month of social media",
      ],
      cta: "Choose Growth",
      ctaMessage: `Hi WeMakeIt, I'm interested in the Business Growth package (${festiveOffer.enabled ? `${festiveOffer.name} ` : ""}${GROWTH})`,
      popular: true,
    },
    {
      name: "Custom / App / Enterprise",
      price: "Let's talk",
      offerPrice: undefined as string | undefined,
      priceNote: "",
      description: "For products and businesses that need more than a website.",
      features: [
        "Web apps & mobile apps",
        "AI features & automation",
        "Full marketing: SEO, ads and social",
        "Dedicated point of contact",
      ],
      cta: "Book a free call",
      ctaMessage: "Hi WeMakeIt, I want to discuss a custom solution for my business",
      popular: false,
    },
  ],
  popularBadge: "Most popular",
  note: "Need just one small job done?",
  noteCta: "Get a quick quote",
  noteCtaMessage: "Hi WeMakeIt, I need a quote for one small job",
};

// ── Our work ────────────────────────────────────────────────
export const work = {
  label: "Our work",
  heading: "Our *client work*.",
  projects: [
    {
      title: "Dhampur Green",
      type: "E-commerce website",
      description:
        "A Shopify online store for Dhampur Green's organic jaggery, natural syrups, healthy snacks and sweeteners, built for easy shopping on mobile.",
      image: "/work/dhampur-green-logo.png",
      imageFit: "contain", // "contain" shows the whole image (logos); "cover" fills the card (screenshots)
      imageAlt: "Dhampur Green logo",
      url: "https://www.dhampurgreen.com/",
      linkLabel: "Visit website",
    },
    {
      title: "Delight Foods",
      type: "E-commerce website",
      description:
        "A Shopify online store for Delight Foods, selling authentic Indian mithai, snacks, bakery items and groceries with fresh delivery.",
      image: "/work/delight-foods-logo.png",
      imageFit: "contain",
      imageAlt: "Delight Foods logo",
      url: "https://www.delightfoods.com/",
      linkLabel: "Visit website",
    },
  ],
  comingSoonSlots: 1,
  comingSoonLabel: "Coming soon",
  comingSoonLine: "Your business could be next.",
};

// ── Why WeMakeIt ────────────────────────────────────────────
export const why = {
  label: "Why WeMakeIt",
  heading: "Why businesses choose *one team* over five freelancers.",
  points: [
    { title: "One team, one point of contact", line: "One person who knows your business end to end. No more forwarding messages between freelancers." },
    { title: "Fixed prices, no hidden charges", line: "You get a clear quote before we start. The price we agree is the price you pay." },
    { title: "Fast delivery, websites in 7 days", line: "Small business websites go live in a week, with progress updates every few days." },
    { title: "Built by real developers", line: "Full-stack, AI and mobile app experience in-house, so we can build what templates can't." },
  ],
};

// ── Team ────────────────────────────────────────────────────
// Each skill can link to a service page (slug from offer.items / moreServices) or stay plain text.
// Add a photo by putting it in /public/team/ and setting `photo: "/team/name.jpg"`; otherwise initials are shown.
export const team = {
  label: "Our team",
  heading: "The experts behind *your growth*.",
  sub: "A small team that covers everything your business needs online, so you never have to coordinate between freelancers.",
  members: [
    {
      name: "Suraj Rawat",
      shortName: "Suraj", // used on the "Talk to …" button
      whatsapp: "919555219911", // "Talk to Suraj" opens this number; leave out to use the main WHATSAPP_NUMBER
      role: "Senior Software Engineer",
      photo: "",
      bio: "Leads technology for every client: websites, web and mobile apps, AI chatbots and automation, plus graphic design, video and ongoing maintenance.",
      skills: [
        { label: "Websites", slug: "development" },
        { label: "Next.js & React", slug: "development" },
        { label: "UI/UX design", slug: "web-design" },
        { label: "E-commerce stores", slug: "e-commerce" },
        { label: "Razorpay payments", slug: "e-commerce" },
        { label: "Web apps & MVPs", slug: "web-app-development" },
        { label: "Backend & databases", slug: "web-app-development" },
        { label: "APIs & integrations", slug: "web-app-development" },
        { label: "Android & iOS apps", slug: "mobile-app-development" },
        { label: "AI chatbots", slug: "ai-chatbots-automation" },
        { label: "WhatsApp chatbots", slug: "ai-chatbots-automation" },
        { label: "Automation", slug: "ai-chatbots-automation" },
        { label: "Website speed optimisation", slug: "development" },
        { label: "Hosting & domains", slug: "development" },
        { label: "Logo & graphic design", slug: "branding-logo-design" },
        { label: "Social media creatives", slug: "branding-logo-design" },
        { label: "Video production" },
        { label: "Maintenance & bug fixes", slug: "free-support" },
      ],
    },
    {
      name: "Mohammad Danish Ansari",
      shortName: "Danish", // used on the "Talk to …" button
      role: "Web & Growth Marketing",
      photo: "",
      bio: "Builds websites and grows them: runs marketing and ad campaigns and manages social media pages so your brand stays visible.",
      skills: [
        { label: "Websites", slug: "web-design" },
        { label: "Landing pages", slug: "web-design" },
        { label: "SEO", slug: "seo" },
        { label: "Local SEO", slug: "seo" },
        { label: "Keyword research", slug: "seo" },
        { label: "Google Business Profile", slug: "seo" },
        { label: "Google Ads", slug: "google-meta-ads" },
        { label: "Facebook & Instagram ads", slug: "google-meta-ads" },
        { label: "Lead generation", slug: "google-meta-ads" },
        { label: "Campaign tracking & reports", slug: "google-meta-ads" },
        { label: "Social media management", slug: "social-media-marketing" },
        { label: "Content calendars", slug: "social-media-marketing" },
        { label: "Posts & reels", slug: "social-media-marketing" },
        { label: "Captions & content writing", slug: "social-media-marketing" },
        { label: "Instagram growth", slug: "social-media-marketing" },
        { label: "WhatsApp marketing" },
        { label: "Competitor research" },
      ],
    },
    {
      name: "Rizwan Khan",
      shortName: "Rizwan", // used on the "Talk to …" button
      role: "Web & Growth Marketing",
      photo: "",
      bio: "Works on websites and marketing: plans ad campaigns and handles social media so the right customers find you.",
      skills: [
        { label: "Websites", slug: "web-design" },
        { label: "Landing pages", slug: "web-design" },
        { label: "SEO", slug: "seo" },
        { label: "Local SEO", slug: "seo" },
        { label: "Keyword research", slug: "seo" },
        { label: "Google Business Profile", slug: "seo" },
        { label: "Google Ads", slug: "google-meta-ads" },
        { label: "Facebook & Instagram ads", slug: "google-meta-ads" },
        { label: "Lead generation", slug: "google-meta-ads" },
        { label: "Campaign tracking & reports", slug: "google-meta-ads" },
        { label: "Social media management", slug: "social-media-marketing" },
        { label: "Content calendars", slug: "social-media-marketing" },
        { label: "Posts & reels", slug: "social-media-marketing" },
        { label: "Captions & content writing", slug: "social-media-marketing" },
        { label: "Instagram growth", slug: "social-media-marketing" },
        { label: "WhatsApp marketing" },
        { label: "Competitor research" },
      ],
    },
    {
      name: "Vipin Rawat",
      shortName: "Vipin", // used on the "Talk to …" button
      role: "Sales, Video & Support",
      photo: "",
      bio: "Your first point of contact: helps you pick the right package, edits videos for your brand and supports you after launch.",
      skills: [
        { label: "Sales & consultations" },
        { label: "Requirement gathering" },
        { label: "Package guidance" },
        { label: "Quotes & proposals" },
        { label: "Video editing" },
        { label: "Reels & short videos", slug: "social-media-marketing" },
        { label: "YouTube videos" },
        { label: "Ad videos", slug: "google-meta-ads" },
        { label: "Client onboarding" },
        { label: "Progress updates" },
        { label: "WhatsApp support" },
        { label: "After-launch support", slug: "free-support" },
      ],
    },
  ] as { name: string; shortName: string; whatsapp?: string; role: string; photo: string; bio: string; skills: { label: string; slug?: string }[] }[],
};

// ── FAQ ─────────────────────────────────────────────────────
// [REVIEW] Confirm each answer matches your actual policy before going live.
export const faq = {
  label: "FAQ",
  heading: "Questions, *answered*.",
  items: [
    {
      q: "How long does a website take?",
      a: "A small business website goes live in 7 days once we have your content (text, logo and photos). Bigger websites, e-commerce stores and apps get a clear timeline in your quote before we start.",
    },
    {
      q: "Do I own my website?",
      a: "Yes. Once payment is complete, the website, domain and all logins are in your name. You're never locked in with us.",
    },
    {
      q: "Can you improve my existing website?",
      a: "Yes. We start with an audit of speed, design, SEO, conversions and security, then share what to fix and what it will cost. You decide what we work on.",
    },
    {
      q: "Do you offer maintenance?",
      a: "Yes. We offer monthly maintenance plans covering updates, backups, security checks, small changes and bug fixes, plus growth retainers for ongoing SEO and ads.",
    },
    {
      q: "Can I pay in parts?",
      a: "Yes. Most projects are split into milestones: 50% to start and 50% before launch. Larger projects can be broken into more stages.",
    },
    {
      q: "Do you work with businesses outside my city?",
      a: "Yes. We work with businesses across India, fully online over calls, WhatsApp and screen-shares. You don't need to meet us in person to get great work.",
    },
  ],
};

// ── Contact form ────────────────────────────────────────────
export const contact = {
  label: "Contact",
  heading: "Tell us about your *business*.",
  sub: "Fill this in and it opens WhatsApp (or email) with your details ready to send. We usually reply within 2 hours, Monday to Saturday.",
  fields: {
    name: "Your name",
    phone: "Phone number",
    businessType: "Type of business",
    businessTypePlaceholder: "e.g. Clothing store, clinic, café, startup",
    service: "Service needed",
    message: "Message",
    messagePlaceholder: "Tell us a little about what you need",
  },
  serviceOptions: [
    "New website",
    "E-commerce store",
    "Web app / MVP",
    "Mobile app",
    "Improve my existing website or app",
    "AI chatbot / automation",
    "SEO / Ads / Social media",
    "Branding & logo",
    "One-off freelance task",
    "Not sure yet",
  ],
  submitWhatsApp: "Send on WhatsApp",
  submitEmail: "Send by email instead",
  submitEmailOnly: "Send by email",
  sent: "Your message is ready. Just press send in the app that opened.",
  notConfigured: "Online enquiries aren't switched on yet. Please check back soon.",
  emailSubject: "New business enquiry from the WeMakeIt website",
};

// ── Final CTA band ──────────────────────────────────────────
export const finalCta = {
  heading: "Ready to get your business *online*?",
  sub: "Tell us what you need. We'll reply with a plan and a fixed price.",
  whatsapp: "Chat on WhatsApp",
  whatsappFallback: "Email us", // shown when WHATSAPP_NUMBER isn't set yet
  call: "Book a free call",
};

// ── Footer ──────────────────────────────────────────────────
export const footer = {
  quickLinksTitle: "Quick links",
  contactTitle: "Contact",
  followTitle: "Follow us",
  copyright: "© 2026 WeMakeIt. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund & Cancellation", href: "/refund-policy" },
  ],
};
