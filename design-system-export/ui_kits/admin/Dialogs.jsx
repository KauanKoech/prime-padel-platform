(() => {
const { Icon, Button, Dialog, Badge, Avatar, Input, Select, SegmentedControl } = window.PrimePadelDesignSystem_093c26;
const { COURTS, STATUS, hm, fmt, courtName } = window.AD;

function BookingDrawer({ booking, onClose, onCheckin, onCancel, onConfirmPay }) {
  const [confirm, setConfirm] = React.useState(false);
  if (!booking) return null;
  const b = booking, st = STATUS[b.status];
  const isRes = b.status !== 'aula' && b.status !== 'bloqueado';
  const footer = isRes && b.status !== 'cancelada' ? (
    <>
      <Button variant="ghost" onClick={() => setConfirm(true)} style={{ color: 'var(--pp-danger-600)', marginRight: 'auto' }}>Cancelar reserva</Button>
      <Button variant="secondary">Remarcar</Button>
      {b.status === 'pendente' ? <Button onClick={() => onConfirmPay(b)} iconLeft={<Icon name="check" size={18} />}>Confirmar pagamento</Button>
        : <Button disabled={b.checkin} onClick={() => onCheckin(b)} iconLeft={<Icon name="scan-line" size={18} />}>{b.checkin ? 'Check-in feito' : 'Marcar check-in'}</Button>}
    </>
  ) : null;
  return (
    <>
      <Dialog open variant="drawer" onClose={onClose} title={b.client} description={b.id + ' · ' + courtName(b.court)} footer={footer}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge tone={st.tone} dot>{st.label}</Badge>
          {b.plan ? <Badge tone="solid">{b.plan}</Badge> : null}
          {b.checkin && b.status === 'confirmada' ? <Badge tone="ball">Check-in feito</Badge> : null}
        </div>
        <div className="ad-sep" />
        <div className="ad-dl">
          <div><small>Data</small><b>Ter, 13 out</b></div>
          <div><small>Horário</small><b>{hm(b.start)}–{hm(b.start + b.dur)}</b></div>
          <div><small>Quadra</small><b>{courtName(b.court)}</b></div>
          <div><small>Duração</small><b>{b.dur} min</b></div>
          {isRes ? <><div><small>Valor</small><b>{fmt(b.value)}</b></div><div><small>Pagamento</small><b>{b.pay}</b></div></> : null}
        </div>
        {isRes ? (
          <>
            <div className="ad-sep" />
            <div className="ad-who"><Avatar name={b.client} size="md" /><div style={{ flex: 1 }}><b>{b.client}</b><small>{b.phone}</small></div><Button variant="secondary" size="sm" iconLeft={<Icon name="message-circle" size={16} />}>WhatsApp</Button></div>
            <div className="ad-sep" />
            <Input label="Observação interna" optional multiline rows={3} placeholder="Visível só para a equipe" />
          </>
        ) : null}
      </Dialog>
      <Dialog open={confirm} onClose={() => setConfirm(false)} title="Cancelar reserva?" description={b.client + ' · ' + hm(b.start) + ' · ' + courtName(b.court)} width={440}
        footer={<><Button variant="secondary" onClick={() => setConfirm(false)}>Voltar</Button><Button variant="danger" onClick={() => { setConfirm(false); onCancel(b); }}>Cancelar reserva</Button></>}>
        <p style={{ font: '400 15px/1.5 var(--font-sans)', color: 'var(--text-secondary)' }}>O horário volta a ficar livre na agenda. Com mais de 24h de antecedência, o valor vira crédito para o cliente.</p>
      </Dialog>
    </>
  );
}

function NewBookingDialog({ open, preset, onClose, onCreate }) {
  const [f, setF] = React.useState({});
  React.useEffect(() => { if (open) setF({ client: '', phone: '', court: (preset && preset.court) || 'q1', start: (preset && preset.start) || 19 * 60, dur: '90', pay: 'Pix' }); }, [open]);
  if (!open) return null;
  const set = (p) => setF(prev => Object.assign({}, prev, p));
  const startOpts = Array.from({ length: 31 }, (_, i) => 7 * 60 + i * 30).map(v => ({ value: String(v), label: hm(v) }));
  const peak = f.start >= 18 * 60 && f.start < 22 * 60;
  const base = (f.court === 'q1' ? (peak ? 180 : 150) : (peak ? 160 : 130));
  const value = Math.round(base * Number(f.dur || 90) / 60);
  return (
    <Dialog open onClose={onClose} title="Nova reserva" description="Ter, 13 out" width={540}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button disabled={!f.client} onClick={() => onCreate({ client: f.client, phone: f.phone || '—', court: f.court, start: Number(f.start), dur: Number(f.dur), value, pay: f.pay, status: f.pay === 'Pix' ? 'pendente' : 'confirmada' })}>Criar reserva · {fmt(value)}</Button></>}>
      <div style={{ display: 'grid', gap: 14 }}>
        <Input label="Cliente" placeholder="Nome do cliente" value={f.client || ''} onChange={e => set({ client: e.target.value })} iconLeft={<Icon name="user" size={17} />} />
        <Input label="WhatsApp" optional placeholder="(11) 90000-0000" value={f.phone || ''} onChange={e => set({ phone: e.target.value })} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Select label="Quadra" value={f.court} onChange={e => set({ court: e.target.value })} options={COURTS.map(c => ({ value: c.id, label: c.name }))} />
          <Select label="Início" value={String(f.start)} onChange={e => set({ start: Number(e.target.value) })} options={startOpts} />
        </div>
        <div className="pp-field"><span className="pp-field__label">Duração</span><SegmentedControl block options={[{ value: '60', label: '60 min' }, { value: '90', label: '90 min' }, { value: '120', label: '120 min' }]} value={f.dur} onChange={v => set({ dur: v })} /></div>
        <Select label="Pagamento" value={f.pay} onChange={e => set({ pay: e.target.value })} options={['Pix', 'Cartão', 'Na arena']} hint={f.pay === 'Pix' ? 'Enviaremos o link de pagamento por WhatsApp' : undefined} />
      </div>
    </Dialog>
  );
}

Object.assign(window, { BookingDrawer, NewBookingDialog });
})();
