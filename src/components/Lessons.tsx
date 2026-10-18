import { whatsapp } from '../content/arena';
import { site } from '../content/site';
import { BackgroundPaths } from './backgrounds/BackgroundPaths';
import { ButtonLink } from './Button';
import { ArrowRight, Check, MessageCircle } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';

/** Aulas: o saque em P&B e a copy dos posts "Nunca jogou padel?" e "Aqui você aprende do zero". */
export function Lessons() {
  const l = site.lessons;
  return (
    <section className="lessons" id="aulas" aria-labelledby="lessons-title">
      {/* fundo: fita de linhas que flui (kokonutui Background Paths) */}
      <BackgroundPaths className="lessons__bg" />
      <div className="container lessons__grid">
        <Reveal as="figure" className="lessons__photo photo">
          <img src={l.photo.src} srcSet={l.photo.srcSet} sizes="(min-width: 960px) 646px, 100vw" width={l.photo.width} height={l.photo.height} alt={l.photo.alt} loading="lazy" decoding="async" />
        </Reveal>

        <div className="lessons__copy">
          <SplitTitle className="section-title" id="lessons-title" lead={l.titleLead} accent={l.titleAccent} />
          <Reveal as="p" i={1} className="lessons__statement">
            {l.statement}
          </Reveal>
          <Reveal as="ul" i={2} className="lessons__list">
            {l.items.map((item) => (
              <li key={item}>
                <Check size={22} strokeWidth={2} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </Reveal>
          <Reveal as="p" i={3} className="section-lead">
            {l.text}
          </Reveal>
          <Reveal i={4} className="actions">
            <ButtonLink variant="ball" size="lg" hoverText={l.actionHover} href={whatsapp(l.actionMessage)} external iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {l.action}
            </ButtonLink>
            <ButtonLink variant="outlineOnBrand" size="lg" href="#professores" iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {l.secondary}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
