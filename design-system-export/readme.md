# Prime Padel — Design System

Design system for **Prime Padel**, a padel arena. It covers three surfaces:

1. **Landing page** (mobile-first marketing site) — present the arena, courts, prices, events; drive to booking.
2. **Booking journey** (mobile-first) — pick day → court → time → details → pay (Pix/cartão) → confirmation.
3. **Arena admin panel** (desktop-optimised, fully functional on phones) — daily agenda by court, bookings, customers, occupancy and revenue.

The visual language aims for **sophistication, sport, trust and warmth**: deep forest green, white, warm neutrals, a refined serif, and a clean modern sans.

---

## Sources

Provided by the client (copied into `assets/brand/`):

| File | What it is |
|---|---|
| `PrimePadelLogo.jpg` (150×150) | **Primary brand reference.** White script “Prime” + serif caps “PADEL” on forest green. |
| `OpenPrimePadel.jpg` | Instagram post, 1º Open Prime Padel — “ATLETAS CONFIRMADOS / CATEGORIA OPEN MASCULINA”, hairline circle, racket mark, long thin arrow, subtle paper grain. |
| `PrimeCUPLogo.jpg` | Prime Cup tournament mark (“PRIMAVERA 2026” pill) over a blurred photo. |
| `PrimePadelPadrao.jpg` | “Feriado com: DAY USE” post — green panel over photo, hairline grid boxes, sans body with **bold** key data. |

**UI structure references** `uploads/01.png … 22.png` — a third-party case study (task/rewards platform). Used **only** for structure: pill nav, eyebrow tags above headings, two-tone headlines, rounded tinted cards, numbered step cards, stats band, 3-tier pricing, testimonials, FAQ accordion, CTA band, footer, 12-col grid (24 gutter / 240 margin @1920), type hierarchy 84/56/34/22/18/15/13. **None of its colours, logo, copy or identity are used.**

No codebase, Figma file or official font files were provided.

---

## Index

| Path | Contents |
|---|---|
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (space, layout, radii, shadows, motion), `base.css` (element resets, link colours). |
| `components/pp-components.css` | Class-based styles (`.pp-*`) for every component — hover/focus/active states live here. |
| `components/<group>/` | React primitives: `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, one `*.card.html` per group. |
| `ui_kits/landing/` | Landing page recreation (mobile-first, responsive). |
| `ui_kits/booking/` | Click-through booking journey (mobile). |
| `ui_kits/admin/` | Admin panel: dashboard, agenda, bookings, customers (desktop + mobile). |
| `guidelines/` | Foundation specimen cards (colours, type, spacing, brand). |
| `assets/logo/` | Transparent PNG logos extracted from the JPGs: `prime-padel-{white,green,ink}.png`, `open-prime-padel-{white,green}.png`. |
| `assets/brand/` | Original brand files (logo JPG, posts, Prime Cup mark). |
| `fonts/` | Self-hosted woff2 (Google Fonts substitutes — see Fonts). |
| `SKILL.md` | Agent-skill manifest. |

### Components

Namespace: `window.PrimePadelDesignSystem_093c26`

- **actions/** — `Button`, `IconButton`
- **forms/** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `SegmentedControl`
- **display/** — `Badge`, `Chip`, `Eyebrow`, `Card`, `Avatar`, `StatCard`, `Table`
- **booking/** — `DateStrip`, `TimeSlot`, `CourtCard`
- **navigation/** — `Tabs`, `Accordion`, `ProgressSteps`
- **feedback/** — `Dialog` (center / mobile sheet / desktop drawer), `Toast`, `Tooltip`
- **brand/** — `Logo`, `Icon`

No source component library existed, so this is an authored standard set sized to the three surfaces.
**Intentional additions** beyond a generic set: `DateStrip`, `TimeSlot`, `CourtCard` (core of booking), `StatCard` + `Table` (admin), `Eyebrow` (section label pattern from the references), `ProgressSteps` (booking flow), `Icon` (Lucide wrapper — the system's only icon source), `Logo` (raster wordmark helper).

Every page using components must load, in order: `styles.css`, Lucide UMD (`https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js`), React 18, then `_ds_bundle.js`.

---

## CONTENT FUNDAMENTALS

**Language:** Brazilian Portuguese (pt-BR). Currency `R$ 180` (space after R$ in UI; posters write `R$50`). Times in 24h: `19:00`, ranges `das 14h às 23h`. Dates: `Qui, 15 out` in UI; `05 DE SETEMBRO` in tracked caps on posters.

**Voice:** a host, not a salesman. Warm, confident, concise — the tone of a well-run club welcoming you in. Information first (what, when, how much), adjectives second and sparingly chosen (“artesanais”, “de longa fermentação” — specific, never hype).

**Person:** address the player as **você**, mostly implicitly through imperatives: “Reserve sua quadra”, “Escolha o horário”, “Pague por Pix”. The arena speaks as **a gente / nós** only when needed (“A gente te avisa no WhatsApp”). Avoid “usuário”, “cliente” in player-facing copy (admin may say “cliente”).

**Casing:**
- Headlines: sentence case in serif — “Sua quadra, seu tempo.”
- Event/poster titles: ALL CAPS serif — “ATLETAS CONFIRMADOS”, “DAY USE”.
- Overlines/eyebrows/dates/categories: ALL CAPS sans, tracked +0.14–0.16em — “CATEGORIA OPEN MASCULINA”, “PRIMAVERA 2026”.
- Buttons: sentence case, verb first — “Reservar quadra”, “Ver horários”, “Confirmar e pagar”.

**Emphasis:** **bold the decision data** inside sentences (time, price, court): “Quadras em sistema rotativo das **14h às 23h**”, “Valor por pessoa **R$50**”. Italic serif for the one accent phrase in a headline.

**Emoji:** never. **Exclamation marks:** rare — reserved for confirmations (“Reserva confirmada!”). No ALL-CAPS shouting in body copy.

**Microcopy examples**
- Empty slot grid: “Nenhum horário livre neste dia. Que tal amanhã?”
- Policy: “Cancelamento grátis até 24h antes.”
- Confirmation: “Tudo certo! Enviamos os detalhes para o seu WhatsApp.”
- Admin: “31 de 40 horários ocupados hoje”, “Bloquear horário”, “Marcar check-in”.
- Errors: plain and helpful — “Pagamento não aprovado. Tente outro cartão ou use Pix.”

---

## VISUAL FOUNDATIONS

**Colour.** Forest green `#324D3E` (`--pp-green-700`, sampled from the logo/posts) is the brand: hero panels, primary buttons, selected states, footer. White and **warm neutrals** (stone greys, cream `#F7F5EF`) carry the rest. Text is a green-tinted ink `#141A16`. The **padel-ball yellow** `#D8EC4C` (from the posts' photography) is an accent in tiny doses only — a dot on peak slots, “ao vivo”, a progress fill on green — at most one use per view. Semantic success/warning/danger/info are muted and distinct from brand green. Booking states have their own tokens (`--status-*`).

**Type.** Three voices:
- *DM Serif Display* — headlines, prices, KPI numerals, court names. Sentence case in UI; caps for event titles. One phrase may switch to italic, coloured `--pp-green-600`.
- *Instrument Sans* — everything functional: body, labels, buttons, tables, data (tabular numerals for times/prices).
- *Pinyon Script* — echoes the “Prime” wordmark; one word, ≥ 40px, brand moments only.
Scale (desktop → mobile, fluid): 84/56/34/22 headings → 44/34/26/19; body 18/16/15; labels 14/13; overline 12 tracked +0.16em.

**Spacing & layout.** 4px base. 12-col grid, 24 gutter, container 1440 max with `clamp(20px,5vw,64px)` side padding; sections breathe with `clamp(64px,8vw,128px)` vertical rhythm (“calm density” — one idea per section). Mobile: single column, 20px margins, sticky bottom CTA in booking; admin sidebar becomes a bottom tab bar under 900px.

**Backgrounds.** Mostly flat: white page, cream bands for warmth, solid green blocks for hero/CTA/footer. Green blocks may carry the posters' **hairline motifs**: a large 1px white circle, square hairline boxes, a long thin arrow. No gradients beyond a very subtle green→deeper-green on large panels; never colourful gradients. Imagery: real arena/play photography (user-supplied; slots use the green panel + white logo until photos exist).

**Imagery vibe.** Close, tactile sport moments (hands, balls, racket, court lines), dark warm surroundings, natural light; slightly desaturated so the fluorescent ball pops. No stock “smiling at laptop” imagery.

**Corners.** xs 6 (badges) · sm 10 · md 14 (inputs, slots, accordion) · lg 20 (cards) · xl 28 (hero panels, dialogs) · pill (buttons, chips, eyebrows, nav). Hairline “poster” boxes are the exception: square corners.

**Borders.** 1px `--border-default` (#E2E4DF) is the default card treatment; strong (#CDD0CB) for inputs; on green, `rgba(255,255,255,.32)` hairlines.

**Cards.** White, 1px hairline border, 20px radius, 24px padding, **no shadow at rest**. Variants: tint (green-50, no border), warm (cream), brand (solid green, white text), elevated (shadow-md, used for floating info), hairline (square, white 1px on green).

**Shadows.** Soft and green-tinted (`--shadow-xs…lg`). Borders carry structure; shadows only signal lift — hover on interactive cards (shadow-md + translateY(-2px)), menus, dialogs, toasts.

**Transparency & blur.** Overlay scrim `rgba(18,29,23,.48)` behind dialogs. Sticky headers may use white at 88% + `backdrop-filter: blur(12px)`. No glassmorphism elsewhere.

**Hover.** Primary: darken one step (700→800). Secondary/outline: border strengthens + faint neutral fill. Ghost/tint: green-50/100 fill. Cards: lift. Links: underline stays, colour deepens to green-900.

**Press.** `transform: scale(.98)` on buttons, slots and chips (120ms), plus the next-darker fill (900).

**Focus.** 3px green ring `rgba(50,77,62,.28)`; inputs also switch border to green-700.

**Motion.** Quiet and quick: `cubic-bezier(.2,.8,.2,1)`, 120/200/320ms. Fades + 8–12px rises for dialogs/toasts, sheet slide-up on mobile, drawer slide-in on desktop. No bounces, no parallax, no looping animation.

**Fixed elements.** Landing: sticky top header (64px mobile / 72px desktop). Booking: sticky step header + sticky bottom summary bar with the primary CTA. Admin: fixed sidebar (248px) on desktop, bottom nav (68px) on mobile.

**Density.** Landing/booking airy; admin denser (14px table text, 40px controls) but never below 44px tap targets on mobile.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) outline icons, 24-grid, **1.75 stroke**, round caps/joins — matches the thin hairline language of the posters. Loaded from CDN (`lucide@0.460.0` UMD) and rendered with the `Icon` component (`<Icon name="calendar-days" size={20}/>`).
- **Substitution flag:** the brand provided no icon set. The posters use a few filled pictograms (racket, beer mug); Lucide is the closest clean, CDN-available match for UI. If Prime Padel has its own pictograms, supply SVGs and they'll replace these.
- **Sizes:** 16 (inline/meta), 18 (buttons, inputs), 20 (default), 24 (feature tiles). Colour inherits `currentColor` — ink, secondary or brand green; white on green.
- **Containers:** feature icons sit in a 40–48px circle (green-50 bg, green-700 icon) or white-on-green hairline circle.
- **Common glyphs:** `calendar-days`, `clock`, `map-pin`, `users`, `trophy`, `credit-card`, `qr-code` (Pix), `wallet`, `sun`/`moon` (period), `umbrella` (coberta), `car` (estacionamento), `coffee`/`beer` (bar), `circle-check`, `bell`, `chart-column`, `settings`.
- **No emoji. No unicode symbols as icons** (except `·` as a separator and `→` never — use the `arrow-right` icon).
- **Logos** are raster (no vector provided). Transparent PNGs were extracted from the JPGs by luminance; use white on green, green on white/cream. Request vector files for print.

---

## Fonts — substitution notice

No font files were supplied. Nearest Google Fonts matches are self-hosted in `fonts/`:
- Poster/logo serif caps → **DM Serif Display** (roman + italic)
- “Prime” script → **Pinyon Script**
- Poster body sans → **Instrument Sans** (variable 400–700)

Replace the woff2 files and `tokens/fonts.css` when official fonts are available.
