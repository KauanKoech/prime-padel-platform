import { whatsapp } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { ButtonLink } from './Button';
import { ArrowRight, MessageCircle } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';

/**
 * CTA final com foto: as raquetes na grama, nítidas no tamanho natural, sobre um fundo feito da mesma foto
 * desfocada e escurecida (a foto original tem 620 px; esticada sem desfoque ficaria borrada).
 */
export function FinalCta() {
  const f = site.finalCta;
  const trigger = useBookingTrigger();
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="final__bg" aria-hidden="true" />
      <div className="container final__grid">
        <div className="final__copy">
          <SplitTitle className="section-title" id="final-title" lead={f.titleLead} accent={f.titleAccent} />
          <Reveal as="p" i={1} className="section-lead">
            {f.text}
          </Reveal>
          <Reveal i={2} className="actions">
            <ButtonLink variant="ball" size="lg" iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...trigger()}>
              {f.primary}
            </ButtonLink>
            <ButtonLink variant="outlineOnBrand" size="lg" href={whatsapp(f.message)} external iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {f.secondary}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal as="figure" i={1} className="final__photo photo">
          <img src={f.photo.src} srcSet={f.photo.srcSet} sizes="(min-width: 960px) 620px, 100vw" width={f.photo.width} height={f.photo.height} alt={f.photo.alt} loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}
