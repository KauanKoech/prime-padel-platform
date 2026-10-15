(() => {
const { Icon, Button, StatCard, Badge, Avatar } = window.PrimePadelDesignSystem_093c26;
const { COURTS, NOW, STATUS, hm, fmt } = window.AD;

function Dashboard({ bookings, open, go }) {
  const active = bookings.filter(b => b.status !== 'cancelada');
  const paid = active.filter(b => b.status === 'confirmada');
  const revenue = paid.reduce((s, b) => s + b.value, 0);
  const slotsTotal = COURTS.length * 16 * 60;
  const used = active.reduce((s, b) => s + b.dur, 0);
  const occ = Math.round(used / slotsTotal * 100);
  const pend = bookings.filter(b => b.status === 'pendente');
  const checkins = paid.filter(b => b.checkin).length;
  const upcoming = active.filter(b => b.start >= NOW - 30 && b.status !== 'bloqueado').sort((a, b) => a.start - b.start).slice(0, 5);
  const week = [['Qua', 64], ['Qui', 71], ['Sex', 88], ['Sáb', 94], ['Dom', 82], ['Seg', 58], ['Ter', occ]];
  return (
    <>
      <div className="ad-kpis">
        <StatCard variant="brand" label="Ocupação hoje" value={occ} unit="%" progress={occ} foot={Math.round(used / 60) + 'h de ' + slotsTotal / 60 + 'h vendidas'} />
        <StatCard label="Reservas hoje" value={active.length} icon={<Icon name="calendar-check" size={18} />} delta="+3" foot="vs. terça passada" />
        <StatCard label="Receita do dia" value={fmt(revenue)} icon={<Icon name="wallet" size={18} />} delta="+12%" foot="confirmada" />
        <StatCard label="Check-ins" value={checkins} unit={'/ ' + paid.length} icon={<Icon name="scan-line" size={18} />} foot="jogadores na arena" />
      </div>
      <div className="ad-cols">
        <div className="ad-stack">
          <div className="ad-panel">
            <div className="ad-panel__head"><div><div className="ad-panel__title">Agora nas quadras</div><div className="ad-panel__sub">Atualizado às {hm(NOW)}</div></div><Button variant="secondary" size="sm" onClick={() => go('agenda')} iconRight={<Icon name="arrow-right" size={16} />}>Abrir agenda</Button></div>
            <div className="ad-live">
              {COURTS.map(c => {
                const cur = active.find(b => b.court === c.id && b.start <= NOW && b.start + b.dur > NOW);
                const nxt = active.filter(b => b.court === c.id && b.start > NOW).sort((a, b) => a.start - b.start)[0];
                const pct = cur ? Math.round((NOW - cur.start) / cur.dur * 100) : 0;
                return (
                  <div key={c.id} className={'ad-court' + (cur && cur.status === 'confirmada' ? ' ad-court--busy' : '')} onClick={() => (cur || nxt) && open(cur || nxt)}>
                    <div className="ad-court__top"><span className="ad-court__name">{c.name}</span>{cur ? <Badge tone={cur.status === 'confirmada' ? 'ball' : STATUS[cur.status].tone} size="sm">{cur.status === 'confirmada' ? 'Em jogo' : cur.status === 'pendente' ? 'Pendente' : STATUS[cur.status].label}</Badge> : <Badge tone="neutral" size="sm">Livre</Badge>}</div>
                    {cur ? <div><div className="ad-court__who">{cur.client}</div><div className="ad-court__when">{hm(cur.start)}–{hm(cur.start + cur.dur)}</div></div> : <div><div className="ad-court__who">Sem jogo agora</div><div className="ad-court__when">{nxt ? 'Próxima às ' + hm(nxt.start) : 'Livre até o fechamento'}</div></div>}
                    <div className="ad-prog"><i style={{ width: pct + '%' }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ad-panel">
            <div className="ad-panel__head"><div><div className="ad-panel__title">Ocupação da semana</div><div className="ad-panel__sub">Média 77% · horário nobre 96%</div></div></div>
            <div className="ad-chart">
              {week.map(([d, v], i) => (
                <div key={d} className={'ad-bar' + (i === 6 ? ' ad-bar--today' : '')}>
                  <span className="ad-bar__val">{v}%</span>
                  <span className="ad-bar__fill" style={{ height: v * 1.2 + 'px' }} />
                  <span className="ad-bar__lbl">{i === 6 ? 'Hoje' : d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ad-stack">
          {pend.length ? <div className="ad-alert"><Icon name="clock-alert" size={20} /><span style={{ flex: 1 }}><b>{pend.length} pagamentos pendentes</b> para hoje à noite.</span><Button size="sm" variant="secondary" onClick={() => go('reservas', 'pendente')}>Ver</Button></div> : null}
          <div className="ad-panel">
            <div className="ad-panel__head"><div className="ad-panel__title">Próximas reservas</div><Button variant="ghost" size="sm" onClick={() => go('reservas')}>Ver todas</Button></div>
            <div className="ad-list">
              {upcoming.map(b => (
                <div key={b.id} className="ad-li" onClick={() => open(b)}>
                  <div className="ad-li__time">{hm(b.start)}<small>{b.dur} min</small></div>
                  <Avatar name={b.client} size="sm" />
                  <div className="ad-li__txt"><div className="ad-li__name">{b.client}</div><div className="ad-li__meta">{window.AD.courtName(b.court)}{b.plan ? ' · ' + b.plan : ''}</div></div>
                  <Badge tone={STATUS[b.status].tone} dot size="sm">{b.status === 'pendente' ? 'Pendente' : STATUS[b.status].label}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
window.Dashboard = Dashboard;
})();
