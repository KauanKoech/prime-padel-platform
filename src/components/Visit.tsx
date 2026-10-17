import { useSyncExternalStore } from 'react';
import { arena, mapsUrl, whatsapp } from '../content/arena';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { localDate, weekday } from '../lib/format';
import { ButtonLink } from './Button';
import { InstagramIcon, MessageCircle, Navigation } from './Icons';
import { Reveal } from './Motion';

const noop = () => () => {};

const coord = (value: number, pos: string, neg: string) => `${Math.abs(value).toFixed(4).replace('.', ',')}° ${value < 0 ? neg : pos}`;

/** Onde estamos: cartão de visita sobre o "alvo" de círculos finos dos posts, centrado no endereço. */
export function Visit() {
  const v = site.visit;
  const trigger = useBookingTrigger();
  const wa = arena.contact.whatsapp;
  // Destaca o dia de hoje só depois de montar (o HTML pré-renderizado não sabe que dia é).
  const today = useSyncExternalStore(noop, () => weekday(localDate()), () => null);

  return (
    <section className="visit on-brand" id="onde-estamos" aria-labelledby="visit-title">
      <div className="container visit__grid">
        <div className="visit__map" role="img" aria-label={v.mapLabel}>
          <svg className="visit__rings" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
            {[70, 140, 210, 280].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} />
            ))}
            <path className="visit__cross" d="M300 0v240M300 360v240M0 300h240M360 300h240" />
            <circle className="visit__pin" cx="300" cy="300" r="9" />
          </svg>
          <p className="visit__coords num" aria-hidden="true">
            <span>{coord(arena.address.latitude, 'N', 'S')}</span>
            <span>{coord(arena.address.longitude, 'L', 'O')}</span>
          </p>
          <p className="visit__city" aria-hidden="true">
            {arena.city} · Santa Catarina
          </p>
        </div>

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
              CEP {arena.address.postalCode}
            </address>
          </div>

          <div className="visit-card__block">
            <h3>{v.hoursLabel}</h3>
            <table className="hours">
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
    </section>
  );
}
