import { arena } from '../content/arena';
import { site } from '../content/site';
import { ButtonLink } from './Button';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Motion';
import { SplitTitle } from './SplitTitle';
import { Wave } from './Wave';
import { BackgroundPaths } from './backgrounds/BackgroundPaths';

/** West Padel Store: a foto da loja por dentro e os produtos em letra grande (carta "Close-up with column card"). */
export function Store() {
  const s = site.store;
  return (
    <section className="store on-light" id="loja" aria-labelledby="store-title">
      {/* fundo: fita de linhas verdes no creme, inclinada para o outro lado (kokonutui Background Paths) */}
      <BackgroundPaths className="store__bg" angle={10} count={30} speed={0.6} />
      <div className="container store__grid">
        <Reveal as="figure" className="store__photo photo">
          <img src={s.photo.src} srcSet={s.photo.srcSet} sizes="(min-width: 960px) 599px, 100vw" width={s.photo.width} height={s.photo.height} alt={s.photo.alt} loading="lazy" decoding="async" />
        </Reveal>
        <div className="store__copy">
          <SplitTitle className="section-title" id="store-title" lead={s.titleLead} accent={s.titleAccent} />
          <Reveal as="p" i={1} className="section-lead">
            {s.lead}
          </Reveal>
          <Reveal as="ul" i={2} className="store__list">
            {arena.store.products.map((p) => (
              <li key={p}>{p}</li>
            ))}
            <li className="store__more">{s.more}</li>
          </Reveal>
          <Reveal i={3}>
            <ButtonLink href={arena.store.url} external variant="primary" size="lg" iconRight={<ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {s.action} <span className="store__handle">{arena.store.handle}</span>
            </ButtonLink>
          </Reveal>
        </div>
      </div>
      <Wave to="a" />
    </section>
  );
}
