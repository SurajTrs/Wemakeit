/**
 * ─────────────────────────────────────────────────────────────
 *  LEGAL PAGES: Privacy Policy, Terms of Service, Refund & Cancellation.
 *  Written to match how this website and WeMakeIt actually work.
 *  Have a lawyer review before relying on them. Update `legalEntity.updated`
 *  in content/site.ts whenever you change anything here.
 *
 *  Format: each section has a heading and a body. In a body, a string is a
 *  paragraph and an array of strings is a bullet list.
 * ─────────────────────────────────────────────────────────────
 */
import { brand, EMAIL, formatPhone, legalEntity, SITE_URL, WHATSAPP_NUMBER } from "./site";

export type LegalSection = { id: string; heading: string; body: (string | string[])[] };
export type LegalDoc = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

const L = legalEntity;
const site = SITE_URL.replace(/^https?:\/\//, "");
const whatsapp = formatPhone(WHATSAPP_NUMBER);
const contactLine = `Email ${EMAIL} or WhatsApp ${whatsapp}.`;

/* ───────────────────────── Privacy Policy ───────────────────────── */
export const privacy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: `How ${brand.name} collects, uses and protects your personal data.`,
  intro: `This policy explains what personal data ${brand.name} collects when you use ${site} or work with us, why we collect it, and the choices you have. ${brand.name} is operated by ${L.name}, ${L.address} ("we", "us"). We follow the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 of India.`,
  sections: [
    {
      id: "summary",
      heading: "The short version",
      body: [
        [
          "This website has no sign-up, no login and no payment forms.",
          "We do not use tracking cookies, advertising pixels or analytics tools on this website.",
          "When you use our contact form, your details go straight to WhatsApp or your email app. Nothing is stored on our website.",
          "We only use your details to reply to you and to deliver work you ask for. We never sell them.",
        ],
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      body: [
        "Details you give us when you contact us through the contact form, WhatsApp, email, phone or Instagram:",
        ["Your name and phone number", "Your email address, if you email us", "Your type of business and the service you need", "Anything you write in your message"],
        "Details you give us when you become a client:",
        [
          "Billing details such as your business name, address and GST number",
          "Content for your project such as text, logos, photos and product details",
          "Access to accounts we need to do the work, such as your domain, hosting, Google Business Profile or social media",
        ],
        "Technical data collected automatically: our hosting provider keeps standard server logs (IP address, browser type, pages requested and time) to run the website and keep it secure.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use your data",
      body: [
        [
          "To reply to your enquiry and send you a quote",
          "To plan, build, launch and support the work you hire us for",
          "To send invoices and keep accounting and tax records",
          "To keep the website secure and working properly",
          "To meet legal obligations",
        ],
        "We process your data based on your consent (when you contact us), to perform our agreement with you (when you are a client), and where the law requires it. We do not send marketing messages unless you ask us to.",
      ],
    },
    {
      id: "contact-form",
      heading: "The contact form, WhatsApp and email",
      body: [
        "Our contact form does not send your details to our servers. When you press send, it opens WhatsApp or your email app with your message filled in, and you choose whether to send it. Once sent, your message is handled by WhatsApp (Meta) or your email provider under their own privacy policies.",
        "If you message us on WhatsApp, we may add you to a project WhatsApp group with our team once you become a client.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and local storage",
      body: [
        "This website does not set tracking or advertising cookies, and does not use analytics.",
        "It saves one small preference in your browser's local storage: whether you chose light or dark mode. This stays on your device, is never sent to us, and you can clear it at any time in your browser settings.",
        "If we add analytics or other tools in the future, we will update this policy first and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share data with",
      body: [
        "We only share your data when it is needed to do the work or required by law:",
        [
          "Service providers we use to run our business, such as website hosting, email, WhatsApp, cloud storage and accounting tools",
          "Platforms you ask us to set up for you, such as domain registrars, hosting, payment gateways (for example Razorpay), Google and Meta",
          "Government authorities, courts or regulators when the law requires it",
        ],
        "We never sell or rent your personal data. Some providers may store data outside India; we only use reputable providers with appropriate safeguards.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      body: [
        [
          "Enquiries that don't become projects: up to 12 months, then deleted",
          "Client project files and messages: for as long as we work together and up to 3 years after, so we can support you",
          "Invoices and financial records: for as long as Indian tax law requires (currently up to 8 years)",
          "Account logins you shared with us: removed or handed back when the project or support period ends. We recommend you change passwords after handover.",
        ],
      ],
    },
    {
      id: "security",
      heading: "How we protect your data",
      body: [
        "We use reasonable security measures: HTTPS on this website, access limited to the people working on your project, and secure storage for files and logins. No method of storage or transfer online is 100% secure, so we cannot guarantee absolute security, but we will tell you without undue delay if a breach affects your data, as the law requires.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      body: [
        "Under the Digital Personal Data Protection Act, 2023 you can:",
        [
          "Ask what personal data we hold about you and how we use it",
          "Ask us to correct or update it",
          "Ask us to delete it, unless we must keep it by law",
          "Withdraw your consent at any time (this does not affect anything done before you withdrew it)",
          "Nominate someone to exercise these rights for you in case of death or incapacity",
          "Raise a complaint with us, and then with the Data Protection Board of India if you are not satisfied",
        ],
        `To use any of these rights, ${contactLine} We reply within 30 days.`,
      ],
    },
    {
      id: "children",
      heading: "Children",
      body: ["Our services are for businesses and adults. We do not knowingly collect data from anyone under 18. If you believe a child has sent us their details, contact us and we will delete them."],
    },
    {
      id: "grievance",
      heading: "Grievance Officer",
      body: [
        "If you have a concern about how we handle your personal data, contact our Grievance Officer:",
        [`Name: ${L.grievanceOfficer}`, `Email: ${EMAIL}`, `WhatsApp: ${whatsapp}`, `Address: ${L.address}`],
        "We acknowledge complaints within 48 hours and aim to resolve them within 30 days.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: ["We may update this policy from time to time. The latest version is always on this page with its last updated date. If a change is significant, we will tell our current clients directly."],
    },
  ],
};

/* ───────────────────────── Terms of Service ───────────────────────── */
export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  description: `The terms that apply when you use ${site} or hire ${brand.name}.`,
  intro: `These terms apply when you use ${site} and when you hire ${brand.name}, operated by ${L.name}, ${L.address} ("we", "us"), for any service. By using the website or accepting a quote from us, you ("you", "the client") agree to these terms. If a signed proposal or quote says something different, the quote wins for that project.`,
  sections: [
    {
      id: "services",
      heading: "1. Our services",
      body: [
        "We provide website design and development, e-commerce stores, web and mobile apps, AI chatbots and automation, SEO, Meta and Google ads, social media marketing, branding, maintenance and related freelance work.",
        "Descriptions on this website are a general overview. The exact work, deliverables, timeline and price for your project are set out in the written quote we send you (by WhatsApp, email or document). Anything not listed in the quote is not included.",
      ],
    },
    {
      id: "quotes",
      heading: "2. Quotes and starting work",
      body: [
        "Quotes are valid for 30 days unless they say otherwise. A project starts once you accept the quote in writing (a WhatsApp or email reply is enough) and pay the first milestone.",
        "Changes or additions after the quote is accepted may change the price and timeline. We will always confirm any extra cost with you before doing the work.",
      ],
    },
    {
      id: "payments",
      heading: "3. Prices and payment",
      body: [
        "Prices on this website are starting prices and may change. The price in your accepted quote is fixed for the agreed scope.",
        "Projects are paid in milestones as stated in your quote. Unless your quote says otherwise, the default is 50% to start and 50% before launch.",
        [
          "Invoices are due within 7 days unless your quote says otherwise.",
          "Prices are in Indian Rupees (₹). GST is added where applicable.",
          "We may pause work if a payment is more than 7 days late, and we launch the final website or app only after full payment.",
        ],
      ],
    },
    {
      id: "third-party-costs",
      heading: "4. Third-party costs",
      body: [
        "Unless your quote clearly includes them, these are paid by you directly and are not part of our fee:",
        [
          "Domain name, hosting, email and server costs",
          "Paid themes, plugins, apps, fonts, stock photos and software subscriptions",
          "Payment gateway fees (for example Razorpay), SMS and WhatsApp Business API charges",
          "Advertising spend on Meta, Google or other platforms",
          "App store developer account fees (Google Play and Apple)",
        ],
        "Wherever possible these accounts are created in your name so you stay in control.",
      ],
    },
    {
      id: "client-responsibilities",
      heading: "5. Your responsibilities",
      body: [
        [
          "Provide content (text, logo, photos, product details) and any logins we need, on time",
          "Give clear feedback and approvals within the agreed time, usually 3 working days",
          "Make sure you own or have permission to use all content you give us, and that it is legal",
          "Check the work before launch and tell us about any issues",
        ],
        "Our timelines, including \"live in 7 days\", start once we have everything we need from you. Delays in content, feedback or payment move the timeline by the same amount. If a project is paused by you for more than 30 days, we may treat it as cancelled under our Refund & Cancellation Policy.",
      ],
    },
    {
      id: "revisions",
      heading: "6. Revisions and approvals",
      body: [
        "Each quote includes a set number of feedback rounds. Extra rounds or new requirements after approval are charged separately, at a price we agree with you first. Your approval of a design or stage means we can move to the next stage.",
      ],
    },
    {
      id: "ownership",
      heading: "7. Ownership",
      body: [
        "Once you have paid in full, you own the final website, app, design files and content we create specifically for you, and the domain and accounts are in your name. You are never locked in with us.",
        [
          "Until full payment, all work remains our property and we may withhold handover.",
          "Third-party items (themes, plugins, fonts, stock images, open-source code) stay under their own licences, which we pass on to you where allowed.",
          "Our general know-how, tools, code libraries and templates that are not specific to you remain ours, and you get a permanent licence to use them as part of your project.",
        ],
      ],
    },
    {
      id: "portfolio",
      heading: "8. Portfolio",
      body: ["We may show the work we did for you (screenshots, a short description and a link) in our portfolio and on social media. If you would rather we didn't, tell us in writing and we won't. We never share confidential information."],
    },
    {
      id: "support",
      heading: "9. Support and maintenance",
      body: [
        "Website projects include up to 3 months of free support after launch, unless your quote says otherwise. This covers fixing bugs in our work and small content updates (text, images, prices, contact details).",
        "It does not cover new features or pages, redesigns, problems caused by changes made by you or other people, third-party plugin or platform changes, or hosting outages. These are quoted separately or covered by a monthly maintenance plan.",
      ],
    },
    {
      id: "results",
      heading: "10. No guarantee of results",
      body: [
        "We work hard to help your business grow, but we cannot guarantee specific results such as Google rankings, website traffic, number of leads, sales, ad performance or social media followers. These depend on many things outside our control, including search engine and platform algorithms, competition, your market and your budget. Any figures we share are estimates, not promises.",
      ],
    },
    {
      id: "third-party-platforms",
      heading: "11. Third-party platforms",
      body: ["We build on and connect to third-party platforms such as hosting providers, Razorpay, Google, Meta, WhatsApp and app stores. We are not responsible for their outages, policy changes, account suspensions, ad rejections or app store review decisions, though we will help you resolve them."],
    },
    {
      id: "confidentiality",
      heading: "12. Confidentiality",
      body: ["We keep your business information, files and logins confidential and only use them to do your work. We expect you to keep our quotes and internal methods confidential too. This does not apply to information that is already public or that the law requires us to share."],
    },
    {
      id: "liability",
      heading: "13. Limitation of liability",
      body: [
        "To the extent the law allows, our total liability for any claim related to a project is limited to the amount you paid us for that project. We are not liable for indirect or consequential losses such as lost profits, lost revenue, lost data or business interruption.",
        "You are responsible for keeping your own backups of important data, and for the content and legality of your website, products and ads.",
      ],
    },
    {
      id: "indemnity",
      heading: "14. Indemnity",
      body: ["You agree to cover any claims, losses or costs we face because of content or materials you provided, or because of how you use the work we deliver, including any claim that your content infringes someone else's rights."],
    },
    {
      id: "termination",
      heading: "15. Ending a project",
      body: [
        "Either side can end a project by giving written notice. You pay for all work done up to that point, as set out in our Refund & Cancellation Policy. We may end a project immediately if payments are not made, if we are asked to do something illegal or unethical, or in case of abusive behaviour towards our team.",
      ],
    },
    {
      id: "website-use",
      heading: "16. Using this website",
      body: [
        "The content of this website (text, design, logo and graphics) belongs to us. You may not copy it for commercial use without our permission. Information on this website is for general guidance and may change without notice.",
        "Links to other websites are provided for convenience. We are not responsible for their content or privacy practices.",
      ],
    },
    {
      id: "force-majeure",
      heading: "17. Events outside our control",
      body: ["Neither side is responsible for delays caused by events beyond reasonable control, such as natural disasters, illness, internet or power outages, platform failures or government action. We will keep you informed and resume as soon as possible."],
    },
    {
      id: "law",
      heading: "18. Governing law and disputes",
      body: [`These terms are governed by the laws of India. We will always try to resolve any disagreement by talking first. If that doesn't work, the courts of ${L.city}, India will have exclusive jurisdiction.`],
    },
    {
      id: "changes",
      heading: "19. Changes to these terms",
      body: ["We may update these terms from time to time. The version that applies to your project is the one in effect when you accepted your quote. The latest version is always on this page."],
    },
    {
      id: "contact",
      heading: "20. Contact",
      body: [`Questions about these terms? ${contactLine} Postal address: ${L.name}, ${L.address}.`],
    },
  ],
};

/* ───────────────────────── Refund & Cancellation ───────────────────────── */
export const refund: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  description: `When and how ${brand.name} projects can be cancelled and refunded.`,
  intro: `We want every client to be happy with their decision. This policy explains what happens if you cancel a project with ${brand.name}, operated by ${L.name}. It works together with our Terms of Service. If your written quote says something different, the quote applies.`,
  sections: [
    {
      id: "before-start",
      heading: "Cancelling before work starts",
      body: ["If you cancel after paying the first milestone but before we have started any work, we refund the full amount you paid."],
    },
    {
      id: "after-start",
      heading: "Cancelling after work has started",
      body: [
        "Because our work is custom-made for you and our time is reserved for your project, payments for work already done are not refundable.",
        [
          "Milestone payments cover the stage they are for. Once a stage has started, its payment is non-refundable.",
          "If you have paid for a stage we have not started yet, we refund that amount.",
          "If the work done is worth more than what you have paid, you pay the difference based on the work completed.",
          "On cancellation, we hand over everything you have paid for in its current state.",
        ],
      ],
    },
    {
      id: "not-refundable",
      heading: "What is not refundable",
      body: [
        [
          "Third-party costs paid on your behalf, such as domains, hosting, themes, plugins, stock images and app store fees",
          "Advertising spend already paid to Meta, Google or other platforms",
          "Monthly plans (maintenance, SEO, ads management, social media) for the current month once it has started",
          "Work that has been approved by you or has gone live",
        ],
      ],
    },
    {
      id: "monthly",
      heading: "Monthly plans",
      body: ["Monthly plans such as maintenance, SEO, ads management and social media can be cancelled at any time with notice before your next billing date. The current month is not refunded, and the plan stays active until the end of the paid month."],
    },
    {
      id: "our-side",
      heading: "If we cannot deliver",
      body: ["If we have to cancel a project for reasons on our side, or we cannot deliver what was agreed in your quote, we refund payments for any work that has not been delivered."],
    },
    {
      id: "inactive",
      heading: "Paused projects",
      body: ["If we are waiting on content, feedback or payment from you for more than 30 days, we may treat the project as cancelled under this policy. We will always remind you before doing so, and we can restart it later at a new agreed timeline."],
    },
    {
      id: "how",
      heading: "How to cancel or request a refund",
      body: [
        `Send your request in writing. ${contactLine} Include your name and project name.`,
        "We confirm your request within 2 working days. Approved refunds are paid to your original payment method (or by bank transfer) within 7 to 10 working days.",
      ],
    },
  ],
};

export const legalDocs = [privacy, terms, refund];
