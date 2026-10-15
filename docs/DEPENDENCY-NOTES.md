# Notas de dependencias

## Auditoria inicial

Data: 2026-10-15.

- `npm audit --omit=dev`: nenhuma vulnerabilidade de producao.
- `npm audit`: cinco registros de alta severidade na cadeia de desenvolvimento do ESLint.
- Cadeia afetada: `eslint-config-next` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`.
- A versao publicada de `braces` consultada durante a inicializacao era `3.0.3`, ainda incluida pelo aviso.
- A correcao sugerida pelo npm faria downgrade de `eslint-config-next` 16.4.1 para 14.2.35. Essa alteracao e incompativel com a base Next.js 16 e nao foi aplicada.

As dependencias afetadas sao ferramentas de desenvolvimento. O problema deve ser reavaliado quando `eslint-config-next` ou a cadeia de glob receber uma atualizacao compativel.

## Scripts de instalacao

O npm bloqueou o `postinstall` de `unrs-resolver@1.12.2` por ainda nao existir uma decisao em `allowScripts`. O lint executou corretamente sem liberar o script. Nao aprove scripts de instalacao sem revisar novamente o pacote e a necessidade concreta.

## Regra de manutencao

Nao execute `npm audit fix --force`. Atualize dependencias de forma deliberada, execute todas as verificacoes e registre mudancas de versao relevantes neste arquivo.
