/*
 * TiltedCard: adaptado de React Bits — TiltedCard (https://reactbits.dev, licença MIT).
 * O cartão inclina na direção do ponteiro, com mola, e cresce um pouco enquanto o mouse está sobre ele.
 * Mudanças: TypeScript e Motion (`m.div`, `useSpring`); recebe qualquer conteúdo (aqui, o cartaz do evento)
 * em vez de uma imagem fixa; sem brilho, sombra, verso, giroscópio ou flutuação (o design system proíbe
 * brilho e loops); só reage a mouse (`hover: hover` e `pointer: fine`) e fica parado com movimento reduzido.
 * Em repouso não há rotação nem perspectiva, então o conteúdo não borra.
 */
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { m, useSpring, useTransform } from 'motion/react';

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export function TiltedCard({ children, className, amplitude = 8, scaleOnHover = 1.03 }: { children: ReactNode; className?: string; amplitude?: number; scaleOnHover?: number }) {
  const enabled = useRef(false);
  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);
  // Perspectiva e rotação só existem enquanto o cartão está inclinado; parado, `transform: none`.
  const transform = useTransform([rx, ry, scale], ([x, y, s]: number[]) =>
    Math.abs(x) < 0.01 && Math.abs(y) < 0.01 && Math.abs(s - 1) < 0.001 ? 'none' : `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`,
  );

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      enabled.current = fine.matches && !reduce.matches;
    };
    sync();
    fine.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * amplitude * 2);
    rx.set(-ny * amplitude * 2);
    scale.set(scaleOnHover);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    scale.set(1);
  };

  return (
    <div className={['tilt', className].filter(Boolean).join(' ')} onPointerMove={onMove} onPointerLeave={onLeave}>
      <m.div className="tilt__body m" style={{ transform }}>
        {children}
      </m.div>
    </div>
  );
}
