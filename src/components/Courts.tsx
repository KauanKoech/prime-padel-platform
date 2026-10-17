import { useId, useState } from 'react';
import { arena } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { duration, money } from '../lib/format';
import { ButtonLink } from './Button';
import { CourtDrawing } from './CourtDrawing';
import { ArrowRight } from './Icons';
import { Reveal } from './Motion';

/**
 * Quadras e valores. A coisa viva da página: tocar numa quadra mostra as durações e preços dela
 * e leva aos horários já com a quadra e a duração escolhidas.
 */
export function Courts() {
  const c = site.courts;
  const [courtId, setCourtId] = useState(arena.courts[0].id);
  const court = arena.courts.find((x) => x.id === courtId) ?? arena.courts[0];
  const [durationMinutes, setDuration] = useState(court.offers[0].durationMinutes);
  const offer = court.offers.find((o) => o.durationMinutes === durationMinutes) ?? court.offers[0];
  const trigger = useBookingTrigger();
  const durationName = useId();

  const pick = (id: string) => {
    const next = arena.courts.find((x) => x.id === id)!;
    setCourtId(id);
    setDuration(next.offers[0].durationMinutes);
  };

  return (
    <section className="courts on-brand" id="quadras" aria-labelledby="courts-title">
      <div className="container courts__grid">
        <div className="courts__head">
          <Reveal as="h2" className="section-title" id="courts-title">
            {c.title}
          </Reveal>
          <Reveal as="p" i={1} className="courts__lead">
            {c.lead}
          </Reveal>
        </div>

        <Reveal i={1} className="courts__row-wrap">
          <ul className="courts__row" aria-label={c.groupLabel}>
            {arena.courts.map((x) => {
              const active = x.id === courtId;
              return (
                <li key={x.id}>
                  <button type="button" className={`court-pick${active ? ' is-active' : ''}`} aria-pressed={active} onClick={() => pick(x.id)}>
                    <span className="court-pick__plate">
                      <CourtDrawing className="court-pick__v" ball={active ? { x: 30, y: 58 } : null} />
                      <CourtDrawing className="court-pick__h" orientation="horizontal" ball={active ? { x: 30, y: 58 } : null} />
                    </span>
                    <span className="court-pick__info">
                      <span className="court-pick__name">{x.name}</span>
                      <span className="court-pick__prices">
                        {x.offers.map((o) => (
                          <span key={o.durationMinutes} className="court-pick__price num">
                            {money(o.priceCents)}
                            <small>{duration(o.durationMinutes)}</small>
                          </span>
                        ))}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal i={2} className="courts__detail">
          <p className="courts__detail-label">{c.selected}</p>
          <p className="courts__detail-name" aria-live="polite">
            {court.name}
          </p>
          <fieldset className="durations">
            <legend className="sr-only">{c.durationLabel}</legend>
            {court.offers.map((o) => (
              <label key={o.durationMinutes} className={`duration-opt${o.durationMinutes === offer.durationMinutes ? ' is-active' : ''}`}>
                <input
                  type="radio"
                  name={durationName}
                  value={o.durationMinutes}
                  checked={o.durationMinutes === offer.durationMinutes}
                  onChange={() => setDuration(o.durationMinutes)}
                />
                <span className="num">{duration(o.durationMinutes)}</span>
                <span className="num duration-opt__price">{money(o.priceCents)}</span>
              </label>
            ))}
          </fieldset>
          <ButtonLink
            variant="onBrand"
            size="lg"
            block
            iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}
            {...trigger({ courtId: court.id, durationMinutes: offer.durationMinutes })}
          >
            {c.action}
          </ButtonLink>
          <p className="courts__note">{c.perCourt}</p>
        </Reveal>
      </div>
    </section>
  );
}
