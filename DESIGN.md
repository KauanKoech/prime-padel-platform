# Design da Prime Padel

## Fonte de verdade

O material canonico esta em `design-system-export/`.

Antes de criar ou alterar uma interface, leia:

1. `design-system-export/SKILL.md`.
2. `design-system-export/readme.md`.
3. Os tokens e componentes relacionados a tarefa.
4. O kit de interface correspondente: `landing`, `booking` ou, futuramente, `admin`.

Nao altere o export para adaptar a aplicacao. Copie ou transforme somente os tokens, ativos e padroes necessarios para o codigo de producao. Mantenha a origem registrada no componente ou stylesheet de destino quando isso ajudar a manutencao.

## Direcao visual

- Marca: sofisticada, esportiva, confiavel e acolhedora.
- Cor principal: verde floresta `#324D3E`.
- Superficies: branco e neutros quentes, com creme `#F7F5EF`.
- Acento: amarelo de bola de padel `#D8EC4C`, no maximo uma aplicacao de destaque por vista.
- Titulos: DM Serif Display.
- Interface e corpo: Instrument Sans.
- Pinyon Script: somente em momentos de marca e nunca em controles.
- Movimento: curto, discreto e desativavel com `prefers-reduced-motion`.

## Regras de producao

- Construa mobile-first.
- Preserve no minimo 44 px para alvos de toque em dispositivos moveis.
- Use foco visivel e contraste adequado.
- Use imagens reais fornecidas pela Prime Padel quando estiverem disponiveis.
- Enquanto faltarem fotografias oficiais, use composicoes de marca identificaveis como placeholders. Nao apresente imagens de terceiros como se fossem da arena.
- Use Lucide como sistema de icones ate existir um conjunto oficial.
- Nao use emojis como icones.
- Nao use gradientes coloridos, glassmorphism, parallax ou animacoes em loop.
- Nao invente depoimentos, numeros, parceiros ou beneficios da estrutura.

## Integracao futura

Depois da escolha do framework:

1. Leve fontes e logos aprovados para a pasta de assets da aplicacao.
2. Converta os tokens CSS necessarios para a camada global do projeto.
3. Adapte os componentes relevantes para TypeScript e para a convencao do framework.
4. Nao use `_ds_bundle.js` como dependencia de runtime da aplicacao de producao.
5. Registre qualquer divergencia intencional em `docs/DECISIONS.md`.
