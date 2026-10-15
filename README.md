# Prime Padel Platform

Plataforma digital da Prime Padel, em Lages, Santa Catarina.

## Estado atual

O repositorio usa Next.js com React, TypeScript estrito, npm e CSS proprio. A base tecnica esta inicializada; a landing e o agendamento ainda dependem da especificacao e do plano aprovados.

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
npm run test:e2e
npm run build
```

Use `npm run test:e2e:ui` quando precisar investigar um fluxo no navegador de forma interativa.

Consulte `docs/DEPENDENCY-NOTES.md` antes de aplicar correcoes automaticas do `npm audit`.

## Base tecnica

- Next.js com App Router.
- React.
- TypeScript em modo estrito.
- ESLint.
- CSS proprio, preparado para receber os tokens do design system.
- Playwright com projetos de desktop e celular.

## Dados que nao podem ser publicados como definitivos

- WhatsApp informado: `+55 49 9910-7642`.
- Abertura as `03:00` na quarta-feira.
- Politicas de cancelamento, reagendamento e pagamento.
- Eventos, datas, inscricoes, depoimentos e informacoes institucionais nao confirmados.
