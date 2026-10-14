# UI kit — Arena admin panel

Desktop-optimised, fully usable on phones. Open `index.html`.

**Screens:** Visão geral (KPI `StatCard`s, "Agora nas quadras" live status, weekly occupancy bars, pending-payment alert, next bookings) · Agenda (day grid per court, status-coloured blocks, now-line, filters; tap empty space → new booking) · Reservas (`Tabs` with counts, search, `Table` → stacked cards under 640px) · Clientes (`Table` with plan badges). Financeiro / Quadras / Configurações are intentionally left as "not in this kit" placeholders.

**Overlays:** booking detail = `Dialog variant="drawer"` (bottom sheet on mobile) with check-in / confirm payment / cancel (confirm dialog) → `Toast`; "Nova reserva" dialog with live price.

**Responsive:** ≥900px fixed green sidebar (248px) + top bar with search/CTA; <900px compact top bar + bottom tab bar with central "+" FAB; agenda switches to one court at a time via `SegmentedControl`.

**Files:** `data.jsx`, `Shell.jsx` (Sidebar, Topbar, BottomNav, OutOfScope), `Dashboard.jsx`, `Screens.jsx` (Agenda, Bookings, Clients), `Dialogs.jsx` (BookingDrawer, NewBookingDialog), `admin.css`. Current page persists in `localStorage` (`pp-admin-page`). All data is mock.
