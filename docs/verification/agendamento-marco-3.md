# Verificacao do agendamento — marco 3

Data: 16/10/2026. Branch: `feat/landing-agendamento`.
Base: `fab9d5ddb92f82d7dce3f4c03e1ad0b20eb28f15`.

## Escopo

Rota de agendamento, selecao de data/quadra/duracao/horario, resumo e recuperacao
de consultas simuladas. Os cinco nomes e seis ofertas usam o catalogo central.
Quarta-feira mostra pendencia, sem assumir fechamento ou gerar horarios.
Continuar chega ao titulo Dados e permite retornar; formulario, revisao, envio,
conflito na tela, resultado e historico entre etapas pertencem ao marco 4.

## Testes

- Baseline: 34 testes de dominio aprovados.
- RED inicial: modulo de transicoes ausente e 26 casos de navegador falhando
  na rota/controles ausentes. GREEN: seis testes de transicao e 26 de selecao.
- Regressao de foco: dois testes RED demonstraram o radio sob a barra inferior
  ao usar setas; GREEN apos margem de rolagem com a altura real da barra.
- Producao: dois testes RED demonstraram a visita preservada por Activity ao
  sair e retornar. GREEN apos descarte explicito e nova identidade por visita.
- `npm run test:unit`: 40 aprovados.
- `npm run test:e2e`: 42 aprovados (28 de selecao, 14 da landing/setup).
- `npm run lint` e `npm run typecheck`: exit 0, sem avisos do lint.
- `npm run test:production`: build aprovado e quatro testes aprovados.
  `/agendamento` possui shell estatico; selecao inicial usa o relogio do cliente.

Os testes cobrem precos/duracoes, entrada invalida, ignorar parametros extras,
14 datas, quarta, vazio, todos indisponiveis, erro recuperavel, timeout de 8 s,
respostas atrasadas, limpeza de selecao, virada de dia e navegador em Asia/Tokyo.
O teste de producao verifica entrada pela landing, descarte ao sair e que
`window.__PRIME_PADEL_TEST__` nao ativa cenarios em producao.
Nao certificam envio, conflito ou sucesso na interface, ainda nao implementados.

## Inspecao no navegador

Chromium, larguras 320, 390, 768, 960 e 1440 px: largura do documento igual a da
viewport; nenhum controle visivel abaixo de 44 x 44 px. Teclado com setas troca
radios, preserva foco visivel e nao oculta horario selecionado sob o CTA.
Altura de 420 px libera a barra fixa. Fonte raiz ampliada a 32 px nao causou
overflow nas larguras 320, 390, 960 e 1440. Isso nao equivale a zoom real de 200%.

Screenshots da selecao e estados quarta/loading/vazio/erro em 390/1440 px foram
inspecionados. Arquivos e logs na pasta ignorada do plano:
`.superpowers/sdd/2026-10-15-landing-agendamento/`, com prefixo `booking-` ou
`task-3-`. Sem erros de console ou requisicoes externas nas inspecoes e no smoke.

Contrastes adicionais calculados por luminancia relativa sRGB:

| Uso | Frente/fundo | Razao |
|---|---|---|
| Erro | #B23B2A / #F8E3DF | 4,80:1 |
| Aviso | #75480B / #FBF0DC | 6,92:1 |
| Indisponivel | #5E645F / #EEEFEB | 5,25:1 |
| Opcao disponivel | #324D3E / #F1F5F2 | 8,42:1 |
| Borda de opcao | #3E5E4C / #F1F5F2 | 6,56:1 |

Selecao usa branco sobre verde (9,26:1); foco usa o contorno solido definido no
marco 2. Movimento reduzido continua coberto pelo CSS global.

## Limites e continuidade

Revisao independente com `gpt-6.1-sol` do intervalo `6967a79..0647136`, com foco
no marco 3, nao encontrou problemas novos criticos, importantes ou menores.
O revisor inspecionou codigo, testes e evidencias sem reexecutar as suites.
Permanece o ajuste menor de Ctrl/Cmd+clique nas ancoras da landing, registrado
no marco 2 e sem alteracao neste marco.

A proxima etapa deve reutilizar o ciclo de visita compativel com Activity ao
adicionar historico e envio. Descarte com bfcache de documento completo e
protecao do resultado tambem precisam integrar essa verificacao.

Leitor de tela real, teclado virtual fisico e zoom real permanecem no marco 5;
nao se declara A02/R02 integralmente aprovado. Sem novas dependencias, alteracoes
no export, armazenamento persistente, backend, integracoes ou publicacao.
BookingActions sera ampliado no marco 4 com nome, validacao, envio e reinicio;
nao foram criados metodos vazios para esses comportamentos futuros.
