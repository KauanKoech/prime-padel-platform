# Verificacao da landing — marco 2

Data: 16/10/2026. Branch: `feat/landing-agendamento`. Base do marco:
`4f2f8e768abfe42a856f5b8748242f3fbc3031ac`.

## Escopo

Landing publica; cabecalho/menu, secoes na ordem da especificacao, cinco quadras
e seis ofertas, loja, eventos sem agenda atual, localizacao e rodape.
Fontes e logos locais; sem alteracoes no export ou dependencias novas.
O servico do marco 1 permanece separado da interface.

Os destinos dos CTAs estao preparados, mas `/agendamento` sera implementado no
marco 3. Estes testes nao certificam a jornada, envio, erro ou conflito na tela.
Nao houve publicacao, integracao externa, merge ou push.

## Evidencias automatizadas

| Verificacao | Resultado observado |
|---|---|
| RED inicial, landing.spec.ts | 12 falhas por conteudo/menu/brand ausentes |
| npm run test:e2e | 14 aprovados em Chromium desktop e celular |
| npm run test:unit | 34 aprovados |
| npm run lint | Exit 0 |
| npm run typecheck | Exit 0 |
| npm run build | Exit 0; landing prerenderizada |
| RED producao | 2 falhas por prefetch 404 de /agendamento e parametros de quadra |
| npm run test:production | Build aprovado; 2 testes aprovados em 390/1440 px |

O teste de menu verifica Tab/Shift+Tab, Escape, foco no acionador, foco no titulo
apos ancora e fechamento/liberacao de rolagem ao redimensionar para desktop.
Os testes de conteudo verificam nomes, ofertas, destinos, canais pendentes e
ordem das secoes. Conferencia editorial contra PRODUCT realizada separadamente:
nenhum dado de infraestrutura, depoimento, politica ou evento atual foi inventado.

Reflow e alvos de pelo menos 44 x 44 CSS px verificados em 320, 390, 768, 960 e
1440 px. Um defeito de largura minima do painel da marca foi reproduzido em 320
px e corrigido. O menu com texto ampliado foi exercitado com fonte raiz de 44
px; o calculo de espaco agora desconta padding. Isso e teste de ampliacao de
texto, nao comprovacao de zoom real do navegador.

Carga sem requisicoes externas ou erros de console verificada em dev e producao.
Falha dos dois logos simulada interceptando `/brand/**`; o nome e as acoes
permanecem acessiveis. Movimento reduzido remove transicoes.

## Conferencia visual

Ambiente: Windows, Chromium via Playwright, fontes do export carregadas
localmente. Landing inspecionada em 390 x 900 e 1440 x 900; screenshots completos,
abertura, quadras e localizacao na pasta ignorada:

`.superpowers/sdd/2026-10-15-landing-agendamento/`

- `landing-390-hero.png`, `landing-1440-hero.png`
- `landing-390-full.png`, `landing-1440-full.png`
- `landing-390-quadras.png`, `landing-1440-quadras.png`
- `landing-390-localizacao.png`, `landing-1440-localizacao.png`

Essa pasta acompanha a execucao e sera removida somente ao concluir o plano
completo; os testes e esta evidencia permanecem versionados.

## Contraste

Razoes calculadas pela luminancia relativa sRGB. Todos os pares de texto abaixo
superam 4,5:1; os contornos de foco superam 3:1 contra as superficies adjacentes.
As linhas finas decorativas nao transmitem estado ou informacao essencial.

| Uso | Frente | Fundo | Razao |
|---|---|---|---|
| Texto | #141A16 | #FFFFFF | 17,66:1 |
| Texto no creme | #141A16 | #F7F5EF | 16,20:1 |
| Secundario | #5E645F | #FFFFFF | 6,06:1 |
| Secundario no creme | #5E645F | #F7F5EF | 5,56:1 |
| Verde e foco | #324D3E | #FFFFFF | 9,26:1 |
| Verde no creme | #324D3E | #F7F5EF | 8,50:1 |
| Numero de quadra | #3E5E4C | #FFFFFF | 7,22:1 |
| Texto/foco branco no verde | #FFFFFF | #324D3E | 9,26:1 |
| Texto suave no verde | #CEDCD2 | #324D3E | 6,53:1 |
| Texto suave no rodape | #CEDCD2 | #1B2B22 | 10,45:1 |
| Texto/foco branco no rodape | #FFFFFF | #1B2B22 | 14,84:1 |
| Texto nos horarios | #141A16 | #F1F5F2 | 16,05:1 |
| Link em hover | #1B2B22 | #F1F5F2 | 13,48:1 |
| Botao primario em hover | #FFFFFF | #25392E | 12,33:1 |
| Botao claro em hover | #1B2B22 | #E4ECE6 | 12,32:1 |

## Limites da verificacao

Leitor de tela real, teclado virtual de dispositivo fisico e zoom real de 200%
nao foram exercitados neste marco. A02/R02 nao sao declarados integralmente
aprovados. Esses ensaios e a matriz integrada pertencem ao marco 5.
Os E2E verificam a semantica e foco observaveis, sem substituir esses ensaios.
