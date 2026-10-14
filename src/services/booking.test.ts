import { describe, expect, it } from 'vitest';
import { arena } from '../config/arena';
import { createMockBookingService, generateSlots, validatePlayer, validateQuery } from './mock-booking';
import { addDays, localDate } from '../lib/format';
const now=new Date('2026-10-14T15:00:00Z');
const date=localDate(now);
const base={date:addDays(date,1),courtId:'antidoto',durationMinutes:60};
describe('agendamento demonstrativo',()=>{
 it('preserva preços, cinco quadras e durações recebidas',()=>{
  expect(arena.courts).toHaveLength(5);
  expect(arena.courts[0].rates[0].priceCents).toBe(19000);
  expect(arena.courts[3].rates).toContainEqual({durationMinutes:60,priceCents:14000});
  expect(arena.hours.find(h=>h.day===3)?.open).toBe('03:00');
 });
 it('rejeita datas fora da janela, quadras e durações inválidas',()=>{
  for(const query of [{...base,date:'2020-01-01'},{...base,date:'inválida'},{...base,courtId:'outra'},{...base,durationMinutes:20},{...base,courtId:'ademicom',durationMinutes:60}]){
   expect(()=>validateQuery(query,now)).toThrow();
  }
 });
 it('gera slots determinísticos e respeita fechamento e duração',()=>{
  expect(generateSlots(base,now)).toEqual(generateSlots(base,now));
  for(const court of arena.courts)for(const rate of court.rates){
   for(let offset=0;offset<14;offset++){
    const q={date:addDays(date,offset),courtId:court.id,durationMinutes:rate.durationMinutes};
    const closing=arena.hours.find(h=>h.day===new Date(q.date+'T12:00:00Z').getUTCDay())!.close;
    for(const s of generateSlots(q,now))expect(s.end<=closing).toBe(true);
   }
  }
  expect(generateSlots({...base,date},now).every(s=>s.start>'12:00')).toBe(true);
 });
 it('demonstra vazio, falha transitória e recuperação',async()=>{
  const service=createMockBookingService({now:()=>now,latencyMs:0});
  expect((await service.getAvailability({...base,date:addDays(date,6)})).slots).toEqual([]);
  const query={...base,date:addDays(date,12)};
  await expect(service.getAvailability(query)).rejects.toThrow('DEMO_FAILURE');
  expect((await service.getAvailability(query)).source).toBe('mock');
 });
 it('cancela consultas obsoletas',async()=>{
  const service=createMockBookingService({now:()=>now,latencyMs:20});
  const controller=new AbortController();
  const pending=service.getAvailability(base,controller.signal);controller.abort();
  await expect(pending).rejects.toMatchObject({name:'AbortError'});
 });
 it('valida dados e retorna recibo explicitamente não persistente',async()=>{
  const service=createMockBookingService({now:()=>now,latencyMs:0});
  const slots=(await service.getAvailability(base)).slots;
  const player={name:'Pessoa de exemplo',phone:'(49) 99999-9999',notes:'Teste'};
  expect(validatePlayer({...player,name:' ',phone:'1'})).toMatchObject({name:false,phone:false});
  const request={...base,slotId:slots.find(s=>s.available)!.id,player};
  expect(await service.submitDemo(request)).toMatchObject({mode:'demo',persisted:false});
  await expect(service.submitDemo({...request,slotId:'não existe'})).rejects.toThrow('SLOT_UNAVAILABLE');
  await expect(service.submitDemo({...request,slotId:slots.find(s=>!s.available)!.id})).rejects.toThrow('SLOT_UNAVAILABLE');
  await expect(service.submitDemo({...request,player:{...player,name:''}})).rejects.toThrow('INVALID_PLAYER');
 });
});
