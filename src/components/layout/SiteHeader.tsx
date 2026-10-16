"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { BrandLogo } from "../brand/BrandPanel";
import styles from "./site-layout.module.css";

const navigation = [
  ["quadras", "Quadras"], ["como-funciona", "Como funciona"], ["eventos", "Eventos"],
  ["loja", "Loja"], ["localizacao", "Localização"],
] as const;

export function SectionLink({ section, children, className, onFollow }: {
  section: string; children: ReactNode; className?: string; onFollow?: () => void;
}) {
  return (
    <a href={`/#${section}`} className={className} onClick={event => {
      if (window.location.pathname !== "/") return;
      const destination = document.getElementById(section);
      if (!destination) return;
      event.preventDefault();
      onFollow?.();
      window.history.pushState(window.history.state, "", `/#${section}`);
      const heading = destination.querySelector<HTMLElement>("h1, h2");
      (heading ?? destination).focus({ preventScroll: true });
      destination.scrollIntoView({ block: "start" });
    }}>{children}</a>
  );
}

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLAnchorElement>(null);
  const nav = useRef<HTMLElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const savedOverflow = useRef<string | null>(null);
  const [compact, setCompact] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const restoreScroll = useCallback(() => {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
  }, []);

  const closeMenu = useCallback((target?: HTMLElement | null) => {
    dialog.current?.close();
    restoreScroll();
    setMenuOpen(false);
    target?.focus({ preventScroll: true });
  }, [restoreScroll]);

  useEffect(() => {
    let disposed = false;
    const update = () => {
      if (disposed || !row.current || !nav.current || !brand.current || !cta.current) return;
      const rowStyle = getComputedStyle(row.current);
      const available = row.current.clientWidth - parseFloat(rowStyle.paddingLeft) - parseFloat(rowStyle.paddingRight);
      const needed = brand.current.offsetWidth + nav.current.offsetWidth + cta.current.offsetWidth +
        2 * parseFloat(rowStyle.columnGap);
      const nextCompact = window.innerWidth < 1200 || needed > available;
      setCompact(nextCompact);
      document.documentElement.style.setProperty("--site-header-height", `${header.current?.offsetHeight ?? 72}px`);
      if (!nextCompact && dialog.current?.open) {
        closeMenu();
        // Focus after the formerly inert desktop links become available.
        requestAnimationFrame(() => { if (!disposed) nav.current?.querySelector("a")?.focus(); });
      }
    };
    const observer = new ResizeObserver(update);
    [row.current, nav.current, brand.current, cta.current].forEach(element => {
      if (element) observer.observe(element);
    });
    window.addEventListener("resize", update);
    void document.fonts.ready.then(update);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", update);
      restoreScroll();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, [closeMenu, restoreScroll]);

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]"));
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  }

  return (
    <header className={styles.header} ref={header}>
      <div className={styles.headerInner} ref={row}>
        <Link href="/" ref={brand} aria-label="Prime Padel — início" className={styles.brand}>
          <BrandLogo />
        </Link>
        <nav aria-label="Principal" ref={nav} inert={compact} aria-hidden={compact}
          className={`${styles.nav} ${compact ? styles.compactNav : ""}`}>
          {navigation.map(([id, label]) => <SectionLink key={id} section={id}>{label}</SectionLink>)}
        </nav>
        <div className={styles.actions}>
          <Link href="/agendamento" prefetch={false} ref={cta} className={`button ${styles.headerCta}`}>Ver horários</Link>
          {compact && <button className={styles.menuButton} ref={trigger} aria-expanded={menuOpen}
            aria-controls="site-menu" aria-haspopup="dialog" onClick={() => {
              savedOverflow.current = document.body.style.overflow;
              document.body.style.overflow = "hidden";
              dialog.current?.showModal();
              setMenuOpen(true);
            }}>Menu</button>}
        </div>
      </div>
      <dialog id="site-menu" className={styles.menu} ref={dialog} aria-label="Navegação principal"
        onKeyDown={containFocus} onCancel={event => { event.preventDefault(); closeMenu(trigger.current); }}
        onClose={() => { restoreScroll(); setMenuOpen(false); }}>
        <div className={styles.menuTop}>
          <span className={styles.brand}><BrandLogo tone="white" /></span>
          <button onClick={() => closeMenu(trigger.current)} className={styles.closeButton}>Fechar menu</button>
        </div>
        <nav aria-label="Menu">
          {navigation.map(([id, label]) =>
            <SectionLink key={id} section={id} onFollow={() => closeMenu()}>{label}</SectionLink>)}
        </nav>
        <Link href="/agendamento" prefetch={false} className="button button-light" onClick={() => closeMenu()}>Ver horários</Link>
      </dialog>
    </header>
  );
}
