import { cacheLife } from "next/cache";
import Link from "next/link";
import { arena } from "../../content/arena";
import { ARENA_TIME_ZONE } from "../../domain/arena-time";
import { BrandLogo } from "../brand/BrandPanel";
import { SectionLink } from "./SiteHeader";
import styles from "./site-layout.module.css";

async function Copyright() {
  "use cache";
  cacheLife("hours");
  const year = new Intl.DateTimeFormat("pt-BR", { timeZone: ARENA_TIME_ZONE, year: "numeric" }).format(new Date());
  return <p>© {year} {arena.name}. Todos os direitos reservados.</p>;
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" aria-label="Prime Padel — início" className={styles.footerBrand}><BrandLogo tone="white" /></Link>
            <p>{arena.city}</p>
          </div>
          <address>{arena.address}</address>
          <nav aria-label="Rodapé">
            <SectionLink section="quadras">Quadras e valores</SectionLink>
            <SectionLink section="localizacao">Localização e contato</SectionLink>
            <a href={`https://www.instagram.com/${arena.instagram.slice(1)}/`}>{arena.instagram}</a>
          </nav>
        </div>
        <div className={styles.footerBottom}><Copyright /></div>
      </div>
    </footer>
  );
}
