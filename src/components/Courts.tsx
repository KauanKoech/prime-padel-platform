import { useId, useState } from 'react';
import { arena } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { duration, money } from '../lib/format';
import { ButtonLink } from './Button';
import { CourtDrawing } from './CourtDrawing';
import { ArrowRight, Info } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';

/**
 * Quadras e valores, como um cardápio (carta "Prices like a menu"). A coisa viva da página: tocar numa quadra
 * mostra as durações e preços dela e leva aos horários já com a quadra e a duração escolhidas.
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
    <section className="courts panel on-light" id="quadras" aria-labelledby="courts-title">
      <div className="container courts__grid">
        <div className="courts__head">
          <SplitTitle className="section-title" id="courts-title" lead={c.titleLead} accent={c.titleAccent} />
          <Reveal as="p" i={1} className="section-lead">
            {c.lead}
          </Reveal>
        </div>

        <Reveal as="ul" i={1} className="courts__menu">
          {arena.courts.map((x) => {
            const active = x.id === courtId;
            return (
              <li key={x.id}>
                <button type="button" className={`court-row${active ? ' is-active' : ''}`} aria-pressed={active} onClick={() => pick(x.id)}>
                  <CourtDrawing className="court-row__court" orientation="horizontal" ball={active ? { x: 30, y: 58 } : null} />
                  <span className="court-row__name">{x.name}</span>
                  <span className="court-row__prices">
                    {x.offers.map((o) => (
                      <span key={o.durationMinutes} className="court-row__price">
                        <span className="num">{money(o.priceCents)}</span>
                        <small>{duration(o.durationMinutes)}</small>
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </Reveal>

        <Reveal i={2} className="courts__detail on-brand">
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
          <p className="courts__note">{c.perCourt}</p>
          <ButtonLink
            variant="ball"
            size="lg"
            block
            iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}
            {...trigger({ courtId: court.id, durationMinutes: offer.durationMinutes })}
          >
            {c.action}
          </ButtonLink>
          <p className="courts__demo">
            <Info size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{c.demo}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
