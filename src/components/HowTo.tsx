import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { ButtonLink } from './Button';
import { ArrowRight, Info } from './Icons';
import { Reveal } from './Motion';

/** Como agendar: o passo a passo impresso como um comprovante, com pontilhado entre etapa e detalhe. */
export function HowTo() {
  const h = site.how;
  const trigger = useBookingTrigger();
  return (
    <section className="how" id="como-agendar" aria-labelledby="how-title">
      <div className="container how__grid">
        <div className="how__copy">
          <Reveal as="h2" className="section-title" id="how-title">
            {h.title}
          </Reveal>
          <Reveal as="p" i={1} className="how__lead">
            {h.lead}
          </Reveal>
          <Reveal i={2} className="how__demo">
            <Info size={20} strokeWidth={1.75} aria-hidden="true" />
            <p>{h.demo}</p>
          </Reveal>
          <Reveal i={3}>
            <ButtonLink size="lg" iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...trigger()}>
              {h.action}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal i={1} className="slip" as="div">
          <p className="slip__title">{h.slipTitle}</p>
          <ol className="slip__rows">
            {h.steps.map((s) => (
              <li key={s.label}>
                <span>{s.label}</span>
                <span className="slip__dots" aria-hidden="true" />
                <span className="slip__value">{s.value}</span>
              </li>
            ))}
          </ol>
          <p className="slip__result">
            <span>{h.result.label}</span>
            <span>{h.result.value}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
