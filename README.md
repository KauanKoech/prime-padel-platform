# Prime Padel Platform

Plataforma digital da Prime Padel, em Lages, Santa Catarina.

## Estado atual

A primeira entrega está implementada com Vite + React + TypeScript estrito, CSS próprio e pré-renderização no build:

1. Landing page pública responsiva (arena, quadras e valores, como agendar, eventos, West Padel Store, localização e contato).
2. Jornada de agendamento com dados simulados: data → quadra → duração → horários → dados → revisão → solicitação, com estados de carregamento, vazio, erro, conflito e sucesso.

Backend, autenticação, painel administrativo, pagamentos, financeiro, loja virtual e gestão completa de torneios não fazem parte desta entrega. O agendamento é uma demonstração: nenhuma reserva é registrada e nenhum dado sai do navegador.

## Comece por aqui

1. Leia `AGENTS.md`.
2. Leia `docs/PRODUCT.md`.
3. Leia `docs/DECISIONS.md`.
4. Leia `DESIGN.md`, o material em `design-system-export/` e o contrato visual em `design/direcao-visual.md`.
5. Siga `docs/SESSION-START.md` para abrir uma sessão de planejamento ou implementação.

## Comandos

```bash
npm install
npm run dev          # servidor de desenvolvimento (http://127.0.0.1:5173)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run build        # typecheck + build + pré-renderização em dist/
npm run preview      # serve o dist/ (http://127.0.0.1:4173)
npm run test:e2e     # Playwright (desktop e celular) contra o build pré-renderizado
npm run test:e2e:ui  # Playwright em modo interativo
```

Na primeira vez, instale o navegador do Playwright: `npx playwright install chromium`. Os testes fazem o build e sobem o `vite preview` na porta 4195 (mude com `E2E_PORT`).

### Docker

```bash
docker compose up -d --build                # http://localhost:8080
PORTA=3000 docker compose up -d --build     # outra porta
```

O `Dockerfile` faz o build em Node e serve só o HTML estático pelo nginx (`nginx.conf`).

Consulte `docs/DEPENDENCY-NOTES.md` antes de aplicar correções automáticas do `npm audit`.

## Stack

- Vite + React 19 + TypeScript em modo estrito.
- CSS próprio em `src/styles/`, com os tokens de `design-system-export/tokens/` (sem Tailwind).
- Motion (`motion/react`) para entradas abaixo da dobra: sempre `m.*` dentro de `LazyMotion` (strict) e `MotionConfig reducedMotion="user"`.
- Lenis (`lenis/react`) para a rolagem suave, desligado com movimento reduzido.
- Ícones Lucide (`lucide-react`).
- Pré-renderização sem biblioteca extra: `src/entry-server.tsx` + `scripts/prerender.mjs` geram o HTML de `dist/index.html`; `src/entry-client.tsx` hidrata.
- ESLint (typescript-eslint + react-hooks) e Playwright.

## Estrutura

```text
.
|-- .agents/skills/             Skills específicas do repositório
|-- design/                     Briefing e contrato visual do redesenho
|-- design-system-export/       Fonte de verdade visual e ativos de marca (não editar)
|-- docs/                       Produto, decisões, arquitetura, dependências, sessões
|-- public/
|   |-- fonts/                  Fontes self-hosted do design system
|   `-- img/                    Logos, artes de eventos e imagem de compartilhamento (WebP/JPG)
|-- scripts/prerender.mjs       Injeta o HTML pré-renderizado em dist/index.html
|-- src/
|   |-- content/arena.ts        Dados institucionais: endereço, horários, quadras e preços, loja
|   |-- content/site.ts         Todos os textos da landing e do agendamento
|   |-- domain/                 Contratos (tipos) e validação do agendamento
|   |-- services/               Serviço de agendamento (mock substituível por API) e cenários de demonstração
|   |-- features/booking/       Janela de agendamento e contexto para abri-la
|   |-- components/             Seções da landing, botões, ícones, quadra desenhada, primitivas de animação
|   |-- lib/format.ts           Datas no fuso da arena, moeda e durações
|   |-- styles/                 tokens, base, landing e agendamento
|   |-- App.tsx                 Composição, LazyMotion, MotionConfig e Lenis
|   |-- entry-client.tsx        Hidratação (ou montagem no dev)
|   `-- entry-server.tsx        Renderização para a pré-renderização
|-- tests/e2e/                  Fluxos de navegador com Playwright
|-- index.html                  <head>: SEO, Open Graph, JSON-LD, fontes
|-- Dockerfile, nginx.conf, docker-compose.yml
|-- AGENTS.md                   Regras permanentes para agentes
|-- DESIGN.md                   Guia de integração do design system
`-- README.md                   Ponto de entrada do repositório
```

## Onde mexer

- **Textos:** `src/content/site.ts`.
- **Endereço, horários, quadras, preços, WhatsApp:** `src/content/arena.ts`.
- **Trocar o mock por uma API:** implemente `BookingService` (`src/domain/booking.ts`) e troque a composição em `src/services/booking.ts`.
- **Cenários da demonstração** (dia vazio, erro, conflito): `src/services/booking-demo.ts`.
- **SEO e JSON-LD:** `index.html`.

## Dados que não podem ser publicados como definitivos

- WhatsApp informado: `+55 49 9910-7642` (aparece com o selo "a confirmar"; `arena.contact.whatsapp.confirmed`).
- Abertura às `03:00` na quarta-feira (selo "a confirmar"; fora do JSON-LD até a confirmação).
- Domínio de publicação: `index.html` usa `https://example.com/` como marcador em `canonical`, `og:url`, `og:image` e JSON-LD.
- Políticas de cancelamento, reagendamento e pagamento.
- Eventos, datas, inscrições, depoimentos e informações institucionais não confirmados.
- Fotografias da arena (não há; ver `design/direcao-visual.md`).
