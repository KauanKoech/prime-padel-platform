import type { Court, OpeningHours } from '../domain/booking';

/**
 * Dados institucionais da Prime Padel (fonte: docs/PRODUCT.md e a landing anterior, commit 1b45848).
 * Fonte única desses dados no site: seções, agendamento e links leem daqui.
 */
export const arena = {
  name: 'Prime Padel',
  city: 'Lages',
  state: 'SC',
  timeZone: 'America/Sao_Paulo',
  address: {
    street: 'Avenida Belisário Ramos, 4241',
    district: 'São Cristóvão',
    cityState: 'Lages – SC',
    postalCode: '88501-065',
    country: 'Brasil',
    latitude: -27.811353,
    longitude: -50.317361,
  },
  contact: {
    // PLACEHOLDER: WhatsApp informado com 8 dígitos locais (49 9910-7642). Confirmar com a arena antes de publicar;
    // não acrescentar dígito por suposição. Enquanto `confirmed` for false, o site mostra "a confirmar".
    whatsapp: { display: '+55 49 9910-7642', number: '554999107642', confirmed: false },
    instagram: { handle: '@primepadellages', url: 'https://www.instagram.com/primepadellages/' },
  },
  hours: [
    { day: 1, label: 'Segunda', open: '06:00', close: '23:00' },
    { day: 2, label: 'Terça', open: '06:00', close: '23:00' },
    // PLACEHOLDER: abertura às 03:00 na quarta foi informada, mas precisa de confirmação.
    { day: 3, label: 'Quarta', open: '03:00', close: '23:00', pending: true },
    { day: 4, label: 'Quinta', open: '06:00', close: '23:00' },
    { day: 5, label: 'Sexta', open: '06:00', close: '23:00' },
    { day: 6, label: 'Sábado', open: '09:00', close: '23:00' },
    { day: 0, label: 'Domingo', open: '09:00', close: '20:00' },
  ] satisfies OpeningHours[] as OpeningHours[],
  /** Preços por quadra e por duração, como informados pela arena. */
  courts: [
    { id: 'eqi-dgi', name: 'EQI / DGI INVESTIMENTOS', offers: [{ durationMinutes: 90, priceCents: 19000 }] },
    { id: 'ademicom', name: 'ADEMICOM', offers: [{ durationMinutes: 90, priceCents: 18000 }] },
    { id: 'boticario', name: 'O BOTICÁRIO', offers: [{ durationMinutes: 90, priceCents: 18000 }] },
    {
      id: 'antidoto',
      name: 'ANTÍDOTO',
      offers: [
        { durationMinutes: 90, priceCents: 18000 },
        { durationMinutes: 60, priceCents: 14000 },
      ],
    },
    { id: 'rrtur', name: 'RRTUR', offers: [{ durationMinutes: 90, priceCents: 18000 }] },
  ] satisfies Court[] as Court[],
  store: {
    name: 'West Padel Store',
    handle: '@westpadelstore',
    url: 'https://www.instagram.com/westpadelstore/',
    products: ['Raquetes', 'Roupas', 'Calçados', 'Bolsas', 'Raqueteiras'],
  },
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${arena.address.latitude},${arena.address.longitude}`)}`;

const allPrices = arena.courts.flatMap((c) => c.offers.map((o) => o.priceCents));
export const lowestPrice = Math.min(...allPrices);
export const highestPrice = Math.max(...allPrices);

/** Link do WhatsApp com mensagem pronta (url-encoded). */
export const whatsapp = (mensagem: string) => `https://wa.me/${arena.contact.whatsapp.number}?text=${encodeURIComponent(mensagem)}`;
