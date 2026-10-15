# Instrucoes para agentes

Este repositorio contem a plataforma digital da Prime Padel.

## Antes de alterar arquivos

1. Leia `README.md`.
2. Leia `docs/PRODUCT.md` e `docs/DECISIONS.md`.
3. Para qualquer trabalho visual, leia `DESIGN.md`, `design-system-export/SKILL.md` e `design-system-export/readme.md`.
4. Consulte o plano aprovado da tarefa. Se nao houver plano aprovado, pare depois da descoberta ou do planejamento.
5. Preserve mudancas existentes que nao pertencem a tarefa atual.

## Escopo atual

- Construa somente a landing page publica e a experiencia de agendamento com dados simulados.
- Nao implemente agora backend definitivo, banco de dados, autenticacao, painel administrativo, pagamentos, financeiro, loja virtual ou gestao completa de torneios.
- Considere os modulos futuros nas fronteiras e nos contratos. Nao crie abstracoes sem uso na fase atual.
- Trate o WhatsApp e o horario de quarta-feira como dados pendentes de confirmacao.
- Nao invente depoimentos, estatisticas, estrutura da arena, politicas comerciais ou eventos atuais.

## Arquitetura

- Use Next.js App Router, React e TypeScript estrito.
- Use npm como gerenciador de pacotes.
- Use CSS proprio e adapte os tokens de `design-system-export/`; nao adicione Tailwind sem uma nova decisao.
- Mantenha conteudo institucional e dados da arena centralizados.
- Separe componentes de interface, tipos de dominio e servicos de dados.
- A interface de dados simulados deve poder ser substituida por uma API sem reescrever as telas.
- Modele precos por combinacao de quadra e duracao.
- O frontend pode demonstrar disponibilidade, mas o futuro backend sera responsavel por conflitos, bloqueios e confirmacao de reservas.
- Registre decisoes arquiteturais duraveis em `docs/DECISIONS.md`.

## Interface e conteudo

- Desenvolva mobile-first e valide tambem em desktop.
- Use HTML semantico, navegacao por teclado, foco visivel e alvos de toque adequados.
- Implemente estados de carregamento, vazio, erro e sucesso nos fluxos com dados.
- Use o design system da Prime Padel como fonte de verdade visual.
- Use texto em portugues brasileiro, caloroso e direto, sem emojis.
- Nao copie a identidade, o texto ou os ativos das referencias estruturais de terceiros presentes no export.

## Dependencias e seguranca

- Adicione uma dependencia somente quando ela resolver uma necessidade concreta.
- Nao armazene credenciais, tokens, dados de pagamento ou dados pessoais reais no repositorio.
- Use somente dados pessoais ficticios em testes, exemplos e screenshots.
- Nao conecte servicos externos nem publique o site sem solicitacao explicita.

## Verificacao

- Mantenha no `README.md` os comandos reais de desenvolvimento, lint, tipos, testes e build.
- Para verificacao completa, execute `npm run lint`, `npm run typecheck`, `npm run test:e2e` e `npm run build`.
- Antes de concluir uma alteracao relevante, execute os comandos aplicaveis e informe os resultados.
- Para mudancas visuais, valide celular e desktop no navegador.
- Para o agendamento, valide o fluxo feliz e os estados vazio, erro e conflito simulado.
- Revise o diff e confirme aderencia ao escopo antes de declarar a tarefa concluida.

## Subagentes

- O agente principal controla requisitos, decisoes, integracao e edicoes finais.
- Delegue apenas tarefas independentes e bem delimitadas.
- Prefira subagentes de leitura para exploracao, revisao, acessibilidade e testes.
- Nao permita que varios agentes editem simultaneamente os mesmos arquivos.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
