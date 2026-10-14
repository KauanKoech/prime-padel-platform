# Direção visual — Prime Padel

## Origem e princípios

Identidade baseada no logo principal, padrão Day Use, Open Prime Padel e Prime Cup fornecidos. Sofisticação, esporte e acolhimento: verde floresta, superfícies claras, serifas editoriais e informação objetiva. Uma ideia por seção, contraste entre grandes títulos e detalhes funcionais. Sem gradientes decorativos, brilho, parallax ou cartões flutuantes gratuitos.

## Cores e semântica

Paleta oficial do export em tokens/colors.css. Marca: --pp-green-700 (#324D3E), fundo profundo --pp-green-900; branco, neutros e creme --pp-cream. Use aliases --bg-*, --surface-*, --text-*, --border-*, --action-* e --status-*. Verde/amarelo da bola --pp-ball somente como pequeno acento, nunca texto sobre branco. Estados success, warning, danger e info não dependem apenas de cor.

## Tipografia

DM Serif Display nos títulos e preços; Instrument Sans na interface; Pinyon Script apenas em momentos de marca, nunca para refazer o logo. São substitutas explicitamente propostas pelo export, não fontes oficiais confirmadas. Quatro WOFF2 locais, font-display swap. Licenças e fontes oficiais pendentes. Escala original fluida: display 44–84, h1 34–56, h2 26–34, h3 19–22; corpo 18/16/15, rótulos 14/13 e overline 12. Consumir --type-* e --font-*.

## Espaçamento, grid e responsividade

--space-0…14: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128. Base de 4 com exceção de 2. Container máximo 1440, padding clamp(20,5vw,64); grid 12 colunas, gutter 24/16. Ritmo --section-y 64–128. Mobile primeiro; colunas passam a duas em 640 e navegação desktop em 960 (limiares presentes nos kits). Media queries usam constantes documentadas: variáveis CSS não funcionam diretamente nas condições. Header 64/72; alvos de interação pelo menos --tap-min (44).

## Raios, sombras e tokens extraídos

Raios xs6/sm10/md14/lg20/xl28/pill999. Bordas antes de sombras; sombra apenas indica elevação. --shadow-xs/sm/md/lg/inset são originais. O CSS exportado possuía valores literais fora da escala. Foram centralizados sem alteração em tokens/components.css, com procedência em component-token-map.json; não são uma nova paleta. Novos layouts usam a escala semântica existente e derivações aritméticas, não números visuais dispersos.

## Interação e acessibilidade

Hover escurece verde; press discreto; transições --dur-fast/base/slow (120/200/320) e --ease-out. Foco visível, contorno adicional com contraste, navegação nativa por teclado e redução de movimento. Diálogos nativos bloqueiam interação de fundo, fecham com Escape e devolvem foco. Campos têm label, aria-invalid e erro/hint associados. Seleção de data é grupo de botões com aria-pressed (não listbox incorreto). Accordion associa botão/painel; tabs têm setas/Home/End. Erros e sucesso são texto, não somente cor. Validar contraste e zoom em cada entrega.

## Imagens e marca

Logos raster canônicos em assets/brand; variantes transparentes são derivados úteis, não duplicações. Preservar proporção, verde sobre claro e branco sobre verde. Materiais promocionais são arquivo de comunicação, não prova de oferta atual. Não há fotografias independentes das quadras: usar painel de marca até recebê-las. Referências Tessera ficam isoladas; não adotar seu azul, fonte, conteúdo ou marca. Ícones Lucide locais, stroke 1.75.

## Superfícies

Landing: sequência editorial arena → quadras → experiência demonstrável → comunidade → contato. Conteúdo comercial somente confirmado, depoimentos ilustrativos explicitamente rotulados e substituíveis. Galeria provisória de comunicação claramente identificada.

Agendamento: mobile-first, escolha progressiva, estados carregando/vazio/erro/selecionado/conclusão. Valores e durações por quadra em configuração; disponibilidades somente mocks. Nenhum pagamento, envio, autenticação ou persistência. A conclusão informa que nenhuma reserva existe.

Admin futuro: maior densidade, tabelas e agenda com controles acessíveis; sidebar desktop e adaptação mobile dos kits são referências, não implementação autorizada. Não importar dados fictícios de receita, avaliações, políticas ou clientes.

