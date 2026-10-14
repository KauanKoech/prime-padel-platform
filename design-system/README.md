# Prime Padel — design system canônico

Fonte única para identidade, tokens e 26 componentes React. Leia [DESIGN.md](DESIGN.md) e [MIGRATION-REPORT.md](MIGRATION-REPORT.md).

- Importe componentes por `design-system/index.js` e estilos por `design-system/styles.css`.
- JSX é implementação executável; .d.ts descreve os contratos, não implementa UI.
- Fonts e marca são locais, sem CDNs em produção.
- `references/**/*.source.html` e JSX são fontes documentais. `npm run references:build` gera HTMLs independentes e um runtime derivado dos mesmos componentes canônicos. Não edite os gerados.
- Abra `references/ui-kits/landing/index.html`, `booking/index.html` e `admin/index.html` diretamente no navegador. Os exemplos contêm conteúdo fictício e NÃO são a landing de produção.
- `INVENTORY.json` contém classificação, hashes e destinos de cada arquivo bruto.

