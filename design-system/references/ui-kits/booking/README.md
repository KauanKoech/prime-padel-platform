# UI kit — Booking journey

Mobile-first click-through of booking a court. Open `index.html`.

**Flow:** 1 Horário (`DateStrip`, duration `SegmentedControl`, compact `CourtCard` picker, period `Chip`s, `TimeSlot` grid with peak dots) → 2 Detalhes (players, add-on steppers, notes) → 3 Pagamento (details with validation, Pix / cartão / na arena, policy checkbox) → 4 Confirmação (green ticket with hairline grid, actions, `Toast`).

**Layout:** sticky header with `ProgressSteps`; mobile sticky bottom bar (price + CTA); ≥960px the bar is replaced by a sticky summary aside.

**Files:** `data.jsx` (days, courts, pricing, availability, SummaryRows), `Steps.jsx` (StepTime, StepDetails, StepPayment, StepDone), `booking.css`.

State persists in `localStorage` (`pp-booking-step`) so refresh keeps your step; the confirmation screen is not restored. Prices and availability are mock data.
