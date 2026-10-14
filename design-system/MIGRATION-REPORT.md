# Relatório de migração

## Inventário e seleção

174 arquivos brutos inventariados antes das alterações, com bytes/SHA-256/dimensões e classificação individual em INVENTORY.json. Todos os arquivos textuais/código foram lidos. Imagens inspecionadas visualmente. 26 componentes JSX únicos com .d.ts; o bundle é derivação das mesmas fontes, não alternativa mais completa. Nenhum componente paralelo foi mantido.

## Estrutura

Tokens, 26 componentes, 9 imagens canônicas de marca (4 JPGs e 5 PNGs), 4 fontes locais, guidelines, 3 UI kits e referências de composição separados. Os .prompt.md são documentação, os .d.ts são declarações. Barrel index.js criado porque o lint do export o exigia mas ele não existia.

## Duplicações e descarte

Quatro uploads brand_files possuem SHA-256 idêntico aos quatro JPGs de assets/brand: preservada uma cópia canônica de cada. PNGs transparentes não são duplicados binários; úteis para fundos distintos. _ds_bundle.js, _ds_manifest.json, .thumbnail e thumbnail.html excluídos da produção e mantidos apenas no bruto/backup. O thumbnail não foi decodificado pelo leitor GDI; é artefato interno, sem relevância de identidade. Todas as imagens de terceiros ficam em references/images, fora do bundle da aplicação.

## Conflitos e adaptações

- Export não tinha app, package.json, index.js ou DESIGN.md. Stack React 18 + TypeScript + Vite, sem backend.
- React/Lucide/Babel via CDN removidos das referências geradas: runtime local compilado dos componentes canônicos; HTML/JSX documental separado do gerado. As referências mantêm dados demonstrativos do export com aviso. Armazenamento local da referência booking substituído por adaptador sem persistência.
- Logo e ícones adaptados a imports locais. Acessibilidade corrigida em campos, accordion, tabs, seleção de data/quadra, tooltip e diálogo nativo. Tipos Input/Select usam Omit para evitar conflito com size nativo.
- Valores literais legados do CSS extraídos sem alteração para tokens/components.css, rastreáveis pelo mapa JSON. Layout novo deve usar tokens semânticos.
- Conteúdo fictício dos kits (políticas, faturamento, instalações, contatos, avaliações e pagamento) não será promovido para produção.

## Lint

_adherence.oxlintrc.json preservado byte a byte em lint. Não havia configuração de lint anterior. Integração via ESLint 9/TypeScript: preservadas restrições de cores/medidas/fontes e enumerações válidas; importações de aplicação somente via barrel. Metadados x-omelette e plugins específicos de Oxlint não são configuração executável do ESLint. Seletores de props que rejeitavam atributos HTML/ARIA válidos e interfaces confundidas com componentes foram excluídos, com tipagem TypeScript assumindo essa checagem. Componentes JSX legados têm exceções explícitas; CSS de produção passa por verificador adicional de tokens. Referências documentais não fazem parte do lint de produção.

## Validações e backup

Em andamento. Original preservado até build, lint, testes, referências e commit canônico validados. Backup externo ainda não criado. Não remover enquanto esta seção não registrar verificação concluída.

## Pendências reais

Fotos das quadras/estrutura, vetor de marca, licenças das fontes, história e diferenciais comprovados, políticas de uso/cancelamento, agenda de eventos, depoimentos autorizados. Confirmar quarta-feira 03:00 e WhatsApp com oito dígitos locais; manter os dados recebidos sem correção presumida.

