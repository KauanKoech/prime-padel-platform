import { arena } from '../content/arena';
import { site } from '../content/site';
import { ButtonLink } from './Button';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Motion';

/** West Padel Store: composição tipográfica, os produtos em letra grande. */
export function Store() {
  const s = site.store;
  return (
    <section className="store" id="loja" aria-labelledby="store-title">
      <div className="container store__grid">
        <div className="store__copy">
          <Reveal as="h2" className="section-title" id="store-title">
            {s.title}
          </Reveal>
          <Reveal as="p" i={2} className="store__lead">
            {s.lead}
          </Reveal>
          <Reveal i={3}>
            <ButtonLink href={arena.store.url} external variant="outline" size="lg" iconRight={<ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {s.action} <span className="store__handle">{arena.store.handle}</span>
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal as="ul" i={1} className="store__list">
          {arena.store.products.map((p) => (
            <li key={p}>{p}</li>
          ))}
          <li className="store__more">{s.more}</li>
        </Reveal>
      </div>
    </section>
  );
}
