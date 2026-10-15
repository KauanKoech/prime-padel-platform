# Produto Prime Padel

## Objetivo

A plataforma sera o principal ponto de contato digital entre a Prime Padel, seus jogadores e a operacao interna da arena.

A evolucao prevista tem tres superficies:

1. Frontend publico.
2. Painel administrativo.
3. Backend compartilhado.

## Primeira entrega

A primeira entrega inclui somente:

- Landing page moderna e responsiva em React.
- Apresentacao da arena, quadras, eventos, loja, localizacao e canais de contato.
- Jornada publica para consultar disponibilidade e agendar quadras.
- Dados simulados por meio de uma camada de servicos separada da interface.
- Estados de carregamento, vazio, erro e sucesso.
- Navegacao por teclado e experiencia mobile-first.

Nao fazem parte da primeira entrega:

- Backend definitivo e banco de dados.
- Autenticacao e permissoes.
- Painel administrativo.
- Pagamentos.
- Controle financeiro.
- Loja virtual.
- Gestao completa de torneios.

## Jornada inicial de agendamento

O jogador deve poder:

1. Escolher uma data.
2. Selecionar uma quadra.
3. Escolher uma duracao disponivel para a quadra.
4. Consultar horarios simulados.
5. Informar seus dados.
6. Revisar os detalhes.
7. Enviar uma solicitacao ou confirmar uma reserva simulada.
8. Receber uma confirmacao clara na interface.

A definicao entre solicitacao e confirmacao imediata continua pendente. O frontend nao deve prometer validacao real de disponibilidade.

## Dados institucionais

- Nome: Prime Padel.
- Cidade: Lages, Santa Catarina.
- Endereco: Avenida Belisario Ramos, 4241, Sao Cristovao, Lages - SC, CEP 88501-065, Brasil.
- Latitude: `-27.811353`.
- Longitude: `-50.317361`.
- Instagram: `@primepadellages`.
- WhatsApp informado: `+55 49 9910-7642`.

O WhatsApp deve permanecer identificado como pendente de confirmacao porque o numero local informado tem oito digitos.

## Horarios informados

| Dia | Horario |
|---|---|
| Segunda-feira | 06:00-23:00 |
| Terca-feira | 06:00-23:00 |
| Quarta-feira | 03:00-23:00 |
| Quinta-feira | 06:00-23:00 |
| Sexta-feira | 06:00-23:00 |
| Sabado | 09:00-23:00 |
| Domingo | 09:00-20:00 |

A abertura as `03:00` na quarta-feira esta pendente de confirmacao.

## Quadras e ofertas

Os precos sao por quadra. O modelo deve representar uma oferta por combinacao de quadra e duracao.

| Quadra | Duracao | Preco |
|---|---:|---:|
| EQI / DGI INVESTIMENTOS | 1h30 | R$ 190 |
| ADEMICOM | 1h30 | R$ 180 |
| O BOTICARIO | 1h30 | R$ 180 |
| ANTIDOTO | 1h30 | R$ 180 |
| ANTIDOTO | 1h | R$ 140 |
| RRTUR | 1h30 | R$ 180 |

## Loja interna

- Nome: West Padel Store.
- Instagram: `@westpadelstore`.
- Descricao fornecida: raquetes, roupas, calcados, bolsas, raqueteiras e outros produtos para padel.

A operacao digital da loja sera um modulo futuro separado das reservas.

## Eventos identificados

- Open Prime Padel.
- Prime Cup.

Nao existem datas, categorias ou inscricoes atuais confirmadas. Nao apresente eventos como abertos sem confirmacao.

## Informacoes pendentes

- Confirmacao do WhatsApp.
- Confirmacao do horario de quarta-feira.
- Historia e apresentacao institucional.
- Diferenciais e estrutura da arena.
- Fotografias reais e autorizadas.
- Regras de uso das quadras.
- Politica de cancelamento e reagendamento.
- Formas de pagamento.
- Agenda atual de eventos e torneios.
- Depoimentos autorizados.
- E-mail de contato.
- Informacoes sobre aulas, professores e clinicas.
- Arquivos vetoriais oficiais e confirmacao das fontes da marca.
