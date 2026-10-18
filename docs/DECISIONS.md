# Registro de decisoes

## Decisoes aceitas

| Decisao | Estado | Motivo |
|---|---|---|
| React para a interface publica | Aceita | Direcao tecnica definida no briefing |
| Primeira fase limitada a landing e agendamento simulado | Aceita | Reduz risco e permite validar a experiencia |
| Mobile-first | Aceita | A maior parte dos agendamentos tende a ocorrer no celular |
| Conteudo e dados centralizados | Aceita | Evita divergencias e prepara a futura API |
| Camada de servicos separada da interface | Aceita | Permite trocar mocks pelo backend |
| Preco por quadra e duracao | Aceita | Uma quadra ja possui mais de uma duracao e preco |
| Design system exportado como fonte visual | Aceita | O repositorio ja contem tokens, ativos e padroes da marca |
| Modulo da loja separado das reservas | Aceita | Comercio eletronico tem regras proprias |
| Next.js App Router como framework React | Substituida | Substituida em 2026-10-17 por Vite + React + pre-renderizacao (linha abaixo) |
| Vite + React + pre-renderizacao no lugar do Next.js App Router | Aceita | Pedido do responsavel pelo redesenho da landing (2026-10-17). Mantem React, TypeScript estrito e CSS proprio; o SEO continua garantido pelo HTML pre-renderizado no build (`entry-server` + `scripts/prerender.mjs`), sem servidor Node em producao: o site e estatico e pode ser servido por nginx (Docker) |
| Motion e Lenis para movimento e rolagem | Aceita | Entradas curtas abaixo da dobra (`m.*` em `LazyMotion` strict, `MotionConfig reducedMotion="user"`) e rolagem suave desligada com movimento reduzido; dentro da regra do design system (movimento curto, sem parallax nem loop) |
| Resultado do agendamento simulado | Aceita | A jornada termina em "Solicitacao enviada" dentro de uma demonstracao explicita: nada e reservado, cobrado ou enviado, e a tela de sucesso aponta o contato real da arena |
| Docker + nginx para servir o build | Aceita | Mesmo padrao dos outros projetos do responsavel pelo redesenho; porta padrao 8080 via `docker-compose.yml` |
| TypeScript em modo estrito | Aceita | Torna contratos e a futura integracao com API mais seguros |
| npm como gerenciador de pacotes | Aceita | Ja esta disponivel no ambiente e reduz configuracao adicional |
| CSS proprio com tokens do design system | Aceita | Preserva a identidade sem adicionar outra camada de estilos |
| Playwright para fluxos de navegador | Aceita | Valida a experiencia em celular e desktop |
| Landing escura com as fotos oficiais ("A quadra a noite") | Aceita | Retorno do responsavel pelo redesenho (2026-10-17): "muitos espacos em branco, landing sem conteudo, opaca". Referencias em `design/referencias/` (clubes de padel escuros com fotografia grande). Contrato em `design/direcao-visual.md` |
| Fotos oficiais recortadas por script (`scripts/images.mjs`, `npm run images`) | Aceita | Os posts trazem textos e baloes embutidos; o recorte fica reproduzivel e nunca amplia a foto alem do tamanho natural |
| `design/originais/` versionado; `design/referencias/` fora do Git | Aceita | Os originais sao da Prime e sao a fonte dos recortes (cerca de 6 MB). As referencias sao capturas de sites de terceiros: ficam so na maquina, como norte visual |
| Componentes adaptados de React Bits e kokonutui | Aceita | SplitText (`SplitTitle`), CountUp, TiltedCard, Smooth Tab (`SmoothTabs`) e Slide Text Button (no `Button`) reescritos em TypeScript, Motion e CSS proprio, sem dependencias novas, com credito MIT no topo de cada arquivo |
| Troca de texto no hover so com segundo texto real (`hoverText`) | Aceita | Pedido do responsavel (2026-10-18): o efeito repetia o mesmo rotulo. Ficou em quatro botoes: "Ver horarios" -> "Abrir a agenda" (hero), "Quero fazer uma aula" e "Aula com..." -> "Chamar no WhatsApp", "Acompanhar no Instagram" -> "@primepadellages" |
| Hero com o titulo como protagonista e mosaico pequeno de fotos | Aceita | Pedido do responsavel (2026-10-18): a foto grande tomava a tela. A foto do aperto de maos virou um retrato de 300 px ao lado de dois recortes; no celular, uma faixa de tres recortes de 136 px abaixo dos botoes |
| Secao "Como agendar" removida | Aceita | Repetia a janela de agendamento e quebrava o ritmo; o aviso de demonstracao foi para o painel das quadras e para o rodape |

## Decisoes pendentes antes da inicializacao da aplicacao

| Decisao | Recomendacao inicial | Estado |
|---|---|---|
| Hospedagem | Imagem Docker com nginx pronta; escolher o provedor | Pendente |
| Testes unitarios e de componentes | Adicionar quando o primeiro comportamento testavel for planejado | Pendente |

## Divergencias intencionais do design system

Motivo comum das cinco primeiras: pedido do responsavel pelo redesenho (2026-10-17, "landing opaca, sem conteudo") e as referencias em `design/referencias/`. Ordem de prioridade usada: pedido do responsavel > referencias visuais > identidade do briefing e do `DESIGN.md`.

- **Pagina escura.** O `DESIGN.md` pede superficies brancas e neutros quentes; a landing usa o verde quase preto `#121D17` como chao, com paineis verdes e duas secoes em creme (quadras e loja). As cores continuam as da marca: verde floresta, creme e amarelo de bola.
- **Titulos em Instrument Sans 700 em vez de DM Serif Display.** Os titulos de impacto seguem a grotesca pesada das referencias, usando a fonte de interface do proprio design system. A DM Serif Display ficou nos numeros, precos e contadores; a Pinyon Script, em "Nos vemos na Prime.".
- **Amarelo mais de uma vez por vista.** O `DESIGN.md` limita o acento a uma aplicacao por vista; aqui a palavra de destaque de cada titulo e o botao principal da vista usam o amarelo, como nas referencias. No creme o destaque vira marca-texto (amarelo sobre creme nao passa no contraste).
- **h1 ate 104 px** (o contrato anterior limitava a 64 px): escala das referencias, em tres linhas no desktop e duas no celular.
- **Veu escuro sobre fotos** (hero no celular e fundo desfocado do CTA final): escurecimento neutro para o texto creme passar no contraste. Nao e gradiente colorido, que continua proibido.
- **Fundos animados em loop (2026-10-18).** O `DESIGN.md` proibe animacoes em loop e gradientes coloridos; o responsavel pelo redesenho pediu fundos com vida ("muito opaco, simples, sem vida, parado"), e o pedido vence. Quatro camadas, uma por secao: Aurora (React Bits) no topo, Dot Field (kokonutui) nas quadras, Background Paths (kokonutui) nas aulas e Topo Background (kokonutui) no CTA final. Limites mantidos: cores da marca (verde e creme, amarelo so na ponta da aurora), opacidade baixa e mascaras que somem atras do texto, pausa fora da tela e com a aba oculta, DPR ate 1,5, quadro parado com `prefers-reduced-motion`, nenhuma dependencia nova (WebGL2 e canvas 2D puros).
- **Mantido do `DESIGN.md`:** sem parallax e sem vidro. O marquee com o nome do clube das referencias continua de fora.
- Cabecalho fixo solido (verde 950), sem `backdrop-filter`: o design system permite branco 88% com desfoque, mas o pedido do redesenho proibe qualquer efeito de vidro.
- Icone do Instagram desenhado localmente no mesmo traco do Lucide: o `lucide-react` 1.x removeu logos de marcas.
- Sem planos, FAQ, "ao vivo", aluguel de raquete e cancelamento gratis do kit de landing: dados ilustrativos do kit, nao confirmados pela arena.

## Dados pendentes de confirmacao

- WhatsApp.
- Horario de quarta-feira.
- Conteudo institucional.
- Estrutura e diferenciais.
- Politicas comerciais.
- Arquivos vetoriais oficiais e fotos em resolucao maior (os posts tem cerca de 650 px de largura).
- Direitos de uso das fotos dos posts (professores e jogadores retratados).
- Que o retrato do post "Conheca nosso professor" (`design/originais/4.png`) e do professor Dorotovio R. Couto.

## Como atualizar

Ao aprovar uma decisao, mova o item para `Decisoes aceitas`, registre o motivo e atualize os documentos afetados. Nao altere uma decisao aceita silenciosamente.
