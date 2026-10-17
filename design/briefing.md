# Briefing — Prime Padel

Resumo do que o redesenho da landing usou como entrada. A fonte de verdade dos dados continua em `docs/PRODUCT.md`; a da identidade visual, em `DESIGN.md` e `design-system-export/`.

## Pedido

A landing anterior (commit `1b45848`) foi considerada genérica: muito branco vazio, textos duplicados lado a lado, faixa de números fraca ("05 quadras / 07 dias / 01 paixão") e seções sem ritmo. O pedido é refazer a landing pública e a jornada de agendamento simulado com a stack Vite + React + TypeScript, CSS próprio, Motion, Lenis e pré-renderização no build, mantendo a base, os dados e o design system da Prime Padel.

## Negócio

- **Nome:** Prime Padel.
- **Segmento:** arena de padel.
- **Cidade:** Lages, Santa Catarina.
- **Endereço:** Avenida Belisário Ramos, 4241, São Cristóvão, Lages – SC, CEP 88501-065.
- **Coordenadas:** -27.811353, -50.317361.
- **Instagram:** @primepadellages.
- **WhatsApp informado:** +55 49 9910-7642 (**pendente de confirmação**: o número local tem oito dígitos).
- **Loja dentro da arena:** West Padel Store (@westpadelstore): raquetes, roupas, calçados, bolsas, raqueteiras e outros produtos para padel.

## Horários informados

| Dia | Horário |
|---|---|
| Segunda a sexta | 06:00–23:00 (quarta: 03:00–23:00, **pendente de confirmação**) |
| Sábado | 09:00–23:00 |
| Domingo | 09:00–20:00 |

## Quadras e preços (por quadra)

| Quadra | Duração | Preço |
|---|---:|---:|
| EQI / DGI INVESTIMENTOS | 1h30 | R$ 190 |
| ADEMICOM | 1h30 | R$ 180 |
| O BOTICÁRIO | 1h30 | R$ 180 |
| ANTÍDOTO | 1h30 | R$ 180 |
| ANTÍDOTO | 1h | R$ 140 |
| RRTUR | 1h30 | R$ 180 |

## Eventos identificados

- 1º Open Prime Padel (categoria open masculina) — arte em `design-system-export/assets/brand/open-prime-padel-post.jpg`.
- Prime Cup (Primavera 2026) — arte em `design-system-export/assets/brand/prime-cup-logo.jpg`.
- Day Use de feriado (5 de setembro; quadras em sistema rotativo das 14h às 23h, R$ 50 por pessoa) — arte em `design-system-export/assets/brand/day-use-post.jpg`. Edição já realizada.

Não há agenda atual, inscrições abertas nem categorias confirmadas.

## Público e tom

Jogadores de padel de Lages e região, que marcam pelo celular. Tom de anfitrião: caloroso, direto, informação antes de adjetivo, "você" implícito, sem emojis.

## Estilo desejado

O design system da Prime Padel (`design-system-export/`): verde floresta `#324D3E`, branco e creme `#F7F5EF`, acento amarelo de bola `#D8EC4C` no máximo uma vez por vista, DM Serif Display nos títulos, Instrument Sans no corpo, Pinyon Script só em momentos de marca, ícones Lucide, linguagem de linhas finas dos posts (círculo, caixas, seta longa). Sem glassmorphism, sem gradientes coloridos, sem parallax, sem animações em loop; movimento curto e discreto.

## Referências

- Posts e logos reais da marca em `design-system-export/assets/`.
- Kits `landing` e `booking` em `design-system-export/ui_kits/` (padrões; preços e planos de lá são ilustrativos e não foram usados).
- Screenshots da landing anterior: só como antirreferência.

## Fotos

Não existem fotos da arena. Decisão: nenhuma foto de banco de imagens de padel apresentada como se fosse a arena. A página usa marca, tipografia, a quadra de padel desenhada em SVG e as artes reais de eventos. Há espaços previstos para fotos reais (ver `design/direcao-visual.md`).

## Escopo

Landing responsiva (arena, quadras com preço por quadra e duração, como agendar, eventos, loja, localização, contato) e jornada de agendamento simulado (data → quadra → duração → horários → dados → revisão → solicitação), com estados de carregamento, vazio, erro, sucesso e conflito simulado. Camada de serviços separada da interface. Fora do escopo: backend, autenticação, pagamentos, painel, loja virtual e gestão de torneios.
