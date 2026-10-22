import { useState, useSyncExternalStore } from 'react';
import { arena, mapsEmbedUrl, mapsUrl, whatsapp } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { localDate, weekday } from '../lib/format';
import { ButtonLink } from './Button';
import { InstagramIcon, MessageCircle, Navigation } from './Icons';
import { Reveal } from './Motion';
import { Wave } from './Wave';
import { DotField } from './backgrounds/DotField';

const noop = () => () => {};

/** Onde estamos: o mapa do Google com o pino da arena ao lado do cartão de visita. */
export function Visit() {
  const v = site.visit;
  const trigger = useBookingTrigger();
  const wa = arena.contact.whatsapp;
  // Destaca o dia de hoje só depois de montar (o HTML pré-renderizado não sabe que dia é).
  const today = useSyncExternalStore(noop, () => weekday(localDate()), () => null);
  // No celular a semana fica recolhida no dia de hoje (só depois de montar, quando se sabe que dia é).
  const [week, setWeek] = useState(false);
  const collapsed = today !== null && !week;

  return (
    <section className="visit on-brand" id="onde-estamos" aria-labelledby="visit-title">
      {/* fundo: meio-tom de pontos claros e espaçados no verde (kokonutui Dot Field) */}
      <DotField className="visit__bg" spacing={22} seed={29} />
      <div className="container visit__grid">
        <Reveal className="visit__map">
          <iframe
            className="visit__frame"
            src={mapsEmbedUrl}
            title={v.mapLabel}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>

        <Reveal className="visit-card">
          <h2 className="visit-card__title" id="visit-title">
            {v.title} <span className="script">{v.titleScript}</span>
            <span aria-hidden="true">.</span>
          </h2>

          <div className="visit-card__block">
            <h3>{v.addressLabel}</h3>
            <address>
              {arena.address.street}
              <br />
              {arena.address.district}, {arena.address.cityState}
              <br />
              <span className="visit-card__cep">CEP {arena.address.postalCode}</span>
            </address>
          </div>

          <div className={`visit-card__block${collapsed ? ' is-collapsed' : ''}`}>
            <h3>{v.hoursLabel}</h3>
            <table className="hours" id="visit-hours">
              <caption className="sr-only">{v.hoursLabel}</caption>
              <tbody>
                {arena.hours.map((h) => (
                  <tr key={h.day} className={today === h.day ? 'is-today' : undefined}>
                    <th scope="row">
                      {h.label}
                      {today === h.day && <span className="hours__today">{v.today}</span>}
                    </th>
                    <td className="num">
                      <span className="nowrap">
                        {h.open}–{h.close}
                      </span>
                      {h.pending && <span className="pending">{v.pending}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {today !== null && (
              <button type="button" className="hours__toggle" aria-expanded={week} aria-controls="visit-hours" onClick={() => setWeek((w) => !w)}>
                {week ? v.hoursLess : v.hoursMore}
              </button>
            )}
            <p className="visit-card__note">{v.hoursNote}</p>
          </div>

          <div className="visit-card__block">
            <h3>{v.contactLabel}</h3>
            <ul className="visit-card__contacts">
              <li>
                <a href={whatsapp(v.whatsappMessage)} target="_blank" rel="noopener">
                  <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
                  <span className="num">{wa.display}</span>
                </a>
                {!wa.confirmed && <span className="pending">{v.pending}</span>}
              </li>
              <li>
                <a href={arena.contact.instagram.url} target="_blank" rel="noopener">
                  <InstagramIcon size={18} />
                  <span>{arena.contact.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="visit-card__actions">
            <ButtonLink href={mapsUrl} external size="lg" iconLeft={<Navigation size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {v.route}
            </ButtonLink>
            <ButtonLink variant="outline" size="lg" {...trigger()}>
              {v.book}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <Wave to="c" />
    </section>
  );
}
