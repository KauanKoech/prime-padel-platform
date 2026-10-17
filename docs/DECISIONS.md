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
| Next.js App Router como framework React | Aceita | Mantem React e oferece uma base adequada para uma pagina publica com SEO |
| TypeScript em modo estrito | Aceita | Torna contratos e a futura integracao com API mais seguros |
| npm como gerenciador de pacotes | Aceita | Ja esta disponivel no ambiente e reduz configuracao adicional |
| CSS proprio com tokens do design system | Aceita | Preserva a identidade sem adicionar outra camada de estilos |
| Playwright para fluxos de navegador | Aceita | Valida a experiencia em celular e desktop |
| P01: resultado como solicitacao simulada | Aceita em 15/10/2026 | Aprovacao explicita da especificacao e do plano; nenhum envio ou reserva real |
| P02: somente nome ficticio | Aceita em 15/10/2026 | Exercita formulario sem solicitar contato real nem definir cadastro operacional |
| P03: quarta-feira sem consulta enquanto pendente | Aceita em 15/10/2026 | Nao inventa horario de abertura; nao significa arena fechada |
| P04: janela de 14 dias, candidatos a cada 30 minutos e memoria por visita | Aceita em 15/10/2026 | Regras exclusivas da demonstracao, sem politica comercial ou persistencia |
| P05: landing com precos por quadra e conteudo confirmado | Aceita em 15/10/2026 | Sem planos, FAQ, agenda no hero ou fotografias nao autorizadas |
| P06: agendamento em rota propria, tres etapas e resumo responsivo | Aceita em 15/10/2026 | Organiza horario, dados e revisao; implementacao nos proximos marcos |
| Playwright em projeto domain para testes puros | Aceita em 15/10/2026 | Reutiliza o runner existente sem adicionar dependencia ou iniciar servidor |
| Datas da arena em America/Sao_Paulo, precos em centavos e ofertas explicitas | Aceita em 15/10/2026 | Evita diferencas por fuso do dispositivo e precos calculados por proporcionalidade |
| Adaptador simulado com timeout de 8 segundos e idempotencia por tentativa | Aceita em 15/10/2026 | Demonstra recuperacao e previne duplicacao; memoria limitada a visita, sem gravacao externa |
| Servidor E2E isolado na porta 3100 | Aceita em 15/10/2026 | Impede validar acidentalmente outra instancia; cenarios de UI serao opt-in fora de producao no marco 3 |
| Fontes e logos locais, sem runtime do export | Implementada no marco 2 em 16/10/2026 | DM Serif Display normal/italica, Instrument Sans e logos Prime Padel verde/branco; sem Pinyon ou icones onde texto basta |
| Foco solido de 3 px e texto secundario #5E645F | Implementada no marco 2 em 16/10/2026 | Escolhas aprovadas no plano; anel verde em superficies claras e branco sobre verde, com contraste medido |
| Composicao inicial sem amarelo | Implementada no marco 2 em 16/10/2026 | Acento opcional do export omitido conforme plano aprovado |
| Menu compacto com dialog nativo e deteccao de espaco | Implementada no marco 2 em 16/10/2026 | Navegacao completa a partir de 1200 px apenas quando couber; Escape, contencao/restauracao de foco e ancoras acessiveis |
| Ano do rodape renderizado no servidor com cache horario | Implementada no marco 2 em 16/10/2026 | Compativel com Cache Components da versao instalada; ano no fuso America/Sao_Paulo sem tornar toda a pagina dinamica |
| Prefetch desativado nos links para agendamento | Implementada no marco 2 em 16/10/2026 | Evita requisicoes especulativas para uma rota do marco 3; o destino e a navegacao explicita permanecem os previstos |
| Smoke separado da versao de producao na porta 3200 | Implementada no marco 2 em 16/10/2026 | Inspecao encontrou 404s de prefetch ausentes em dev; teste reproduziu a falha antes da correcao |

## Implementacao do marco 3

- `/agendamento` inicia com HTML neutro; apos montagem, le somente `quadra`
  conhecida e cria uma instancia de `BookingService` por visita. Os componentes
  nao importam o adaptador nem cenarios; `create-booking-service.ts` concentra
  essa composicao. Controles de teste exigem opt-in e ambiente nao produtivo.
- Filtros invalidam imediatamente horario e resultados. Consultas usam
  AbortController e identificador sequencial para descartar respostas antigas.
  A janela da arena e a selecao sao revalidadas ao consultar e avancar.
- Radios nativos representam data, quadra, duracao e horario. A barra inferior
  e o resumo lateral compartilham um unico CTA; sua altura medida reserva espaco
  no conteudo e margem de rolagem para nao ocultar foco por teclado. Com altura
  de viewport ate 560 px, a barra acompanha o fluxo do documento.
- Cache Components usa Activity e pode preservar a pagina ao sair. A limpeza
  em useLayoutEffect descarta a visita; uma nova identidade recria o fluxo ao
  retornar. O teste de producao reproduziu a retencao antes da correcao. A
  navegacao entre etapas e o historico serao completados no marco 4.
- O aviso de expiracao usa texto #75480B sobre #FBF0DC (6,92:1), mais escuro
  que o token de aviso do export. Erro usa #B23B2A sobre #F8E3DF (4,80:1).

## Implementacao do marco 4

- O formulario solicita somente nome ficticio obrigatorio. A validacao em
  blur ou avanco remove espacos das extremidades, aceita nome unico e nao
  impoe limite artificial. Entradas invalidas permanecem no campo.
- O historico nativo preserva o estado interno do Next e armazena somente
  identidade da visita e etapa no namespace primePadel. Acoes explicitas
  criam entradas; guardas e resultado substituem a entrada atual. Todo
  popstate passa pelas mesmas guardas, inclusive depois do resultado terminal.
- O hook recebe o servico e uma funcao de reinicio da composicao externa.
  Reiniciar recria estado e servico, sem reaplicar a quadra da URL. Sair,
  Activity e pagehide descartam a visita; pageshow persistido inicia outra.
- O envio tem trava sincrona e AbortController. A tentativa usa UUID mantido
  para retry do mesmo conteudo e renovado quando ele muda. Erro preserva
  revisao; conflito/expiracao voltam ao horario, preservando os demais dados
  validos e focando aviso persistente ate a escolha explicita de outro slot.
- Nome, rascunho, tentativas e resultado ficam em memoria; nao entram em
  URL, history.state, cookies ou armazenamento persistente. O resultado
  informa explicitamente que nao houve solicitacao a arena nem reserva.
- A barra inferior considera tambem a altura de VisualViewport: ate 560 px,
  acompanha o documento. Isso permite responder ao espaco reduzido pelo
  teclado virtual; a validacao com dispositivo fisico fica no marco 5.

## Fechamento simplificado do frontend — 17/10/2026

O responsavel alinhou o encerramento desta etapa com
verification-before-completion, aproveitando a cobertura existente antes
de avaliar localmente a interface e integrar seu prototipo de backend.
O marco 5 encerra com lint, tipos, testes, build, smoke de producao,
conferencia de escopo e matriz de evidencias. Nao adiciona outra suite de
simulacoes nem repete a revisao independente do codigo inalterado.
Leitor de tela real, teclado virtual fisico, zoom real e ciclo real de
bfcache ficam para a verificacao integrada; nao sao certificados agora.
Isso encerra a etapa do frontend para avaliacao local, sem autorizar
publicacao ou declarar o produto operacional.

## Decisoes pendentes para etapas futuras

| Decisao | Recomendacao inicial | Estado |
|---|---|---|
| Resultado do agendamento operacional | Definir solicitacao versus confirmacao real antes de implementar backend | Pendente |
| Hospedagem | Escolher depois do framework | Pendente |
| Testes de componentes isolados | Avaliar quando houver necessidade alem dos testes de dominio e navegador | Pendente |

## Registro da aprovacao

Em 15/10/2026, o responsavel aprovou explicitamente
`docs/superpowers/specs/2026-10-15-landing-agendamento-design.md` e
`docs/superpowers/plans/2026-10-15-landing-agendamento.md`:
“Pode aprovar as duas e continuar com a utilização das skills.”
Essa aprovacao autoriza implementacao por marcos, sem publicacao.
WhatsApp, quarta-feira e demais dados factuais abaixo continuam pendentes.

## Dados pendentes de confirmacao

- WhatsApp.
- Horario de quarta-feira.
- Conteudo institucional.
- Estrutura e diferenciais.
- Politicas comerciais.
- Fotografias e arquivos vetoriais oficiais.

## Como atualizar

Ao aprovar uma decisao, mova o item para `Decisoes aceitas`, registre o motivo e atualize os documentos afetados. Nao altere uma decisao aceita silenciosamente.
