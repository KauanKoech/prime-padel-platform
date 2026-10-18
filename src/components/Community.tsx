import { whatsapp } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { ButtonLink } from './Button';
import { ArrowRight, MessageCircle } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';
import { Wave } from './Wave';
import { Aurora } from './backgrounds/Aurora';

// Aurora descendo do alto, verde com mais amarelo: o momento mais animado da página.
const AURORA = ['#324d3e', '#7e9c89', '#d8ec4c', '#567a64'];

/** Comunidade: a copy do post "Bora jogar hoje?" como uma conversa, ao lado da foto da jogadora amarrando o tênis. */
export function Community() {
  const c = site.community;
  const trigger = useBookingTrigger();
  return (
    <section className="community" id="comunidade" aria-labelledby="community-title">
      {/* fundo: aurora descendo do alto (React Bits Aurora), ao contrário da do topo */}
      <Aurora className="community__bg" colors={AURORA} direction="top" height={0.3} amplitude={1.4} blend={0.55} brightness={0.75} opacity={0.55} speed={0.9} scale={1.3} />
      <div className="container community__grid">
        <div className="community__copy">
          <Reveal as="p" className="community__lead">
            {c.lead}
          </Reveal>
          <div className="community__bubble">
            <SplitTitle className="community__title" id="community-title" lead="" accent={c.title} />
          </div>
          <Reveal as="p" i={2} className="section-lead">
            {c.text}
          </Reveal>
          <Reveal i={3} className="actions">
            <ButtonLink variant="onBrand" size="lg" iconRight={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...trigger()}>
              {c.primary}
            </ButtonLink>
            <ButtonLink variant="outlineOnBrand" size="lg" href={whatsapp(c.message)} external iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {c.secondary}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal as="figure" i={1} className="community__photo photo">
          <img src={c.photo.src} srcSet={c.photo.srcSet} sizes="(min-width: 960px) 651px, 100vw" width={c.photo.width} height={c.photo.height} alt={c.photo.alt} loading="lazy" decoding="async" />
        </Reveal>
      </div>
      <Wave to="b" />
    </section>
  );
}
