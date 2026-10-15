# Prime Padel — especificação da landing e do agendamento simulado

Data: 15 de outubro de 2026. Estado: **proposta para aprovação; não aprovada**.

Esta sessão entrega somente esta especificação. Não autoriza implementação, criação de telas, integração externa ou publicação. Após a aprovação, a próxima sessão deverá produzir um plano de implementação, também sujeito a aprovação.

## 1. Objetivo, fontes e natureza das decisões

Apresentar a Prime Padel e permitir que uma pessoa conheça as quadras e os preços, encontre a arena e experimente uma jornada de agendamento com dados simulados. A experiência deve deixar claro, desde a entrada até o resultado, que não produz reserva real.

Fontes consultadas:

- [AGENTS.md](../../../AGENTS.md), [README.md](../../../README.md), [PRODUCT.md](../../PRODUCT.md), [ARCHITECTURE.md](../../ARCHITECTURE.md), [DECISIONS.md](../../DECISIONS.md) e [SESSION-START.md](../../SESSION-START.md).
- [DESIGN.md](../../../DESIGN.md), [skill visual do export](../../../design-system-export/SKILL.md) e [readme do design system](../../../design-system-export/readme.md).
- Tokens de cores, tipografia, fontes, espaçamento e base em `design-system-export/tokens/`; guidelines de comunicação e estados de agendamento; padrões de componentes de ação, formulário, navegação, feedback e agendamento.
- Kits [landing](../../../design-system-export/ui_kits/landing/README.md) e [booking](../../../design-system-export/ui_kits/booking/README.md), com seus exemplos de estrutura e comportamento.

Convenções deste documento:

- **Confirmado no repositório:** informação explicitamente fornecida em PRODUCT ou decisão aceita em DECISIONS. Não significa verificação externa nesta sessão.
- **Proposta:** decisão de experiência feita para esta especificação; depende da aprovação deste documento. Todas as regras novas das seções 4 a 10 são propostas, salvo referência expressa a uma decisão já aceita.
- **Pendente:** dado ou decisão ainda sem confirmação. A seção 11 define sua alternativa de apresentação.
- **Simulado:** dado de demonstração, nunca evidência de disponibilidade, ocupação ou solicitação real.

O export é a referência visual; os documentos do produto determinam fatos e escopo. Exemplos de textos, preços, datas e serviços nos kits não confirmam operações da arena. Não há plano aprovado encontrado em `docs/`; este documento não é um plano de execução.

## 2. Escopo e limites

Incluído: landing pública, conteúdo institucional confirmado, quadras e ofertas, menções a eventos e à loja interna, localização e canais confirmados; consulta de horários simulados, dados fictícios do jogador, revisão e resultado simulado; estados de carregamento, vazio, erro, conflito e sucesso; acessibilidade e comportamento mobile-first.

Fora do escopo: backend, banco de dados, autenticação, painel administrativo, pagamentos, financeiro, comércio eletrônico, gestão de torneios, inscrições, notificações, integrações e publicação. Não haverá checkout, extras de aluguel, mensalidades, pacotes, descontos, horário nobre, lista de jogadores, aulas ou políticas comerciais inventadas.

Seria uma falha desta fase apresentar horários como reais, sugerir que a arena recebeu uma solicitação, prometer uma confirmação por WhatsApp, transformar imagens promocionais antigas em eventos atuais ou obrigar o jogador a fornecer dados pessoais reais para experimentar a demonstração.

## 3. Inventário factual

### 3.1 Arena e canais

| Informação | Dado do produto | Tratamento |
|---|---|---|
| Nome e cidade | Prime Padel; Lages, Santa Catarina | Publicável |
| Endereço | Avenida Belisario Ramos, 4241, Sao Cristovao, Lages - SC, CEP 88501-065, Brasil | Publicável; manter grafia da fonte até revisão editorial |
| Coordenadas | Latitude -27.811353; longitude -50.317361 | Referência de localização |
| Instagram da arena | @primepadellages | Publicável; não usar @primepadel dos exemplos |
| WhatsApp informado | +55 49 9910-7642 | Pendente: número local com oito dígitos; não corrigir, não publicar como contato válido e não gerar link |
| E-mail | Não fornecido | Omitir |

### 3.2 Funcionamento

| Dia | Informação fornecida | Apresentação proposta |
|---|---|---|
| Segunda e terça | 06:00–23:00 | Exibir |
| Quarta | 03:00–23:00, com abertura pendente | Exibir somente “Quarta-feira: horário a confirmar” |
| Quinta e sexta | 06:00–23:00 | Exibir |
| Sábado | 09:00–23:00 | Exibir |
| Domingo | 09:00–20:00 | Exibir |

A pendência da quarta não significa que a arena esteja fechada. Não assumir abertura às 06:00 nem gerar horários com base nas 03:00. Feriados e exceções de calendário não foram fornecidos; não afirmar funcionamento nesses dias como regra confirmada.

### 3.3 Quadras e ofertas

Preços totais **por quadra e duração**, nunca por jogador nem calculados por proporcionalidade de hora.

| Quadra | Duração | Preço |
|---|---|---|
| EQI / DGI INVESTIMENTOS | 1h30 | R$ 190 |
| ADEMICOM | 1h30 | R$ 180 |
| O BOTICARIO | 1h30 | R$ 180 |
| ANTIDOTO | 1h | R$ 140 |
| ANTIDOTO | 1h30 | R$ 180 |
| RRTUR | 1h30 | R$ 180 |

São cinco quadras e seis ofertas derivadas da tabela de PRODUCT. Não inferir tipo de cobertura, piso, vidro, capacidade, dimensões ou preferência dos jogadores a partir do nome. Manter os nomes fornecidos, inclusive sua grafia, até confirmação da marca.

### 3.4 Loja, eventos e ativos

- West Padel Store: loja interna; raquetes, roupas, calçados, bolsas, raqueteiras e outros produtos para padel. Instagram: @westpadelstore. Não há catálogo, preços ou estoque confirmados.
- Eventos identificados: Open Prime Padel e Prime Cup. Não há datas, categorias, inscrições ou edição atual confirmadas.
- Logos raster e arquivos de marca existem no export. Fotografias reais autorizadas da arena, arquivos vetoriais oficiais e fontes oficiais permanecem pendentes.
- DM Serif Display, Instrument Sans e Pinyon Script são substitutas fornecidas no design system, não fontes oficiais confirmadas. Os posts de Day Use e torneios servem como referência de linguagem visual, não como anúncio atual.

## 4. Arquitetura de conteúdo da landing

Rota proposta: `/`. Uma página com navegação por âncoras e entrada para `/agendamento`. Não criar páginas vazias para módulos futuros.

| Ordem / seção | Conteúdo e finalidade | Ação e condição |
|---|---|---|
| 1. Cabeçalho | Logo; navegação “Quadras”, “Como funciona”, “Eventos”, “Loja”, “Localização” | CTA “Ver horários”; menu compacto quando os links não couberem |
| 2. Abertura | H1 proposto “Padel em Lages, na Prime Padel.”; apoio “Conheça as quadras, confira os valores e experimente o agendamento.” | CTA “Ver horários” e link “Conhecer as quadras”; aviso visível “Agendamento demonstrativo. Nenhuma reserva real será feita.” |
| 3. Quadras e valores | Cinco cards com nome da quadra e cada oferta explícita; nota “Valores por quadra e duração” | “Ver horários desta quadra” leva ao fluxo com a quadra pré-selecionada |
| 4. Como funciona | Três blocos: “Escolha data, quadra e horário”; “Preencha os dados de demonstração”; “Revise e simule a solicitação” | Explicar o resultado simulado, sem estimativa de tempo de conclusão |
| 5. Eventos | Nomes Open Prime Padel e Prime Cup; mensagem “Datas e inscrições ainda não confirmadas nesta página.” | Link para o perfil @primepadellages; sem botão de inscrição, contagem regressiva ou indicação de evento aberto/encerrado |
| 6. Loja interna | West Padel Store e categorias fornecidas | Link “Conhecer a West Padel Store no Instagram”; sem carrinho, produtos ou preços fictícios |
| 7. Localização e contato | Endereço completo, cidade, horários da seção 3.2 e Instagram | Endereço legível e copiável; perfil da arena como contato disponível; texto “WhatsApp: contato a confirmar” sem link |
| 8. Encerramento | Convite breve para experimentar o agendamento; repetir o caráter demonstrativo | “Ver horários” |
| 9. Rodapé | Marca, cidade, endereço e links existentes; crédito de direitos com ano vigente | Sem links fictícios de termos, privacidade, login ou administração |

Propostas editoriais complementares:

- A apresentação institucional permanece breve na abertura; não criar narrativa de fundação, superlativos, estatísticas ou seção de diferenciais sem conteúdo confirmado.
- Não incluir seção separada de planos: os valores pertencem às ofertas de cada quadra. ANTIDOTO mostra as duas durações, sem preço “por hora” ou preço mínimo isolado.
- Não incluir FAQ inicialmente: políticas e perguntas operacionais dependem de confirmação; as dúvidas sobre a demonstração são respondidas junto ao fluxo.
- Não incluir disponibilidade no hero. A consulta começa no agendamento, onde a natureza simulada e seus estados ficam explícitos.
- Cards de eventos usam os nomes em composição de marca, sem reaproveitar cartazes com datas, categorias ou atletas. O post “Primavera 2026” não é evidência de edição atual.
- Enquanto faltarem fotografias autorizadas, usar painel verde e logo com legenda “Imagem ilustrativa da marca”. Nunca representar uma quadra fictícia como fotografia da Prime Padel.
- Links convencionais para os perfis informados são navegação iniciada pela pessoa; não carregar feeds, mapas incorporados, SDKs, pixels ou outras integrações. Esta sessão não acessa nem valida externamente os perfis. A implementação deverá verificar apenas a correspondência do destino com o identificador fornecido, sem exigir acesso ao serviço.
- Para localização, endereço textual basta nesta fase. Mapa interativo e navegação externa por mapas ficam fora da proposta inicial.

## 5. Jornada de agendamento

### 5.1 Estrutura e resultado proposto

Rota proposta: `/agendamento`. Indicador de três etapas: **Horário → Dados → Revisão**; após o envio, tela de resultado. “Horário” reúne data, quadra, duração e início, nessa ordem. A navegação de retorno mantém os dados durante a visita.

Proposta principal a aprovar: **simular uma solicitação**, conforme a recomendação ainda pendente em DECISIONS. Não tratar a aprovação deste documento como confirmação de uma futura regra operacional da arena.

Texto persistente: “Demonstração: os horários são simulados. Nenhuma reserva real será feita.” Na etapa de dados: “Use apenas dados fictícios.” O último botão diz “Simular solicitação”. O resultado diz “Solicitação simulada concluída” e “Esta demonstração não enviou uma solicitação à arena e não reservou a quadra.” Não mostrar “reserva confirmada”, “aguardando a equipe” nem promessa de retorno ou notificação.

Alternativas consideradas: confirmação imediata simulada também atenderia ao protótipo, mas depende da decisão de produto ainda pendente; coletar uma solicitação real exige backend e operação fora desta fase. A proposta escolhida mantém a experimentação completa com resultado claramente demonstrativo.

### 5.2 Entradas e passo a passo

1. **Entrada:** CTAs gerais abrem a etapa Horário sem quadra escolhida. CTAs de quadra carregam apenas um identificador público válido da quadra; não preenchem horário ou preço pela URL. Referência inválida é ignorada com aviso “Escolha uma quadra para continuar”.
2. **Data:** apresentar hoje e os próximos 13 dias, no calendário de `America/Sao_Paulo`, como janela exclusivamente demonstrativa. Hoje fica selecionado; as demais escolhas começam vazias. A data selecionada inclui dia da semana e data completa no nome acessível. Datas anteriores não podem ser escolhidas. Se hoje for quarta, mostrar imediatamente a pendência correspondente.
3. **Quadra:** seleção única entre os cinco nomes fornecidos. Todas permanecem visíveis quando a data ainda estiver pendente. Uma pré-seleção vinda da landing deve estar evidente e poder ser trocada.
4. **Duração:** oferecer somente combinações da tabela 3.3. Quando houver uma única oferta, exibir e selecionar 1h30 explicitamente. Na ANTIDOTO, exigir escolha entre 1h e 1h30, sem preferência oculta. Mostrar o preço total junto de cada opção.
5. **Disponibilidade:** consultar o serviço após haver data, quadra e oferta válidas. Renderizar horários de início e término retornados, sem afirmar agenda em tempo real. Horário livre pode ser selecionado; indisponível não pode. Não há contagem regressiva, bloqueio temporário ou garantia de que a seleção ficou reservada.
6. **Continuação:** “Continuar” só permite avançar com um horário válido. Mostrar instrução junto ao CTA quando faltar seleção, por exemplo “Escolha um horário para continuar”. O resumo apresenta quadra, data, início, término, duração e preço da oferta; valores ausentes não viram R$ 0.
7. **Dados:** proposta mínima da demonstração: um campo obrigatório “Nome fictício”, inicialmente vazio, com ajuda “Exemplo: Jogador de teste”. Remover espaços nas extremidades e exigir conteúdo não vazio, sem exigir sobrenome. Não incluir telefone, WhatsApp, e-mail, CPF, observações ou dados de outros jogadores nesta fase. Os dados necessários para operação real ficam pendentes. Não exigir aceite de política inexistente.
8. **Revisão:** mostrar nome fictício, data completa, quadra, início e término, duração, preço por quadra e aviso demonstrativo. Ações “Editar horário”, “Editar dados”, “Voltar” e “Simular solicitação”. Não apresentar valor como pago, saldo devido ou cobrança; não adicionar taxas.
9. **Envio:** validar o rascunho e revalidar a disponibilidade simulada pelo serviço. Enquanto processa, texto “Simulando solicitação…”; impedir envios duplicados e edições que alterem o pedido em processamento. Resposta bem-sucedida, falha e conflito são resultados distintos.
10. **Resultado:** confirmação visual persistente da simulação e resumo, sem protocolo que pareça comprovar reserva real. Ações “Simular outro horário” (reinicia todas as escolhas e o nome) e “Voltar ao início” (landing). Nenhum dado é enviado por WhatsApp, e-mail ou outro canal.

### 5.3 Dependências e navegação

| Alteração | Efeito obrigatório |
|---|---|
| Trocar data | Preservar quadra e duração válida; limpar horário, resultados e validação anterior; consultar novamente quando aplicável |
| Trocar quadra | Limpar horário e duração anterior; selecionar a única oferta ou solicitar escolha se houver duas; consultar novamente |
| Trocar duração | Atualizar preço da oferta e limpar o horário anterior, mesmo que o mesmo início possa existir na nova consulta |
| Editar dados | Preservar seleção válida de horário e atualizar o nome na revisão |
| Voltar da revisão para horário sem mudanças | Preservar escolhas; a revalidação final continua obrigatória |
| Resposta atrasada de consulta antiga | Ignorar; nunca substituir a disponibilidade da seleção atual |
| Dia virar durante a visita | Recalcular a data local ao consultar, avançar e enviar; invalidar datas/inícios que passaram e pedir nova seleção |
| Conflito no envio | Voltar à seleção com data, quadra, duração e nome preservados; limpar apenas o horário, atualizar disponibilidade e explicar o motivo |

As etapas devem participar da navegação Voltar/Avançar do navegador durante a visita, sem duplicar entradas em cada seleção de campo. Não permitir acesso à revisão ou ao resultado sem os dados necessários; retornar à primeira etapa incompleta e explicar o que falta. Voltar do resultado não pode reenviar a solicitação; uma nova simulação exige a ação explícita de reinício.

Proposta de persistência: rascunho apenas em memória durante o fluxo. Não salvar nome em URL, armazenamento local, cookies, logs ou analytics. Ao recarregar ou sair da rota, reiniciar o rascunho; avisar junto ao formulário “Ao sair ou recarregar, os dados desta demonstração são descartados”. Nenhum diálogo de retenção é necessário. Uma URL de entrada pode conter somente a quadra; parâmetros de etapa não restauram dados pessoais ou sucesso.

### 5.4 Regras exclusivas da simulação

- Janela de 14 dias, início de horários em intervalos de 30 minutos e resultados de disponibilidade são escolhas de demonstração, não regras comerciais confirmadas. O serviço simulado monta candidatos dentro dos horários conhecidos, rejeita inícios passados e exige que o término caiba integralmente no expediente do dia.
- Quarta-feira retorna estado “horário de funcionamento a confirmar”, sem lista de horários e sem envio. Oferecer “Escolher outra data”. Isso não pode ser tratado como dia lotado, fechado ou erro técnico.
- Exemplos de limite: com fechamento às 23:00, início 22:00 não atende à duração 1h30; no domingo, uma oferta de 1h30 não começa depois de 18:30. A simulação não supõe ocupação real a partir desses exemplos.
- O preço é o da oferta; 1h30 de ANTIDOTO custa R$ 180, não R$ 210. Não variar por dia, horário ou pessoa.
- Fixtures devem ser determinísticas e permitir reproduzir: horários disponíveis, todos indisponíveis, falha de consulta, falha de envio, conflito e sucesso. Não depender de sorte, hora real do teste ou serviço externo.
- O plano de implementação escolherá um mecanismo local de cenário e relógio controlado para testes; ele não aparecerá como controle de produto para o jogador. Ao repetir uma chamada de envio da mesma tentativa, o simulador deve produzir um único resultado, sem duplicar solicitações na demonstração.

## 6. Estados da interface e recuperação

| Estado / origem | Apresentação | Ação e preservação |
|---|---|---|
| Inicial incompleto | Instrução para a próxima seleção; nenhum horário inventado | Selecionar data, quadra e duração; não avançar antes de completar |
| Consulta carregando | Área de horários com espaço reservado e “Carregando horários simulados…”; região ocupada anunciada | Não selecionar resultados antigos; permitir alterar filtros, ignorando respostas ultrapassadas |
| Disponibilidade pronta | Grade com início, término e estados “Disponível”, “Selecionado” ou “Indisponível” | Seleção única; estado expresso em texto/semântica, além de cor |
| Consulta vazia | “Nenhum horário disponível na simulação para esta combinação.” | Trocar data, quadra ou duração; não sugerir que amanhã tem vaga sem consultar |
| Data com funcionamento pendente | “O horário de quarta-feira ainda precisa de confirmação.” | Escolher outra data; manter as demais escolhas válidas; sem consulta baseada em horário suposto |
| Erro de consulta | “Não foi possível carregar os horários simulados.” | “Tentar novamente”; preservar os filtros; não apresentar o erro como indisponibilidade |
| Seleção expirada | “Esse horário já passou. Escolha outro para continuar.” | Limpar o horário, atualizar a consulta e manter nome e oferta quando válidos |
| Campo inválido | “Informe um nome fictício para continuar.” junto ao campo | Foco no primeiro erro; preservar conteúdo digitado; validar ao sair do campo e ao tentar continuar |
| Enviando | CTA com estado ocupado e “Simulando solicitação…” | Uma tentativa ativa; revisão continua legível |
| Erro de envio | “Não foi possível concluir a simulação. Tente novamente.” | Permanecer na revisão, preservar rascunho, permitir nova tentativa |
| Conflito simulado | “Na simulação, esse horário ficou indisponível. Escolha outro.” | Aviso persistente na etapa Horário; atualizar a grade e preservar nome/filtros |
| Sucesso simulado | “Solicitação simulada concluída”; resumo e aviso de que não houve reserva/envio real | Novo fluxo ou retorno à landing; não depender de toast temporário |
| Imagem ausente ou com falha | Composição de marca com dimensão reservada e descrição apropriada | Conteúdo e ações continuam utilizáveis |
| Evento sem agenda atual | Nomes identificados e ausência de datas confirmadas | Link ao Instagram; sem inscrição ou chamada de evento atual |
| Contato não confirmado | Texto “WhatsApp: contato a confirmar” | Sem link clicável, número suposto ou botão que não funciona |

Conteúdo institucional e ofertas podem ser renderizados sem consulta remota. Não criar carregamentos artificiais na landing; a matriz assíncrona aplica-se aos serviços do agendamento. Se uma consulta não encerrar, o serviço deverá convertê-la em erro recuperável após prazo finito, definido pelo implementador, sem spinner indefinido.

## 7. Comportamento responsivo

Os valores abaixo são propostas de composição baseadas nos kits; a largura útil e o aumento de texto prevalecem sobre encaixar elementos à força.

| Faixa | Landing | Agendamento |
|---|---|---|
| 320–599 px | Coluna única; margens de 20 px; hero e CTAs empilhados; cabeçalho de referência 64 px com logo, CTA e menu; cards em lista | Coluna única; etapas com texto “Etapa 1 de 3 — Horário”; seletor de dias horizontal acessível; horários em 2 colunas quando necessário, até 3 se couberem; resumo breve e CTA inferior |
| 600–959 px | Cards de quadra em 2 colunas; hero e navegação continuam compactos quando necessário; eventos e loja sem carrossel obrigatório | Uma coluna principal; grade de horários até 4 colunas; resumo e CTA inferior mantidos |
| A partir de 960 px | Cabeçalho de referência 72 px; navegação horizontal se couber; hero com texto e composição de marca; quadras em até 3 colunas | Conteúdo e resumo lateral de até 360 px em container de referência 1080 px; CTA no resumo; ocultar a barra inferior e seus controles da navegação por teclado |

- Landing: container máximo de 1440 px, espaçamento entre colunas de referência 24 px, seções com respiro fluido de 64 a 128 px. Ordem visual e ordem de leitura permanecem iguais.
- Agendamento: resumo lateral e cabeçalho podem acompanhar a rolagem; o formulário e os erros nunca ficam escondidos atrás deles. Evitar painéis com rolagem interna desnecessária.
- Barra inferior móvel inclui área segura do dispositivo e espaço equivalente ao final do conteúdo. Exibe preço com duração e CTA; quadra/data completas permanecem visíveis no resumo em fluxo. Não cortar informações decisivas por reticências.
- Com teclado virtual aberto ou pouca altura útil, permitir que a barra deixe de ser fixa ou recolha sua parte informativa; campo, erro e ação permanecem alcançáveis por rolagem.
- O seletor de datas pode rolar horizontalmente dentro de sua região, com controles rotulados para navegar, sem depender de gesto. Nenhuma outra seção exige rolagem horizontal da página.
- Textos longos, especialmente “EQI / DGI INVESTIMENTOS”, quebram em linhas sem reduzir abaixo da escala de leitura. CTAs podem crescer em altura; 64/72 px são referências, não limites rígidos para texto ampliado.
- Menu móvel ocupa uma camada própria, com fechamento visível, Escape, foco contido e retorno ao acionador ao fechar. Ao navegar por uma âncora, fechar o menu e levar o foco ao título de destino, sem deixá-lo sob o cabeçalho. Se a largura mudar para o menu desktop, desfazer o bloqueio de rolagem e a contenção de foco.
- Testar pelo menos 320, 390, 768, 960 e 1440 px, uma altura reduzida/orientação horizontal, zoom a 200% e reflow a 320 CSS px. A versão compacta deve continuar disponível quando os links não couberem, inclusive acima de 960 px.

## 8. Direção visual, conteúdo e acessibilidade

Aplicar verde floresta `#324D3E`, branco, neutros quentes e creme `#F7F5EF`; texto principal `#141A16`. Amarelo `#D8EC4C` é opcional, restrito a no máximo um destaque visível por vez; não repetir em badges, seleção e CTA na mesma vista. Estados de erro e aviso usam tokens semânticos, sempre acompanhados de texto.

DM Serif Display para títulos e valores de destaque; Instrument Sans para conteúdo, dados e controles; números tabulares em horários e preços. Pinyon Script só em momento de marca, nunca em instruções ou campos. Preservar os arquivos locais substitutos e seus fallbacks, sem depender de serviço de fontes remoto.

Cards com borda, raio de referência 20 px e sem sombra em repouso; controles e horários com raio 14 px; botões em cápsula. Ícones Lucide com traço de referência 1,75; ícones decorativos não são anunciados. Logos existentes mantêm proporção e contraste. Sem emojis, gradientes coloridos, glassmorphism, parallax ou animações em loop. Carregamento pode usar texto e skeleton estático. Movimento discreto de 120–320 ms deve ser removido quando houver preferência por movimento reduzido.

Requisitos de interação:

- Português brasileiro, tom caloroso e direto; moeda como “R$ 180”, horário em 24 horas e duração legível “1h30”. Datas completas na revisão e resultado; explicitar “Horários da arena — America/Sao_Paulo” junto à consulta.
- Um H1 por página/etapa exibida, títulos hierárquicos, regiões semânticas e link para pular ao conteúdo. Navegação real usa links; seleção e envio usam botões ou controles de formulário nativos.
- Alvos interativos de pelo menos 44 × 44 CSS px, inclusive ícones, dias e durações. Foco visível em todos os fundos; nunca depender apenas de hover, cor ou animação.
- Validar contraste de texto normal em pelo menos 4,5:1; texto grande e indicadores essenciais de controles/foco em pelo menos 3:1. Não presumir que todo token do export serve para texto pequeno. Se o anel translúcido for insuficiente, escolher contorno sólido da paleta e registrar ajuste no futuro plano/decisão aplicável.
- Quadra, duração, dia e horário são seleções únicas com rótulos e estado anunciado. Usar grupos nativos ou semântica equivalente com teclado consistente; indisponíveis têm descrição acessível e não acionam seleção.
- Labels persistentes, erros associados ao campo e indicação textual de obrigatoriedade; placeholder não substitui label. Não disparar mensagens de erro a cada tecla.
- Mudança de etapa leva foco ao título. Erro de campo leva ao primeiro inválido; conflito leva ao aviso na etapa Horário. Atualizações de consulta são anunciadas sem mover foco a cada resultado. Mensagens de erro e sucesso permanecem visíveis; leitores de tela recebem anúncio apropriado, sem anúncios duplicados.
- Menu e qualquer diálogo efetivamente necessário devem gerenciar foco e Escape. A revisão ocorre em página/etapa, não depende de um modal. Não acrescentar tooltip ou toast como único meio de explicar um estado.
- Imagens informativas recebem texto alternativo factual; decoração é ignorada por tecnologia assistiva. Sem informação essencial embutida apenas em cartaz ou imagem.

## 9. Fronteiras técnicas e contratos funcionais

Decisões já aceitas: Next.js App Router, React, TypeScript estrito, npm, CSS próprio, dados centralizados e serviço separado da interface. Não incluir Tailwind ou usar `_ds_bundle.js` como dependência de produção. A leitura dos guias locais da versão instalada de Next.js será obrigatória antes de escrever código, em outra sessão.

Esta especificação define responsabilidades e informações necessárias, sem implementar tipos nem congelar nomes finais:

| Camada / contrato previsto | Responsabilidade nesta fase |
|---|---|
| Conteúdo: ArenaProfile e OpeningHours | Uma fonte para nome, localização, canais e horários; confirmação explícita por campo/dia; valor pendente não vira link nem horário utilizável |
| Domínio: Court e CourtOffer | Identidade estável de quadra; oferta vinculada à quadra, duração em minutos e preço BRL em centavos; seis combinações válidas |
| Serviço: consulta de disponibilidade / AvailabilitySlot | Receber data da arena e identificador da oferta; retornar slots com identidade, início, término e disponibilidade simulada, ou estado de funcionamento pendente/erro; lista vazia é sucesso sem vagas |
| Domínio: BookingDraft | Seleções correntes, nome fictício e validação necessária para navegar; não é uma reserva |
| Serviço: envio / BookingRequest | Receber oferta, slot e nome fictício, associados a uma tentativa; revalidar coerência e disponibilidade; devolver sucesso simulado, conflito ou erro recuperável |
| Resultado: BookingConfirmation | Resumo da tentativa concluída com natureza simulada explícita; nome do contrato não significa confirmação real de reserva |
| Interface | Apresentar conteúdo e resultados, coletar escolhas, gerir foco e recuperação; nunca importar diretamente as fixtures de disponibilidade |

O adaptador simulado e uma futura API compartilham as necessidades da tela; trocar a fonte não deve exigir reescrever as etapas. Preço deve vir da oferta validada, nunca de valor livre na URL. Componentes visuais não calculam tarifa nem resolvem conflitos.

O futuro backend continuará responsável por disponibilidade real, bloqueios, concorrência, persistência, autorização e notificações. A revalidação do mock apenas demonstra a experiência de conflito. Não criar agora interfaces ou módulos de pagamentos, estoque, administração ou torneios sem uso nesta entrega.

## 10. Critérios de aceite para a implementação futura

Estes critérios **não foram executados** nesta sessão documental. O plano futuro deverá ligá-los a verificações reproduzíveis.

| ID | Cenário e resultado esperado |
|---|---|
| C01 | Landing contém as seções e ações da seção 4, na ordem proposta; não contém destinos fictícios, login, checkout ou módulos futuros |
| C02 | Comparação com PRODUCT encontra os cinco nomes e seis ofertas exatos em landing, seletor, revisão e resultado; ANTIDOTO distingue R$ 140/1h de R$ 180/1h30 |
| C03 | Nenhuma afirmação de cobertura, infraestrutura, popularidade, depoimento, política, plano, data de evento ou notificação foi copiada dos exemplos do export |
| C04 | WhatsApp não aparece como canal válido nem link; quarta mostra pendência sem 03:00 e sem gerar slots; perfis usam os identificadores corretos |
| C05 | Eventos não insinuam edição atual ou inscrições; loja apresenta apenas descrição fornecida e perfil, sem catálogo/compra; placeholders não parecem fotos reais da arena |
| J01 | CTA geral abre o fluxo inicial; CTA de quadra mantém a quadra indicada; identificador desconhecido permite escolher uma válida sem quebrar a página |
| J02 | Fluxo feliz com relógio controlado: escolher data válida, ANTIDOTO, 1h, horário, nome fictício, revisar R$ 140, enviar e receber resultado explicitamente simulado |
| J03 | Repetir seleção ANTIDOTO/1h30 mostra R$ 180; demais quadras oferecem apenas 1h30 com seu respectivo preço; não há opção de duração sem oferta |
| J04 | Alterar data, quadra ou duração invalida o horário conforme seção 5.3; resposta atrasada da consulta anterior nunca restaura seleção obsoleta |
| J05 | Revisão só é alcançada com horário válido e nome preenchido; nome vazio/espaços gera erro associado e foco correto, preservando demais escolhas |
| J06 | Cenário vazio tem mensagem própria e permite trocar critérios; não dispara erro técnico, promessa de vaga amanhã ou envio sem horário |
| J07 | Erro de consulta permite repetir a consulta preservando critérios; erro de envio mantém revisão e dados e permite nova tentativa |
| J08 | Conflito simulado no envio retorna à grade atualizada, limpa o horário e preserva nome, data, quadra e duração; escolher outro horário permite concluir |
| J09 | Durante carregamento não há interação com slots antigos; durante envio clique duplo/Enter repetido não duplica a tentativa; ausência de resposta resulta em erro recuperável |
| J10 | Revalidar início/término impede horários passados, término após fechamento e seleção expirada após virada de dia; o relógio do teste torna os casos determinísticos |
| J11 | Voltar/Avançar e ações Editar preservam o rascunho durante a visita; recarregar/sair reinicia conforme aviso; entrar em etapa incompleta não pula validações; voltar do sucesso não reenvia |
| J12 | Resultado não afirma reserva ou envio real; reiniciar limpa nome e escolhas; nenhum telefone/e-mail real, pagamento ou consentimento comercial é solicitado |
| E01 | Carregando, vazio, pendência de funcionamento, erro, conflito e sucesso são distinguíveis por texto e semântica, sem depender apenas de cor ou toast |
| R01 | Inspeção em 320, 390, 768, 960 e 1440 px confirma composição da seção 7, nomes completos, ausência de overflow da página e controles com mínimo de 44 px |
| R02 | Teclado virtual, pouca altura, zoom a 200% e reflow a 320 CSS px não escondem campo, erro, foco ou CTA; resumo desktop e barra móvel não duplicam controles focáveis |
| A01 | Fluxo inteiro é operável por teclado, incluindo menu, datas, seletores, revisão, erros e resultado; ordem de foco acompanha a leitura e não há armadilha de foco |
| A02 | Leitor de tela anuncia labels, obrigatoriedade, seleção, indisponibilidade, etapa, erros e sucesso; testes automáticos não substituem a inspeção de foco e anúncios |
| A03 | Contraste é medido nos pares efetivamente usados; movimento reduzido é respeitado; logotipo, placeholder e ícones têm tratamento acessível adequado |
| T01 | UI consome serviço, sem importar fixtures; dados institucionais e ofertas têm fonte única; contratos suportam os resultados descritos sem backend nesta fase |
| T02 | Fontes e ativos necessários são locais; não há import de runtime do bundle de demonstração, integração, chamada de reserva real nem armazenamento/log de nome |
| T03 | Na implementação futura, executar `npm run lint`, `npm run typecheck`, `npm run test:e2e` e `npm run build`; registrar resultados, fluxos desktop/celular e revisão do diff antes de concluir |

A validação visual futura deve observar landing e todas as etapas em celular e desktop, incluindo erro, vazio e conflito. Deve verificar console e requisições para identificar falhas, vazamento de dados ou dependências externas indevidas. A revisão de escopo deve confirmar ausência dos módulos excluídos.

## 11. Lacunas, alternativas e decisões para aprovação

### 11.1 Decisões de experiência propostas neste documento

| ID | Decisão proposta | Impacto da aprovação |
|---|---|---|
| P01 | Encerrar com solicitação simulada, sem envio real | Define CTAs, revisão e resultado; a regra de reserva operacional continua pendente |
| P02 | Coletar somente nome fictício nesta demonstração | Permite testar formulário sem definir cadastro/contato real; telefone/e-mail exigiriam novo requisito |
| P03 | Não consultar quarta enquanto o horário estiver pendente | Define mensagem e caminho de recuperação; não classifica a arena como fechada |
| P04 | Demonstração de 14 dias, candidatos a cada 30 minutos e rascunho em memória | Define fixtures e navegação; não estabelece política comercial ou garantia de persistência |
| P05 | Landing com preços nas quadras; sem planos, FAQ, agenda no hero ou fotos não autorizadas | Define hierarquia de conteúdo e reduz dependência de material não confirmado |
| P06 | Fluxo em rota própria, três etapas e resumo lateral/inferior responsivo | Define organização das telas e critérios de navegação |

Estas são escolhas do autor da especificação para revisão, não decisões já aprovadas pelo responsável da Prime Padel. Aprovar este documento pode aceitar suas alternativas provisórias sem confirmar os dados comerciais que faltam.

### 11.2 Dados ainda necessários

| Lacuna | Tratamento desta fase | O que permanece para confirmação |
|---|---|---|
| WhatsApp | Omitir número e link; indicar contato a confirmar | Número completo válido |
| Quarta-feira | Mostrar pendência e orientar outra data | Horário correto de funcionamento |
| Solicitação versus confirmação real | Simular solicitação conforme P01 | Regra operacional futura e responsabilidade de confirmação |
| Dados de contato do jogador | Apenas nome fictício conforme P02 | Campos necessários, tratamento de dados e políticas antes de operação real |
| História, diferenciais, estrutura, aulas | Omitir afirmações e seções dependentes | Conteúdo factual aprovado |
| Fotos, vetores e fontes oficiais | Composição de marca, PNGs e fontes substitutas locais | Arquivos e autorização de uso |
| Uso das quadras, cancelamento e reagendamento | Não criar política nem checkbox de aceite | Textos aprovados |
| Pagamento e condições comerciais | Nenhuma etapa de pagamento, taxa, plano ou promessa | Regras comerciais em fase futura |
| Eventos | Somente nomes identificados e lacuna de agenda | Datas, edição, categorias e inscrições vigentes |
| Feriados, antecedência, intervalos, bloqueios e lotação | Regras de demonstração identificadas como tal | Regras operacionais da disponibilidade real |
| Depoimentos e e-mail da arena | Omitir | Conteúdo autorizado e canal confirmado |
| Hospedagem | Sem publicação nesta fase | Escolha futura, já pendente em DECISIONS |

## 12. Revisão, aprovação e próximo limite

Revisão documental em 15 de outubro de 2026: conteúdo confrontado com as fontes do repositório; leitura independente, apenas de documentação, conforme a skill brainstorming, não identificou questões materiais adicionais para planejar a proposta. Os 11 links relativos foram verificados sem destinos ausentes. Há 26 critérios de aceite para a implementação futura.

Não foram executados lint, typecheck, testes de navegador ou build: esta alteração contém somente Markdown, sem mudança na aplicação. A revisão documental não comprova comportamento, contraste ou responsividade de telas ainda não implementadas, nem substitui a aprovação do responsável.

As decisões aceitas do repositório permanecem intactas. Após aprovação explícita, registrar em DECISIONS somente as propostas aprovadas que constituam decisões duráveis, preservando como pendentes os dados ainda não confirmados. Nenhuma decisão nova está promovida a aceita nesta sessão.

**Próximo passo permitido após a revisão do responsável:** registrar aprovação ou ajustes desta especificação. O plano pertence à sessão seguinte. A landing e o agendamento não serão implementados nesta sessão, mesmo que o texto da especificação esteja completo.
