(() => {
const { Icon, IconButton, Button, Logo, Avatar, Input } = window.PrimePadelDesignSystem_093c26;

const NAV = [
  { id: 'dashboard', label: 'Visão geral', icon: 'layout-dashboard' },
  { id: 'agenda', label: 'Agenda', icon: 'calendar-days' },
  { id: 'reservas', label: 'Reservas', icon: 'list-checks', count: 2 },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
];
const NAV2 = [
  { id: 'financeiro', label: 'Financeiro', icon: 'wallet' },
  { id: 'quadras', label: 'Quadras', icon: 'rectangle-horizontal' },
  { id: 'config', label: 'Configurações', icon: 'settings' },
];

function Sidebar({ page, go }) {
  const item = (n) => (
    <button key={n.id} className={'ad-nav' + (page === n.id ? ' is-on' : '')} onClick={() => go(n.id)}>
      <Icon name={n.icon} size={19} />{n.label}{n.count ? <span className="ad-nav__count">{n.count}</span> : null}
    </button>
  );
  return (
    <aside className="ad-side">
      <div className="ad-side__logo"><Logo color="white" height={46} basePath="../../" /></div>
      <nav>{NAV.map(item)}<div className="ad-side__label">Gestão</div>{NAV2.map(item)}</nav>
      <div className="ad-side__foot"><Avatar name="Camila Souza" size="sm" tone="brand" style={{ background: 'rgba(255,255,255,.14)' }} /><div><b>Camila Souza</b><span>Recepção · Arena</span></div></div>
    </aside>
  );
}

function Topbar({ title, subtitle, onNew, actions }) {
  return (
    <header className="ad-top">
      <div className="ad-top__in">
        <span className="ad-top__mlogo"><Logo color="green" height={30} basePath="../../" /></span>
        <div className="ad-top__title"><h1>{title}</h1>{subtitle ? <p>{subtitle}</p> : null}</div>
        {actions}
        <div className="ad-top__search"><Input size="sm" placeholder="Buscar cliente ou reserva" iconLeft={<Icon name="search" size={17} />} /></div>
        <IconButton variant="secondary" icon={<Icon name="bell" size={19} />} label="Notificações" badge={2} />
        <Button className="ad-desk" iconLeft={<Icon name="plus" size={18} />} onClick={onNew}>Nova reserva</Button>
      </div>
    </header>
  );
}

function BottomNav({ page, go, onNew }) {
  const b = (id, icon, label) => <button className={page === id ? 'is-on' : ''} onClick={() => go(id)}><Icon name={icon} size={22} />{label}</button>;
  return (
    <nav className="ad-bnav">
      {b('dashboard', 'layout-dashboard', 'Início')}
      {b('agenda', 'calendar-days', 'Agenda')}
      <button aria-label="Nova reserva" onClick={onNew}><span className="ad-bnav__fab" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={24} /></span></button>
      {b('reservas', 'list-checks', 'Reservas')}
      {b('clientes', 'users', 'Clientes')}
    </nav>
  );
}

function OutOfScope({ label }) {
  return (
    <div className="ad-panel ad-empty">
      <span className="ad-empty__ic"><Icon name="layers" size={24} /></span>
      <h2>{label}</h2>
      <p style={{ maxWidth: 420 }}>Esta área não foi desenhada neste kit. Componha-a com os mesmos padrões: StatCard, Table, Tabs e Dialog.</p>
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, BottomNav, OutOfScope, AD_NAV: NAV.concat(NAV2) });
})();
