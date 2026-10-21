import type { CSSProperties } from 'react';
import { arena, highestPrice, lowestPrice } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { money } from '../lib/format';
import { Aurora } from './backgrounds/Aurora';
import { ButtonLink } from './Button';
import { ArrowRight, Clock } from './Icons';
import { Values } from './Values';
import { Wave } from './Wave';

const delay = (i: number) => ({ '--i': i }) as CSSProperties;
// Verde da marca subindo da base, com um toque do amarelo da bola na ponta direita.
const AURORA = ['#25392e', '#3e5e4c', '#7e9c89', '#d8ec4c'];

/**
 * Primeira dobra: o título é o protagonista, sobre uma aurora verde (React Bits Aurora); as fotos entram como
 * um mosaico pequeno ao lado (no celular, uma faixa de três recortes abaixo dos botões), nunca como tela cheia.
 * Animação do conteúdo só em CSS (classes .hero-in), para não atrasar o LCP.
 */
export function Hero() {
  const trigger = useBookingTrigger();
  const h = site.hero;
  const [main, ...rest] = h.photos;
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <Aurora className="hero__bg" colors={AURORA} direction="bottom" height={0.42} amplitude={1.2} blend={0.6} brightness={0.7} opacity={0.6} speed={0.8} />
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero-in" style={delay(0)}>
              {h.titleLead}
            </span>{' '}
            <span className="hero-in" style={delay(1)}>
              <span className="hero__serif">{h.titleMid}</span> <span className="hero__script">{h.titleAccent}</span>
            </span>
          </h1>
          <p className="hero__lead hero-in" style={delay(2)}>
            {h.lead}
          </p>
          <div className="hero__ctas hero-in" style={delay(3)}>
            <ButtonLink variant="ball" size="lg" hoverText={h.primaryHover} iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...trigger()}>
              {h.primary}
            </ButtonLink>
            <ButtonLink size="lg" variant="outlineOnBrand" className="btn--clear" href="#quadras">
              {h.secondary}
            </ButtonLink>
          </div>
        </div>

        <div className="hero__mosaic hero-in" style={delay(3)} role="group" aria-label={h.mosaicLabel}>
          <figure className="hero__tile hero__tile--main photo">
            <img src={main.src} srcSet={main.srcSet} sizes="(min-width: 960px) 300px, 34vw" width={main.width} height={main.height} alt={main.alt} fetchPriority="high" decoding="async" />
            <figcaption className="hero__open">
              <Clock size={15} strokeWidth={1.75} aria-hidden="true" />
              {h.open}
            </figcaption>
          </figure>
          {rest.map((p, i) => (
            <figure key={p.src} className={`hero__tile hero__tile--${i + 1} photo`}>
              <img src={p.src} srcSet={p.srcSet} sizes="(min-width: 960px) 260px, 30vw" width={p.width} height={p.height} alt={p.alt} decoding="async" />
            </figure>
          ))}
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
          <div>
            <dt>{h.facts.teachers}</dt>
            <dd className="num">{site.coaches.items.length}</dd>
          </div>
        </dl>
      </div>
      {/* a faixa de valores faz parte do topo: mesma aurora atrás, sem corte entre as duas */}
      <Values />
      <Wave to="b" />
    </section>
  );
}
