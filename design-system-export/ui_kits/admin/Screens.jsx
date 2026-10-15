(() => {
const { Icon, IconButton, Button, SegmentedControl, Badge, Chip, Tabs, Table, Avatar, Input } = window.PrimePadelDesignSystem_093c26;
const { COURTS, NOW, STATUS, hm, fmt, courtName } = window.AD;
const START = 7, END = 23, HOUR = 64;

function useMobile() {
  const q = '(max-width: 899px)';
  const [mob, setMob] = React.useState(window.matchMedia(q).matches);
  React.useEffect(() => { const mq = window.matchMedia(q); const on = () => setMob(mq.matches); mq.addEventListener('change', on); return () => mq.removeEventListener('change', on); }, []);
  return mob;
}

function Agenda({ bookings, open, onNewAt }) {
  const mob = useMobile();
  const [court, setCourt] = React.useState('q1');
  const [filter, setFilter] = React.useState('todas');
  const cols = mob ? COURTS.filter(c => c.id === court) : COURTS;
  const scrollRef = React.useRef(null);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = (17 - START) * HOUR; }, []);
  const vis = bookings.filter(b => b.status !== 'cancelada' && (filter === 'todas' || b.status === filter));
  const occ = (cid) => { const u = bookings.filter(b => b.court === cid && b.status !== 'cancelada').reduce((s, b) => s + b.dur, 0); return Math.round(u / ((END - START) * 60) * 100); };
  const hours = Array.from({ length: END - START }, (_, i) => START + i);
  return (
    <>
      <div className="ad-toolbar">
        <div className="ad-daynav">
          <IconButton variant="secondary" icon={<Icon name="chevron-left" size={18} />} label="Dia anterior" />
          <b>Ter, 13 out</b>
          <IconButton variant="secondary" icon={<Icon name="chevron-right" size={18} />} label="Próximo dia" />
          <Button variant="tint" size="sm">Hoje</Button>
        </div>
        <div className="ad-toolbar__group">
          {[['todas', 'Todas'], ['pendente', 'Pendentes'], ['aula', 'Aulas'], ['bloqueado', 'Bloqueios']].map(([k, l]) => <Chip key={k} selected={filter === k} onClick={() => setFilter(k)}>{l}</Chip>)}
        </div>
      </div>
      {mob ? <SegmentedControl block tone="brand" options={COURTS.map(c => ({ value: c.id, label: c.name }))} value={court} onChange={setCourt} /> : null}
      <div className="ag" style={{ '--hour': HOUR + 'px', '--cols': cols.length }}>
        <div className="ag-scroll" ref={scrollRef}>
          <div className="ag-grid">
            <div className="ag-head" />
            {cols.map(c => <div key={c.id} className="ag-head"><span className="ag-head__name">{c.name}</span><span className="ag-head__occ">{occ(c.id)}% ocupada</span></div>)}
            <div className="ag-times">{hours.map(h => <div key={h} className="ag-time">{String(h).padStart(2, '0')}:00</div>)}</div>
            {cols.map(c => (
              <div key={c.id} className="ag-col" style={{ height: hours.length * HOUR }}
                onClick={(e) => { if (e.target !== e.currentTarget) return; const y = e.nativeEvent.offsetY; const min = START * 60 + Math.floor(y / (HOUR / 2)) * 30; onNewAt(c.id, min); }}>
                {vis.filter(b => b.court === c.id).map(b => {
                  const top = (b.start - START * 60) / 60 * HOUR + 2, h = b.dur / 60 * HOUR - 4;
                  return (
                    <div key={b.id} className={'ag-ev ag-ev--' + b.status + (b.checkin && b.status === 'confirmada' ? ' ag-ev--checkin' : '')} style={{ top, height: h }} onClick={() => open(b)}>
                      <b>{b.client}</b>
                      <span>{hm(b.start)}–{hm(b.start + b.dur)}{b.status === 'pendente' ? ' · Pendente' : b.plan ? ' · ' + b.plan : ''}</span>
                    </div>
                  );
                })}
                <div className="ag-now" style={{ top: (NOW - START * 60) / 60 * HOUR }} />
              </div>
            ))}
          </div>
        </div>
        <div className="ag-legend">
          <span><i style={{ background: 'var(--status-booked-bg)' }} />Confirmada</span>
          <span><i style={{ background: 'var(--status-pending-bg)', boxShadow: 'inset 0 0 0 1px rgba(154,95,14,.3)' }} />Aguardando pagamento</span>
          <span><i style={{ background: 'var(--status-class-bg)' }} />Aula</span>
          <span><i style={{ background: 'var(--pp-neutral-100)', boxShadow: 'inset 0 0 0 1px var(--border-strong)' }} />Bloqueado</span>
          <span><i style={{ background: 'var(--pp-ball)', borderRadius: '50%' }} />Check-in feito</span>
          <span style={{ marginLeft: 'auto' }}>Toque num espaço vazio para criar uma reserva</span>
        </div>
      </div>
    </>
  );
}

function Bookings({ bookings, open, initialTab }) {
  const [tab, setTab] = React.useState(initialTab || 'todas');
  const [q, setQ] = React.useState('');
  const counts = (s) => bookings.filter(b => s === 'todas' || b.status === s).length;
  const rows = bookings.filter(b => b.status !== 'bloqueado' && b.status !== 'aula' && (tab === 'todas' || b.status === tab) && (!q || b.client.toLowerCase().includes(q.toLowerCase()))).sort((a, b) => a.start - b.start);
  const cols = [
    { key: 'client', header: 'Cliente', primary: true, render: b => <div className="ad-who"><Avatar name={b.client} size="sm" /><div style={{ minWidth: 0 }}><b>{b.client}</b><small>{b.phone}</small></div></div> },
    { key: 'when', header: 'Horário', num: true, render: b => <span>{hm(b.start)}–{hm(b.start + b.dur)}</span> },
    { key: 'court', header: 'Quadra', render: b => courtName(b.court) },
    { key: 'status', header: 'Status', render: b => <Badge tone={STATUS[b.status].tone} dot>{STATUS[b.status].label}</Badge> },
    { key: 'pay', header: 'Pagamento' },
    { key: 'value', header: 'Valor', align: 'right', num: true, render: b => <b style={{ fontWeight: 600 }}>{fmt(b.value)}</b> },
  ];
  return (
    <>
      <Tabs value={tab} onChange={setTab} tabs={[{ value: 'todas', label: 'Todas', count: counts('todas') - counts('aula') - counts('bloqueado') }, { value: 'confirmada', label: 'Confirmadas', count: counts('confirmada') }, { value: 'pendente', label: 'Pendentes', count: counts('pendente') }, { value: 'cancelada', label: 'Canceladas', count: counts('cancelada') }]} />
      <div className="ad-toolbar">
        <div style={{ flex: '1 1 260px', maxWidth: 360 }}><Input size="sm" placeholder="Buscar por nome" value={q} onChange={e => setQ(e.target.value)} iconLeft={<Icon name="search" size={17} />} /></div>
        <div className="ad-toolbar__group"><Chip selected>Hoje</Chip><Chip>Amanhã</Chip><Chip>Esta semana</Chip><IconButton variant="secondary" icon={<Icon name="download" size={18} />} label="Exportar" /></div>
      </div>
      {rows.length ? <Table columns={cols} rows={rows} onRowClick={open} /> : <div className="ad-panel ad-empty"><span className="ad-empty__ic"><Icon name="search-x" size={24} /></span><h2>Nada por aqui</h2><p>Nenhuma reserva com esse filtro.</p></div>}
    </>
  );
}

function Clients() {
  const rows = window.AD.CLIENTS;
  const cols = [
    { key: 'name', header: 'Cliente', primary: true, render: c => <div className="ad-who"><Avatar name={c.name} size="sm" /><div><b>{c.name}</b><small>{c.phone}</small></div></div> },
    { key: 'plan', header: 'Plano', render: c => <Badge tone={c.plan === 'Mensalista' ? 'solid' : c.plan === 'Avulso' ? 'outline' : 'brand'}>{c.plan}</Badge> },
    { key: 'visits', header: 'Jogos', num: true, align: 'right' },
    { key: 'last', header: 'Último jogo' },
    { key: 'spent', header: 'Total gasto', num: true, align: 'right', render: c => fmt(c.spent) },
  ];
  return (
    <>
      <div className="ad-toolbar">
        <div style={{ flex: '1 1 260px', maxWidth: 360 }}><Input size="sm" placeholder="Buscar cliente" iconLeft={<Icon name="search" size={17} />} /></div>
        <div className="ad-toolbar__group"><Chip selected count={rows.length}>Todos</Chip><Chip count={2}>Mensalistas</Chip><Chip count={2}>Pacote</Chip><Button size="sm" variant="secondary" iconLeft={<Icon name="user-plus" size={16} />}>Novo cliente</Button></div>
      </div>
      <Table columns={cols} rows={rows} onRowClick={() => {}} />
    </>
  );
}

Object.assign(window, { Agenda, Bookings, Clients });
})();
