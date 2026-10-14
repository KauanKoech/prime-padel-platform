import { lazy, Suspense, useState } from 'react';
import { Accordion, Badge, Button, Dialog, Eyebrow, Icon, IconButton, Logo } from '../design-system';
import { arena, mapsUrl } from './config/arena';
import { content as c } from './config/content';
import { duration, money } from './lib/format';
import './app.css';

const Booking = lazy(() => import('./features/booking/Booking'));
const Arrow = () => <Icon name="arrow-up-right" size={18} />;
function Heading({ eyebrow, title, accent, description }: { eyebrow:string; title:string; accent:string; description?:string }) {
 return <div className="section-heading"><Eyebrow variant="plain">{eyebrow}</Eyebrow><h2>{title}<br/><em>{accent}</em></h2>{description && <p>{description}</p>}</div>;
}
function ExternalLink({href,children,className='text-link'}:{href:string;children:React.ReactNode;className?:string}){
 return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<Arrow/></a>;
}
export default function App(){
 const [menu,setMenu]=useState(false);
 const [booking,setBooking]=useState<{courtId?:string;key:number}|null>(null);
 const [gallery,setGallery]=useState<number|null>(null);
 const [privacy,setPrivacy]=useState(false);
 const openBooking=(courtId?:string)=>setBooking({courtId,key:Date.now()});
 return <>
 <a className="skip-link" href="#conteudo">{c.header.skip}</a>
 <header className="site-header" id="inicio">
  <div className="container header-inner">
   <a href="#inicio" aria-label={c.header.home}><Logo className="header-logo"/></a>
   <nav className="desktop-nav" aria-label={c.header.navLabel}>{c.nav.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</nav>
   <div className="header-actions"><Button onClick={()=>openBooking()} iconRight={<Icon name="arrow-up-right" size={16}/>}>{c.header.book}</Button><IconButton className="menu-toggle" label={c.header.menu} aria-expanded={menu} icon={<Icon name="menu"/>} onClick={()=>setMenu(true)}/></div>
  </div>
 </header>
 <main id="conteudo" tabIndex={-1}>
  <section className="hero container" aria-labelledby="hero-title">
   <div className="hero-copy">
    <div className="overline hero-eyebrow"><span className="brand-dot"/>{c.hero.eyebrow}</div>
    <h1 id="hero-title">{c.hero.title}<br/><em>{c.hero.accent}</em></h1>
    <p className="hero-description">{c.hero.body}</p>
    <div className="actions"><Button size="lg" onClick={()=>openBooking()} iconRight={<Icon name="arrow-right" size={18}/>}>{c.hero.primary}</Button><a className="text-link" href="#arena">{c.hero.secondary}<Arrow/></a></div>
    <p className="micro hero-note"><Icon name="info" size={16}/>{c.hero.note}</p>
   </div>
   <div className="hero-art">
    <div className="art-meta overline"><span>{c.hero.panelTop}</span><Icon name="arrow-up-right"/></div>
    <div className="court-drawing" aria-hidden="true"><span className="court-net"/><span className="court-line"/><span className="court-ball"/></div>
    <Logo color="white" className="hero-logo" style={{height:'auto',width:'65%'}}/>
    <div className="art-footer"><span className="overline">{c.hero.panelBottom}</span><span className="micro">{c.hero.location}</span></div>
   </div>
   <div className="hero-bottom">{c.hero.stats.map(s=><div className="hero-stat" key={s.value}><strong>{s.value}</strong><span>{s.label}</span></div>)}<a className="hero-scroll" href="#arena" aria-label={c.hero.scroll}><Icon name="arrow-right"/></a></div>
  </section>

  <section id="arena" className="section about-section">
   <div className="container"><div className="split-intro"><Heading {...c.about}/><div className="intro-copy"><p>{c.about.body}</p><a href="#contato" className="text-link">{c.about.link}<Arrow/></a></div></div>
   <div className="features">{c.about.features.map((f,i)=><article className="feature" key={f.title}><div className="feature-top"><span className="feature-icon"><Icon name={f.icon} size={24}/></span><span className="micro">{'0'+(i+1)}</span></div><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></div>
  </section>

  <section id="quadras" className="section courts-section">
   <div className="container"><div className="split-intro"><Heading {...c.courts}/><p className="intro-copy">{c.courts.description}</p></div>
   <div className="court-list">{arena.courts.map((court,i)=><article className="court-row" key={court.id}><div className="court-number">{'0'+(i+1)}</div><div className="court-info"><span className="overline">{c.courts.prefix}</span><h3>{court.name}</h3></div><div className="court-rates">{court.rates.map(rate=><div key={rate.durationMinutes}><strong>{money(rate.priceCents)}</strong><span> / {duration(rate.durationMinutes)}</span></div>)}<small>{c.courts.unit}</small></div><Button variant="secondary" onClick={()=>openBooking(court.id)} aria-label={c.courts.action+' '+court.name} iconRight={<Arrow/>}>{c.courts.action}</Button></article>)}</div>
   <p className="micro section-note"><Icon name="info" size={16}/>{c.courts.note}</p>
   <aside className="store-band"><div className="store-icon"><Icon name="shopping-bag" size={24}/></div><div><span className="overline">{c.courts.storeLabel}</span><h3>{arena.store.name}</h3><p>{arena.store.description}</p></div><ExternalLink href={arena.store.url}>{c.courts.storeAction}</ExternalLink></aside>
   </div>
  </section>

  <section className="section gallery-section" id="galeria">
   <div className="container"><div className="split-intro"><Heading {...c.gallery}/><p className="intro-copy">{c.gallery.description}</p></div>
   <div className="gallery-grid">{arena.gallery.map((item,i)=><figure key={item.src}><button className="gallery-image" onClick={()=>setGallery(i)} aria-label={c.gallery.open+': '+item.category}><img src={item.src} alt={item.alt} loading="lazy" width={i===0?731:i===1?694:477} height={i===0?842:i===1?543:327}/><span className="gallery-expand"><Icon name="plus"/></span></button><figcaption><span className="overline">{item.category}</span><h3>{item.title}</h3></figcaption></figure>)}</div>
   <p className="micro gallery-disclaimer">{c.gallery.disclaimer}</p></div>
  </section>

  <section id="como-funciona" className="section how-section">
   <div className="container"><Heading {...c.how}/><div className="steps-grid">{c.how.steps.map((s,i)=><article key={s.title}><span className="step-number">{'0'+(i+1)}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></div>
  </section>
  <section id="agendamento" className="section demo-section">
   <div className="container demo-layout"><div><Eyebrow variant="onBrand">{c.demo.eyebrow}</Eyebrow><h2>{c.demo.title}<br/><em>{c.demo.accent}</em></h2><p>{c.demo.description}</p><Button size="lg" variant="onBrand" onClick={()=>openBooking()} iconRight={<Icon name="arrow-right" size={18}/>}>{c.demo.action}</Button><p className="micro">{c.demo.note}</p></div><div className="demo-preview"><div className="preview-top"><Icon name="calendar-days"/><Badge tone="brand" dot>{c.demo.badge}</Badge></div><span className="overline">{c.demo.previewLabel}</span><h3>{c.demo.previewTitle}</h3><p>{c.demo.previewText}</p><div className="preview-steps">{c.demo.previewSteps.map((s,i)=><span key={s}><b>{i+1}</b>{s}</span>)}</div><Button variant="secondary" block onClick={()=>openBooking()} iconRight={<Arrow/>}>{c.hero.primary}</Button></div></div>
  </section>

  <section id="eventos" className="section events-section">
   <div className="container event-layout"><div className="event-art"><span className="overline">{c.events.archive}</span><Logo variant="open" color="white" style={{height:'auto',width:'60%'}}/><span className="micro">{c.events.note}</span></div><div><Heading {...c.events}/><p>{c.events.description}</p><ExternalLink href={arena.contact.instagram}>{c.events.action}</ExternalLink></div></div>
  </section>
  <section className="section testimonials-section">
   <div className="container"><div className="split-intro"><Heading {...c.testimonials}/><p className="intro-copy micro">{c.testimonials.note}</p></div><div className="quotes">{arena.testimonials.items.map(item=><figure key={item.quote}><Badge tone="neutral">{c.testimonials.badge}</Badge><blockquote>{item.quote}</blockquote><figcaption>{item.label}</figcaption></figure>)}</div></div>
  </section>
  <section id="duvidas" className="section faq-section">
   <div className="container faq-layout"><Heading {...c.faq}/><Accordion items={c.faq.items} defaultOpen={null}/></div>
  </section>
  <section id="contato" className="section contact-section">
   <div className="container"><div className="split-intro"><Heading {...c.contact}/><p className="intro-copy">{c.contact.description}</p></div><div className="contact-grid">
    <div className="address-card"><Icon name="map-pin" size={24}/><span className="overline">{c.contact.locationLabel}</span><h3>{c.contact.address}</h3><address>{arena.address.street}<br/>{arena.address.district}<br/>{arena.address.cityState}<br/>{arena.address.postalCode} · {arena.address.country}</address><ExternalLink href={mapsUrl}>{c.contact.maps}</ExternalLink></div>
    <div className="hours-card"><h3>{c.contact.hours}</h3><dl>{arena.hours.map(h=><div key={h.day}><dt>{h.label}</dt><dd>{h.open} — {h.close}</dd></div>)}</dl><p className="micro">{c.contact.hoursNote}</p></div>
    <div className="contact-links"><ExternalLink href={arena.contact.whatsappUrl}><Icon name="message-circle"/><span>{c.contact.whatsapp}<small>{arena.contact.whatsappDisplay}</small></span></ExternalLink><ExternalLink href={arena.contact.instagram}><Icon name="instagram"/><span>{c.contact.instagram}<small>{arena.contact.instagramHandle}</small></span></ExternalLink></div>
   </div></div>
  </section>
  <section className="final-cta"><div className="container"><Eyebrow variant="onBrand">{c.final.eyebrow}</Eyebrow><h2>{c.final.title}<br/><em>{c.final.accent}</em></h2><div className="actions"><Button size="lg" variant="onBrand" onClick={()=>openBooking()} iconRight={<Icon name="arrow-right" size={18}/>}>{c.final.action}</Button><ExternalLink href={arena.contact.whatsappUrl}>{c.final.secondary}</ExternalLink></div><p className="micro">{c.final.note}</p></div></section>
 </main>
 <footer className="site-footer"><div className="container"><div className="footer-main"><div><Logo color="white"/><p>{c.footer.tagline}</p></div><div><h2 className="overline">{c.footer.navigation}</h2><nav aria-label={c.footer.navigation}>{c.nav.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</nav></div><div><h2 className="overline">{c.footer.social}</h2><ExternalLink href={arena.contact.instagram}>{arena.contact.instagramHandle}</ExternalLink><ExternalLink href={arena.contact.whatsappUrl}>{arena.contact.whatsappDisplay}</ExternalLink></div></div><div className="footer-bottom"><span>{c.footer.legal}</span><button onClick={()=>setPrivacy(true)}>{c.footer.privacy}</button><a href="#inicio">{c.footer.back}<Icon name="arrow-up-right" size={16}/></a></div></div></footer>
 <Dialog open={menu} onClose={()=>setMenu(false)} title={c.header.navLabel}><nav className="mobile-nav" aria-label={c.header.navLabel}>{c.nav.map(n=><a key={n.href} href={n.href} onClick={()=>setMenu(false)}>{n.label}<Arrow/></a>)}</nav></Dialog>
 <Dialog open={gallery!==null} onClose={()=>setGallery(null)} title={gallery!==null?arena.gallery[gallery].category:c.gallery.dialog} description={c.gallery.disclaimer}>{gallery!==null&&<><img className="lightbox-image" src={arena.gallery[gallery].src} alt={arena.gallery[gallery].alt}/><div className="lightbox-controls"><IconButton label={c.gallery.previous} icon={<Icon name="chevron-left"/>} onClick={()=>setGallery((gallery+arena.gallery.length-1)%arena.gallery.length)}/><span>{gallery+1} / {arena.gallery.length}</span><IconButton label={c.gallery.next} icon={<Icon name="chevron-right"/>} onClick={()=>setGallery((gallery+1)%arena.gallery.length)}/></div></>}</Dialog>
 <Dialog open={privacy} onClose={()=>setPrivacy(false)} title={c.footer.privacyTitle}><p>{c.footer.privacyBody}</p></Dialog>
 {booking&&<Suspense fallback={<Dialog open title={c.header.demo} onClose={()=>setBooking(null)}><p role="status">Carregando demonstração…</p></Dialog>}><Booking key={booking.key} initialCourt={booking.courtId} onClose={()=>setBooking(null)}/></Suspense>}
 </>;
}
