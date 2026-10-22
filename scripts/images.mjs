/**
 * Recorta as fotos oficiais da Prime (design/originais/) e gera WebP em public/img/fotos/.
 * As fotos chegaram como posts do Instagram (~600-650 px de largura, com textos e balões embutidos):
 * cada recorte pega só a área limpa da foto e nunca amplia além do tamanho natural.
 *
 * Rode com `npm run images` sempre que trocar um original. Precisa do `sharp` (devDependency).
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => join(root, 'design', 'originais', f);
const out = join(root, 'public', 'img', 'fotos');

/** nome -> arquivo de origem, recorte (px do original) e larguras extras menores para o srcset. */
const crops = {
  // Hero: a foto inteira (sem texto embutido). Aperto de mãos na quadra, placa DGI/EQI ao fundo.
  'aperto-de-maos': { file: '3.png', rect: { left: 0, top: 0, width: 651, height: 806 }, smaller: [400] },
  // Aulas: o saque visto de cima (P&B), sem o logo do canto e sem o "Nunca jogou padel?" de baixo.
  saque: { file: '9.png', rect: { left: 0, top: 72, width: 646, height: 530 }, smaller: [400] },
  // CTA final: raquetes e bolas na grama, abaixo da caixa verde do post.
  raquetes: { file: '11.png', rect: { left: 0, top: 515, width: 620, height: 334 }, smaller: [400] },
  // Comunidade: jogadora amarrando o tênis, abaixo do balão "Bora jogar hoje?" e acima do logo.
  'amarrando-o-tenis': { file: '8.png', rect: { left: 0, top: 296, width: 651, height: 500 }, smaller: [400] },
  // Loja: a West Padel por dentro, abaixo do balão.
  'loja-west-padel': { file: 'image.png', rect: { left: 0, top: 150, width: 599, height: 662 }, smaller: [400] },
  // Professores: retratos 4:5 entre os balões dos posts. O do Dorotóvio vem do post "Conheça nosso professor" (4.png).
  'prof-dorotovio': { file: '4.png', rect: { left: 120, top: 168, width: 330, height: 412 }, smaller: [] },
  'prof-gustavo': { file: '6.png', rect: { left: 214, top: 128, width: 172, height: 214 }, smaller: [] },
  // Começa abaixo da faixa amarela do patrocinador que aparece no canto de cima.
  'prof-eduardo': { file: '7.png', rect: { left: 205, top: 142, width: 189, height: 236 }, smaller: [] },
  // Prime Cup: o cartaz oficial inteiro (é a arte do evento, com o texto dele).
  'prime-cup-primavera-2026': { file: '2.png', rect: { left: 0, top: 0, width: 631, height: 787 }, smaller: [400] },
  // 1º Open Prime Padel: o cartaz oficial inteiro (25 a 28 de junho, R$ 12.000 em premiações).
  'open-prime-padel': { file: '13.png', rect: { left: 0, top: 0, width: 639, height: 853 }, smaller: [400] },
  // Day Use de 5 de setembro: o cartaz oficial inteiro.
  'day-use': { file: '12.png', rect: { left: 0, top: 0, width: 703, height: 873 }, smaller: [400] },
};

await mkdir(out, { recursive: true });

for (const [name, { file, rect, smaller }] of Object.entries(crops)) {
  const base = sharp(src(file)).extract(rect);
  await base.clone().webp({ quality: 82, effort: 6 }).toFile(join(out, `${name}.webp`));
  for (const w of smaller) {
    await base.clone().resize({ width: w }).webp({ quality: 80, effort: 6 }).toFile(join(out, `${name}-${w}.webp`));
  }
  console.log(`${name}: ${rect.width}x${rect.height}${smaller.length ? ` (+${smaller.join(', ')})` : ''}`);
}
