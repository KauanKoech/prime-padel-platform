# Direção visual: Prime Padel (contrato)

Contrato das etapas de código, acabamento e verificação da landing. Reescrito em 2026-10-17 depois do retorno do responsável ("muitos espaços em branco, landing sem conteúdo, opaca") e da chegada das fotos oficiais da arena. Modo direto: sem checkpoint de três opções. Divergências do `DESIGN.md` estão em `docs/DECISIONS.md`.

## Direção escolhida

**"A quadra à noite"**: a Prime vista como as referências mostram um clube de padel, escura, com fotografia grande e títulos pesados, mas com as cores e as fotos da própria arena. Carta da `design-taste-frontend`: "The place carries it" (seed 3), com o hero "Menu column, sticky photograph" e as seções "Prices like a menu", "Close-up with column card", "Visit card" e "Contact as the headline", adaptadas ao pedido e à resolução das fotos.

**Ideia:** nesta página, **as fotos tiradas nas quadras da Prime (a parede da DGI/EQI, a rede, a grama sintética, os professores com a camisa da casa)** viram **painéis de foto do tamanho de um pôster, cada um carregando o conteúdo da seção**. A concorrente da rua ao lado não tem essas fotos nem esses patrocinadores.

**A coisa viva:** escolher a quadra na lista de preços e seguir para os horários já com quadra e duração preenchidas (agendamento simulado).

Pedido do usuário e referências vencem a carta e o design system quando conflitam (ordem: pedido > referências > identidade do briefing > sugestões das skills).

## Paleta

| Token | Hex | Papel |
| --- | --- | --- |
| `--pp-green-950` | `#121D17` | Chão da página (escuro), cabeçalho, rodapé |
| `--pp-green-900` | `#1B2B22` | Painéis escuros (hero, professores, faixa de valores) |
| `--pp-green-800` | `#25392E` | Cartões sobre o escuro, Prime Cup |
| `--pp-green-700` | `#324D3E` | Marca: campos verdes (Onde estamos), botões no claro |
| `--pp-green-200` | `#CEDCD2` | Texto secundário sobre verde |
| `--pp-cream` | `#F7F5EF` | Texto principal no escuro; chão das seções claras (quadras, loja) |
| `--pp-ink` | `#141A16` | Texto no claro |
| `--pp-ball` | `#D8EC4C` | Acento: a palavra de destaque do título e o botão principal da vista |
| `--pp-ball-ink` | `#2C3308` | Texto sobre o amarelo |

Contraste (WCAG): creme/verde-950 16,9 · creme/verde-900 14,6 · creme/verde-800 11,8 · verde-200/verde-900 11,0 · bola/verde-950 13,4 · bola/verde-900 11,6 · bola-ink/bola 10,4 · tinta/creme 16,9 · verde-700/creme 8,6 · neutro-600/creme 5,6. Todos AA. Sobre fotos, o texto fica sobre véu escuro neutro (`rgba(12, 18, 14, .55-.85)`), conferido nas capturas.

No claro, a palavra de destaque não pode ser amarela (1,2:1 sobre creme): vira marca-texto, fundo `--pp-ball` com texto `--pp-ink`.

## Tipografia

- **Instrument Sans** (variável 400-700, self-hosted): títulos de impacto em 700, `letter-spacing: -0.035em`, entrelinha 0,95-1; corpo, rótulos e botões.
- **DM Serif Display**: números e preços (quadras, contadores dos professores, valores) e nomes dos professores. Mantém a voz serifada da marca onde ela ajuda a ler dados.
- **Pinyon Script**: uma vez, "Prime" em "Nos vemos na Prime." (≥ 40 px).
- Escala: h1 `clamp(2.375rem, 4.6vw + 1.3rem, 5.5rem)` no celular (duas linhas) e `clamp(2.75rem, 7vw, 6.5rem)` no desktop, em três linhas (até 104 px: **exceção ao limite de 64 px**, porque as referências e o pedido pedem títulos enormes e o painel do hero precisa da massa), h2 `clamp(2.25rem, 3.6vw + 0.6rem, 4.25rem)`, h3 `clamp(1.375rem, 0.8vw + 1.1rem, 1.75rem)`, corpo `clamp(1rem, 0.15vw + 0.97rem, 1.125rem)`, apoio 14 px. Sobrelinha em caixa-alta só para datas e categorias (como no cartaz da Prime Cup).

## Estilo

- Página escura em verde quase preto, com duas seções claras em creme (quadras e loja) para respirar e mostrar a marca. Campos chapados; profundidade por passo de tom (950 → 900 → 800) e pelas fotos.
- Fotos em painéis com raio de 20 px; cartões com 20 px; botões em pílula. Um raio de painel na página inteira.
- Sem vidro, sem gradiente colorido, sem brilho. Véu escuro neutro sob texto em foto (não é gradiente colorido). Sombra só no que flutua (janela de agendamento, botão do WhatsApp).
- Palavra de destaque no amarelo da bola em cada título de seção, como nas referências; o botão principal da vista também é amarelo. É o acento da vista; o resto fica em creme e verde.

## Movimento

- **Hero (CSS):** texto sobe em sequência (560 ms), a foto entra com escala 1,06 → 1 (1,4 s), uma vez.
- **Títulos de seção (`SplitTitle`, adaptado do SplitText do React Bits):** palavras sobem de dentro de uma máscara, 60 ms entre palavras, uma vez ao entrar na tela.
- **Blocos (`Reveal`):** sobem 16 px com opacidade, 320 ms, 70 ms entre partes.
- **Números reais (`CountUp`, React Bits):** 5 quadras, 3/5/31 anos dos professores contam de 0 ao valor ao entrar na tela; o HTML pré-renderizado já traz o valor final.
- **Cartaz da Prime Cup (`TiltedCard`, React Bits):** inclinação de até 8° seguindo o ponteiro, só com mouse (`hover: hover` e `pointer: fine`).
- **Abas dos eventos (`SmoothTabs`, kokonutui smooth-tab):** pílula desliza até a aba escolhida; troca de arte com crossfade de 220 ms.
- **Botões (`slide-text-button`, kokonutui):** o rótulo sobe e é trocado por uma cópia no hover e no foco.
- **Fotos:** escala 1,04 no hover dos cartões (só com mouse).
- **Rolagem:** Lenis (`lerp: 0.085`, âncoras com offset 0: o `html` tem `scroll-padding-top`).
- **Proibido:** parallax, loops infinitos (sem marquee, sem crossfade automático), vidro.
- **Movimento reduzido:** Lenis desligado, `MotionConfig reducedMotion="user"`, CSS zera durações, `[data-reveal]` visível, contadores mostram o valor final, sem inclinação.

## Tratamento das fotos

Fonte: posts oficiais da Prime em `design/originais/` (~600-650 px de largura). Recortes em `scripts/images.mjs` (`npm run images`), WebP em `public/img/fotos/` com versão de 400 px para o `srcset`. **Nunca exibidas acima do tamanho natural em px CSS**: por isso os painéis têm largura máxima e não há foto esticada em tela cheia.

| Foto | Recorte | Onde | Tamanho máx. |
| --- | --- | --- | --- |
| `aperto-de-maos` (3.png) | inteira | painel direito do hero | 651 × 806 |
| `saque` (9.png) | sem logo e sem o título embutido | Aulas | 646 × 530 |
| `prof-dorotovio` (4.png) | retrato acima do balão | cartão do professor | 330 × 412 |
| `prof-gustavo` (6.png), `prof-eduardo` (7.png) | retrato entre os balões | cartões | 172 × 214, 200 × 250 |
| `prime-cup-primavera-2026` (2.png) | cartaz inteiro | Prime Cup | 631 × 787 |
| `loja-west-padel` (image.png) | abaixo do balão | Loja | 599 × 662 |
| `amarrando-o-tenis` (8.png) | abaixo do balão, acima do logo | Comunidade | 651 × 500 |
| `raquetes` (11.png) | abaixo da caixa verde | CTA final (nítida) + fundo desfocado e escurecido | 620 × 334 |

Artes antigas mantidas: `open-prime-padel.webp` e `day-use.webp` (abas de eventos).

## Estrutura de seções

1. **Hero** (`#topo`, escuro): painel esquerdo com h1 "Seu próximo jogo começa na Prime." em três linhas (destaque "Prime."), frase, "Ver horários" (abre o agendamento), "Quadras e valores" e quatro fatos (5 quadras, 1h ou 1h30, R$ 140 a 190 por quadra, 3 professores). Painel direito: foto do aperto de mãos com barra creme ("Aberto todos os dias" e endereço). No celular a foto vem primeiro com o h1 por cima, sobre véu.
2. **Faixa de valores** (escuro): quatro itens com ícone, a partir do post "Aqui você aprende do zero": quadras, aulas para todos os níveis e idades, professores capacitados, estrutura premium e loja.
3. **Quadras** (`#quadras`, creme): lista de preços como cardápio (cinco quadras, nome, desenho da quadra, durações e preços), painel da quadra escolhida com durações e "Ver horários desta quadra", aviso da agenda em demonstração.
4. **Aulas** (`#aulas`, escuro): foto do saque; "Nunca jogou padel?" e "Aqui você aprende do zero." com os três itens do post; WhatsApp para pedir aula e link para os professores.
5. **Professores** (`#professores`, verde 900): três cartões (foto, contador real de anos, nome, fatos e níveis atendidos, WhatsApp para aula com o professor). No celular, carrossel horizontal com encaixe.
6. **Prime Cup e eventos** (`#eventos`, verde 800): abas Prime Cup / 1º Open / Day Use; cartaz com inclinação; datas e categorias da Prime Cup Primavera 2026 (já realizada, 1 a 4 de outubro); Instagram e WhatsApp.
7. **Loja** (`#loja`, creme): foto da West Padel e "Você já conhece a West Padel?", produtos em letra grande, Instagram da loja.
8. **Comunidade** (`#comunidade`, escuro): "O melhor da semana quase sempre começa com uma mensagem:" e o balão "Bora jogar hoje?"; foto da jogadora; ver horários e WhatsApp.
9. **Onde estamos** (`#onde-estamos`, verde 700): mapa de círculos com o pino, cartão com endereço, horários (hoje destacado depois de montar), contatos, rota e agendar.
10. **CTA final** (escuro com as raquetes desfocadas ao fundo): "Sua quadra está esperando." com a foto nítida das raquetes, ver horários e WhatsApp.
11. **Rodapé:** o Instagram como linha de contato gigante, logo, navegação, endereço e aviso de demonstração.
12. **Agendamento** (janela modal, claro): sem mudanças de fluxo.

Seção "Como agendar" removida: o aviso de demonstração foi para o painel das quadras e para o rodapé.

## Referências

**Aproveitado:** fundo escuro e fotografia grande em painéis (as duas); títulos enormes em grotesca pesada com a palavra de destaque no amarelo de bola (as duas); faixa de valores com ícones (referência 1, "More than just a game"); cartões de professor com foto e números (referência 1 "Real people" e referência 2 "Train like a pro"); CTA final com foto (as duas); botão principal com cor de bola.

**Deixado de fora:** marquee com o nome do clube (loop infinito, proibido pelo `DESIGN.md` e pelo pedido); fotos sangrando a tela inteira no desktop (as fotos da Prime têm ~650 px e ficariam borradas; viraram painéis no tamanho natural); números de estrutura e avaliações das referências ("2.8k", "4.8", "700+ alunos": a Prime não informou números assim); assinatura manuscrita e textos das referências.

## Fontes do conteúdo

`docs/PRODUCT.md`, briefing, landing anterior e os posts oficiais em `design/originais/` (professores, aulas, Prime Cup Primavera 2026, comunidade, loja). Nenhum site externo consultado.

## Acabamento

Preenchido na etapa de acabamento (impeccable).
