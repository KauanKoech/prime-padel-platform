(() => {
const { Icon } = window.PrimePadelDesignSystem_093c26;

const WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEK_LONG = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const TODAY = new Date(2026, 9, 13);

const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(TODAY); d.setDate(d.getDate() + i);
  return { key: d.toISOString().slice(0, 10), weekday: i === 0 ? 'Hoje' : WEEK[d.getDay()], day: d.getDate(), month: MONTHS[d.getMonth()], today: i === 0, date: d };
});

const COURTS = [
  { id: 'q1', name: 'Quadra 1', tags: ['Coberta', 'Panorâmica'], peak: 180, off: 150 },
  { id: 'q2', name: 'Quadra 2', tags: ['Coberta', 'Vidro'], peak: 160, off: 130 },
  { id: 'q3', name: 'Quadra 3', tags: ['Coberta', 'Vidro'], peak: 160, off: 130 },
];

const HOURS = Array.from({ length: 16 }, (_, i) => 7 + i); // 07–22
const PERIODS = { manha: [7, 11], tarde: [12, 17], noite: [18, 22] };
const isPeak = (h) => h >= 18 && h <= 21;
const rate = (court, h) => (isPeak(h) ? court.peak : court.off);
const fmt = (n) => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
const hh = (h) => String(h).padStart(2, '0') + ':00';

function taken(dayKey, courtId, h) {
  let s = 0; const str = dayKey + courtId + h;
  for (let i = 0; i < str.length; i++) s = (s * 31 + str.charCodeAt(i)) % 997;
  if (dayKey === DAYS[0].key && h < 11) return true;
  return s % 3 === 0;
}
function freeCount(dayKey, courtId) { return HOURS.filter(h => !taken(dayKey, courtId, h)).length; }
function longDate(dayKey) { const d = DAYS.find(x => x.key === dayKey).date; return WEEK[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }

const ADDONS = [
  { id: 'raquete', name: 'Raquete', price: 20, icon: 'shopping-bag', max: 4 },
  { id: 'bolas', name: 'Tubo com 3 bolas', price: 35, icon: 'circle-dot', max: 3 },
  { id: 'toalha', name: 'Toalha', price: 10, icon: 'shirt', max: 4 },
];

function calc(b) {
  const court = COURTS.find(c => c.id === b.court);
  const base = b.hour != null ? rate(court, b.hour) * (b.duration / 60) : 0;
  const extras = ADDONS.reduce((s, a) => s + (b.addons[a.id] || 0) * a.price, 0);
  return { court, base, extras, total: base + extras };
}

function SummaryRows({ b }) {
  const { court, base, extras, total } = calc(b);
  return (
    <div className="bk-sum">
      <div className="bk-sum__row"><span>Data</span><span>{longDate(b.day)}</span></div>
      <div className="bk-sum__row"><span>Horário</span><span>{b.hour != null ? hh(b.hour) + ' · ' + b.duration + ' min' : '—'}</span></div>
      <div className="bk-sum__row"><span>Quadra</span><span>{court.name}</span></div>
      <div className="bk-sum__row"><span>Quadra ({b.duration} min)</span><span>{b.hour != null ? fmt(base) : '—'}</span></div>
      {extras ? <div className="bk-sum__row"><span>Extras</span><span>{fmt(extras)}</span></div> : null}
      <div className="bk-sum__total"><span style={{ font: '500 14px var(--font-sans)', color: 'var(--text-secondary)' }}>Total</span><b>{b.hour != null ? fmt(total) : '—'}</b></div>
    </div>
  );
}

Object.assign(window, { BK: { DAYS, COURTS, HOURS, PERIODS, ADDONS, isPeak, rate, fmt, hh, taken, freeCount, longDate, calc }, SummaryRows });
})();
