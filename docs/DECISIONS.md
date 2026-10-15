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
