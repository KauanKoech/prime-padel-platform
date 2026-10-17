import type { CSSProperties } from 'react';
import { arena, highestPrice, lowestPrice } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { money } from '../lib/format';
import { ButtonLink } from './Button';
import { CourtDrawing } from './CourtDrawing';
import { ArrowRight } from './Icons';

const delay = (i: number) => ({ '--i': i }) as CSSProperties;

/** Primeira dobra: animação só em CSS (classes .hero-in), para não atrasar o LCP. */
export function Hero() {
  const trigger = useBookingTrigger();
  const h = site.hero;
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero-in" style={delay(0)}>
              {h.titleLead}
            </span>{' '}
            <em className="hero-in" style={delay(1)}>
              {h.titleAccent}
            </em>
          </h1>
          <p className="hero__lead hero-in" style={delay(2)}>
            {h.lead}
          </p>
          <div className="hero__ctas hero-in" style={delay(3)}>
            <ButtonLink size="lg" iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...trigger()}>
              {h.primary}
            </ButtonLink>
            <ButtonLink size="lg" variant="outline" href="#quadras">
              {h.secondary}
            </ButtonLink>
          </div>
          <dl className="hero__facts hero-in" style={delay(4)}>
            <div>
              <dt>{h.facts.courts}</dt>
              <dd className="num">{arena.courts.length}</dd>
            </div>
            <div>
              <dt>{h.facts.durations}</dt>
              <dd>1h · 1h30</dd>
            </div>
            <div>
              <dt>{h.facts.price}</dt>
              <dd className="num">
                {money(lowestPrice)} a {money(highestPrice).replace('R$ ', '')}
              </dd>
            </div>
          </dl>
        </div>

        <figure className="hero__panel on-brand" aria-label={h.panelLabel}>
          <span className="hero__circle" aria-hidden="true" />
          <CourtDrawing className="hero__court hero__court--v" ball={{ x: 72, y: 150 }} draw />
          <CourtDrawing className="hero__court hero__court--h" orientation="horizontal" ball={{ x: 72, y: 150 }} draw />
          <figcaption className="hero__address">
            <span>{arena.address.street}</span>
            <span>
              {arena.address.district} · {arena.city} / {arena.state}
            </span>
            <svg className="hero__arrow" viewBox="0 0 120 10" aria-hidden="true" focusable="false">
              <path d="M0 5h118M112 1l6 4-6 4" />
            </svg>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
