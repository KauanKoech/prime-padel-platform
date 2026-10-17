# Direção visual — Prime Padel (contrato)

Contrato das etapas de código, acabamento e verificação. Substitui o checkpoint de três opções: a direção aprovada é o design system da própria Prime Padel (`DESIGN.md` e `design-system-export/`). Quando este arquivo e o design system divergirem, vale o design system; divergências intencionais ficam em `docs/DECISIONS.md`.

## Direção escolhida

**"A quadra como desenho"**, dentro do design system da marca. Sem fotos da arena, a página se apoia em três coisas que só a Prime tem: o logo e a tipografia de pôster da marca, as cinco quadras com nomes de patrocinadores e preço próprio, e as artes reais dos eventos. A quadra de padel vista de cima (20 m × 10 m, linhas de saque a 6,95 m da rede) vira o motivo gráfico em linha fina branca sobre verde, ecoando o círculo e a seta longa dos posts. A bola amarela aparece uma vez por vista, sempre dentro de uma quadra (ou como o pino do endereço).

A coisa viva da página é a escolha de quadra: tocar numa das cinco quadras desenhadas mostra as durações e preços dela e leva aos horários já com quadra e duração preenchidas.

Composição tirada da carta de direção da `design-taste-frontend` ("The split stage", seed 54410796) e adaptada à falta de fotos: hero dividido (texto + painel verde com a quadra), quadras como "tabela" de pôster, passo a passo como comprovante, eventos em placa quadrada com abas, contato como cartão de visita sobre o "alvo" de círculos finos.

## Paleta

| Token | Hex | Papel |
|---|---|---|
| `--pp-green-700` | `#324D3E` | Marca: painéis, botões primários, seções de quadras e contato, estados selecionados |
| `--pp-green-800` | `#25392E` | Placas das quadras, painel da quadra escolhida, fundo das artes |
| `--pp-green-600` | `#3E5E4C` | Frase em itálico do h1, quadra selecionada |
| `--pp-green-950` | `#121D17` | Rodapé |
| `--pp-green-200` | `#CEDCD2` | Texto secundário sobre verde |
| `--pp-ink` | `#141A16` | Texto corrido |
| `--pp-neutral-600/700` | `#5E645F` / `#464C48` | Notas secundárias |
| `--pp-cream` | `#F7F5EF` | Faixas quentes (como agendar, loja, resumo do agendamento) |
| `--pp-white` | `#FFFFFF` | Fundo da página, cartões |
| `--pp-ball` | `#D8EC4C` | Acento: a bola (uma por vista) |
| `--pp-warning-50/600` | `#FBF0DC` / `#9A5F0E` | Selos "a confirmar" e "Demonstração", alerta de conflito |

Contraste verificado (WCAG): tinta/branco 17,66 · verde-700/branco 9,26 · verde-600/branco 7,22 · verde-200/verde-700 6,53 · verde-200/verde-800 8,68 · verde-300/verde-950 8,97 · neutro-600/branco 6,06 · neutro-600/creme 5,56 · neutro-700/creme 8,07 · aviso-600/aviso-50 4,63 · verde-800/verde-50 11,20 · neutro-600/neutro-100 5,25. Todos AA para texto normal.

## Tipografia

- **DM Serif Display** (400 e itálico): h1, h2, nomes e preços, números. Self-hosted em `public/fonts/` (substitutos do Google Fonts definidos pelo design system), com `preload` do romano.
- **Instrument Sans** (variável 400–700): corpo, rótulos, botões, dados (algarismos tabulares).
- **Pinyon Script**: uma única vez, na palavra "Prime" do título "Nos vemos na Prime." (≥ 40 px).
- Escala: display `clamp(2.6rem, 2.2vw + 1.9rem, 4rem)` (h1 ≤ 64 px), h2 `clamp(2.1rem, 1.6vw + 1.5rem, 3.25rem)`, h3 `clamp(1.5rem, .6vw + 1.3rem, 2rem)`, corpo `clamp(1rem, .15vw + .97rem, 1.125rem)`, apoio 14 px, sobrelinha 13 px com +0,14em (só endereços, datas e categorias, como nos posts).
- `font-display: swap` em todas.

## Estilo

- Superfícies chapadas: branco, creme e blocos verdes. Sem gradientes visíveis, sem vidro, sem parallax, sem loops.
- Profundidade por passo de tom (verde-700 → verde-800 → verde-600 selecionado) e por linhas finas brancas (círculos, quadra, seta), como nos posts.
- Cantos do design system: pílula nos botões e abas, 14 px em opções e horários, 20 px em cartões e placas, 28 px no hero e no cartão de contato. O comprovante de "Como agendar" tem cantos retos e borda serrilhada (máscara).
- Sombra só no que flutua: botão de WhatsApp e janela de agendamento.
- Cabeçalho branco sólido (sem desfoque), com filete ao rolar.

## Movimento

- **Hero (CSS, acima da dobra):** título, texto, botões e números sobem 14 px em sequência (560 ms); a quadra se desenha uma vez (traço, 1,1 s) e a bola entra no fim. Sem loop.
- **Abaixo da dobra (Motion, `Reveal` em `Motion.tsx`):** título, texto e bloco de cada seção sobem 16 px com opacidade, 320 ms, atraso de 70 ms entre partes, uma vez.
- **Eventos:** troca de arte com `AnimatePresence` (220 ms, opacidade e escala 0,98 → 1).
- **Controles:** pressão `scale(.98)`, seta do botão desliza 3 px, placas de quadra sobem 3 px no hover.
- **Agendamento:** janela entra com 16 px e opacidade (320 ms); barras de progresso mudam de cor.
- **Rolagem:** Lenis (`lerp: 0.085`, âncoras com offset 0 porque o `html` tem `scroll-padding-top` igual ao cabeçalho + 16 px, que o Lenis respeita).
- **Movimento reduzido:** Lenis desligado, `MotionConfig reducedMotion="user"`, CSS zera durações e força `[data-reveal]` visível.

## Tratamento das imagens

- Não há fotos da arena. Nada de banco de imagens apresentado como a arena.
- Artes reais dos eventos (WebP em `public/img/`): `open-prime-padel.webp` (694×543), `prime-cup.webp` (477×327), `day-use.webp` (731×842). Exibidas inteiras (`object-fit: contain`) numa placa quadrada verde-800, nunca acima do tamanho natural.
- Logo: PNG transparente extraído do JPG original (WebP verde e branco). Rodapé com 64 px de altura.
- Imagem de compartilhamento `og-prime-padel.jpg` (1200×630) montada com logo + quadra desenhada.
- **Espaços para fotos reais (futuro):** o painel verde do hero (`Hero.tsx`, `.hero__panel`) e a placa de eventos são os lugares previstos; quando houver fotos autorizadas, entram em `public/img/` e no conteúdo (`src/content/site.ts`).

## Estrutura de seções

1. **Hero** (`#topo`): h1 "Seu próximo jogo começa na Prime.", frase de apoio, "Ver horários" (abre o agendamento) e "Quadras e valores"; três fatos reais (5 quadras, 1h · 1h30, R$ 140 a 190 por quadra); painel com a quadra e o endereço.
2. **Quadras** (`#quadras`, verde): as cinco quadras desenhadas com nome e preço; a escolhida ganha a bola; painel com durações e "Ver horários desta quadra".
3. **Como agendar** (`#como-agendar`, creme): passo a passo como comprovante, aviso de demonstração e "Experimentar o agendamento".
4. **Eventos** (`#eventos`): placa com a arte, abas Open Prime Padel / Prime Cup / Day Use, nota de que são artes de edições já anunciadas, Instagram e WhatsApp.
5. **Loja** (`#loja`, creme): West Padel Store, produtos em letra grande, link para o Instagram da loja.
6. **Onde estamos** (`#onde-estamos`, verde): círculos finos com o pino e as coordenadas; cartão com endereço, horários (dia de hoje destacado depois de montar), contatos, "Traçar rota" e "Agendar quadra".
7. **Rodapé**: logo, navegação, endereço, redes e aviso de demonstração.
8. **Agendamento** (janela modal): Data e quadra → Horário → Seus dados → Revisão → Solicitação enviada.

## Referências

**Aproveitado:** círculo fino, seta longa e caixas de linha fina dos posts (hero, contato, comprovante); caixa-alta espaçada para endereço, datas e categorias (posts); padrões dos kits `landing` (menu móvel verde em tela cheia, cabeçalho fixo, hero em painel verde) e `booking` (faixa de datas, horários, barra fixa com preço, resumo lateral no desktop, bilhete verde de confirmação); composição da carta "The split stage" (hero dividido, comprovante serrilhado, placa quadrada com abas, cartão de visita).

**Deixado de fora:** planos, FAQ, depoimentos, "ao vivo", aluguel de raquete, estacionamento e cancelamento grátis do kit `landing` (dados ilustrativos, não confirmados); foto fixa ocupando meia tela da carta de direção (não há fotos); palavra gigante como marca d'água e escala de wordmark (o h1 fica ≤ 64 px pelo contrato); vidro no cabeçalho (o design system permite, mas o pedido proíbe glassmorphism).

## Fontes do conteúdo

`docs/PRODUCT.md`, landing anterior (commit `1b45848`, textos e dados de `src/config/`), artes em `design-system-export/assets/brand/`. Não houve consulta a site externo.

## Acabamento

**Rodada (impeccable critique, single-context):** nota 28/32 nas heurísticas aplicáveis (7 e 10 n/a por ser landing): status 3, linguagem 4, controle 4, consistência 3, prevenção de erro 3, reconhecimento 4, estética 3, recuperação de erro 4.

Comandos e verificações rodados: `impeccable detect` (fonte e build), `design-taste-frontend inspect.mjs` e `lint.mjs`, capturas CDP a 1440, 768 e 390.

Mudanças aplicadas no acabamento:
- **adapt:** quadras no celular viraram lista vertical (quadra deitada ao lado do nome e do preço) em vez de carrossel cortado na borda; botões longos quebram linha; itens de grade com `min-width: 0` e cartão de contato sem estouro a 320 px; janela de agendamento sem estouro lateral no celular (`grid-template-columns: minmax(0, 1fr)`).
- **polish:** desenho da quadra do hero refeito (o tracejado com `vector-effect` quebrava as linhas); preços tirados de cima das linhas da quadra; logo do rodapé sem distorção; título do agendamento focado ao abrir; rótulo duplicado "Quando você quer jogar?" trocado por "Data"; rótulo "Quadra escolhida" em caixa normal; texto do hero na tinta cheia; botão do WhatsApp com anel branco e saindo do caminho de botões no celular; conflito simulado só na primeira solicitação do dia.

Achados mantidos de propósito (contrato do design system): Instrument Sans (fonte da marca, sinalizada como "comum" pelo detector); sobrelinhas em caixa-alta espaçada para endereço e categoria (linguagem dos posts); itálico no h1 (padrão de título do design system); creme `#F7F5EF` (cor da marca); poucas imagens raster (não há fotos, decisão do responsável); h1 em 62 px (regra h1 ≤ 64 px). Falsos positivos: "cramped padding" e "flat hierarchy" do detector estático (as seções têm `.container` com recuo e o h1 renderizado tem 62 px).
