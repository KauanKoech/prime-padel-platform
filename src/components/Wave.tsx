/**
 * Emenda em onda entre duas seções: fica no pé da seção e é pintada com a cor da seção seguinte
 * (`to`: a = verde quase preto, b = verde da marca, c = creme), então o fundo animado de cima continua
 * visível até a crista e a troca de cor acontece numa curva, não num corte reto.
 * O `d` inicial é o desenho parado; o hook `useWaves` redesenha as camadas a cada quadro (maré lenta que
 * acelera um pouco com a rolagem). Mesma técnica das divisórias do projeto jk-software.
 */
export type Tone = 'a' | 'b' | 'c';

const STILL = 'M0 111L0 62C240 30 500 18 760 40s480 58 680 20L1440 111Z';

export function Wave({ to }: { to: Tone }) {
  return (
    <svg className={`wave wave--to-${to}`} viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-wave="">
      <path className="wave__fill wave__back" d={STILL} />
      <path className="wave__fill wave__front" d={STILL} />
      <path className="wave__crest" d="" />
    </svg>
  );
}
