(() => {
const COURTS = [{ id: 'q1', name: 'Quadra 1', short: 'Q1' }, { id: 'q2', name: 'Quadra 2', short: 'Q2' }, { id: 'q3', name: 'Quadra 3', short: 'Q3' }];
const NOW = 19 * 60 + 20;
const m = (h, mm) => h * 60 + (mm || 0);
const BOOKINGS = [
  { id: 'R-2041', court: 'q1', start: m(7), dur: 90, client: 'Carlos Menezes', phone: '(11) 99812-4410', status: 'confirmada', value: 225, pay: 'Pix', checkin: true },
  { id: 'R-2042', court: 'q2', start: m(8), dur: 60, client: 'Aula · Prof. Thiago', phone: '—', status: 'aula', value: 0, pay: '—', checkin: true },
  { id: 'R-2043', court: 'q3', start: m(8), dur: 120, client: 'Manutenção do piso', phone: '—', status: 'bloqueado', value: 0, pay: '—' },
  { id: 'R-2044', court: 'q1', start: m(10), dur: 60, client: 'Fernanda Rocha', phone: '(11) 98455-0021', status: 'confirmada', value: 150, pay: 'Cartão', checkin: true },
  { id: 'R-2045', court: 'q2', start: m(12), dur: 90, client: 'Lucas Andrade', phone: '(11) 97700-3388', status: 'confirmada', value: 195, pay: 'Pix', checkin: true },
  { id: 'R-2046', court: 'q3', start: m(14), dur: 60, client: 'Clínica iniciantes', phone: '—', status: 'aula', value: 0, pay: '—', checkin: true },
  { id: 'R-2047', court: 'q1', start: m(16), dur: 90, client: 'Beatriz Saldanha', phone: '(11) 99102-7765', status: 'confirmada', value: 225, pay: 'Pix', checkin: true },
  { id: 'R-2048', court: 'q2', start: m(17), dur: 60, client: 'Rafael Lima', phone: '(11) 98123-0099', status: 'confirmada', value: 130, pay: 'Na arena', checkin: true },
  { id: 'R-2049', court: 'q1', start: m(18, 30), dur: 90, client: 'Marina Couto', phone: '(11) 98765-4321', status: 'confirmada', value: 270, pay: 'Pix', checkin: true, plan: 'Mensalista' },
  { id: 'R-2050', court: 'q2', start: m(18), dur: 120, client: 'Grupo Quinta 18h', phone: '(11) 99001-2233', status: 'confirmada', value: 320, pay: 'Pix', checkin: true, plan: 'Mensalista' },
  { id: 'R-2051', court: 'q3', start: m(19), dur: 90, client: 'Pedro Alves', phone: '(11) 97456-1200', status: 'pendente', value: 240, pay: 'Pix' },
  { id: 'R-2052', court: 'q1', start: m(20), dur: 60, client: 'Júlia Prado', phone: '(11) 99666-4545', status: 'confirmada', value: 180, pay: 'Cartão' },
  { id: 'R-2053', court: 'q3', start: m(20, 30), dur: 90, client: 'Ana Beatriz Torres', phone: '(11) 98231-7788', status: 'pendente', value: 240, pay: 'Pix' },
  { id: 'R-2054', court: 'q2', start: m(21), dur: 90, client: 'Gustavo Reis', phone: '(11) 99344-1010', status: 'confirmada', value: 240, pay: 'Pix' },
  { id: 'R-2055', court: 'q1', start: m(21, 30), dur: 90, client: 'Thiago Nunes', phone: '(11) 98800-5566', status: 'confirmada', value: 270, pay: 'Pix' },
  { id: 'R-2039', court: 'q3', start: m(17), dur: 60, client: 'Renata Prates', phone: '(11) 97001-8899', status: 'cancelada', value: 160, pay: 'Pix' },
];
const CLIENTS = [
  { id: 1, name: 'Marina Couto', phone: '(11) 98765-4321', plan: 'Mensalista', visits: 38, last: 'Hoje', spent: 6840 },
  { id: 2, name: 'Grupo Quinta 18h', phone: '(11) 99001-2233', plan: 'Mensalista', visits: 41, last: 'Hoje', spent: 9120 },
  { id: 3, name: 'Rafael Lima', phone: '(11) 98123-0099', plan: 'Pacote 10h', visits: 17, last: 'Hoje', spent: 2510 },
  { id: 4, name: 'Beatriz Saldanha', phone: '(11) 99102-7765', plan: 'Avulso', visits: 9, last: 'Hoje', spent: 1715 },
  { id: 5, name: 'Pedro Alves', phone: '(11) 97456-1200', plan: 'Avulso', visits: 3, last: '02 out', spent: 480 },
  { id: 6, name: 'Júlia Prado', phone: '(11) 99666-4545', plan: 'Pacote 10h', visits: 12, last: '09 out', spent: 1980 },
  { id: 7, name: 'Fernanda Rocha', phone: '(11) 98455-0021', plan: 'Avulso', visits: 6, last: 'Hoje', spent: 900 },
];
const STATUS = {
  confirmada: { label: 'Confirmada', tone: 'success' },
  pendente: { label: 'Aguardando pagamento', tone: 'warning' },
  aula: { label: 'Aula', tone: 'info' },
  bloqueado: { label: 'Bloqueado', tone: 'neutral' },
  cancelada: { label: 'Cancelada', tone: 'danger' },
};
const hm = (min) => String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
const fmt = (n) => 'R$ ' + n.toLocaleString('pt-BR');
const courtName = (id) => COURTS.find(c => c.id === id).name;
window.AD = { COURTS, NOW, BOOKINGS, CLIENTS, STATUS, hm, fmt, courtName, m };
})();
