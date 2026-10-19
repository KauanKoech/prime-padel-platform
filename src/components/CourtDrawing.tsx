/**
 * Quadra de padel vista de cima, em traço fino (o motivo gráfico da página enquanto não há fotos da arena).
 * Proporções oficiais: 20 m x 10 m, linhas de saque a 6,95 m da rede, linha central entre elas.
 * Escala: 1 unidade = 10 cm. Desenho genérico de quadra, não a planta da arena.
 */
type Props = {
  orientation?: 'vertical' | 'horizontal';
  /** Posição da bola em unidades da quadra vertical (x 0-100, y 0-200). Sem bola quando omitido. */
  ball?: { x: number; y: number } | null;
  /** Anima o traço uma vez ao montar (CSS, classe .court--draw). */
  draw?: boolean;
  className?: string;
  title?: string;
};

const NET = 100;
const SERVICE = 30.5; // 3,05 m da parede de fundo
const PAD = 6;

export function CourtDrawing({ orientation = 'vertical', ball, draw = false, className, title }: Props) {
  const h = orientation === 'horizontal';
  // troca x/y no desenho horizontal
  const p = (x: number, y: number) => (h ? [y, x] : [x, y]);
  const line = (x1: number, y1: number, x2: number, y2: number) => {
    const [a, b] = p(x1, y1);
    const [c, d] = p(x2, y2);
    return { x1: a, y1: b, x2: c, y2: d };
  };
  const [w, hgt] = h ? [200, 100] : [100, 200];
  const ballPos = ball ? p(ball.x, ball.y) : null;

  return (
    <svg
      className={['court', draw && 'court--draw', className].filter(Boolean).join(' ')}
      viewBox={`${-PAD} ${-PAD} ${w + PAD * 2} ${hgt + PAD * 2}`}
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect className="court__wall" x="0" y="0" width={w} height={hgt} pathLength={1} />
      <line className="court__line" {...line(0, SERVICE, 100, SERVICE)} pathLength={1} />
      <line className="court__line" {...line(0, 200 - SERVICE, 100, 200 - SERVICE)} pathLength={1} />
      <line className="court__line" {...line(50, SERVICE - 2, 50, 200 - SERVICE + 2)} pathLength={1} />
      <line className="court__net" {...line(-4, NET, 104, NET)} pathLength={1} />
      {ballPos && <circle className="court__ball" cx={ballPos[0]} cy={ballPos[1]} r={3.4} />}
    </svg>
  );
}
