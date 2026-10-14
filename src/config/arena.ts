import type { Court } from '../domain/booking';
import dayUse from '../../design-system/assets/brand/day-use-post.jpg';
import open from '../../design-system/assets/brand/open-prime-padel-post.jpg';
import cup from '../../design-system/assets/brand/prime-cup-logo.jpg';
export const arena = {
 id: 'prime-padel', name: 'Prime Padel', city: 'Lages', state: 'SC', timeZone: 'America/Sao_Paulo',
 address: { street: 'Avenida Belisário Ramos, 4241', district: 'São Cristóvão', cityState: 'Lages — Santa Catarina', postalCode: '88501-065', country: 'Brasil', latitude: -27.811353, longitude: -50.317361 },
 contact: { whatsappDisplay: '+55 49 9910-7642', whatsappUrl: 'https://wa.me/554999107642', instagram: 'https://www.instagram.com/primepadellages/', instagramHandle: '@primepadellages' },
 hours: [
  {day:1,label:'Segunda-feira',open:'06:00',close:'23:00'},
  {day:2,label:'Terça-feira',open:'06:00',close:'23:00'},
  {day:3,label:'Quarta-feira',open:'03:00',close:'23:00'},
  {day:4,label:'Quinta-feira',open:'06:00',close:'23:00'},
  {day:5,label:'Sexta-feira',open:'06:00',close:'23:00'},
  {day:6,label:'Sábado',open:'09:00',close:'23:00'},
  {day:0,label:'Domingo',open:'09:00',close:'20:00'},
 ],
 courts: [
  {id:'eqi-dgi',name:'EQI / DGI INVESTIMENTOS',rates:[{durationMinutes:90,priceCents:19000}]},
  {id:'ademicom',name:'ADEMICOM',rates:[{durationMinutes:90,priceCents:18000}]},
  {id:'boticario',name:'O BOTICÁRIO',rates:[{durationMinutes:90,priceCents:18000}]},
  {id:'antidoto',name:'ANTÍDOTO',rates:[{durationMinutes:90,priceCents:18000},{durationMinutes:60,priceCents:14000}]},
  {id:'rrtur',name:'RRTUR',rates:[{durationMinutes:90,priceCents:18000}]},
 ] satisfies Court[],
 store: {name:'West Padel Store',handle:'@westpadelstore',url:'https://www.instagram.com/westpadelstore/',description:'Raquetes, roupas, calçados, bolsas, raqueteiras e muito mais. A West Padel Store fica dentro da arena.'},
 gallery: [
  {src:dayUse,title:'Encontros além do jogo',alt:'Material fornecido da Prime Padel: comunicação de Day Use',category:'Day Use'},
  {src:open,title:'O esporte que reúne',alt:'Material fornecido do 1º Open Prime Padel',category:'Open Prime Padel'},
  {src:cup,title:'Energia de competição',alt:'Identidade fornecida do torneio Prime Cup',category:'Prime Cup'},
 ],
 testimonials: {demonstrative:true,items:[
  {quote:'Combinar o jogo, escolher a quadra e encontrar a turma. É essa experiência que queremos tornar mais simples.',label:'Exemplo de conteúdo • não é um relato real'},
  {quote:'Do primeiro ponto ao último: um espaço para compartilhar a paixão pelo padel.',label:'Exemplo de conteúdo • não é um relato real'},
 ]},
 pending: ['Confirmar quarta-feira com abertura às 03:00.','Confirmar WhatsApp fornecido com oito dígitos locais, sem acrescentar dígito por suposição.','Fotos reais das quadras, estrutura e equipe.','História, diferenciais, políticas e depoimentos autorizados.','Datas e inscrições de eventos atuais.','Licenças das fontes e arquivos vetoriais oficiais.'],
} as const;
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(arena.address.latitude+','+arena.address.longitude);

