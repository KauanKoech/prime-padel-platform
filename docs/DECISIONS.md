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

## Decisoes pendentes antes da inicializacao da aplicacao

| Decisao | Recomendacao inicial | Estado |
|---|---|---|
| Resultado do agendamento simulado | Solicitar reserva, sem prometer confirmacao real | Pendente |
| Hospedagem | Escolher depois do framework | Pendente |
| Testes unitarios e de componentes | Adicionar quando o primeiro comportamento testavel for planejado | Pendente |

## Dados pendentes de confirmacao

- WhatsApp.
- Horario de quarta-feira.
- Conteudo institucional.
- Estrutura e diferenciais.
- Politicas comerciais.
- Fotografias e arquivos vetoriais oficiais.

## Como atualizar

Ao aprovar uma decisao, mova o item para `Decisoes aceitas`, registre o motivo e atualize os documentos afetados. Nao altere uma decisao aceita silenciosamente.
