import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import { arena, whatsapp } from '../../content/arena';
import { site } from '../../content/site';
import { BookingError, type AvailabilitySlot, type BookingService, type PlayerDetails } from '../../domain/booking';
import { PLAYER_LIMITS, validatePlayer } from '../../domain/validation';
import { bookingService, demoConfig } from '../../services/booking';
import { addDays, dayOfMonth, duration, localDate, longDate, money, shortMonth, shortWeekday } from '../../lib/format';
import { Button, ButtonLink } from '../../components/Button';
import { CourtDrawing } from '../../components/CourtDrawing';
import { ArrowRight, CalendarX, Check, ChevronLeft, CircleAlert, MessageCircle, RefreshCw, X } from '../../components/Icons';
import { useBooking, type BookingPreset } from './BookingContext';

const c = site.booking;
type Load = { status: 'loading' } | { status: 'error' } | { status: 'ready'; slots: AvailabilitySlot[] };
type LoadResult = { key: string; value: Load };
type Errors = Partial<Record<keyof PlayerDetails | 'slot' | 'submit', string>>;

/** Janela modal do agendamento. O conteúdo só existe enquanto está aberta: fechar descarta os dados. */
export function BookingDialog({ service = bookingService }: { service?: BookingService }) {
  const { open, preset, closeBooking, returnFocus } = useBooking();
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const [session, setSession] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      // foco no título da etapa (e não no botão fechar, que o showModal escolheria)
      d.querySelector<HTMLElement>('.bk__heading')?.focus();
      lenis?.stop();
    } else if (!open && d.open) d.close();
  }, [open, lenis]);

  const onClose = () => {
    closeBooking();
    lenis?.start();
    setSession((s) => s + 1);
    returnFocus();
  };

  return (
    <dialog ref={ref} className="bk" aria-labelledby="bk-title" onClose={onClose} data-lenis-prevent>
      {open && <BookingFlow key={session} preset={preset} service={service} onClose={() => ref.current?.close()} />}
    </dialog>
  );
}

function BookingFlow({ preset, service, onClose }: { preset: BookingPreset; service: BookingService; onClose: () => void }) {
  const [today] = useState(() => localDate());
  const initialCourt = arena.courts.find((x) => x.id === preset.courtId) ?? arena.courts[0];
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(today);
  const [courtId, setCourtId] = useState(initialCourt.id);
  const [minutes, setMinutes] = useState(
    initialCourt.offers.some((o) => o.durationMinutes === preset.durationMinutes) ? preset.durationMinutes! : initialCourt.offers[0].durationMinutes,
  );
  const [result, setResult] = useState<LoadResult | null>(null);
  const [reload, setReload] = useState(0);
  const [slot, setSlot] = useState<AvailabilitySlot | null>(null);
  const [player, setPlayer] = useState<PlayerDetails>({ name: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const submission = useRef<AbortController | null>(null);

  const court = arena.courts.find((x) => x.id === courtId)!;
  const offer = court.offers.find((o) => o.durationMinutes === minutes) ?? court.offers[0];
  const days = Array.from({ length: demoConfig.horizonDays }, (_, i) => addDays(today, i));
  const stepTitles = [c.date, c.times, c.details, c.review, c.success];

  // Foco no título de cada etapa (leitores de tela anunciam a mudança) e corpo de volta ao topo.
  const firstRender = useRef(true);
  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  useEffect(() => () => submission.current?.abort(), []);

  // Horários: consultados ao chegar na etapa 2 e sempre que data, quadra ou duração mudam.
  // Enquanto o resultado não corresponde à consulta atual, a grade está "carregando".
  const queryKey = `${date}|${courtId}|${minutes}|${reload}`;
  const load: Load = result?.key === queryKey ? result.value : { status: 'loading' };
  useEffect(() => {
    if (step !== 1) return;
    const controller = new AbortController();
    service
      .getAvailability({ date, courtId, durationMinutes: minutes }, controller.signal)
      .then((r) => setResult({ key: queryKey, value: { status: 'ready', slots: r.slots } }))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setResult({ key: queryKey, value: { status: 'error' } });
      });
    return () => controller.abort();
  }, [step, date, courtId, minutes, queryKey, service]);

  const chooseCourt = (id: string) => {
    const next = arena.courts.find((x) => x.id === id)!;
    setCourtId(id);
    if (!next.offers.some((o) => o.durationMinutes === minutes)) setMinutes(next.offers[0].durationMinutes);
    setSlot(null);
  };

  const next = () => {
    setErrors({});
    setNotice(null);
    if (step === 1 && !slot) {
      setErrors({ slot: c.selectSlot });
      return;
    }
    if (step === 2) {
      const valid = validatePlayer(player);
      const found: Errors = {};
      if (!valid.name) found.name = c.errors.name;
      if (!valid.phone) found.phone = c.errors.phone;
      if (!valid.notes) found.notes = c.errors.notes;
      if (Object.keys(found).length) {
        setErrors(found);
        document.getElementById(`bk-${Object.keys(found)[0]}`)?.focus();
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const back = () => {
    setErrors({});
    setNotice(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    if (busy || !slot) return;
    const controller = new AbortController();
    submission.current = controller;
    setBusy(true);
    setErrors({});
    try {
      await service.requestBooking({ date, courtId, durationMinutes: minutes, slotId: slot.id, player }, controller.signal);
      if (controller.signal.aborted) return;
      // Na conclusão os dados pessoais são descartados: nada fica guardado, nem no estado.
      setPlayer({ name: '', phone: '', notes: '' });
      setStep(4);
    } catch (err) {
      if (controller.signal.aborted || (err as Error).name === 'AbortError') return;
      const code = err instanceof BookingError ? err.code : null;
      if (code === 'SLOT_CONFLICT' || code === 'SLOT_UNAVAILABLE') {
        // Conflito: volta para a grade, que é consultada de novo e já mostra o horário ocupado.
        setSlot(null);
        setReload((r) => r + 1);
        setNotice(code === 'SLOT_CONFLICT' ? c.errors.conflict : c.errors.unavailable);
        setStep(1);
      } else setErrors({ submit: c.errors.submit });
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  };

  const restart = () => {
    setPlayer({ name: '', phone: '', notes: '' });
    setSlot(null);
    setDate(today);
    setNotice(null);
    setStep(0);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 3) void submit();
    else next();
  };

  const summary = (
    <dl className="bk-sum">
      <div>
        <dt>{c.summary.date}</dt>
        <dd>{longDate(date)}</dd>
      </div>
      <div>
        <dt>{c.summary.court}</dt>
        <dd>{court.name}</dd>
      </div>
      <div>
        <dt>{c.summary.duration}</dt>
        <dd className="num">{duration(minutes)}</dd>
      </div>
      <div>
        <dt>{c.summary.time}</dt>
        <dd className="num">{slot ? `${slot.start}–${slot.end}` : '—'}</dd>
      </div>
      <div className="bk-sum__total">
        <dt>{c.summary.total}</dt>
        <dd className="num">{money(offer.priceCents)}</dd>
      </div>
    </dl>
  );

  return (
    <form className="bk__frame" noValidate onSubmit={onFormSubmit}>
      <header className="bk__top">
        <div className="bk__titlebar">
          <h2 id="bk-title" className="bk__title">
            {c.title}
          </h2>
          <span className="bk__badge">{c.demoBadge}</span>
          <button type="button" className="icon-btn bk__close" aria-label={c.close} onClick={onClose}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        {step < 4 && (
          <div className="bk__progress">
            <p className="bk__step-of">
              {c.stepOf(step + 1, c.steps.length)} · <strong>{c.steps[step]}</strong>
            </p>
            <ol className="bk__bars" aria-hidden="true">
              {c.steps.map((s, i) => (
                <li key={s} className={i <= step ? 'is-done' : undefined} />
              ))}
            </ol>
          </div>
        )}
      </header>

      <div className="bk__body" ref={body}>
        <div className="bk__main">
          {step < 4 && (
            <h3 ref={heading} tabIndex={-1} className="bk__heading">
              {stepTitles[step]}
            </h3>
          )}

          {step === 0 && (
            <>
              <fieldset className="bk-field">
                <legend className="bk-label">{c.dateLegend}</legend>
                <div className="date-strip">
                  {days.map((d, i) => (
                    <label key={d} className={`date-pill${d === date ? ' is-active' : ''}`}>
                      <input type="radio" name="bk-date" value={d} aria-label={longDate(d)} checked={d === date} onChange={() => (setDate(d), setSlot(null))} />
                      <span className="date-pill__wd">{i === 0 ? c.today : shortWeekday(d)}</span>
                      <span className="date-pill__day num">{dayOfMonth(d)}</span>
                      <span className="date-pill__mo">{shortMonth(d)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bk-field">
                <legend className="bk-label">{c.court}</legend>
                <div className="court-list">
                  {arena.courts.map((x) => (
                    <label key={x.id} className={`court-opt${x.id === courtId ? ' is-active' : ''}`}>
                      <input type="radio" name="bk-court" value={x.id} checked={x.id === courtId} onChange={() => chooseCourt(x.id)} />
                      <span className="court-opt__name">{x.name}</span>
                      <span className="court-opt__prices num">{x.offers.map((o) => `${money(o.priceCents)} · ${duration(o.durationMinutes)}`).join('   ')}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bk-field">
                <legend className="bk-label">{c.duration}</legend>
                <div className="durations durations--light">
                  {court.offers.map((o) => (
                    <label key={o.durationMinutes} className={`duration-opt${o.durationMinutes === minutes ? ' is-active' : ''}`}>
                      <input type="radio" name="bk-duration" value={o.durationMinutes} checked={o.durationMinutes === minutes} onChange={() => (setMinutes(o.durationMinutes), setSlot(null))} />
                      <span className="num">{duration(o.durationMinutes)}</span>
                      <span className="num duration-opt__price">{money(o.priceCents)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {step === 1 && (
            <>
              <p className="bk-context">
                {longDate(date)} · {court.name} · {duration(minutes)}
              </p>
              {notice && (
                <p className="bk-alert" role="alert">
                  <CircleAlert size={20} strokeWidth={1.75} aria-hidden="true" />
                  {notice}
                </p>
              )}
              <div className="slots-area" aria-busy={load.status === 'loading'}>
                {load.status === 'loading' && (
                  <p className="bk-state" role="status">
                    {c.loading}
                  </p>
                )}
                {load.status === 'error' && (
                  <div className="bk-state">
                    <p role="alert">{c.error}</p>
                    <Button variant="outline" iconLeft={<RefreshCw size={18} strokeWidth={1.75} aria-hidden="true" />} onClick={() => setReload((r) => r + 1)}>
                      {c.retry}
                    </Button>
                  </div>
                )}
                {load.status === 'ready' && load.slots.length === 0 && (
                  <div className="bk-state" role="status">
                    <CalendarX size={28} strokeWidth={1.75} aria-hidden="true" />
                    <p>{c.empty}</p>
                    <Button variant="outline" onClick={back}>
                      {c.emptyAction}
                    </Button>
                  </div>
                )}
                {load.status === 'ready' && load.slots.length > 0 && (
                  <div className="slots" role="group" aria-label={c.times}>
                    {load.slots.map((s) => {
                      const selected = slot?.id === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          className={`slot${selected ? ' is-active' : ''}`}
                          disabled={!s.available}
                          aria-pressed={selected}
                          onClick={() => (setSlot(s), setErrors({}))}
                        >
                          <span className="slot__time num">{s.start}</span>
                          <span className="slot__meta">{s.available ? c.available : c.unavailable}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {errors.slot && (
                <p className="bk-error" role="alert">
                  {errors.slot}
                </p>
              )}
            </>
          )}

          {step === 2 && (
            <div className="bk-form">
              <p className="bk-hint">{c.detailsHint}</p>
              <Field id="bk-name" label={c.name} error={errors.name}>
                <input id="bk-name" autoComplete="off" maxLength={PLAYER_LIMITS.maxName} placeholder={c.namePlaceholder} value={player.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'bk-name-err' : undefined} onChange={(e) => setPlayer({ ...player, name: e.target.value })} />
              </Field>
              <Field id="bk-phone" label={c.phone} error={errors.phone}>
                <input id="bk-phone" type="tel" inputMode="tel" autoComplete="off" maxLength={20} placeholder={c.phonePlaceholder} value={player.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'bk-phone-err' : undefined} onChange={(e) => setPlayer({ ...player, phone: e.target.value })} />
              </Field>
              <Field id="bk-notes" label={c.notes} hint={c.notesHint} error={errors.notes}>
                <textarea id="bk-notes" rows={3} maxLength={PLAYER_LIMITS.maxNotes} placeholder={c.notesPlaceholder} value={player.notes} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? 'bk-notes-err' : 'bk-notes-hint'} onChange={(e) => setPlayer({ ...player, notes: e.target.value })} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="bk-review">
              <p className="bk-hint">{c.reviewHint}</p>
              {summary}
              <dl className="bk-sum bk-sum--player">
                <div>
                  <dt>{c.summary.player}</dt>
                  <dd>{player.name.trim()}</dd>
                </div>
                <div>
                  <dt>{c.summary.phone}</dt>
                  <dd className="num">{player.phone}</dd>
                </div>
                {player.notes && (
                  <div>
                    <dt>{c.summary.notes}</dt>
                    <dd>{player.notes}</dd>
                  </div>
                )}
              </dl>
              <Button variant="ghost" onClick={() => setStep(2)} disabled={busy}>
                {c.edit}
              </Button>
              <p className="bk-hint">{c.priceNote}</p>
              {errors.submit && (
                <p className="bk-alert" role="alert">
                  <CircleAlert size={20} strokeWidth={1.75} aria-hidden="true" />
                  {errors.submit}
                </p>
              )}
            </div>
          )}

          {step === 4 && slot && (
            <div className="bk-done">
              <span className="bk-done__check" aria-hidden="true">
                <Check size={30} strokeWidth={2.25} />
              </span>
              <h3 ref={heading} tabIndex={-1} className="bk__heading">
                {c.success}
              </h3>
              <p role="status">{c.successText}</p>
              <div className="ticket on-brand">{summary}</div>
              <p className="bk-hint">{c.successReal}</p>
              <div className="bk-done__actions">
                <ButtonLink href={whatsapp(c.whatsappMessage(court.name, longDate(date), slot.start))} external size="lg" iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
                  {c.realContact}
                </ButtonLink>
                <Button variant="outline" size="lg" onClick={restart}>
                  {c.restart}
                </Button>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <aside className="bk__aside" aria-label="Resumo">
            <CourtDrawing className="bk__court" orientation="horizontal" ball={slot ? { x: 70, y: 150 } : null} />
            {summary}
            <p className="bk__demo-note">{c.demoNote}</p>
          </aside>
        )}
      </div>

      {step < 4 && (
        <footer className="bk__bar">
          <div className="bk__bar-info">
            <span className="bk__bar-price num">{money(offer.priceCents)}</span>
            <span className="bk__bar-meta">
              {court.name} · {duration(minutes)}
              {slot ? ` · ${slot.start}` : ''}
            </span>
          </div>
          <div className="bk__bar-actions">
            {step > 0 && (
              <Button variant="ghost" onClick={back} disabled={busy} iconLeft={<ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />}>
                {c.back}
              </Button>
            )}
            <Button type="submit" disabled={busy || (step === 1 && load.status !== 'ready')} iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {busy ? c.submitting : step === 3 ? c.submit : c.next}
            </Button>
          </div>
        </footer>
      )}
    </form>
  );
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
