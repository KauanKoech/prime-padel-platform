(() => {
const { Button, IconButton, Icon, Logo, Eyebrow, TimeSlot, Badge } = window.PrimePadelDesignSystem_093c26;
const BASE = '../../../';

function LandingHeader({ onMenu }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={'lp-header' + (scrolled ? ' lp-header--scrolled' : '')}>
      <div className="lp-container lp-header__in">
        <a href="#top" aria-label="Prime Padel — início" style={{ display: 'inline-flex' }}><Logo color="green" height={38} basePath={BASE} /></a>
        <nav className="lp-nav">
          <a href="#quadras" className="is-active">Quadras</a><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a><a href="#eventos">Eventos</a><a href="#duvidas">Dúvidas</a>
        </nav>
        <div className="lp-header__actions">
          <Button as="a" href="../admin/index.html" variant="ghost" size="sm" className="lp-only-desktop">Entrar</Button>
          <Button as="a" href="../booking/index.html" size="sm">Reservar</Button>
          <IconButton className="lp-only-mobile" variant="secondary" icon={<Icon name="menu" size={20} />} label="Menu" onClick={onMenu} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }) {
  return (
    <div className="lp-menu">
      <div className="lp-menu__top"><Logo color="white" height={34} basePath={BASE} /><IconButton variant="onBrand" icon={<Icon name="x" size={20} />} label="Fechar" onClick={onClose} /></div>
      <nav onClick={onClose}>
        <a href="#quadras">Quadras</a><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a><a href="#eventos">Eventos</a><a href="#duvidas">Dúvidas</a>
      </nav>
      <div className="lp-menu__foot">
        <Button as="a" href="../booking/index.html" variant="onBrand" size="lg" block>Reservar quadra</Button>
        <Button as="a" href="../admin/index.html" variant="outlineOnBrand" size="lg" block>Entrar</Button>
      </div>
    </div>
  );
}

function Hero() {
  const [pick, setPick] = React.useState('19:00');
  const slots = [['18:00', 'R$ 180', true], ['19:00', 'R$ 180', true], ['20:30', 'R$ 160', false]];
  return (
    <section className="lp-hero" id="top">
      <div className="lp-hero__panel">
        <span className="lp-hero__circle" /><span className="lp-hero__circle lp-hero__circle--2" />
        <div className="lp-hero__copy">
          <Eyebrow variant="onBrand">Arena de padel</Eyebrow>
          <h1 className="lp-display">Sua quadra,<br /><i>seu tempo.</i></h1>
          <p className="lp-hero__lead">Quadras cobertas, reserva em segundos e um lugar feito para ficar depois do jogo.</p>
          <div className="lp-hero__ctas">
            <Button as="a" href="../booking/index.html" variant="onBrand" size="lg" iconRight={<Icon name="arrow-right" size={18} />}>Reservar quadra</Button>
            <Button as="a" href="#planos" variant="outlineOnBrand" size="lg">Ver planos</Button>
          </div>
        </div>
        <div className="lp-hero__aside">
          <div className="lp-avail">
            <div className="lp-avail__top">
              <div><div className="lp-avail__title">Livres hoje</div><div className="lp-avail__sub">Qui, 15 out · Quadra 1</div></div>
              <Badge tone="success" dot>Ao vivo</Badge>
            </div>
            <div className="lp-avail__slots">
              {slots.map(([t, m, p]) => <TimeSlot key={t} time={t} meta={m} peak={p} status={pick === t ? 'selected' : 'available'} onClick={() => setPick(t)} />)}
            </div>
            <Button as="a" href="../booking/index.html" block iconRight={<Icon name="arrow-right" size={18} />}>Reservar às {pick}</Button>
          </div>
        </div>
        <div className="lp-facts">
          {[['umbrella', 'Quadras cobertas'], ['calendar-clock', 'Reserva online 24h'], ['beer', 'Bar e lounge'], ['graduation-cap', 'Aulas e clínicas']].map(([i, t]) => (
            <div key={t} className="lp-fact"><span className="ic"><Icon name={i} size={18} /></span>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LandingHeader, MobileMenu, Hero });

})();
