/**
 * Todos os textos da landing e do agendamento. Dados institucionais (endereço, horários, quadras, preços)
 * ficam em `arena.ts`; aqui a voz da marca, os professores, os eventos e as fotos.
 * Fontes: landing anterior (commit 1b45848), docs/PRODUCT.md e os posts oficiais em design/originais/
 * (professores, aulas, Prime Cup Primavera 2026, comunidade, loja). Textos novos estão listados para aprovação
 * no relatório da entrega.
 */

export type Photo = { src: string; srcSet?: string; width: number; height: number; alt: string };

/** Foto recortada por scripts/images.mjs; `small` = existe a versão de 400 px para o srcset. */
const foto = (name: string, width: number, height: number, alt: string, small = true): Photo => ({
  src: `/img/fotos/${name}.webp`,
  srcSet: small ? `/img/fotos/${name}-400.webp 400w, /img/fotos/${name}.webp ${width}w` : undefined,
  width,
  height,
  alt,
});

export const site = {
  title: 'Prime Padel',
  skip: 'Pular para o conteúdo',

  nav: [
    { href: '#aulas', label: 'Aulas' },
    { href: '#quadras', label: 'Quadras' },
    { href: '#professores', label: 'Professores' },
    { href: '#eventos', label: 'Prime Cup' },
    { href: '#loja', label: 'Loja' },
    { href: '#onde-estamos', label: 'Onde estamos' },
  ],

  header: {
    home: 'Prime Padel, voltar ao início',
    book: 'Agendar quadra',
    bookShort: 'Agendar',
    menu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    navLabel: 'Navegação principal',
    menuNavLabel: 'Seções da página',
  },

  hero: {
    titleLead: 'Seu próximo jogo',
    titleMid: 'começa na',
    titleAccent: 'Prime.',
    lead: 'Cinco quadras de padel em São Cristóvão, Lages, aulas do iniciante ao avançado e a West Padel Store dentro da arena.',
    primary: 'Ver horários',
    primaryHover: 'Abrir a agenda',
    secondary: 'Quadras e valores',
    facts: {
      courts: 'quadras',
      durations: 'partidas de 1h ou 1h30',
      price: 'por quadra, não por pessoa',
      teachers: 'professores',
    },
    open: 'Aberto todos os dias',
    mosaicLabel: 'Fotos da Prime Padel',
    // Mosaico do topo: recortes pequenos (no máximo 400 px de largura na tela), o título é o protagonista.
    photos: [
      foto('aperto-de-maos', 651, 806, 'Dois jogadores se cumprimentam com as mãos em quadra, com raquetes de padel e a placa DGI / EQI ao fundo.'),
      foto('saque', 646, 530, 'Jogadora sacando, vista de cima, em preto e branco.'),
      foto('amarrando-o-tenis', 651, 500, 'Jogadora sorrindo enquanto amarra o tênis na grama da quadra.'),
    ],
  },

  values: {
    label: 'O que você encontra na Prime',
    items: [
      { icon: 'court', title: 'Cinco quadras', text: 'valor por quadra e por duração' },
      { icon: 'learn', title: 'Aulas do zero', text: 'acompanhamento profissional para todos os níveis e idades' },
      { icon: 'coach', title: 'Professores capacitados', text: 'do primeiro saque ao nível avançado' },
      { icon: 'premium', title: 'Estrutura premium', text: 'com a West Padel Store dentro da arena' },
    ],
  },

  courts: {
    titleLead: 'Escolha sua',
    titleAccent: 'quadra.',
    lead: 'Cada quadra tem o seu valor, cobrado por quadra e por duração. Toque em uma delas para ver as opções e seguir para os horários.',
    groupLabel: 'Quadras da arena',
    selected: 'Quadra escolhida',
    durationLabel: 'Duração',
    action: 'Ver horários desta quadra',
    perCourt: 'Valor por quadra, para a turma toda.',
    demo: 'A agenda do site é uma demonstração: os horários são simulados e nada é reservado. Para garantir sua quadra hoje, fale com a arena.',
  },

  lessons: {
    titleLead: 'Nunca jogou',
    titleAccent: 'padel?',
    statement: 'Aqui você aprende do zero.',
    items: ['Acompanhamento profissional para todos os níveis e idades', 'Professores capacitados', 'Estrutura premium'],
    text: 'Do primeiro saque ao nível avançado, com aulas também para crianças. Fale com a arena para combinar a sua.',
    action: 'Quero fazer uma aula',
    actionHover: 'Chamar no WhatsApp',
    actionMessage: 'Olá! Vi o site da Prime Padel e quero fazer uma aula.',
    secondary: 'Conhecer os professores',
    photo: foto('saque', 646, 530, 'Foto em preto e branco, vista de cima, de uma jogadora sacando na quadra de padel, com o braço esticado para o alto.'),
  },

  coaches: {
    titleLead: 'Conheça nossos',
    titleAccent: 'professores.',
    lead: 'Três professores com formação no padel e anos de raquete, do primeiro contato com a bola ao nível avançado. E aulas para crianças.',
    levelsLabel: 'Atende',
    listLabel: 'Professores da Prime Padel',
    action: (first: string) => `Aula com ${first}`,
    actionHover: 'Chamar no WhatsApp',
    message: (name: string) => `Olá! Vi o site da Prime Padel e quero agendar uma aula com o professor ${name}.`,
    swipe: 'Deslize para ver os três professores',
    items: [
      {
        id: 'dorotovio',
        name: 'Dorotóvio R. Couto',
        first: 'Dorotóvio',
        stat: { value: 3, unit: 'anos', label: 'professor na Prime' },
        facts: [
          'Bacharel em Educação Física',
          'Pós-graduado em performance desportiva',
          'Formação nos métodos PEX, Cobrapa, Villa Padel, Tyson Padel Team, Profit Padel Kids e M3 Academy Online',
        ],
        levels: ['Do iniciante ao avançado', 'Crianças de todas as idades'],
        // A foto vem do post "Conheça nosso professor" (4.png), que abre a apresentação do Dorotóvio (5.png).
        photo: foto('prof-dorotovio', 330, 412, 'Professor Dorotóvio R. Couto, sorrindo, com a camisa da Prime Padel.', false),
      },
      {
        id: 'gustavo',
        name: 'Gustavo Silveira',
        first: 'Gustavo',
        stat: { value: 5, unit: 'anos', label: 'dando aulas de padel' },
        facts: ['Joga tênis desde os 10 anos e começou a dar aulas aos 15', 'Conheceu o padel aos 16', 'Joga a categoria Open e torneios profissionais'],
        levels: ['Do iniciante ao avançado', 'Crianças a partir dos 8 anos'],
        photo: foto('prof-gustavo', 172, 214, 'Professor Gustavo Silveira, com a camisa da Prime Padel, na quadra.', false),
      },
      {
        id: 'eduardo',
        name: 'Eduardo Pereira',
        first: 'Eduardo',
        stat: { value: 31, unit: 'anos', label: 'como professor de esportes de raquete' },
        facts: ['Ex-atleta profissional de squash', 'Formação como professor de padel com @fabianopadel'],
        levels: ['Iniciante e intermediário'],
        photo: foto('prof-eduardo', 189, 236, 'Professor Eduardo Pereira, sorrindo, com a camisa da Prime Padel, na quadra.', false),
      },
    ],
  },

  events: {
    titleLead: 'Encontros que viram',
    titleAccent: 'história.',
    tabsLabel: 'Eventos da Prime',
    categoriesLabel: 'Categorias',
    items: [
      {
        id: 'cup',
        tab: 'Prime Cup',
        title: 'Prime Cup Primavera 2026',
        meta: '01 a 04 de outubro de 2026',
        text: 'O torneio da casa, com categorias do iniciante à 2ª e uma categoria infantil. A edição de primavera já aconteceu; a próxima sai primeiro no Instagram.',
        categories: [
          { name: 'Masculina', detail: '2ª, 3ª, 4ª, 5ª, 6ª e Iniciante' },
          { name: 'Feminina', detail: '3ª, 4ª, 5ª, 6ª e Iniciante' },
          { name: 'Mista', detail: 'B e C' },
          { name: 'Infantil', detail: 'até 12 anos' },
        ],
        image: foto(
          'prime-cup-primavera-2026',
          631,
          787,
          'Cartaz da Prime Cup Primavera 2026, de 01 a 04 de outubro, com as categorias masculina, feminina, mista e infantil até 12 anos.',
        ),
      },
      {
        id: 'open',
        tab: 'Open Prime Padel',
        title: '1º Open Prime Padel',
        meta: 'Categoria open masculina',
        text: 'A primeira edição do torneio da casa reuniu atletas na categoria open masculina.',
        categories: [],
        image: { src: '/img/open-prime-padel.webp', width: 694, height: 543, alt: 'Arte do 1º Open Prime Padel: "Atletas confirmados, categoria open masculina", com o logo do torneio sobre fundo verde.' } as Photo,
      },
      {
        id: 'dayuse',
        tab: 'Day Use',
        title: 'Day Use de feriado',
        meta: 'Edição de 5 de setembro',
        text: 'Quadras em sistema rotativo das 14h às 23h, com pizza, chopp e drinks. Naquela edição, o valor foi de R$ 50 por pessoa.',
        categories: [],
        image: { src: '/img/day-use.webp', width: 731, height: 842, alt: 'Arte do Day Use de feriado de 5 de setembro: quadras em sistema rotativo das 14h às 23h, pizzas, chopp e drinks, R$ 50 por pessoa.' } as Photo,
      },
    ],
    note: 'Artes de divulgação da arena, de edições já anunciadas. Datas, categorias e inscrições dos próximos eventos saem primeiro no Instagram.',
    instagram: 'Acompanhar no Instagram',
    // o segundo texto do botão é o próprio perfil (vem de arena.ts no componente)
    whatsapp: 'Perguntar sobre eventos',
    whatsappMessage: 'Olá! Vi o site da Prime Padel e quero saber dos próximos eventos e torneios.',
  },

  store: {
    titleLead: 'Você já conhece a',
    titleAccent: 'West Padel?',
    lead: 'A West Padel Store fica dentro da arena, com equipamentos e acessórios para o padel.',
    more: 'e outros produtos para padel.',
    action: 'Conhecer a loja',
    photo: foto(
      'loja-west-padel',
      599,
      662,
      'Interior da West Padel Store: raqueteiras na prateleira, roupas de padel nas araras e caixas de tênis embaixo.',
    ),
  },

  community: {
    lead: 'O melhor da semana quase sempre começa com uma mensagem:',
    title: 'Bora jogar hoje?',
    text: 'Junte a turma, escolha a quadra e veja os horários do dia.',
    primary: 'Ver horários',
    secondary: 'Chamar a arena no WhatsApp',
    message: 'Olá! Bora jogar hoje? Quero ver um horário de quadra na Prime Padel.',
    photo: foto(
      'amarrando-o-tenis',
      651,
      500,
      'Jogadora sorridente sentada na grama sintética da quadra, amarrando o tênis ao lado da rede.',
    ),
  },

  visit: {
    title: 'Nos vemos na',
    titleScript: 'Prime',
    addressLabel: 'Endereço',
    hoursLabel: 'Horários',
    contactLabel: 'Contato',
    pending: 'a confirmar',
    today: 'hoje',
    hoursNote: 'Horários informados pela arena. Consulte a equipe sobre feriados.',
    route: 'Traçar rota',
    book: 'Agendar quadra',
    mapLabel: 'Localização da Prime Padel em Lages, Santa Catarina',
    whatsappMessage: 'Olá! Vi o site da Prime Padel e quero agendar uma quadra.',
  },

  finalCta: {
    titleLead: 'Sua quadra está',
    titleAccent: 'esperando.',
    text: 'Veja os horários do dia e mande sua solicitação em poucos toques, ou fale direto com a arena.',
    primary: 'Ver horários',
    secondary: 'Falar no WhatsApp',
    message: 'Olá! Vi o site da Prime Padel e quero reservar uma quadra.',
    photo: foto('raquetes', 620, 334, 'Duas raquetes de padel e bolas sobre a grama sintética, ao lado da rede.'),
  },

  footer: {
    tagline: 'Padel em Lages, Santa Catarina.',
    follow: 'Siga a Prime',
    year: '2026',
    demo: 'Agenda online em demonstração: nenhuma reserva é registrada pelo site.',
    top: 'Voltar ao início',
  },

  whatsappFloat: {
    label: 'Conversar com a Prime Padel no WhatsApp',
    message: 'Olá! Vim pelo site da Prime Padel e quero falar com a arena.',
  },

  booking: {
    title: 'Agendar quadra',
    demoBadge: 'Demonstração',
    demoNote: 'Horários simulados. Nenhuma reserva, cobrança ou envio de dados acontece aqui.',
    close: 'Fechar agendamento',
    steps: ['Data e quadra', 'Horário', 'Seus dados', 'Revisão'],
    stepOf: (n: number, total: number) => `Etapa ${n} de ${total}`,
    date: 'Quando você quer jogar?',
    dateLegend: 'Data',
    today: 'Hoje',
    court: 'Quadra',
    duration: 'Duração',
    next: 'Continuar',
    back: 'Voltar',
    times: 'Escolha o horário',
    loading: 'Consultando horários…',
    empty: 'Nenhum horário livre neste dia. Que tal outra data?',
    emptyAction: 'Escolher outra data',
    error: 'Não foi possível carregar os horários agora.',
    retry: 'Tentar novamente',
    available: 'livre',
    unavailable: 'ocupado',
    selectSlot: 'Selecione um horário para continuar.',
    details: 'Como podemos chamar você?',
    detailsHint: 'Use dados fictícios: nesta demonstração nada é enviado nem guardado.',
    name: 'Nome',
    namePlaceholder: 'Ex.: Ana Exemplo',
    phone: 'Telefone com DDD',
    phonePlaceholder: '(49) 99999-9999',
    notes: 'Observações',
    notesHint: 'Opcional, até 300 caracteres.',
    notesPlaceholder: 'Algo que a arena precisa saber?',
    errors: {
      name: 'Informe um nome com pelo menos 2 letras.',
      phone: 'Informe um telefone com DDD (10 ou 11 dígitos).',
      notes: 'Use até 300 caracteres.',
      submit: 'Não foi possível enviar a solicitação. Revise o horário e tente de novo.',
      conflict: 'Alguém reservou esse horário enquanto você preenchia. Escolha outro horário, seus dados continuam aqui.',
      unavailable: 'Esse horário não está mais livre. Escolha outro.',
    },
    review: 'Tudo certo para enviar?',
    reviewHint: 'Confira os detalhes da sua solicitação.',
    summary: {
      date: 'Data',
      court: 'Quadra',
      time: 'Horário',
      duration: 'Duração',
      total: 'Valor da quadra',
      player: 'Jogador',
      phone: 'Telefone',
      notes: 'Observações',
    },
    priceNote: 'Valor por quadra, informado pela arena. Nada é cobrado nesta demonstração.',
    edit: 'Editar dados',
    submit: 'Enviar solicitação',
    submitting: 'Enviando…',
    success: 'Solicitação enviada!',
    successText: 'Você chegou ao fim da demonstração. Nenhuma reserva real foi registrada e seus dados já foram descartados.',
    successReal: 'Para reservar de verdade, fale com a arena.',
    realContact: 'Falar com a arena',
    restart: 'Simular outro jogo',
    whatsappMessage: (court: string, date: string, time: string) => `Olá! Quero reservar a quadra ${court} em ${date}, às ${time}. Está livre?`,
  },
};
