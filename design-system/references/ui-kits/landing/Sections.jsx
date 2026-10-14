(() => {
const { Button, Icon, Logo, Eyebrow, Card, CourtCard, Badge, Accordion, IconButton } = window.PrimePadelDesignSystem_093c26;
const LP_BASE = '../../';

function HowItWorks() {
  const steps = [
    ['calendar-days', 'Escolha o dia e o horário', 'Veja a agenda em tempo real e toque no horário que combina com você.'],
    ['layout-grid', 'Selecione a quadra', 'Todas cobertas. A panorâmica tem vidro em todo o entorno.'],
    ['qr-code', 'Pague por Pix ou cartão', 'Confirmação imediata no seu WhatsApp, com lembrete antes do jogo.'],
  ];
  return (
    <section className="lp-section" id="como-funciona">
      <div className="lp-container">
        <div className="lp-head lp-head--center">
          <Eyebrow icon={<Icon name="sparkles" size={14} />}>Como funciona</Eyebrow>
          <h2 className="lp-h1">Reserve sua quadra <i>em três passos</i></h2>
          <p className="lp-lead">Sem ligação, sem espera. Leva menos de um minuto.</p>
        </div>
        <div className="lp-steps">
          {steps.map(([ic, t, d], i) => (
            <div key={t} className="lp-step">
              <span className="lp-step__num">{i + 1}</span>
              <span className="lp-step__ic"><Icon name={ic} size={22} /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courts() {
  const courts = [
    { name: 'Quadra 1', tags: ['Coberta', 'Panorâmica'], price: 'R$ 180', avail: '4 horários livres hoje', flag: <Badge tone="ball" size="sm">Mais reservada</Badge> },
    { name: 'Quadra 2', tags: ['Coberta', 'Vidro'], price: 'R$ 160', avail: '6 horários livres hoje' },
    { name: 'Quadra 3', tags: ['Coberta', 'Vidro'], price: 'R$ 160', avail: '2 horários livres hoje' },
  ];
  return (
    <section className="lp-section lp-section--warm" id="quadras">
      <div className="lp-container">
        <div className="lp-split">
          <div className="lp-head">
            <Eyebrow icon={<Icon name="layout-grid" size={14} />}>Nossas quadras</Eyebrow>
            <h2 className="lp-h1">Piso, vidro e luz <i>de competição</i></h2>
          </div>
          <Button as="a" href="../booking/index.html" variant="secondary" iconRight={<Icon name="arrow-right" size={18} />}>Ver agenda completa</Button>
        </div>
        <div className="lp-courts">
          {courts.map(c => (
            <CourtCard key={c.name} name={c.name} tags={c.tags} price={c.price} availability={<><Icon name="circle-check" size={16} />{c.avail}</>} flag={c.flag} basePath={LP_BASE}>
              <Button as="a" href="../booking/index.html" size="sm">Reservar</Button>
            </CourtCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Avulso', desc: 'Para jogar quando der vontade.', price: 'R$ 160', unit: '/ hora', items: ['Reserva online 24h', 'Horário nobre R$ 180 (18h–22h)', 'Cancelamento grátis até 24h antes'], cta: 'Reservar', v: 'outlined' },
    { name: 'Mensalista', desc: 'Seu horário fixo, toda semana.', price: 'R$ 590', unit: '/ mês', items: ['1h por semana no mesmo horário', 'Prioridade na renovação', '10% no bar e na loja', 'Convidados pagam avulso'], cta: 'Quero ser mensalista', v: 'brand' },
    { name: 'Pacote 10 horas', desc: 'Flexível, sem compromisso de dia.', price: 'R$ 1.400', unit: '/ pacote', items: ['Use em até 90 dias', 'Qualquer quadra e horário', 'Compartilhe com seu grupo'], cta: 'Comprar pacote', v: 'outlined' },
  ];
  return (
    <section className="lp-section" id="planos">
      <div className="lp-container">
        <div className="lp-head lp-head--center">
          <Eyebrow icon={<Icon name="tag" size={14} />}>Planos</Eyebrow>
          <h2 className="lp-h1">Do jogo avulso <i>ao horário fixo</i></h2>
          <p className="lp-lead">Preço por quadra, não por pessoa. Divida com seu quarteto.</p>
        </div>
        <div className="lp-plans">
          {plans.map(p => (
            <Card key={p.name} variant={p.v} padding="lg" className="lp-plan">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div><div className="lp-plan__name">{p.name}</div><div className="lp-plan__desc">{p.desc}</div></div>
                {p.v === 'brand' ? <Badge tone="ball" size="sm">Favorito</Badge> : null}
              </div>
              <div className="lp-plan__price">{p.price}<small>{p.unit}</small></div>
              <ul>{p.items.map(i => <li key={i}><span className="ic"><Icon name="check" size={18} /></span>{i}</li>)}</ul>
              <Button as="a" href="../booking/index.html" variant={p.v === 'brand' ? 'onBrand' : 'primary'} block>{p.cta}</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const evs = [
    { img: 'assets/brand/open-prime-padel-post.jpg', tag: 'Torneio', date: 'Inscrições encerradas', title: '1º Open Prime Padel', desc: 'Categoria open masculina. Confira os atletas confirmados.' },
    { img: 'assets/brand/prime-cup-logo.jpg', tag: 'Torneio', date: 'Primavera 2026', title: 'Prime Cup', desc: 'Nosso circuito da estação, com chaves por categoria.' },
    { img: 'assets/brand/day-use-post.jpg', tag: 'Day Use', date: '05 de setembro', title: 'Feriado com Day Use', desc: 'Quadras em sistema rotativo das 14h às 23h. R$ 50 por pessoa.' },
  ];
  return (
    <section className="lp-section lp-section--warm" id="eventos">
      <div className="lp-container">
        <div className="lp-split">
          <div className="lp-head">
            <Eyebrow icon={<Icon name="trophy" size={14} />}>Eventos</Eyebrow>
            <h2 className="lp-h1">Torneios, day use <i>e encontros</i></h2>
          </div>
          <Button as="a" href="#" variant="secondary" iconLeft={<Icon name="instagram" size={18} />}>@primepadel</Button>
        </div>
        <div className="lp-events">
          {evs.map(e => (
            <a key={e.title} href="#" className="lp-event">
              <div className="lp-event__img"><img src={LP_BASE + e.img} alt={e.title} /></div>
              <div className="lp-event__meta"><Badge tone="brand" size="sm">{e.tag}</Badge><span style={{ font: '600 11px var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{e.date}</span></div>
              <div><h3>{e.title}</h3><p style={{ marginTop: 6 }}>{e.desc}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    { q: 'Posso cancelar ou remarcar minha reserva?', a: 'Sim. Até 24h antes do horário o cancelamento é grátis e o valor volta como crédito na arena. Depois disso, fale com a recepção pelo WhatsApp.' },
    { q: 'O valor é por pessoa ou por quadra?', a: 'Por quadra. O valor da hora cobre até 4 jogadores — dá para dividir no Pix com o seu grupo.' },
    { q: 'Vocês alugam raquetes e vendem bolas?', a: 'Sim. Raquetes por R$ 20 cada e tubos de bolas na recepção. Você pode incluir tudo já na reserva.' },
    { q: 'Tem aula para iniciantes?', a: 'Temos aulas individuais e clínicas em grupo com professores da casa, para todos os níveis.' },
    { q: 'Tem estacionamento?', a: 'Sim, gratuito para quem está jogando.' },
  ];
  return (
    <section className="lp-section" id="duvidas">
      <div className="lp-container lp-faq">
        <div className="lp-head" style={{ marginBottom: 0 }}>
          <Eyebrow icon={<Icon name="message-circle" size={14} />}>Dúvidas</Eyebrow>
          <h2 className="lp-h1">Perguntas <i>frequentes</i></h2>
          <p className="lp-lead">Não achou o que procurava? A gente responde rápido no WhatsApp.</p>
          <Button variant="secondary" iconLeft={<Icon name="message-circle" size={18} />}>Falar no WhatsApp</Button>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="lp-container">
      <div className="lp-cta">
        <span className="lp-hero__circle" />
        <h2>Seu próximo jogo <i>começa aqui.</i></h2>
        <p>Escolha o horário agora e receba a confirmação no WhatsApp.</p>
        <div className="lp-hero__ctas"><Button as="a" href="../booking/index.html" variant="onBrand" size="lg" iconRight={<Icon name="arrow-right" size={18} />}>Reservar quadra</Button></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer__grid">
          <div className="lp-footer__about">
            <Logo color="white" height={48} basePath={LP_BASE} />
            <p>Arena de padel com quadras cobertas, bar e lounge. Aberto todos os dias.</p>
            <div className="lp-footer__social">
              <IconButton variant="onBrand" icon={<Icon name="instagram" size={18} />} label="Instagram" />
              <IconButton variant="onBrand" icon={<Icon name="message-circle" size={18} />} label="WhatsApp" />
              <IconButton variant="onBrand" icon={<Icon name="map-pin" size={18} />} label="Como chegar" />
            </div>
          </div>
          <div><h4>Arena</h4><ul><li><a href="#quadras">Quadras</a></li><li><a href="#planos">Planos</a></li><li><a href="#eventos">Eventos</a></li><li><a href="#">Aulas</a></li></ul></div>
          <div><h4>Reservas</h4><ul><li><a href="../booking/index.html">Reservar quadra</a></li><li><a href="#">Minhas reservas</a></li><li><a href="#duvidas">Política de cancelamento</a></li></ul></div>
          <div><h4>Horário</h4><ul><li><a href="#">Seg a sex · 6h às 23h</a></li><li><a href="#">Sáb e dom · 7h às 22h</a></li></ul></div>
        </div>
        <div className="lp-footer__bottom"><span>© 2026 Prime Padel</span><span>Termos · Privacidade</span></div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, Courts, Pricing, Events, Faq, CtaBand, Footer });

})();
