import { useRef, useState } from 'react';
import { whatsapp } from '../content/arena';
import { site } from '../content/site';
import { ButtonLink } from './Button';
import { CountUp } from './CountUp';
import { MessageCircle } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';
import { Wave } from './Wave';
import { FlowField } from './backgrounds/FlowField';

/**
 * Professores: três cartões com foto, um número real (anos) que conta ao entrar na tela, fatos dos posts
 * oficiais e os níveis atendidos. No celular viram um carrossel horizontal com encaixe (rolagem nativa),
 * com pontos que acompanham a posição.
 */
export function Coaches() {
  const c = site.coaches;
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  const onScroll = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    setCurrent(Math.min(c.items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  return (
    <section className="coaches" id="professores" aria-labelledby="coaches-title">
      {/* fundo: linhas de vento que contornam o mouse (kokonutui Flow Field) */}
      <FlowField className="coaches__bg" density={0.7} speed={0.8} />
      <div className="container">
        <div className="coaches__head">
          <SplitTitle className="section-title" id="coaches-title" lead={c.titleLead} accent={c.titleAccent} />
          <Reveal as="p" i={1} className="section-lead">
            {c.lead}
          </Reveal>
        </div>

        <Reveal i={2}>
        <ul className="coaches__track" ref={track} onScroll={onScroll} aria-label={c.listLabel}>
          {c.items.map((p) => (
            <li key={p.id} className="coach">
              <div className="coach__top">
                <figure className="coach__photo">
                  <img src={p.photo.src} width={p.photo.width} height={p.photo.height} alt={p.photo.alt} loading="lazy" decoding="async" />
                </figure>
                <p className="coach__stat">
                  <CountUp to={p.stat.value} className="coach__num" />
                  <span className="coach__unit">{p.stat.unit}</span>
                  <span className="coach__stat-label">{p.stat.label}</span>
                </p>
              </div>
              <h3 className="coach__name">{p.name}</h3>
              <ul className="coach__facts">
                {p.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="coach__levels">
                <p className="sr-only">{c.levelsLabel}:</p>
                <ul>
                  {p.levels.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <ButtonLink className="coach__cta" variant="outlineOnBrand" hoverText={c.actionHover} href={whatsapp(c.message(p.name))} external iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
                {c.action(p.first)}
              </ButtonLink>
            </li>
          ))}
        </ul>
        </Reveal>
        <div className="coaches__dots" aria-hidden="true">
          {c.items.map((p, i) => (
            <span key={p.id} className={i === current ? 'is-active' : undefined} />
          ))}
        </div>
      </div>
      <Wave to="b" />
    </section>
  );
}
