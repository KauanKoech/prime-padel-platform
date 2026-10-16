import Link from "next/link";
import { arena, openingHours } from "../../content/arena";
import { courts, offers } from "../../content/courts";
import { formatDuration, formatPrice } from "../../domain/format";
import { BrandPanel } from "../../components/brand/BrandPanel";
import { SectionLink } from "../../components/layout/SiteHeader";
import styles from "./landing.module.css";

const weekdayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const demonstration = "Agendamento demonstrativo. Nenhuma reserva real será feita.";
const steps = [
  "Escolha data, quadra e horário",
  "Preencha os dados de demonstração",
  "Revise e simule a solicitação",
];
const instagram = `https://www.instagram.com/${arena.instagram.slice(1)}/`;

export function LandingSections() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroPanel}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">{arena.city}</p>
            <h1 id="hero-title" tabIndex={-1}>Padel em Lages,<br /> <em>na {arena.name}.</em></h1>
            <p className={styles.heroLead}>Conheça as quadras, confira os valores e experimente o agendamento.</p>
            <div className={styles.heroActions}>
              <Link href="/agendamento" prefetch={false} className="button button-light">Ver horários</Link>
              <SectionLink section="quadras" className="button button-outline-light">Conhecer as quadras</SectionLink>
            </div>
            <p className={styles.demo}>{demonstration}</p>
          </div>
          <BrandPanel />
        </div>
      </section>

      <section id="quadras" className={styles.section} aria-labelledby="courts-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">Quadras</p>
            <h2 id="courts-title" tabIndex={-1}>Quadras e valores</h2>
            <p>Valores por quadra e duração</p>
          </div>
          <div className={styles.courts}>
            {courts.map((court, index) => (
              <article key={court.id} className={styles.court}>
                <span className={styles.courtNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{court.name}</h3>
                <ul className={styles.offers}>
                  {offers.filter(offer => offer.courtId === court.id).map(offer => (
                    <li key={offer.id}>{formatDuration(offer.durationMinutes)} — <strong>{formatPrice(offer.priceCents)}</strong></li>
                  ))}
                </ul>
                <Link href={`/agendamento?quadra=${court.id}`} prefetch={false} className="button button-secondary">Ver horários desta quadra</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className={`${styles.section} ${styles.warm}`} aria-labelledby="how-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">Como funciona</p>
            <h2 id="how-title" tabIndex={-1}>Experimente o agendamento</h2>
            <p>{demonstration}</p>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step}>
              <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </li>)}
          </ol>
        </div>
      </section>

      <section id="eventos" className={styles.section} aria-labelledby="events-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">Eventos</p>
            <h2 id="events-title" tabIndex={-1}>{arena.events.join(" e ")}</h2>
            <p>Datas e inscrições ainda não confirmadas nesta página.</p>
          </div>
          <div className={styles.events}>
            {arena.events.map(event => <article className={styles.event} key={event}>
              <div className={styles.eventCircle} aria-hidden="true" />
              <h3>{event}</h3>
            </article>)}
          </div>
          <a href={instagram} className={styles.textLink}>Acompanhar a Prime Padel no Instagram</a>
        </div>
      </section>

      <section id="loja" className={`${styles.section} ${styles.warm}`} aria-labelledby="store-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.sectionHead}>
            <p className="eyebrow">Loja interna</p>
            <h2 id="store-title" tabIndex={-1}>{arena.store.name}</h2>
          </div>
          <div className={styles.storeCopy}>
            <p>{arena.store.description}</p>
            <a className="button button-secondary" href={`https://www.instagram.com/${arena.store.instagram.slice(1)}/`}>
              Conhecer a West Padel Store no Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="localizacao" className={styles.section} aria-labelledby="location-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.location}>
            <p className="eyebrow">Localização e contato</p>
            <h2 id="location-title" tabIndex={-1}>Encontre a Prime Padel</h2>
            <p className={styles.city}>{arena.city}</p>
            <address>{arena.address}</address>
            <a href={instagram} className={styles.textLink}>{arena.instagram}</a>
            <p className={styles.pending}>WhatsApp: contato a confirmar</p>
          </div>
          <div className={styles.hours}>
            <h3>Horários informados</h3>
            <ul>
              {[1, 2, 3, 4, 5, 6, 0].map(weekday => {
                const hours = openingHours.find(day => day.weekday === weekday)!;
                return <li key={weekday}><span>{weekdayNames[weekday]}:</span>{" "}
                  <strong>{hours.status === "pending" ? "horário a confirmar" : `${hours.opens}–${hours.closes}`}</strong>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="experimente" className={styles.lastSection} aria-labelledby="try-title">
        <div className="container">
          <div className={styles.ctaPanel}>
            <div>
              <p className="eyebrow">Agendamento demonstrativo</p>
              <h2 id="try-title" tabIndex={-1}>Escolha uma quadra.<br /><em>Experimente o agendamento.</em></h2>
              <p>{demonstration}</p>
            </div>
            <Link href="/agendamento" prefetch={false} className="button button-light">Ver horários</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
