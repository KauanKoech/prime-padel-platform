import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLenis } from 'lenis/react';
import { site } from '../content/site';
import { useBookingTrigger } from '../features/booking/BookingContext';
import { ButtonLink } from './Button';
import { Menu, X } from './Icons';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useBookingTrigger();
  const lenis = useLenis();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const d = menu.current;
    if (!d) return;
    if (menuOpen && !d.open) {
      d.showModal();
      lenis?.stop();
    } else if (!menuOpen && d.open) {
      d.close();
    }
  }, [menuOpen, lenis]);

  const onMenuClosed = () => {
    setMenuOpen(false);
    lenis?.start();
  };

  // Fecha o menu e só então rola: com o menu aberto o Lenis está parado e ignoraria a âncora.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    menu.current?.close();
    setMenuOpen(false);
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target);
    } else target.scrollIntoView();
    history.replaceState(null, '', href);
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__in">
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
          <ButtonLink variant="ball" size="sm" className="only-desktop" {...trigger()}>
            {site.header.book}
          </ButtonLink>
          <ButtonLink variant="ball" size="sm" className="only-mobile" {...trigger()}>
            {site.header.bookShort}
          </ButtonLink>
          <button type="button" className="icon-btn icon-btn--on-brand only-mobile" aria-label={site.header.menu} aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog ref={menu} className="menu on-brand" aria-label={site.header.navLabel} onClose={onMenuClosed}>
        <div className="menu__top">
          <Logo tone="white" height={36} />
          <button type="button" className="icon-btn icon-btn--on-brand" aria-label={site.header.closeMenu} onClick={() => setMenuOpen(false)}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={site.header.menuNavLabel}>
          <ul>
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => goTo(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink
          variant="ball"
          size="lg"
          block
          {...trigger()}
          onClick={(e) => {
            const t = trigger();
            setMenuOpen(false);
            t.onClick(e);
          }}
        >
          {site.header.book}
        </ButtonLink>
      </dialog>
    </header>
  );
}
