# Landing e agendamento simulado — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar a landing pública da Prime Padel e uma jornada acessível de solicitação simulada, sem reserva real.

**Architecture:** Landing renderizada no servidor; agendamento como fluxo cliente com rascunho em memória. Conteúdo centralizado e contratos de domínio compartilhados alimentam a interface por um serviço substituível; somente o adaptador simulado conhece fixtures, geração de horários e conflitos. CSS próprio adapta o export sem importar seu runtime.

**Tech Stack:** Next.js 16.4.1, React 19.3.0, TypeScript estrito, npm, CSS e Playwright já presentes no repositório.

**Spec:** [2026-10-15-landing-agendamento-design.md](../specs/2026-10-15-landing-agendamento-design.md), complementada por [PRODUCT](../../PRODUCT.md), [DECISIONS](../../DECISIONS.md) e [DESIGN](../../../DESIGN.md).

## Global Constraints

Trechos normativos da especificação, preservados literalmente:

- “Fora do escopo: backend, banco de dados, autenticação, painel administrativo, pagamentos, financeiro, comércio eletrônico, gestão de torneios, inscrições, notificações, integrações e publicação.”
- “Não incluir Tailwind ou usar `_ds_bundle.js` como dependência de produção.”
- “O preço é o da oferta; 1h30 de ANTIDOTO custa R$ 180, não R$ 210. Não variar por dia, horário ou pessoa.”
- “Não salvar nome em URL, armazenamento local, cookies, logs ou analytics.”
- Ao recarregar ou sair da rota, reiniciar o rascunho; avisar junto ao formulário “Ao sair ou recarregar, os dados desta demonstração são descartados”.
- “Não assumir abertura às 06:00 nem gerar horários com base nas 03:00.”
- “Alvos interativos de pelo menos 44 × 44 CSS px, inclusive ícones, dias e durações.”
- “Validar contraste de texto normal em pelo menos 4,5:1; texto grande e indicadores essenciais de controles/foco em pelo menos 3:1.”
- “Não disparar mensagens de erro a cada tecla.”
- “Menu e qualquer diálogo efetivamente necessário devem gerenciar foco e Escape.”

## Review Focus

Cinco condições que exigem cobertura explícita além do fluxo feliz:

1. Relógio do dispositivo em outro fuso e virada do dia: usar America/Sao_Paulo, descartar seleção vencida e preservar nome/oferta (tarefas 1, 3 e 4).
2. Respostas fora de ordem e operação que nunca termina: ignorar consulta antiga e recuperar em prazo finito sem restaurar slots inválidos (tarefas 1 e 3).
3. Voltar/Avançar, recarga, entrada direta e retorno após sucesso: proteger etapas, descartar dados ao sair e nunca reenviar automaticamente (tarefa 4).
4. Clique duplo, erro de transporte e conflito após revisão: uma tentativa ativa, repetição idempotente e recuperação com filtros/nome preservados (tarefas 1 e 4).
5. Nome longo de quadra, imagem ausente, menu aberto ao redimensionar e teclado virtual: conteúdo, foco e ação continuam alcançáveis sem overflow (tarefas 2 e 5).

---

## Estado, limites e sequência

Plano e especificação **aprovados pelo responsável em 15/10/2026**, na conversa de execução: “Pode aprovar as duas e continuar com a utilização das skills.” A aprovação inclui P01–P06 e autoriza implementação por marcos, sem publicação.

A revisão e a aprovação da especificação e deste plano foram autorizadas pelo responsável. Registrar em DECISIONS somente decisões efetivamente aprovadas; manter pendentes WhatsApp, quarta-feira, regras operacionais e demais dados factuais. Não alterar o status da especificação por inferência.

Uma entrega integrada em cinco tarefas: landing e jornada compartilham ofertas e CTAs, sem subsistemas de administração, loja ou backend. Se a aprovação abranger apenas a landing, executar somente tarefas 1 e 2 após ajustar o escopo do simulador na tarefa 1; não ampliar automaticamente a execução.

Sequência recomendada: execução nativa, um marco por sessão conforme SESSION-START. Tarefas 2 e 3 consomem a tarefa 1; tarefa 4 depende da 3; tarefa 5 integra todas. Agente principal edita; eventual revisão independente é somente leitura. Não executar comandos deste plano durante sua elaboração.

Antes do código: usar using-git-worktrees e executar as leituras exigidas por AGENTS. Ler integralmente os guias locais pertinentes em `node_modules/next/dist/docs/01-app/01-getting-started/`: `03-layouts-and-pages.md`, `04-linking-and-navigating.md`, `05-server-and-client-components.md`, `11-css.md`, `12-images.md` e `13-fonts.md`; consultar a referência local de `use-search-params.md` se utilizada. Não presumir APIs de versões anteriores.

## Decisões de implementação propostas

- IDs de quadra: `eqi-dgi`, `ademicom`, `o-boticario`, `antidoto`, `rrtur`. IDs de oferta: ID da quadra seguido de `-90`, mais `antidoto-60`. Preços em centavos: 19000, 18000, 18000, 18000, 18000; ANTIDOTO/60 = 14000.
- URL de entrada: `/agendamento?quadra=antidoto`; somente `quadra` pode inicializar o rascunho. Desconsiderar preço, nome, etapa e outros parâmetros. Etapa no histórico nativo, com namespace `primePadel`, contendo somente ID da visita e etapa; nunca nome ou rascunho. Preservar campos de histórico internos do Next. Nova montagem cria nova visita; estado de outra visita não restaura nada.
- Datas de domínio são strings `YYYY-MM-DD`, horários são `HH:mm`, ambos no calendário da arena; slots contêm data, oferta e instantes ISO com offset. Usar `Intl.DateTimeFormat` com `timeZone: 'America/Sao_Paulo'` para extrair data e hora, inclusive em testes executados em outro fuso. Aritmética de dias usa partes de calendário, sem interpretar uma data sem hora como meia-noite local do dispositivo.
- Testes puros usam o runner Playwright existente, em projeto `domain`, sem browser e sem nova biblioteca. Scripts: `test:unit` = `playwright test --project=domain`; `test:e2e` = `playwright test --project=chromium-desktop --project=chromium-mobile`; `test:e2e:ui` acrescenta `--ui` ao comando E2E. `domain` usa `testDir: './tests/unit'`; os dois projetos de navegador usam `testDir: './tests/e2e'`. O servidor web é desnecessário em `test:unit`: configurar `webServer: undefined` quando `process.argv` contiver `--project=domain`, servidor isolado nos demais casos.
- Testes E2E iniciam servidor próprio em `127.0.0.1:3100`, `reuseExistingServer: false`, com `NEXT_PUBLIC_ENABLE_TEST_HARNESS=1`. O build normal não recebe essa variável. Um ponto de composição lê `window.__PRIME_PADEL_TEST__` **somente** com a variável ativada e fora de produção. Nenhum controle, cenário ou relógio vem da URL de produto.
- `TestControls`: `{ scenario?: MockScenario; queryDelayMs?: number; submitDelayMs?: number; queryDelaysMs?: number[] }`. Injeção antes da navegação via `page.addInitScript`. Relógio E2E via `page.clock.install({ time: new Date('2026-10-15T12:00:00Z') })`; relógio unitário via função injetada. O relógio da aplicação sempre lê `Date` no momento da ação, sem capturar hoje na carga do módulo.
- Cenários: `normal`, `empty`, `all-unavailable`, `query-error-once`, `submit-error-once`, `conflict-once`, `query-timeout`, `submit-timeout`. Latência padrão 250 ms, limite 8000 ms em consulta/envio. Cenários de erro falham uma vez por instância, depois permitem recuperação; timeout simula operação sem resposta. Resposta tardia não pode concluir uma tentativa que já expirou.
- Slots normais: inícios a cada 30 minutos dentro do expediente, marcando cada quarto candidato como indisponível (índice original 3, 7, 11...). Remover inícios menores ou iguais ao instante atual e términos após fechamento. `empty` retorna lista vazia; `all-unavailable` retorna candidatos indisponíveis. Ambas as apresentações usam o estado vazio quando não houver slot selecionável.
- IDs de slots: `offerId|YYYY-MM-DD|HH:mm`. Envio valida a oferta, reconstitui o slot e reconsulta as regras; não aceita preço ou término do cliente. `conflict-once` bloqueia o slot enviado na instância e retorna conflito; outra seleção pode ter sucesso.
- Uma tentativa tem UUID criado pela aplicação ao enviar. Cache em memória da Promise/resultado bem-sucedido por tentativa garante idempotência. Erro recuperável não fica congelado no cache; retry mantém o ID se o payload não mudou. Alteração do payload gera outro ID. Reutilização de ID com outro payload retorna erro de validação. Dados e cache morrem com a visita.
- Fontes locais: DM Serif Display normal/itálica e Instrument Sans. Pinyon não é necessária nesta entrega. Copiar apenas os dois logos Prime Padel verde/branco. Controles textuais dispensam pacote de ícones; se surgir necessidade de ícone, usar Lucide local e registrar a dependência antes de adicionar, sem CDN.
- Foco sólido de 3 px com offset 3 px: verde `#324D3E` em superfícies claras, branco em verde. Texto secundário `#5E645F`; texto de slot indisponível também usa esse tom, evitando `#828782` para texto pequeno. Não utilizar amarelo nesta primeira composição. Registrar essas escolhas na implementação após aprovação.

## Mapa de arquivos e responsabilidades

| Arquivos | Responsabilidade |
|---|---|
| `src/content/arena.ts`, `src/content/courts.ts` | Fatos públicos, pendências e seis ofertas; sem fixtures |
| `src/domain/arena.ts`, `src/domain/booking.ts` | Tipos consumidos pelo conteúdo, serviço e fluxo |
| `src/domain/arena-time.ts`, `src/domain/format.ts` | Calendário da arena e apresentação de datas/moeda/duração |
| `src/services/booking-service.ts` | Contrato assíncrono independente de React |
| `src/services/mock/booking-service.ts`, `src/services/mock/scenarios.ts` | Simulação, relógio injetado, timeout, cenários e idempotência |
| `src/services/create-booking-service.ts` | Único ponto de composição do adaptador; teste opt-in |
| `src/styles/tokens.css`, `src/styles/fonts.css`, `src/app/globals.css` | Tokens adaptados, fontes, resets e acessibilidade globais |
| `public/fonts/DMSerifDisplay.woff2`, `public/fonts/DMSerifDisplay-Italic.woff2`, `public/fonts/InstrumentSans-Variable.woff2` | Cópias locais das fontes do export |
| `public/brand/prime-padel-green.png`, `public/brand/prime-padel-white.png` | Cópias dos logos do export |
| `src/components/brand/BrandPanel.tsx` | Placeholder com falha de imagem recuperável e legenda factual |
| `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `site-layout.module.css` no mesmo diretório | Navegação, menu móvel, rodapé |
| `src/features/landing/LandingSections.tsx`, `landing.module.css` | Conteúdo das seções, cards e links reais |
| `src/app/page.tsx`, `src/app/layout.tsx` | Composição da landing e documento pt-BR/metadados |
| `src/app/agendamento/page.tsx` | Entrada da rota, metadados e composição cliente |
| `src/features/booking/BookingFlow.tsx`, `use-booking-flow.ts` | Renderização de etapa e coordenação assíncrona |
| `src/features/booking/booking-state.ts`, `use-booking-history.ts` | Transições, guardas, estado de visita e histórico |
| `src/features/booking/TimeStep.tsx`, `DateStrip.tsx`, `SlotGrid.tsx` | Data/quadra/duração, consulta e horários |
| `src/features/booking/DetailsStep.tsx`, `ReviewStep.tsx`, `ResultStep.tsx` | Nome fictício, revisão, envio e resultado |
| `src/features/booking/BookingSummary.tsx`, `booking.module.css` | Resumo único e posicionamento responsivo |
| `tests/unit/catalog.spec.ts`, `arena-time.spec.ts`, `booking-service.spec.ts`, `booking-state.spec.ts` | Testes puros; os três últimos também em `tests/unit/` |
| `tests/e2e/helpers/booking.ts`, `landing.spec.ts`, `booking-selection.spec.ts`, `booking-flow.spec.ts`, `responsive.spec.ts` | Helpers em helpers; specs em `tests/e2e/` |
| `playwright.config.ts`, `package.json`, `README.md`, `docs/DECISIONS.md` | Projetos de teste, comandos reais e decisões aprovadas |
| `docs/verification/landing-agendamento.md` | Evidências finais, matriz de aceite e limitações observadas |

Não criar arquivos vazios antecipadamente. O teste inicial `tests/e2e/setup.spec.ts` será atualizado junto da landing. Não modificar o export.

### Task 1: Catálogo e serviço simulado verificável

**Files:** Criar conteúdo, domínio, contratos, adaptador e cenários do mapa; criar `tests/unit/catalog.spec.ts`, `tests/unit/arena-time.spec.ts`, `tests/unit/booking-service.spec.ts`. Modificar `playwright.config.ts`, `package.json`, `README.md` e, após aprovação, `docs/DECISIONS.md`.

**Interfaces:**

```ts
type CourtId = 'eqi-dgi' | 'ademicom' | 'o-boticario' | 'antidoto' | 'rrtur';
type Court = { id: CourtId; name: string };
type CourtOffer = { id: string; courtId: CourtId; durationMinutes: 60 | 90; priceCents: number };
type OpeningHours = { weekday: number } & (
  { status: 'confirmed'; opens: string; closes: string } | { status: 'pending' }
);
type ArenaProfile = { name: string; city: string; address: string; latitude: number;
  longitude: number; instagram: string; whatsapp: { status: 'pending' };
  store: { name: string; description: string; instagram: string }; events: readonly string[] };
type AvailabilitySlot = { id: string; offerId: string; date: string; startsAt: string;
  endsAt: string; available: boolean };
type AvailabilityResult = { kind: 'ready'; slots: readonly AvailabilitySlot[] }
  | { kind: 'hours-pending' } | { kind: 'error'; reason: 'timeout' | 'unavailable' | 'invalid' };
type BookingRequest = { attemptId: string; offerId: string; slotId: string; fictitiousName: string };
type BookingConfirmation = { simulated: true; court: Court; offer: CourtOffer;
  slot: AvailabilitySlot; fictitiousName: string };
type SubmitResult = { kind: 'success'; confirmation: BookingConfirmation }
  | { kind: 'conflict' } | { kind: 'expired' }
  | { kind: 'error'; reason: 'timeout' | 'unavailable' | 'invalid' };
interface BookingService {
  getAvailability(input: { date: string; offerId: string }, signal?: AbortSignal): Promise<AvailabilityResult>;
  submit(input: BookingRequest, signal?: AbortSignal): Promise<SubmitResult>;
}
```

- Consome: dados de PRODUCT e regras da spec §§3, 5.4, 6 e 9.
- Produz: `arena: ArenaProfile`, `openingHours: readonly OpeningHours[]`, `courts: readonly Court[]`, `offers: readonly CourtOffer[]`; `getArenaDate(now: Date): string`, `getDateWindow(now: Date): readonly string[]`, `isFutureSlot(slot: AvailabilitySlot, now: Date): boolean`; `formatPrice(cents: number): string`, `formatDuration(minutes: 60 | 90): string`, `formatArenaDate(date: string): string`, `formatArenaTime(instant: string): string`.
- Produz: `createMockBookingService(options?: { now?: () => Date; scenario?: MockScenario; queryDelayMs?: number; submitDelayMs?: number; queryDelaysMs?: number[] }): BookingService`. Exportar `MockScenario` e `TestControls` de `scenarios.ts`. Abortamento rejeita com `AbortError`; UI ignora esse cancelamento intencional.

- [x] **Step 1: Configurar os projetos e escrever testes de domínio que falham.** Adicionar script `test:unit`, separar os projetos e importar os módulos ainda inexistentes. Testes nomeados `catalogo preserva seis ofertas`, `calendario usa Sao Paulo`, `quarta fica pendente`, `respeita fechamento e passado`, `timeout recuperavel`, `revalida e deduplica tentativa`. Asserções mínimas (cada bloco dentro do teste correspondente):

```ts
expect(offers.map(o => [o.id, o.priceCents])).toEqual([
  ['eqi-dgi-90', 19000], ['ademicom-90', 18000], ['o-boticario-90', 18000],
  ['antidoto-60', 14000], ['antidoto-90', 18000], ['rrtur-90', 18000],
]);
expect(getArenaDate(new Date('2026-10-16T02:30:00Z'))).toBe('2026-10-15');
expect(getDateWindow(new Date('2026-10-15T12:00:00Z'))).toHaveLength(14);
expect(getDateWindow(new Date('2026-10-15T12:00:00Z')).at(-1)).toBe('2026-10-28');
expect(await service.getAvailability({date: '2026-10-21', offerId: 'antidoto-60'}))
  .toEqual({kind: 'hours-pending'});
```

Adicionar casos tabelados: domingo 18/10 tem último candidato 18:30 para 90 min e 19:00 para 60; quinta 15/10 tem último 21:30 para 90 e 22:00 para 60; nunca 22:00 para 90. Às 09:00 locais não aceitar início 09:00. Rejeitar 2026-10-14, 2026-10-29, 2026-02-30, oferta desconhecida e slot de outra oferta. Revalidar envio após avançar relógio para o início; esperar `expired`. Enviar duas vezes a mesma tentativa simultaneamente: resultados iguais e uma confirmação. Reusar ID com nome diferente: `invalid`. Cenários empty/all-unavailable, query-error-once/submit-error-once, conflict-once e timeouts têm testes próprios; no timeout esperar erro em até 8000 ms mais tolerância de 1000 ms, sem sucesso posterior. Nome só de espaços é inválido; ` Jogador de teste ` resulta em `Jogador de teste`.

- [x] **Step 2: Confirmar RED.** Rodar `npm run test:unit`; esperado falhar por módulos não implementados, não por configuração do runner. Registrar a causa.
- [x] **Step 3: Implementar conteúdo e funções de domínio nas assinaturas acima.** Horários conhecidos: seg/ter/qui/sex 06:00–23:00, sáb 09:00–23:00, dom 09:00–20:00; quarta pending sem intervalo utilizável. Não exportar o WhatsApp incompleto para a UI. Copiar nome/endereço/eventos/loja exatamente de PRODUCT. IDs e preços seguem as decisões deste plano.
- [x] **Step 4: Implementar BookingService e o adaptador.** Aplicar os cenários, timeout, validação e idempotência definidos acima. Instância por visita, nenhuma escrita externa. Não persistir nem registrar requests. Dados falsos não podem ultrapassar a janela ou construir um slot arbitrário.
- [x] **Step 5: Confirmar GREEN e documentação.** Rodar `npm run test:unit`, `npm run typecheck`, `npm run lint`; todos com exit code 0. README descreve ambos os comandos de teste e o servidor isolado. DECISIONS registra apenas escolhas aprovadas, sem confirmar regras comerciais.
- [x] **Step 6: Revisar e commitar o marco.** `git diff --check`; adicionar somente os arquivos desta tarefa e executar `git commit -m "feat: add court catalog and simulated booking service"`.

Aceite: C02/C04 (dados), J03/J06/J07/J08/J09/J10 (serviço), T01.

### Task 2: Landing com conteúdo confirmado e navegação acessível

**Files:** Criar estilos, assets, BrandPanel, layout e landing do mapa. Modificar `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `tests/e2e/setup.spec.ts`. Criar `tests/e2e/landing.spec.ts`.

**Interfaces:**

- Consome: `arena`, `openingHours`, `courts`, `offers` e formatadores da tarefa 1.
- Produz: `SiteHeader(): React.JSX.Element`, `SiteFooter(): React.JSX.Element`, `LandingSections(): React.JSX.Element`, `BrandPanel(): React.JSX.Element`. Header/footer reutilizáveis; agendamento pode usar cabeçalho reduzido dentro de BookingFlow.
- Produz: âncoras `#quadras`, `#como-funciona`, `#eventos`, `#loja`, `#localizacao`; CTA geral `/agendamento`, CTA de quadra `/agendamento?quadra=<CourtId>`.

- [x] **Step 1: Escrever teste da landing e atualizar o smoke para o novo H1.** Usar `test('conteudo factual e entradas do fluxo')` com:

```ts
await page.goto('/');
await expect(page.getByRole('heading', {level: 1})).toHaveText('Padel em Lages, na Prime Padel.');
await expect(page.locator('#quadras article')).toHaveCount(5);
const antidoto = page.locator('#quadras article').filter({hasText: 'ANTIDOTO'});
await expect(antidoto).toContainText('1h — R$ 140');
await expect(antidoto).toContainText('1h30 — R$ 180');
await expect(antidoto.getByRole('link')).toHaveAttribute('href', '/agendamento?quadra=antidoto');
await expect(page.getByText('Quarta-feira: horário a confirmar')).toBeVisible();
await expect(page.locator('a[href*="wa.me"], a[href^="tel:"]')).toHaveCount(0);
```

Cobrir também: ordem dos IDs de seção igual à spec §4; quatro demais cards com nome/preço exatos; perfis `https://www.instagram.com/primepadellages/` e `https://www.instagram.com/westpadelstore/`; texto de eventos sem datas/inscrições; aviso demonstrativo e ausência de links `href="#"`, login, pagamento e políticas inventadas. Conferência editorial contra PRODUCT faz parte da revisão, não depender apenas de blacklist automatizada.

Teste `menu preserva foco e libera pagina`: abrir menu em 390 px, Tab/Shift+Tab contidos, Escape retorna ao botão; abrir e navegar para Quadras foca o título; abrir e mudar para desktop fecha diálogo e libera scroll/foco. Teste `placeholder tolera imagem ausente`: abortar `/brand/**`, recarregar e verificar legenda `Imagem ilustrativa da marca`, nome Prime Padel e CTAs utilizáveis.

- [x] **Step 2: Confirmar RED.** `npm run test:e2e -- tests/e2e/landing.spec.ts`; esperado falhar por H1, seções e menu ainda ausentes.
- [x] **Step 3: Adaptar os tokens e copiar os cinco assets locais listados.** Fontes via `@font-face` local; globals importa fonts/tokens. Aplicar os valores responsivos da spec §§7–8 e foco sólido proposto. Preservar fontes fallback e espaço das imagens. Não carregar scripts/CDNs do export.
- [x] **Step 4: Implementar landing e menu.** Seções na ordem da spec §4, todos os textos fixos copiados dali. Usar `dialog` nativo modal para menu compacto, fechamento visível, Escape e foco no destino após âncora. Navegação completa aparece só quando couber (breakpoint inicial 1200 px); detectar overflow e voltar ao modo compacto se necessário. Nenhuma afirmação sobre estrutura, agenda atual ou políticas. Um H1 e skip link; título de destino com foco programático e scroll-margin.
- [x] **Step 5: Confirmar GREEN.** `npm run test:e2e -- tests/e2e/landing.spec.ts tests/e2e/setup.spec.ts`, `npm run lint`, `npm run typecheck`. Inspecionar landing em 390 e 1440 px e falha de logo. Esperado: testes aprovados, ausência de erros de console e requisições externas durante carga.
- [x] **Step 6: Revisar e commitar.** `git diff --check`; adicionar somente arquivos desta tarefa; `git commit -m "feat: build public Prime Padel landing"`.

Aceite: C01–C05, J01 (destinos), A01 (menu), T02 (assets).

### Task 3: Seleção de horário e recuperação de consultas

**Files:** Criar `src/app/agendamento/page.tsx`, `src/services/create-booking-service.ts`, `src/features/booking/BookingFlow.tsx`, `use-booking-flow.ts`, `booking-state.ts`, `TimeStep.tsx`, `DateStrip.tsx`, `SlotGrid.tsx`, `BookingSummary.tsx`, `booking.module.css`. Criar `tests/unit/booking-state.spec.ts`, `tests/e2e/helpers/booking.ts` e `tests/e2e/booking-selection.spec.ts`.

**Interfaces:**

```ts
type BookingStep = 'time' | 'details' | 'review' | 'result';
type BookingDraft = { date: string; courtId: CourtId | null; offerId: string | null;
  slot: AvailabilitySlot | null; fictitiousName: string };
type BookingState = { step: BookingStep; draft: BookingDraft;
  availability: AvailabilityResult | null; loading: boolean; submitting: boolean;
  notice: string | null; nameError: string | null; confirmation: BookingConfirmation | null };
type BookingActions = {
  setDate(value: string): void; setCourt(value: CourtId): void; setOffer(value: string): void;
  selectSlot(id: string): void; retryAvailability(): void;
  setName(value: string): void; validateName(): boolean;
  goTo(step: BookingStep): void; submit(): Promise<void>; restart(): void;
};
```

- Consome: contratos, catálogo, formatadores e relógio da tarefa 1; tokens da tarefa 2.
- Produz: `createBookingService(): BookingService`, único import do adaptador fora de mock; `BookingFlow(): React.JSX.Element`, com instância de serviço estável por montagem. `useBookingFlow(service: BookingService, initialCourtId: string | null): { state: BookingState; actions: BookingActions }`.
- Produz em `booking-state.ts`: `createDraft(now: Date, initialCourtId: string | null): BookingDraft`, `changeDate(draft: BookingDraft, date: string): BookingDraft`, `changeCourt(draft: BookingDraft, courtId: CourtId): BookingDraft`, `changeOffer(draft: BookingDraft, offerId: string): BookingDraft`, `getFirstIncompleteStep(draft: BookingDraft, now: Date): 'time' | 'details' | 'review'`.
- Componentes recebem `state: BookingState` e `actions: BookingActions` quando interativos; Summary recebe `draft: BookingDraft` e `children?: React.ReactNode` para um único CTA. Estado/tipos do fluxo em booking-state; BookingDraft em domain/booking.
- Helper E2E `openBooking(page: Page, controls?: TestControls, courtId?: string): Promise<void>` injeta controles, instala relógio fixo e navega; `chooseAntidotoSlot(page: Page, duration: 60 | 90): Promise<void>` escolhe 16/10/2026 e primeiro slot disponível pelo nome acessível. Não importa fixtures nos componentes.

- [x] **Step 1: Escrever testes de seleção e invalidação.** Teste `troca oferta descarta horario` em unitários: draft ANTIDOTO/60 com slot e nome, `changeOffer(..., 'antidoto-90')` mantém nome, limpa slot e troca oferta. `changeCourt(..., 'eqi-dgi')` seleciona eqi-dgi-90; mudar para antidoto deixa offerId null. Teste E2E `entrada e ofertas`:

```ts
await openBooking(page, {}, 'antidoto');
await expect(page.getByRole('radio', {name: 'ANTIDOTO', exact: true})).toBeChecked();
await expect(page.getByRole('radio', {name: '1h — R$ 140', exact: true})).not.toBeChecked();
await expect(page.getByRole('radio', {name: '1h30 — R$ 180', exact: true})).not.toBeChecked();
await page.getByRole('radio', {name: '1h — R$ 140', exact: true}).check();
await expect(page.getByRole('group', {name: 'Horários simulados'})).toBeVisible();
```

Testes separados: quadra inválida mostra `Escolha uma quadra para continuar`; hoje +13 dias disponíveis; quarta 21/10 mostra mensagem de pendência sem slots; preço/duração de todas as ofertas; vazio e todos indisponíveis mostram texto da spec; erro permite retry; consulta sem resposta mostra erro após 8 s. Atraso `[1200, 50]`: trocar oferta antes da resposta e verificar que só a segunda continua visível após ambas terminarem. Durante carregamento, slots antigos ausentes/desabilitados. Cada troca de filtro limpa seleção anterior. Clock às 02:59Z seguido de 03:01Z invalida data passada, recalcula janela e impede continuar. Executar o calendário também com contexto de navegador em `Asia/Tokyo`.

- [x] **Step 2: Confirmar RED.** `npm run test:unit -- tests/unit/booking-state.spec.ts` e `npm run test:e2e -- tests/e2e/booking-selection.spec.ts`; esperar módulo/rota e controles ausentes.
- [x] **Step 3: Implementar composição e transições puras.** Ler query somente após montagem (estado inicial neutro para evitar divergência servidor/cliente), aceitar CourtId conhecido e ignorar outros parâmetros. Hook identifica consultas por sequência, cancela a anterior e ignora resposta obsoleta mesmo se o serviço ignorar AbortSignal. Recalcular calendário ao consultar e avançar; data expirada passa para hoje com aviso e slot limpo, mantendo oferta/nome.
- [x] **Step 4: Implementar a etapa Horário.** Grupos nativos de rádio para data, quadra, duração e slot; nomes acessíveis dos slots contêm início/término e Disponível/Indisponível. Resumo nunca mostra zero para valor ausente. DateStrip tem botões `Datas anteriores`/`Próximas datas` de rolagem, sem selecionar data por efeito colateral. Mostrar todos os estados da spec §6 com aria-busy/live e sem mover foco a cada consulta. Continuar usa getFirstIncompleteStep; nesta tarefa details pode exibir só título e retorno, sendo completada imediatamente na tarefa 4.
- [x] **Step 5: Confirmar GREEN.** Rodar os dois comandos da etapa RED e `npm run typecheck`, `npm run lint`. Inspecionar 390/1440 px, quarta, loading, vazio e erro. Esperado: somente última consulta aplicada, nenhuma dependência externa e mensagens distintas.
- [x] **Step 6: Revisar e commitar.** `git diff --check`; adicionar arquivos desta tarefa; `git commit -m "feat: add simulated availability selection"`.

Aceite: J01, J03, J04, J06, J07 (consulta), J09 (consulta), J10, E01 (consulta), T01/T02.

### Task 4: Dados fictícios, revisão, histórico e resultado simulado

**Files:** Criar `DetailsStep.tsx`, `ReviewStep.tsx`, `ResultStep.tsx`, `use-booking-history.ts` em `src/features/booking/`. Modificar hook, estado, fluxo, resumo e CSS dessa feature. Estender `tests/unit/booking-state.spec.ts`, `tests/e2e/helpers/booking.ts`; criar `tests/e2e/booking-flow.spec.ts`.

**Interfaces:**

- Consome BookingState/BookingActions, BookingService, BookingConfirmation e getFirstIncompleteStep.
- Produz componentes `DetailsStep`, `ReviewStep`, `ResultStep` com props `{ state: BookingState; actions: BookingActions }`; `useBookingHistory(input: { step: BookingStep; onNavigate: (step: BookingStep) => void }): { pushStep: (step: BookingStep) => void; replaceStep: (step: BookingStep) => void }`.
- Produz helper E2E `reachReview(page: Page, controls?: TestControls, duration?: 60 | 90): Promise<void>` usando openBooking, chooseAntidotoSlot, preenchimento `Jogador de teste` e revisão. Produz validação `validateFictitiousName(value: string): { valid: boolean; value: string }` em booking-state. Sem nomes em histórico/URL/storage.

- [x] **Step 1: Escrever testes do fluxo e falhas.** Caso feliz:

```ts
await reachReview(page, {}, 60);
await expect(page.getByRole('heading', {level: 1})).toHaveText('Revise a simulação');
await expect(page.getByText('R$ 140', {exact: true}).first()).toBeVisible();
await page.getByRole('button', {name: 'Simular solicitação', exact: true}).click();
await expect(page.getByRole('heading', {level: 1})).toHaveText('Solicitação simulada concluída');
await expect(page.getByText('Esta demonstração não enviou uma solicitação à arena e não reservou a quadra.')).toBeVisible();
```

Cobrir R$180/90 min; nome vazio/espaços com `aria-invalid`, erro associado e foco; nome sem sobrenome aceito; edição de horário/nome preservada; consulta antiga não muda revisão; erro de envio mantém revisão e retry conclui; conflict-once volta à grade, mantém nome/oferta/data e desabilita slot conflitante, outro slot conclui. Com submitDelayMs 1200, disparar clique/Enter repetidos e verificar uma única transição de sucesso, controles de edição inativos e serviço idempotente coberto na tarefa 1. Timeout preserva revisão, sem sucesso tardio; avanço do relógio durante revisão impede envio vencido e foca aviso.

Teste `historico nao restaura nem reenvia`: Voltar/Avançar dentro da visita conserva campos; URL com `etapa=review&nome=Real&preco=1` inicia Horário vazio; recarga na revisão reinicia; sair para landing e voltar reinicia; sucesso seguido de Voltar/Avançar continua resultado sem submit; `Simular outro horário` apaga nome/quadra/duração/slot e seleciona hoje. Inspecionar history.state, storage, cookies, URLs, console e requests: nunca contêm `Jogador de teste`. Nenhum campo telefone, e-mail, CPF ou pagamento.

- [x] **Step 2: Confirmar RED.** `npm run test:e2e -- tests/e2e/booking-flow.spec.ts` e `npm run test:unit -- tests/unit/booking-state.spec.ts`; falha esperada nas etapas/guardas ainda não implementadas.
- [x] **Step 3: Implementar nome e revisão.** Nome obrigatório, trim na validação, validar blur/tentativa de avanço; não aplicar limite artificial nem exigir sobrenome. Review mostra todos os dados da spec, inclusive data completa, início/término, duração, preço por quadra e natureza simulada. Foco no H1 de cada etapa e no primeiro campo inválido. Guardas aplicadas em qualquer navegação, não apenas nos botões.
- [x] **Step 4: Implementar envio e recuperação.** Uma trava síncrona além do estado React impede submit concorrente. Gerenciar attemptId conforme tarefa 1. Revalidar tempo antes de enviar e no serviço. Erro mantém revisão; conflito limpa apenas slot e refaz consulta, preserva aviso até escolha explícita e leva foco ao aviso; expired retorna Horário com mensagem da spec. Em sucesso, rascunho terminal não pode ser reenviado por histórico. Restart cria estado e serviço novos, sem reaplicar pré-seleção de URL.
- [x] **Step 5: Implementar histórico e descarte por visita.** Push apenas em mudança explícita de etapa; replace para correção de guarda/conflito/sucesso e reinício. Campos não criam entradas. Popstate sempre passa por guardas; resultado terminal mantém resultado, inclusive ao encontrar entradas antigas. Ao desmontar ou em pagehide, cancelar tarefas e descartar dados; retorno via bfcache também reinicia a visita. Remover listeners no cleanup. Nunca colocar dados pessoais no state do histórico. Não bloquear saída com diálogo.
- [x] **Step 6: Confirmar GREEN.** Executar testes unitários, `npm run test:e2e -- tests/e2e/booking-flow.spec.ts tests/e2e/booking-selection.spec.ts`, `npm run lint`, `npm run typecheck`. Exercitar manualmente fluxo feliz, erro e conflito em desktop/celular; confirmar aviso persistente e foco correto.
- [x] **Step 7: Revisar e commitar.** `git diff --check`; adicionar arquivos desta tarefa; `git commit -m "feat: complete simulated booking journey"`.

Aceite: J02, J05, J07 (envio), J08, J09, J10, J11, J12, E01, A01/A02 (fluxo), T02.

### Task 5: Fechar responsividade, acessibilidade e evidências da entrega

**Files:** Criar `tests/e2e/responsive.spec.ts` e `docs/verification/landing-agendamento.md`. Modificar apenas componentes/CSS das tarefas 2–4 quando testes/inspeção demonstrarem falhas; atualizar `README.md` com estado real e comandos.

**Interfaces:** Consome rotas, helpers e contratos das tarefas anteriores. Produz a mesma interface pública validada e matriz de evidências; não adiciona serviços nem novos módulos.

- [ ] **Step 1: Escrever testes de apresentação com comportamento observável.** `test('reflow e CTA unico')` parametrizado por 320, 390, 768, 960 e 1440 px, na landing e nas etapas/estados do agendamento. Asserções:

```ts
expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
await expect(page.getByRole('button', {name: 'Continuar', exact: true})).toHaveCount(1);
const cta = await page.getByRole('button', {name: 'Continuar', exact: true}).boundingBox();
expect(cta!.height).toBeGreaterThanOrEqual(44);
expect(cta!.width).toBeGreaterThanOrEqual(44);
```

Verificar controles visíveis com mínimo 44 × 44; EQI / DGI INVESTIMENTOS integral e sem truncamento; região de datas pode rolar, página não. Teste `teclado atravessa fluxo`: operar menu, radios, formulário, revisão e resultado sem mouse; confirmar foco em título/erro/aviso conforme spec. Com reducedMotion reduce, verificar duração de animação/transição computada zerada. Teste de requests falha se uma carga de página fizer chamada fora de localhost (navegação externa deliberada não faz parte da carga).

- [ ] **Step 2: Executar testes e inspeção antes dos ajustes.** `npm run test:e2e -- tests/e2e/responsive.spec.ts`. Registrar falhas reais; se já passar, não produzir mudança artificial. Inspecionar também 390×500, 844×390, zoom real de navegador 200% e 320 CSS px. Não confundir deviceScaleFactor com zoom. Teclado virtual deve ser verificado em dispositivo/emulação que realmente reduza viewport; registrar limitação se ambiente não permitir.
- [ ] **Step 3: Ajustar CSS/composição apenas onde necessário.** Um único Summary/CTA no DOM reposicionado com grid: até 959 px barra inferior com safe-area e padding equivalente ao conteúdo; a partir de 960 px aside até 360 px, container 1080 px. Em viewport de altura menor que 600 px ou campo focado, barra participa do fluxo para permitir rolagem. Landing: uma coluna até 599, duas 600–959, até três após 960, container 1440, margens mínimas 20 e seções 64–128 px. Respeitar textos ampliados acima de alturas de referência. Ajustar foco/contraste conforme medições, não aparência presumida.
- [ ] **Step 4: Verificar acessibilidade e registrar medições.** Medir todos os pares usados de texto/fundo e indicadores de foco/seleção; registrar hex, razão e limiar em `docs/verification/landing-agendamento.md`. Inspecionar com leitor de tela disponível labels, obrigatoriedade, etapa, erro, conflito e sucesso sem anúncio duplicado. Screenshots de landing, seleção, revisão, sucesso, erro/vazio/conflito em 390/1440; só dados fictícios. Registrar ambiente e caminhos dos artefatos. Se leitor de tela/dispositivo faltar, registrar pendência explicitamente, sem declarar A02/R02 integralmente aprovados.
- [ ] **Step 5: Executar verificação final e matriz de aceite.** `npm run test:unit`, `npm run lint`, `npm run typecheck`, `npm run test:e2e`, `npm run build`; esperado todos exit code 0. Build sem habilitar test harness. Executar a versão de produção local (`npm run start -- --port 3200`) para smoke de `/` e `/agendamento`, confirmando que injetar `__PRIME_PADEL_TEST__` não ativa cenários. Encerrar apenas processos iniciados para esta verificação. Registrar resultados, comandos, data, commit e eventuais limitações reais. Conferir console e rede. Mapear cada critério abaixo a teste/inspeção com resultado observado.
- [ ] **Step 6: Revisar diff/escopo e commitar.** `git diff --check` e revisão do diff completo; conteúdo contra PRODUCT, nenhuma fixture importada pela UI, dados pessoais não persistidos, nenhuma integração ou módulo excluído. Atualizar README para o estado entregue e registrar decisões aprovadas necessárias. Commit somente arquivos da tarefa: `git commit -m "test: verify responsive accessible booking experience"`. Solicitar revisão independente conforme método aprovado; não publicar nem integrar branch automaticamente.

Aceite: R01, R02, A01, A02, A03, T03 e verificação integrada de todos os anteriores.

## Matriz de cobertura planejada

| Critérios | Verificação principal |
|---|---|
| C01, C03, C05 | landing.spec.ts + conferência editorial da landing contra spec/PRODUCT |
| C02, C04 | catalog.spec.ts, booking-service.spec.ts, landing.spec.ts e booking-selection.spec.ts |
| J01, J03, J04, J06 | booking-state.spec.ts e booking-selection.spec.ts |
| J02, J05, J12 | booking-flow.spec.ts |
| J07, J08, J09 | booking-service.spec.ts, booking-selection.spec.ts, booking-flow.spec.ts |
| J10 | arena-time.spec.ts, booking-service.spec.ts e testes E2E de expiração/fuso |
| J11 | booking-flow.spec.ts, inspeção de histórico e bfcache |
| E01 | testes de seleção/envio e inspeção de foco/anúncios em cada estado |
| R01, R02 | responsive.spec.ts, zoom, teclado virtual e inspeção nas cinco larguras |
| A01, A02, A03 | teclado, leitor de tela, contraste medido, movimento reduzido e falha de assets |
| T01, T02 | revisão de imports, testes de serviço, rede/storage/console e smoke de produção |
| T03 | cinco comandos finais e diff/escopo registrados na evidência |

## Autorrevisão do plano

Especificação §§1–3 coberta pelo catálogo/limites; §4 pela landing; §§5–6 pelo serviço e fluxo; §§7–8 por composição e acessibilidade; §9 pelos contratos; §10 pela matriz acima; §§11–12 preservados como propostas/pendências. As cinco condições de Review Focus têm testes atribuídos. Assinaturas compartilhadas são definidas antes do consumo; o serviço não conhece React e os componentes não conhecem cenários. Nenhum teste ou implementação foi executado nesta sessão documental. A revisão do plano não comprova a futura implementação.
