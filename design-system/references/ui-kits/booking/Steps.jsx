(() => {
const { Icon, IconButton, Button, DateStrip, TimeSlot, CourtCard, Chip, SegmentedControl, Input, Checkbox, Badge } = window.PrimePadelDesignSystem_093c26;
const { DAYS, COURTS, HOURS, PERIODS, ADDONS, isPeak, rate, fmt, hh, taken, freeCount } = window.BK;
const BASE = '../../../';

function StepTime({ b, set }) {
  const court = COURTS.find(c => c.id === b.court);
  const [p0, p1] = PERIODS[b.period];
  const hours = HOURS.filter(h => h >= p0 && h <= p1);
  const free = hours.filter(h => !taken(b.day, b.court, h));
  return (
    <>
      <div className="bk-block">
        <div className="bk-block__head"><div className="bk-block__title">Quando você quer jogar?</div></div>
        <DateStrip days={DAYS} value={b.day} onChange={(day) => set({ day, hour: null })} />
        <SegmentedControl block options={[{ value: '60', label: '60 min' }, { value: '90', label: '90 min' }, { value: '120', label: '120 min' }]} value={String(b.duration)} onChange={(v) => set({ duration: Number(v) })} />
      </div>
      <div className="bk-block">
        <div className="bk-block__head"><div className="bk-block__title">Quadra</div><span style={{ font: '400 13px var(--font-sans)', color: 'var(--text-secondary)' }}>Todas cobertas</span></div>
        <div className="bk-courts">
          {COURTS.map(c => (
            <CourtCard key={c.id} compact name={c.name} tags={c.tags} basePath={BASE} selected={b.court === c.id}
              price={fmt(c.off) + '+'} availability={freeCount(b.day, c.id) + ' horários livres'}
              onClick={() => set({ court: c.id, hour: null })} />
          ))}
        </div>
      </div>
      <div className="bk-block">
        <div className="bk-block__head">
          <div><div className="bk-block__title">Horário</div><div className="bk-block__sub">Preço por {b.duration} min na {court.name}</div></div>
        </div>
        <div className="bk-row">
          {[['manha', 'Manhã', 'sunrise'], ['tarde', 'Tarde', 'sun'], ['noite', 'Noite', 'moon']].map(([k, l, ic]) => (
            <Chip key={k} selected={b.period === k} icon={<Icon name={ic} size={16} />} onClick={() => set({ period: k, hour: null })}>{l}</Chip>
          ))}
        </div>
        {free.length ? (
          <div className="bk-slots">
            {hours.map(h => {
              const t = taken(b.day, b.court, h);
              return <TimeSlot key={h} time={hh(h)} peak={isPeak(h)} meta={t ? 'Reservado' : fmt(rate(court, h) * b.duration / 60)}
                status={t ? 'unavailable' : b.hour === h ? 'selected' : 'available'} onClick={() => set({ hour: h })} />;
            })}
          </div>
        ) : <div className="bk-empty">Nenhum horário livre neste período.<br />Que tal outro turno ou outra quadra?</div>}
        <div className="bk-legend"><span><i style={{ background: 'var(--pp-ball)' }} />Horário nobre (18h–22h)</span><span><i style={{ background: 'var(--pp-neutral-300)' }} />Reservado</span></div>
      </div>
    </>
  );
}

function StepDetails({ b, set }) {
  const setQty = (id, d) => { const a = ADDONS.find(x => x.id === id); const v = Math.max(0, Math.min(a.max, (b.addons[id] || 0) + d)); set({ addons: Object.assign({}, b.addons, { [id]: v }) }); };
  return (
    <>
      <div className="bk-block">
        <div className="bk-block__head"><div><div className="bk-block__title">Quem vai jogar?</div><div className="bk-block__sub">Opcional — ajuda a recepção no check-in.</div></div></div>
        <div className="bk-grid2">
          {[0, 1, 2, 3].map(i => <Input key={i} size="sm" placeholder={i === 0 ? 'Você' : 'Jogador ' + (i + 1)} iconLeft={<Icon name="user" size={16} />} value={b.players[i] || ''} onChange={(e) => { const p = b.players.slice(); p[i] = e.target.value; set({ players: p }); }} />)}
        </div>
      </div>
      <div className="bk-block">
        <div className="bk-block__head"><div><div className="bk-block__title">Extras</div><div className="bk-block__sub">Retire na recepção ao chegar.</div></div></div>
        <div>
          {ADDONS.map(a => (
            <div key={a.id} className="bk-addon">
              <span className="bk-addon__ic"><Icon name={a.icon} size={20} /></span>
              <div className="bk-addon__txt"><div className="bk-addon__name">{a.name}</div><div className="bk-addon__price">{fmt(a.price)} cada</div></div>
              <div className="bk-qty">
                <IconButton variant="secondary" size="md" icon={<Icon name="minus" size={18} />} label={'Menos ' + a.name} disabled={!b.addons[a.id]} onClick={() => setQty(a.id, -1)} />
                <b>{b.addons[a.id] || 0}</b>
                <IconButton variant="secondary" size="md" icon={<Icon name="plus" size={18} />} label={'Mais ' + a.name} onClick={() => setQty(a.id, 1)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bk-block">
        <Input label="Observações" optional multiline rows={3} placeholder="Ex.: aniversário, preciso de bola extra…" value={b.notes} onChange={(e) => set({ notes: e.target.value })} />
      </div>
    </>
  );
}

function StepPayment({ b, set, errors }) {
  const opts = [['pix', 'Pix', 'Aprovação imediata', 'qr-code', true], ['card', 'Cartão de crédito', 'Visa, Master, Elo', 'credit-card'], ['arena', 'Pagar na arena', 'Garantia com cartão', 'store']];
  return (
    <>
      <div className="bk-block">
        <div className="bk-block__head"><div className="bk-block__title">Seus dados</div></div>
        <Input label="Nome completo" placeholder="Como devemos te chamar?" value={b.name} onChange={(e) => set({ name: e.target.value })} error={errors.name} />
        <div className="bk-grid2">
          <Input label="WhatsApp" placeholder="(11) 90000-0000" inputMode="tel" iconLeft={<Icon name="phone" size={18} />} value={b.phone} onChange={(e) => set({ phone: e.target.value })} error={errors.phone} hint="A confirmação chega por aqui" />
          <Input label="E-mail" optional placeholder="voce@email.com" type="email" value={b.email} onChange={(e) => set({ email: e.target.value })} />
        </div>
      </div>
      <div className="bk-block">
        <div className="bk-block__head"><div className="bk-block__title">Pagamento</div></div>
        <div className="bk-pay" role="radiogroup">
          {opts.map(([k, n, d, ic, rec]) => (
            <div key={k} role="radio" aria-checked={b.pay === k} tabIndex={0} className={'bk-payopt' + (b.pay === k ? ' bk-payopt--on' : '')} onClick={() => set({ pay: k })}>
              <span className="bk-payopt__ic"><Icon name={ic} size={20} /></span>
              <div className="bk-payopt__txt"><div className="bk-payopt__name">{n}{rec ? <Badge tone="brand" size="sm">Recomendado</Badge> : null}</div><div className="bk-payopt__desc">{d}</div></div>
              <span className="bk-dot" />
            </div>
          ))}
        </div>
        {b.pay === 'card' ? (
          <div className="bk-grid2">
            <div style={{ gridColumn: '1/-1' }}><Input label="Número do cartão" placeholder="0000 0000 0000 0000" inputMode="numeric" iconLeft={<Icon name="credit-card" size={18} />} /></div>
            <Input label="Validade" placeholder="MM/AA" /><Input label="CVV" placeholder="123" />
          </div>
        ) : null}
        <div className="bk-note"><Icon name="info" size={18} /><span><b>Cancelamento grátis até 24h antes.</b> Depois disso, o valor fica como crédito na arena.</span></div>
        <Checkbox label="Li e concordo com a política de reservas" checked={b.terms} onChange={(e) => set({ terms: e.target.checked })} />
        {errors.terms ? <span style={{ font: '400 13px var(--font-sans)', color: 'var(--pp-danger-600)', marginTop: -8 }}>{errors.terms}</span> : null}
      </div>
    </>
  );
}

function StepDone({ b, onRestart }) {
  const { court, total } = window.BK.calc(b);
  return (
    <>
      <div className="bk-done">
        <span className="bk-done__circle" />
        <span className="bk-done__check"><Icon name="check" size={30} strokeWidth={2.25} /></span>
        <h1>Reserva confirmada!</h1>
        <p>Tudo certo, {(b.name || 'jogador').split(' ')[0]}. Enviamos os detalhes para o seu WhatsApp.</p>
        <div className="bk-ticket">
          <div><small>Data</small><b>{window.BK.longDate(b.day)}</b></div>
          <div><small>Horário</small><b>{hh(b.hour)} · {b.duration} min</b></div>
          <div><small>Quadra</small><b>{court.name}</b></div>
          <div><small>Total pago</small><b>{fmt(total)}</b></div>
        </div>
      </div>
      <div className="bk-block">
        <Button variant="primary" size="lg" block iconLeft={<Icon name="calendar-plus" size={18} />}>Adicionar à agenda</Button>
        <Button variant="secondary" size="lg" block iconLeft={<Icon name="share-2" size={18} />}>Enviar para o grupo</Button>
        <Button as="a" href="../landing/index.html" variant="ghost" block onClick={onRestart}>Voltar ao início</Button>
      </div>
    </>
  );
}

Object.assign(window, { StepTime, StepDetails, StepPayment, StepDone });
})();
