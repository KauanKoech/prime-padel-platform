import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { arena, whatsapp } from '../content/arena';
import { site } from '../content/site';
import { ButtonLink } from './Button';
import { InstagramIcon, MessageCircle } from './Icons';
import { EASE, Reveal } from './Motion';
import { SmoothTabs } from './SmoothTabs';
import { SplitTitle } from './SplitTitle';
import { TiltedCard } from './TiltedCard';
import { Wave } from './Wave';
import { Topo } from './backgrounds/Topo';

/** Prime Cup e eventos: as artes reais da arena num cartaz que inclina com o mouse, com abas para trocar de evento. */
export function Events() {
  const e = site.events;
  const [active, setActive] = useState(0);
  const item = e.items[active];

  return (
    <section className="events on-brand" id="eventos" aria-labelledby="events-title">
      {/* fundo: curvas de nível claras que derivam (kokonutui Topo Background) */}
      <Topo className="events__bg" seed={63} interval={0.08} />
      <div className="container events__grid">
        <Reveal i={1} className="events__poster">
          <TiltedCard>
            <AnimatePresence mode="wait" initial={false}>
              <m.img
                key={item.id}
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(min-width: 960px) 560px, 92vw"
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
              />
            </AnimatePresence>
          </TiltedCard>
        </Reveal>

        <div className="events__side">
          <SplitTitle className="section-title" id="events-title" lead={e.titleLead} accent={e.titleAccent} />
          <Reveal i={1}>
            <SmoothTabs items={e.items.map((t) => ({ id: t.id, label: t.tab }))} active={active} onChange={setActive} label={e.tabsLabel} idPrefix="tab" panelId="event-panel" />
          </Reveal>

          <div className="events__panel" id="event-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`}>
            <p className="events__meta">{item.meta}</p>
            <h3 className="events__name">{item.title}</h3>
            <p className="events__text">{item.text}</p>
            {item.categories.length > 0 && (
              <div className="events__cats">
                <h4 className="sr-only">{e.categoriesLabel}</h4>
                <dl>
                  {item.categories.map((cat) => (
                    <div key={cat.name}>
                      <dt>{cat.name}</dt>
                      <dd>{cat.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <Reveal i={3} className="events__foot">
            <div className="actions">
              <ButtonLink href={arena.contact.instagram.url} external variant="ball" size="lg" hoverText={arena.contact.instagram.handle} iconLeft={<InstagramIcon size={18} />}>
                {e.instagram}
              </ButtonLink>
              <ButtonLink href={whatsapp(e.whatsappMessage)} external size="lg" variant="outlineOnBrand" iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
                {e.whatsapp}
              </ButtonLink>
            </div>
            <p className="events__note">{e.note}</p>
          </Reveal>
        </div>
      </div>
      <Wave to="c" />
    </section>
  );
}
