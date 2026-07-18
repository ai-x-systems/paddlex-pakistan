# PaddleX Pakistan — Landing Page Demo

A premium, fully-interactive sales-presentation landing page for PaddleX Pakistan (Karachi).
**Frontend only** — no backend, no database, no auth, no payments. Every interaction (booking
slots, coaching tabs, FAQ, AI chat, toasts) runs on mock data in the browser.

Built with the stack requested for the demo:

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `app/globals.css`)
- **shadcn/ui**-style components (`components/ui/*` — Button, Accordion, Tabs)
- **Framer Motion** for scroll reveals, the hero's animated X-blade mark, and the AI chat mock
- **Lucide React** for icons
- **next/font** (Geist + Geist Mono) for typography
- **Unsplash** placeholder photography (with an automatic gradient fallback if an image 404s —
  see `components/photo-tile.tsx`) — swap these for the client's real photos any time
- Ready for **GitHub** + **Vercel Hobby** deployment

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build (used by Vercel)
npm run start   # serve the production build locally
```

## Deploy to Vercel (free, ~5 minutes)

This sandbox can't push to your GitHub or create a Vercel deployment directly — those steps
need your accounts/credentials. Here's the fastest path:

### 1. Push this project to GitHub
```bash
cd paddlex-nextjs
git init
git add .
git commit -m "PaddleX Pakistan — landing page demo"
git branch -M main
git remote add origin https://github.com/<your-username>/paddlex-pakistan.git
git push -u origin main
```
(Create the empty repo first at github.com/new — don't initialize it with a README.)

### 2. Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Select the `paddlex-pakistan` repo → **Import**.
3. Framework preset auto-detects as **Next.js** — leave all defaults as-is.
4. Click **Deploy**.

In under a minute you'll get a live URL like `paddlex-pakistan.vercel.app` — share that link
directly with the client. Every future `git push` to `main` auto-deploys a new version.

### Optional: deploy without GitHub (Vercel CLI)
```bash
npm i -g vercel
cd paddlex-nextjs
vercel        # preview deployment
vercel --prod # production deployment
```

## Project structure

```
app/                  Routes: layout, page, globals.css, sitemap.ts, robots.ts
components/           One file per landing-page section
components/ui/        shadcn-style primitives (Button, Accordion, Tabs)
lib/utils.ts          cn() class-merge helper
public/logo.png       Client-provided logo asset
```

## Before this goes to the client

- Swap Unsplash URLs in `facilities.tsx` and `gallery.tsx` for real PaddleX photography
- Update phone number, email, and WhatsApp link in `footer.tsx`
- Confirm membership/coaching pricing against final client-approved numbers (currently placeholder
  PKR figures pulled from the product spec)

## Note on next/font

`next/font/google` fetches Geist at **build time** from Google's font CDN. Vercel's build
servers have full internet access, so this resolves automatically on deploy — no action needed.
