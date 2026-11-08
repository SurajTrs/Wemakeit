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
export const EMAIL = "[EMAIL]";
export const INSTAGRAM_HANDLE = "wemakeit._"; // without the "@"
export const BOOKING_URL = "[BOOKING LINK]"; // e.g. a Calendly / Google Calendar link
export const SITE_URL = "https://wemakeit.in"; // [CONFIRM DOMAIN] — used for SEO / Open Graph

// ── Legal details (used on the Privacy, Terms and Refund pages) ──
// Fill these before going live. If you're a sole proprietor, the legal name is
// usually your own name, e.g. "Suraj Rawat (trading as WeMakeIt)".
export const legalEntity = {
  name: "WeMakeIt",
  address: "Sector 24, Gurgaon, Haryana, India",
  city: "Gurugram, Haryana", // courts of this city have jurisdiction over disputes
  grievanceOfficer: "[GRIEVANCE OFFICER NAME]", // the person who handles privacy complaints (can be you)
  updated: "8 November 2026", // change this whenever you edit a policy
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi WeMakeIt, I want to discuss a project";

// ── Link helpers ────────────────────────────────────────────
// These keep every button working even while a detail above is still a
// [PLACEHOLDER]: WhatsApp falls back to email, then to the contact form.
export const isPlaceholder = (v: string) => !v.trim() || /\[[^\]]*\]/.test(v);

export const hasWhatsApp = !isPlaceholder(WHATSAPP_NUMBER) && /^\d{8,15}$/.test(WHATSAPP_NUMBER);
export const hasEmail = !isPlaceholder(EMAIL) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL);
export const hasInstagram = !isPlaceholder(INSTAGRAM_HANDLE);
export const hasBooking = !isPlaceholder(BOOKING_URL) && /^https?:\/\//.test(BOOKING_URL);

export const mailtoLink = (body?: string, subject = "Project enquiry | WeMakeIt") =>
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
  { name: "Instagram", icon: "instagram", url: hasInstagram ? instagramLink : "[INSTAGRAM URL]" },
  { name: "Facebook", icon: "facebook", url: "[FACEBOOK PAGE URL]" }, // e.g. https://facebook.com/wemakeit
  { name: "LinkedIn", icon: "linkedin", url: "[LINKEDIN PAGE URL]" }, // e.g. https://linkedin.com/company/wemakeit
  { name: "X", icon: "x", url: "[X PROFILE URL]" }, // e.g. https://x.com/wemakeit
  { name: "YouTube", icon: "youtube", url: "[YOUTUBE CHANNEL URL]" }, // e.g. https://youtube.com/@wemakeit
];
export const liveSocials = socials.filter((s) => !isPlaceholder(s.url) && /^https?:\/\//.test(s.url));

// ── SEO ─────────────────────────────────────────────────────
export const seo = {
  title: "WeMakeIt | Websites, Apps & Marketing for Indian Businesses",
  description:
    "One team to build, launch and grow your business online. Websites live in 7 days. Web apps, mobile apps, SEO, ads and social media under one roof.",
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
  eyebrow: "Full-service digital agency · India",
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
  // Product-style "project window" under the hero (decorative; keep claims true).
  // icon keys must match components/Icon.tsx
  preview: {
    title: "Your project",
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
      role: "Your project lead",
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
      title: "Freelance & project work",
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
    },
  ],
};

// ── Services grid ───────────────────────────────────────────
// icon keys must match components/Icon.tsx
export const services = {
  label: "Services",
  heading: "Everything we do, *under one roof*.",
  cta: "Enquire", // small link text on each card; clicking a card opens WhatsApp
  ctaMessage: (service: string) => `Hi WeMakeIt, I'm interested in ${service}. Can you share details and pricing?`,
  items: [
    { icon: "globe", title: "Website Development", line: "Fast, mobile-friendly websites that turn visitors into enquiries." },
    { icon: "cart", title: "E-commerce Stores", line: "Online stores with payments, shipping and easy product management." },
    { icon: "layout", title: "Web Apps", line: "Custom dashboards, portals and MVPs built to grow with you." },
    { icon: "phone", title: "Mobile Apps", line: "Android and iOS apps, built and published to the stores." },
    { icon: "bot", title: "AI Chatbots & Automation", line: "Answer customers 24/7 and cut repetitive manual work." },
    { icon: "search", title: "SEO", line: "Show up on Google when people search for what you sell." },
    { icon: "megaphone", title: "Meta & Google Ads", line: "Ad campaigns that bring leads, tracked down to the rupee." },
    { icon: "heart", title: "Social Media Marketing", line: "Consistent posts and reels that keep your brand visible." },
    { icon: "pen", title: "Branding & Logo", line: "A logo, colours and voice that make you look established." },
    { icon: "wrench", title: "Maintenance & Support", line: "Updates, backups and fixes so your site never lets you down." },
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
      price: "₹4,999",
      priceNote: "one-time",
      description: "Everything a small business needs to get online fast.",
      features: [
        "Mobile-friendly design",
        "WhatsApp chat button",
        "Basic SEO setup",
        "Live in 7 days",
      ],
      cta: "Get started",
      ctaMessage: "Hi WeMakeIt, I'm interested in the Starter Website (₹4,999)",
      popular: false,
    },
    {
      name: "Business Growth",
      price: "₹7,999",
      priceNote: "one-time",
      description: "Get online and start getting found by customers.",
      features: [
        "Everything in Starter",
        "Google Business profile setup",
        "SEO to rank locally",
        "1 month of social media",
      ],
      cta: "Choose Growth",
      ctaMessage: "Hi WeMakeIt, I'm interested in the Business Growth package (₹7,999)",
      popular: true,
    },
    {
      name: "Custom / App / Enterprise",
      price: "Let's talk",
      priceNote: "",
      description: "For products and businesses that need more than a website.",
      features: [
        "Web apps & mobile apps",
        "AI features & automation",
        "Full marketing: SEO, ads and social",
        "Dedicated point of contact",
      ],
      cta: "Book a free call",
      ctaMessage: "Hi WeMakeIt, I want to discuss a custom project",
      popular: false,
    },
  ],
  popularBadge: "Most popular",
  note: "Need just one task done?",
  noteCta: "Ask for a freelance quote",
  noteCtaMessage: "Hi WeMakeIt, I need a freelance quote for a task",
};

// ── Our work ────────────────────────────────────────────────
export const work = {
  label: "Our work",
  heading: "Recent *projects*.",
  projects: [
    {
      title: "Scrunch & Create",
      type: "E-commerce website",
      description:
        "An online store for Scrunch & Create with product catalogue, cart and checkout, designed to work smoothly on mobile.",
      // Put a screenshot at /public/work/scrunch-and-create.jpg and set the path below.
      image: "", // e.g. "/work/scrunch-and-create.jpg"
      imageAlt: "Screenshot of the Scrunch & Create e-commerce website",
      // Live production showcase link for visitors to view the real store
      url: "https://scrunchcreate.com/",
      linkLabel: "View project",
    },
  ],
  comingSoonSlots: 2,
  comingSoonLabel: "Coming soon",
  comingSoonLine: "Your project could be here.",
};

// ── Why WeMakeIt ────────────────────────────────────────────
export const why = {
  label: "Why WeMakeIt",
  heading: "Why businesses choose *one team* over five freelancers.",
  points: [
    { title: "One team, one point of contact", line: "One person who knows your project end to end. No more forwarding messages between freelancers." },
    { title: "Fixed prices, no hidden charges", line: "You get a clear quote before we start. The price we agree is the price you pay." },
    { title: "Fast delivery, websites in 7 days", line: "Small business websites go live in a week, with progress updates every few days." },
    { title: "Built by real developers", line: "Full-stack, AI and mobile app experience in-house, so we can build what templates can't." },
  ],
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
      a: "Yes. Once the project is paid in full, the website, domain and all logins are in your name. You're never locked in with us.",
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
      a: "Yes. Most projects are split into milestones: [PAYMENT TERMS, e.g. 50% to start, 50% before launch]. Larger projects can be broken into more stages.",
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
  heading: "Tell us about your *project*.",
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
  emailSubject: "New project enquiry from the WeMakeIt website",
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
