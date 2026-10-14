import { arena } from '../config/arena';
import { demoConfig } from '../config/booking-demo';
import { addDays, localDate } from '../lib/format';
import type { AvailabilityQuery, BookingRequest, BookingService, TimeSlotData } from '../domain/booking';

export class BookingError extends Error {
 constructor(public code:'INVALID_QUERY'|'INVALID_PLAYER'|'SLOT_UNAVAILABLE'|'DEMO_FAILURE'){super(code);this.name='BookingError';}
}
const minutes=(time:string)=>Number(time.slice(0,2))*60+Number(time.slice(3));
const clock=(value:number)=>String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0');
export function validateQuery(query:AvailabilityQuery,now=new Date()){
 const today=localDate(now);
 const court=arena.courts.find(c=>c.id===query.courtId);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(query.date)||Number.isNaN(Date.parse(query.date+'T12:00:00Z'))||query.date<today||query.date>addDays(today,demoConfig.horizonDays-1)||!court?.rates.some(r=>r.durationMinutes===query.durationMinutes))throw new BookingError('INVALID_QUERY');
 return court;
}
export function validatePlayer(player:BookingRequest['player']){
 let digits=player.phone.replace(/\D/g,'');
 if(digits.length>11&&digits.startsWith('55'))digits=digits.slice(2);
 return {
  name:player.name.trim().length>=2&&player.name.trim().length<=demoConfig.maxNameLength,
  phone:/^[1-9]\d{9,10}$/.test(digits),
  notes:player.notes.length<=demoConfig.maxNotesLength,
 };
}
export function generateSlots(query:AvailabilityQuery,now=new Date()):TimeSlotData[]{
 validateQuery(query,now);
 const today=localDate(now);
 if(query.date===addDays(today,demoConfig.emptyDayOffset))return [];
 const day=new Date(query.date+'T12:00:00Z').getUTCDay();
 const hours=arena.hours.find(h=>h.day===day)!;
 const currentTime=new Intl.DateTimeFormat('pt-BR',{timeZone:arena.timeZone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now);
 const slots:TimeSlotData[]=[];
 const courtIndex=arena.courts.findIndex(c=>c.id===query.courtId);
 for(let start=minutes(hours.open),index=0;start+query.durationMinutes<=minutes(hours.close);start+=query.durationMinutes,index++){
  if(query.date===today&&start<=minutes(currentTime))continue;
  slots.push({id:[query.date,query.courtId,query.durationMinutes,clock(start)].join('/'),start:clock(start),end:clock(start+query.durationMinutes),available:(index+courtIndex)%demoConfig.unavailableEvery!==2});
 }
 return slots;
}
function wait(ms:number,signal?:AbortSignal){
 return new Promise<void>((resolve,reject)=>{
  if(signal?.aborted){reject(new DOMException('Operação cancelada','AbortError'));return;}
  const abort=()=>{clearTimeout(timer);reject(new DOMException('Operação cancelada','AbortError'));};
  const timer=setTimeout(()=>{signal?.removeEventListener('abort',abort);resolve();},ms);
  signal?.addEventListener('abort',abort,{once:true});
 });
}
// Injeção do relógio/latência permite testes determinísticos e substituição por API.
export function createMockBookingService({now=()=>new Date(),latencyMs=demoConfig.latencyMs,scenarios=true}:{now?:()=>Date;latencyMs?:number;scenarios?:boolean}={}):BookingService{
 const simulatedFailures=new Set<string>();
 return {
  async getAvailability(query,signal){
   await wait(latencyMs,signal);
   validateQuery(query,now());
   const key=JSON.stringify(query);
   if(scenarios&&query.date===addDays(localDate(now()),demoConfig.transientErrorDayOffset)&&!simulatedFailures.has(key)){
    simulatedFailures.add(key);throw new BookingError('DEMO_FAILURE');
   }
   return {source:'mock',slots:generateSlots(query,now())};
  },
  async submitDemo(request,signal){
   await wait(latencyMs,signal);
   if(Object.values(validatePlayer(request.player)).some(v=>!v))throw new BookingError('INVALID_PLAYER');
   const slot=generateSlots(request,now()).find(s=>s.id===request.slotId);
   if(!slot?.available)throw new BookingError('SLOT_UNAVAILABLE');
   // Não envia, não reserva, não grava e não registra dados pessoais em logs.
   return {mode:'demo',persisted:false,request:{...request,player:{...request.player,name:request.player.name.trim()}}};
  },
 };
}
