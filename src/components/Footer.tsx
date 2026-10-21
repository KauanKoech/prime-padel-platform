import { useEffect, useState } from 'react';
import { arena, whatsapp } from '../content/arena';
import { site } from '../content/site';
import { InstagramIcon, MessageCircle } from './Icons';
import { LiquidGlassLayer } from './LiquidGlassLayer';
import { Logo } from './Logo';

export function Footer() {
  const f = site.footer;
  return (
    <footer className="site-footer on-brand">
      <div className="container">
        <p className="site-footer__follow">{f.follow}</p>
        <a className="site-footer__big" href={arena.contact.instagram.url} target="_blank" rel="noopener">
          {arena.contact.instagram.handle}
        </a>
      </div>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo tone="white" height={64} />
          <p>{f.tagline}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Rodapé">
          <ul>
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__contact">
          <p>
            {arena.address.street}
            <br />
            {arena.address.district}, {arena.address.cityState}
          </p>
          <ul className="site-footer__social">
            <li>
              <a href={arena.contact.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram ${arena.contact.instagram.handle}`}>
                <InstagramIcon size={20} />
              </a>
            </li>
            <li>
              <a href={whatsapp(site.whatsappFloat.message)} target="_blank" rel="noopener" aria-label={site.whatsappFloat.label}>
                <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {f.year} {arena.name}
        </p>
        <p>{f.demo}</p>
        <a href="#topo">{f.top}</a>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const [overHero, setOverHero] = useState(true);
  const [overCta, setOverCta] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    // Some enquanto o hero está na tela (no desktop cobriria a faixa de endereço da foto).
    const hero = document.getElementById('topo');
    const heroIo = new IntersectionObserver(([e]) => setOverHero(e.intersectionRatio > 0.35), { threshold: [0, 0.35, 1] });
    if (hero) heroIo.observe(hero);

    const visible = new Set<Element>();
    let io: IntersectionObserver | null = null;
    // Observa só a faixa de 96 px no pé da tela, onde o botão flutuante fica.
    const observe = () => {
      io?.disconnect();
      visible.clear();
      // No desktop o botão fica fora do caminho dos CTAs; só o celular precisa desviar.
      if (!window.matchMedia('(max-width: 959px)').matches) return setOverCta(false);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setOverCta(visible.size > 0);
        },
        { rootMargin: `-${Math.max(0, window.innerHeight - 96)}px 0px 0px 0px` },
      );
      document.querySelectorAll('main .btn, .site-footer a').forEach((el) => io!.observe(el));
    };
    observe();
    window.addEventListener('resize', observe);
    return () => {
      heroIo.disconnect();
      io?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, []);
  const hidden = overHero || overCta;
  return (
    <a
      className={`wa-float${hidden ? ' is-hidden' : ''}`}
      href={whatsapp(site.whatsappFloat.message)}
      target="_blank"
      rel="noopener"
      aria-label={site.whatsappFloat.label}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
    >
      <LiquidGlassLayer className="wa-float__glass" borderRadius={28} borderWidth={0.6} blur={6} distortionScale={-110} />
      <MessageCircle size={26} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
