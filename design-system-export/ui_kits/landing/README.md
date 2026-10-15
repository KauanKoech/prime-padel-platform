# UI kit — Landing page

Mobile-first marketing site for the arena. Open `index.html` (fluid; resize to see 390 → 1440).

**Sections:** sticky header (pill nav on desktop, full-screen green menu on mobile) · hero on green with hairline circles + live "Livres hoje" slot card · Como funciona (3 numbered tint cards) · Quadras (`CourtCard`) · Planos (Avulso / Mensalista / Pacote) · Eventos (real brand posts) · FAQ (`Accordion`) · CTA band · footer.

**Files:** `Header.jsx` (LandingHeader, MobileMenu, Hero), `Sections.jsx` (HowItWorks, Courts, Pricing, Events, Faq, CtaBand, Footer), `landing.css` (layout only — all primitives come from the DS bundle).

**Interactions:** mobile menu, hero slot picking, FAQ open/close; every "Reservar" goes to `../booking/`.

Prices, hours, court names and plan details are **illustrative** — replace with real arena data. Court photos are not provided: `CourtCard` falls back to the green panel + white logo.
