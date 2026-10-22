import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { ButtonLink } from './Button';
import { CardNav } from './CardNav';
import { LiquidGlassLayer } from './LiquidGlassLayer';
import { Logo } from './Logo';

/** Cabeçalho: pílula de vidro flutuante. No desktop os links ficam nela; no celular ela vira o CardNav. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const trigger = useBookingTrigger();
  const lenis = useLenis();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const goTo = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView();
    history.replaceState(null, '', href);
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <div className="site-header__in">
          <LiquidGlassLayer className="site-header__glass" borderRadius={36} borderWidth={0.5} blur={9} distortionScale={-120} />
          <a href="#topo" className="site-header__logo" aria-label={site.header.home}>
            <Logo tone="white" height={40} eager />
          </a>
          <nav className="site-nav" aria-label={site.header.navLabel}>
            <ul>
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__actions">
            <ButtonLink variant="ball" size="sm" {...trigger()}>
              {site.header.book}
            </ButtonLink>
          </div>
        </div>

        <CardNav
          logo={
            <a href="#topo" className="site-header__logo" aria-label={site.header.home}>
              <Logo tone="white" height={34} />
            </a>
          }
          action={
            <ButtonLink variant="ball" size="sm" {...trigger()}>
              {site.header.bookShort}
            </ButtonLink>
          }
          items={site.menuCards}
          footer={(close) => (
            <ButtonLink
              variant="ball"
              size="lg"
              block
              {...trigger()}
              onClick={(e) => {
                close();
                trigger().onClick(e);
              }}
            >
              {site.header.book}
            </ButtonLink>
          )}
          labels={{ open: site.header.menu, close: site.header.closeMenu, nav: site.header.menuNavLabel }}
          onNavigate={goTo}
        />
      </div>
    </header>
  );
}
