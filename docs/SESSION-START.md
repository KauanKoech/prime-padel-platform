# Inicio de sessao

## Preparacao

1. Abra o Codex na raiz deste repositorio.
2. Inicie uma nova sessao depois de alterar `AGENTS.md` ou instalar skills.
3. Confirme que o workspace ativo e `prime-padel-platform`.
4. Use uma conversa por resultado coerente. Nao use uma unica conversa para todo o projeto.

## Ordem das sessoes e skills

Abra uma nova sessao para cada etapa. As skills em `.agents/skills/` ficam disponiveis depois que o Codex inicia na raiz do repositorio.

| Sessao | Skill principal | Resultado |
|---|---|---|
| 1. Especificacao | `brainstorming` e `prime-padel-design` | Especificacao visual e funcional aprovada |
| 2. Plano | `writing-plans` | Plano de implementacao aprovado |
| 3. Execucao | `executing-plans` e `prime-padel-design` | Implementacao incremental em worktree/branch |
| 4. Validacao | `verification-before-completion` | Evidencias de lint, tipos, testes e build |

`executing-plans` carrega as skills auxiliares de worktree, TDD, depuracao e revisao quando forem necessarias. Use `subagent-driven-development` no lugar de `executing-plans` somente se o plano tiver tarefas realmente independentes e voce aceitar o custo adicional.

## Sessao 1: especificacao

Objetivo: transformar o briefing e o design system em uma especificacao aprovada. Nao implemente a landing nesta sessao.

```text
Use as skills brainstorming e prime-padel-design.
Leia AGENTS.md, README.md, docs/PRODUCT.md, docs/ARCHITECTURE.md,
docs/DECISIONS.md, DESIGN.md e o design-system-export.

Estamos na fase de especificacao. Nao escreva codigo da landing ou do
agendamento. Defina a arquitetura de conteudo, a jornada de agendamento, os
estados da interface, o comportamento responsivo e os criterios de aceite.
Use somente fatos confirmados e marque as lacunas. Registre a especificacao em
docs/superpowers/specs/ e aguarde minha aprovacao.
```

## Sessao 2: plano de implementacao

Inicie somente depois que as decisoes tecnicas estiverem aprovadas.

```text
Use somente a skill writing-plans.
Leia as instrucoes, a especificacao aprovada e os documentos do repositorio.
Crie um plano verificavel para
a primeira entrega da Prime Padel. Divida o trabalho em marcos pequenos, cite
arquivos previstos, testes e criterios de aceite. Nao implemente ainda.
Mantenha backend, autenticacao, pagamentos, painel, loja e torneios fora do
escopo. Aguarde minha aprovacao do plano.
```

Salve o plano em `docs/superpowers/plans/` e aguarde aprovacao.

## Sessao 3: implementacao

```text
Use as skills executing-plans e prime-padel-design.
Leia AGENTS.md, docs/PRODUCT.md, docs/ARCHITECTURE.md, docs/DECISIONS.md,
DESIGN.md, a especificacao aprovada e o plano aprovado.

Implemente somente o primeiro marco incompleto do plano. Use o agente principal
para editar. Delegue apenas exploracao, revisao ou testes independentes.
Siga os ciclos de teste e os commits definidos no plano. Execute as verificacoes
aplicaveis, revise o diff e informe resultados e pendencias reais. Nao publique
nem conecte servicos externos.
```

## Sessao 4: validacao final

```text
Use a skill verification-before-completion.
Leia a especificacao e o plano aprovados. Verifique a implementacao completa
com npm run lint, npm run typecheck, npm run test:e2e e npm run build.
Revise os criterios de aceite, o diff, erros de console e os fluxos em celular
e desktop. Nao corrija itens fora do escopo sem registrar a decisao. Apresente
evidencias dos comandos executados e das pendencias reais.
```

## Subagentes

Nao e necessario configurar agentes personalizados no inicio. Solicite subagentes explicitamente quando houver uma tarefa independente de exploracao, revisao, acessibilidade ou teste. Nao delegue edicoes concorrentes nos mesmos arquivos.
