import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { arena, whatsapp } from '../content/arena';
import { site } from '../content/site';
import { ButtonLink } from './Button';
import { InstagramIcon, MessageCircle } from './Icons';
import { EASE, Reveal } from './Motion';

/** Eventos: as artes reais da arena numa placa quadrada, com abas para trocar de evento. */
export function Events() {
  const e = site.events;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = e.items[active];

  // Setas trocam de aba (padrão WAI-ARIA de abas com ativação automática).
  const onKey = (ev: KeyboardEvent<HTMLButtonElement>) => {
    const dir = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    ev.preventDefault();
    const next = (active + dir + e.items.length) % e.items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="events" id="eventos" aria-labelledby="events-title">
      <div className="container">
        <div className="events__grid">
          <Reveal as="h2" className="section-title events__title" id="events-title">
            {e.title}
          </Reveal>
          <Reveal i={1} className="events__plate">
            <AnimatePresence mode="wait" initial={false}>
              <m.img
                key={item.id}
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                style={{ maxWidth: item.image.width }}
              />
            </AnimatePresence>
          </Reveal>

          <div className="events__side">
            <Reveal i={2}>
              <div className="tabs" role="tablist" aria-label={e.tabsLabel}>
                {e.items.map((t, i) => (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={i === active}
                    aria-controls="event-panel"
                    tabIndex={i === active ? 0 : -1}
                    className="tab"
                    onClick={() => setActive(i)}
                    onKeyDown={onKey}
                  >
                    {t.tab}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="events__panel" id="event-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`}>
              <p className="events__meta">{item.meta}</p>
              <h3 className="events__name">{item.title}</h3>
              <p className="events__text">{item.text}</p>
            </div>

            <Reveal i={3} className="events__foot">
              <p className="events__note">{e.note}</p>
              <div className="events__actions">
                <ButtonLink href={arena.contact.instagram.url} external size="lg" iconLeft={<InstagramIcon size={18} />}>
                  {e.instagram}
                </ButtonLink>
                <ButtonLink href={whatsapp(e.whatsappMessage)} external size="lg" variant="tint" iconLeft={<MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />}>
                  {e.whatsapp}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
