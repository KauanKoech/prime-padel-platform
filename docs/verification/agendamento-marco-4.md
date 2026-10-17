# Evidencias do agendamento — marco 4

Data: 16/10/2026. Branch: feat/landing-agendamento.
Revisao independente e correcao de foco: 17/10/2026.

## Escopo entregue

Etapas Dados, Revisao e Resultado da jornada simulada. Nome ficticio
obrigatorio, resumo completo, edicao, envio com trava sincrona, recuperacao
de erro/timeout/conflito/expiracao, historico protegido e reinicio da visita.
Nenhum envio a arena, reserva real, contato pessoal ou pagamento.

## Verificacao executada

- RED: teste de validacao falhou antes da funcao existir; os 28 casos iniciais
  do fluxo falharam antes das etapas e guardas serem implementadas.
- GREEN: 7 testes de estado; suite completa de dominio com 41 aprovados.
- RED adicional: 2 casos demonstraram barra fixa com VisualViewport reduzida;
  GREEN apos observar sua altura e resize, mantendo o CTA no fluxo.
- npm run test:e2e: 76 aprovados, nos projetos Chromium desktop e celular.
  Sao 34 casos de fluxo, 28 de selecao e 14 da landing/setup.
- npm run lint e npm run typecheck: exit 0; lint sem avisos.
- npm run test:production: build aprovado e 4 testes aprovados, incluindo
  jornada completa em 390/1440 px e isolamento dos controles de teste.
- git diff --check: sem erros.

Os E2E cobrem precos de R$ 140/60 min e R$ 180/90 min, dados completos,
validacao em blur/avanco, nome unico, edicao, foco, erro e retry, conflito
com slot indisponivel, cliques/Enter repetidos, historico durante envio,
timeout sem sucesso tardio, expiracao antes e durante envio, resposta
obsoleta, descarte ao sair durante envio, recarga e resultado terminal.
Reinicio limpa os campos; parametros extras nao restauram etapas ou nome.
As inspecoes de history.state, storage, cookies, URL, console e requisicoes
nao encontraram o nome ficticio; o namespace do historico tem apenas
visitId e step e preserva os campos internos do Next.

## Inspecao no navegador

Chromium nas larguras 320, 390, 768, 960 e 1440 px: nenhum overflow horizontal
ou controle visivel menor que 44 x 44 px. Fluxo feliz, erro de envio e
conflito foram exercitados em 390/1440 px, com recuperacao ate o resultado.
Screenshots de Dados, validacao, Revisao, Resultado, erro e conflito foram
capturados; as telas principais e os avisos foram inspecionados visualmente.
Sem erros de console ou chamadas externas nessas inspecoes.

Logs, medicoes e screenshots ficam na pasta ignorada
.superpowers/sdd/2026-10-15-landing-agendamento/, com prefixos task-4- e flow-.
O CTA aparece na posicao da viewport em screenshots de pagina inteira.

## Limites e continuidade

A revisao independente com gpt-6.1-sol examinou 6967a79..eb5a6c7, incluindo
o delta do marco 4. Encontrou uma falha importante: reiniciar removia o
botao focado sem transferir foco ao titulo da nova etapa. Dois testes de
desktop/celular reproduziram a falha com Enter; passaram apos a nova visita
receber uma instrucao de foco no titulo. A entrada inicial permanece igual.
O revisor inspecionou codigo e evidencias, sem executar as suites.
Depois da correcao: 41 testes de dominio (9,4 s), 76 E2E (46,4 s),
lint e tipos aprovados; novo build e 4 testes de producao (7,9 s) aprovados.

Permanece o ajuste menor, anterior a este marco, de Ctrl/Cmd/Shift+clique
nas ancoras da landing. Nao foram encontrados outros problemas importantes
ou criticos. A correcao foi verificada por testes, sem segunda revisao.

O reinicio continua controlado pela composicao externa, que fornece ao hook
uma funcao para recriar servico e visita. Esse terceiro argumento evita
acoplar o hook ao adaptador simulado; outro consumidor devera fornecer
tambem essa funcao.

O teste de teclado virtual altera VisualViewport e dispara resize; nao
equivale a teclado fisico de celular. O teste de retorno por bfcache usa
PageTransitionEvent sintetico; valida os handlers, sem provar congelamento
real do documento. Activity e retorno via navegacao foram exercitados
tambem em producao.

Leitor de tela real, zoom real de 200% e teclado virtual em dispositivo
continuam na verificacao do marco 5. Nao se declara A02/R02 integralmente
aprovado. Sem dependencias novas, mudancas no export, backend, integracoes
ou publicacao.
