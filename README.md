# WeMakeIt — agency website

Next.js 15 + Tailwind CSS. Single page, static, deploys to Vercel as-is.

## Edit text, prices, contact details
Everything lives in **`content/site.ts`**. Anything in `[BRACKETS]` is a placeholder
(it shows on the site with a dashed highlight until you replace it).

Fill these first: `WHATSAPP_NUMBER` (digits only, e.g. 919876543210), `EMAIL`,
`INSTAGRAM_HANDLE`, `BOOKING_URL`, `SITE_URL`, the Business Growth `price`,
the Scrunch & Create `url` + `image`, FAQ payment terms, contact response time.

Until a contact detail is filled, the site still works: buttons fall back from
WhatsApp → email → the on-page contact form, and unset footer links, the project
link and the floating WhatsApp button are hidden. `npm run build` prints a warning
listing any placeholders still left in `content/site.ts`.

Project screenshot: put it at `public/work/scrunch-and-create.jpg` and set
`image: "/work/scrunch-and-create.jpg"` in `content/site.ts`.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build    # production build (stop `npm run dev` first — they share .next)
    npm run typecheck

## Deploy
Push to GitHub → import the repo on vercel.com → Deploy. No env vars needed.
