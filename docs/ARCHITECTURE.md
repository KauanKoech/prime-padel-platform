# Arquitetura prevista

## Principio

A plataforma tera superficies separadas que compartilham contratos e, futuramente, o mesmo backend. A primeira fase implementara apenas a superficie publica com dados simulados.

```text
Frontend publico ----\
                     >---- Backend futuro ---- Banco e integracoes
Painel administrativo/
```

O painel administrativo e o backend nao devem ser criados nesta fase.

## Camadas da primeira fase

1. **Conteudo:** dados institucionais, contatos, horarios e ofertas.
2. **Dominio:** tipos e regras de apresentacao para quadras, duracoes, horarios e rascunho de reserva.
3. **Servicos:** contrato de disponibilidade e reserva, inicialmente implementado com dados simulados.
4. **Interface:** landing, selecao de horario, dados do jogador, revisao e confirmacao.

A interface nao deve importar diretamente arquivos de dados simulados. Ela deve consumir o contrato da camada de servicos.

## Contratos previstos

- `ArenaProfile`
- `OpeningHours`
- `Court`
- `CourtOffer`
- `AvailabilitySlot`
- `BookingDraft`
- `BookingRequest`
- `BookingConfirmation`

Os nomes finais dependem da convencao escolhida no projeto. Nao implemente tipos sem uso na primeira entrega.

## Responsabilidades futuras do backend

- Calcular disponibilidade real.
- Aplicar bloqueios e regras de duracao.
- Detectar conflitos.
- Registrar reservas e cancelamentos.
- Autorizar usuarios e funcionarios.
- Enviar notificacoes.
- Integrar pagamentos e modulos comerciais quando aprovados.

## Regras de dependencia

- Componentes visuais nao contem regras de negocio.
- Servicos nao dependem de componentes React.
- Dados institucionais nao ficam duplicados entre paginas.
- Regras de disponibilidade nao ficam somente no navegador quando o backend existir.
- Loja e torneios permanecem modulos separados do nucleo de reservas.
