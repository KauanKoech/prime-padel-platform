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

## Decisoes pendentes antes da inicializacao da aplicacao

| Decisao | Recomendacao inicial | Estado |
|---|---|---|
| Hospedagem | Imagem Docker com nginx pronta; escolher o provedor | Pendente |
| Testes unitarios e de componentes | Adicionar quando o primeiro comportamento testavel for planejado | Pendente |

## Divergencias intencionais do design system

- Cabecalho fixo branco solido, sem `backdrop-filter`: o design system permite branco 88% com desfoque, mas o pedido do redesenho proibe qualquer efeito de vidro.
- Icone do Instagram desenhado localmente no mesmo traco do Lucide: o `lucide-react` 1.x removeu logos de marcas.
- Sem planos, FAQ, "ao vivo", aluguel de raquete e cancelamento gratis do kit de landing: dados ilustrativos do kit, nao confirmados pela arena.
- Sem fotos: o painel verde com a quadra desenhada ocupa o lugar da fotografia ate existirem fotos autorizadas.

## Dados pendentes de confirmacao

- WhatsApp.
- Horario de quarta-feira.
- Conteudo institucional.
- Estrutura e diferenciais.
- Politicas comerciais.
- Fotografias e arquivos vetoriais oficiais.

## Como atualizar

Ao aprovar uma decisao, mova o item para `Decisoes aceitas`, registre o motivo e atualize os documentos afetados. Nao altere uma decisao aceita silenciosamente.
