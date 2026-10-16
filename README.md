# Prime Padel Platform

Plataforma digital da Prime Padel, em Lages, Santa Catarina.

## Estado atual

O repositorio usa Next.js com React, TypeScript estrito, npm e CSS proprio. A especificacao e o plano foram aprovados em 15/10/2026. O catalogo centralizado, o calendario e o servico simulado estao implementados. O marco 2 entrega a landing publica responsiva, com conteudo confirmado, precos, navegacao acessivel e ativos locais.

As telas de agendamento pertencem aos marcos 3 e 4. Nesta entrega intermediaria,
os links `/agendamento` e `/agendamento?quadra=...` ja possuem os destinos
previstos, mas a rota ainda nao existe. A landing nao deve ser publicada como
produto completo antes da conclusao e verificacao da jornada.

A primeira entrega tera dois resultados:

1. Landing page publica responsiva.
2. Jornada de consulta e agendamento com dados simulados.

Backend, autenticacao, painel administrativo, pagamentos, financeiro, loja virtual e gestao completa de torneios nao fazem parte desta entrega.

## Comece por aqui

1. Leia `AGENTS.md`.
2. Leia `docs/PRODUCT.md`.
3. Leia `docs/DECISIONS.md`.
4. Leia `DESIGN.md` e o material em `design-system-export/`.
5. Siga `docs/SESSION-START.md` para abrir uma sessao de planejamento ou implementacao.

## Estrutura

```text
.
|-- .agents/skills/             Skills especificas do repositorio
|-- design-system-export/       Fonte de verdade visual e ativos de marca
|-- docs/
|   |-- ARCHITECTURE.md         Fronteiras tecnicas e contratos previstos
|   |-- DECISIONS.md            Decisoes aceitas e pendentes
|   |-- DEPENDENCY-NOTES.md     Estado conhecido das dependencias
|   |-- PRODUCT.md              Escopo, conteudo e dados do produto
|   `-- SESSION-START.md        Procedimento para novas sessoes
|-- AGENTS.md                   Regras permanentes para agentes
|-- DESIGN.md                   Guia de integracao do design system
|-- src/app/                    Aplicacao React com Next.js App Router
|-- tests/e2e/                  Fluxos de navegador com Playwright
`-- README.md                   Ponto de entrada do repositorio
```

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
npm run test:production
```

Use `npm run test:e2e:ui` quando precisar investigar um fluxo no navegador de forma interativa.

`npm run test:unit` executa somente o projeto Playwright `domain`, sem navegador
ou servidor. `npm run test:e2e` executa os projetos `chromium-desktop` e
`chromium-mobile`; inicia um servidor proprio em `http://127.0.0.1:3100` e
nao reutiliza um servidor existente. Deixe a porta 3100 livre para os testes.
O servidor de testes recebe `NEXT_PUBLIC_ENABLE_TEST_HARNESS=1`; o ponto de
composicao que consumira essa opcao sera implementado junto do fluxo, no marco 3.
Nao habilite essa variavel no build normal.

A verificacao completa inclui lint, typecheck, test:unit, test:e2e e build.
`npm run test:production` executa o build e depois verifica a carga da landing
na versao de producao, com servidor proprio na porta 3200. Deixe essa porta livre.
O teste percorre os links visiveis e detecta erros de console, respostas HTTP
com falha e chamadas externas, inclusive prefetch que nao ocorre no servidor dev.
Os E2E verificam conteudo, menu/foco, responsividade e recuperacao de imagens;
a jornada ainda nao esta implementada.

Consulte [as evidencias do marco 2](docs/verification/landing-marco-2.md) para
dimensoes verificadas, contrastes medidos e limitacoes.

## Servico simulado

O contrato esta em `src/services/booking-service.ts`; a implementacao local em
`src/services/mock/booking-service.ts`. Crie uma instancia por visita ao fluxo.
As respostas usam unioes discriminadas para disponibilidade, pendencia de
funcionamento, erro, conflito, expiracao e sucesso simulado.

O adaptador consulta somente as seis ofertas de `src/content/courts.ts`.
Precos sao totais por quadra/duracao. O calendario usa `America/Sao_Paulo` e
uma janela demonstrativa de 14 dias; quarta-feira nao gera horarios.
Consultas e envios expiram em 8 segundos. Abortamento rejeita com
`AbortError`; o consumidor deve ignorar cancelamentos intencionais.
Nome ficticio e tentativas ficam somente na memoria da instancia.

Os cenarios e atrasos podem ser injetados pelo construtor para testes:
`normal`, `empty`, `all-unavailable`, `query-error-once`,
`submit-error-once`, `conflict-once`, `query-timeout` e `submit-timeout`.
Timeout continua sem resposta naquela instancia; erros com sufixo
`-once` permitem a recuperacao na tentativa seguinte.
Nao ha envio a arena, reserva real ou persistencia.

Consulte `docs/DEPENDENCY-NOTES.md` antes de aplicar correcoes automaticas do `npm audit`.

## Base tecnica

- Next.js com App Router.
- React.
- TypeScript em modo estrito.
- ESLint.
- CSS proprio com tokens adaptados do design system e fontes locais.
- Playwright com projetos de desktop e celular.

## Dados que nao podem ser publicados como definitivos

- WhatsApp informado: `+55 49 9910-7642`.
- Abertura as `03:00` na quarta-feira.
- Politicas de cancelamento, reagendamento e pagamento.
- Eventos, datas, inscricoes, depoimentos e informacoes institucionais nao confirmados.
