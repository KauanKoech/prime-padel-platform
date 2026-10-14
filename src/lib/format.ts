import { arena } from '../config/arena';
export const money=(cents:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(cents/100);
export const duration=(minutes:number)=>minutes===60?'1h':minutes===90?'1h30':minutes+' min';
export function localDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:arena.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function addDays(date:string,days:number){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);}
export function dateLabel(date:string){return new Intl.DateTimeFormat('pt-BR',{weekday:'short',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}

