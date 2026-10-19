# Prime Padel Platform

Plataforma digital da Prime Padel, em Lages, Santa Catarina.

## Estado atual

A primeira entrega está implementada com Vite + React + TypeScript estrito, CSS próprio e pré-renderização no build:

1. Landing page pública responsiva, escura e com as fotos oficiais da arena: hero, faixa de valores, quadras e valores, aulas, professores, Prime Cup e eventos, West Padel Store, comunidade, localização e contato, CTA final.
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
npm run images       # recorta as fotos de design/originais/ e gera WebP em public/img/fotos/
npm run test:e2e     # Playwright (desktop e celular) contra o build pré-renderizado
npm run test:e2e:ui  # Playwright em modo interativo
```

### Fotos

As fotos da landing vêm dos posts oficiais da Prime em `design/originais/` (PNG de ~650 px, com textos e balões embutidos). `scripts/images.mjs` recorta só a área limpa de cada post e gera o WebP no tamanho natural e uma versão de 400 px para o `srcset`, com o `sharp` (devDependency). Para trocar uma foto: substitua o original, ajuste o retângulo de recorte no script e rode `npm run images`. Os WebP gerados ficam versionados em `public/img/fotos/`, então o build e o Docker não precisam do `sharp`.

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
- Componentes adaptados de React Bits (SplitText, CountUp, TiltedCard, Aurora) e kokonutui (Smooth Tab, Slide Text Button, Dot Field, Background Paths, Topo Background, Flow Field), em TypeScript e CSS próprio, sem dependências novas, com crédito MIT no topo de cada arquivo. Os fundos animados ficam em `src/components/backgrounds/` (WebGL2 e canvas 2D puros); as emendas em onda entre seções, em `src/components/Wave.tsx` e `src/hooks/useWaves.ts`.
- `sharp` (só desenvolvimento) para recortar e converter as fotos (`scripts/images.mjs`).
- Pré-renderização sem biblioteca extra: `src/entry-server.tsx` + `scripts/prerender.mjs` geram o HTML de `dist/index.html`; `src/entry-client.tsx` hidrata.
- ESLint (typescript-eslint + react-hooks) e Playwright.

## Estrutura

```text
.
|-- .agents/skills/             Skills específicas do repositório
|-- design/                     Briefing, contrato visual e originais/ (posts oficiais; referencias/ fica fora do Git)
|-- design-system-export/       Fonte de verdade visual e ativos de marca (não editar)
|-- docs/                       Produto, decisões, arquitetura, dependências, sessões
|-- public/
|   |-- fonts/                  Fontes self-hosted do design system
|   `-- img/                    Logos, artes de eventos, imagem de compartilhamento e fotos/ (recortes WebP)
|-- scripts/prerender.mjs       Injeta o HTML pré-renderizado em dist/index.html
|-- scripts/images.mjs          Recortes das fotos oficiais (npm run images)
|-- src/
|   |-- content/arena.ts        Dados institucionais: endereço, horários, quadras e preços, loja
|   |-- content/site.ts         Todos os textos da landing e do agendamento
|   |-- domain/                 Contratos (tipos) e validação do agendamento
|   |-- services/               Serviço de agendamento (mock substituível por API) e cenários de demonstração
|   |-- features/booking/       Janela de agendamento e contexto para abri-la
|   |-- components/             Seções da landing, botões, ícones, quadra desenhada, animação e componentes adaptados
|   |-- lib/format.ts           Datas no fuso da arena, moeda e durações
|   |-- styles/                 tokens, base, componentes, landing e agendamento
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

- **Textos, professores, eventos e fotos usadas:** `src/content/site.ts`.
- **Recorte das fotos:** `scripts/images.mjs` (`npm run images`).
- **Endereço, horários, quadras, preços, WhatsApp:** `src/content/arena.ts`.
- **Trocar o mock por uma API:** implemente `BookingService` (`src/domain/booking.ts`) e troque a composição em `src/services/booking.ts`.
- **Cenários da demonstração** (dia vazio, erro, conflito): `src/services/booking-demo.ts`.
- **SEO e JSON-LD:** `index.html`.

## Dados que não podem ser publicados como definitivos

- WhatsApp informado: `+55 49 9910-7642` (aparece com o selo "a confirmar"; `arena.contact.whatsapp.confirmed`).
- Abertura às `03:00` na quarta-feira (selo "a confirmar"; fora do JSON-LD até a confirmação).
- Domínio de publicação: `https://primepadel.jksoftware.com.br/` em `canonical`, Open Graph e JSON-LD.
- Políticas de cancelamento, reagendamento e pagamento.
- Eventos, datas, inscrições, depoimentos e informações institucionais não confirmados.
- Direitos de uso das fotos dos posts e confirmação de que o retrato de `design/originais/4.png` é do professor Dorotóvio.
