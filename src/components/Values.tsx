import type { ComponentType, SVGProps } from 'react';
import { site } from '../content/site';
import { Award, CourtIcon, GraduationCap, ShoppingBag } from './Icons';
import { Reveal } from './Motion';

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const icons: Record<string, Icon> = { court: CourtIcon, learn: GraduationCap, coach: Award, premium: ShoppingBag };

/** Faixa de valores logo depois do hero (referência 1, "More than just a game"), com a copy do post "Aqui você aprende do zero". */
export function Values() {
  const v = site.values;
  return (
    <section className="values" aria-label={v.label}>
      <ul className="container values__list">
        {v.items.map((item, i) => {
          const I = icons[item.icon];
          return (
            <Reveal as="li" i={i} key={item.title} className="values__item">
              <I size={28} strokeWidth={1.75} aria-hidden="true" />
              <p>
                <strong>{item.title}</strong> <span className="values__text">{item.text}</span>
              </p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
