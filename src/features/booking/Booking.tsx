import { useEffect, useRef, useState } from 'react';
import { Badge, Button, DateStrip, Dialog, Icon, Input, ProgressSteps, Select, TimeSlot } from '../../../design-system';
import { bookingCopy as c } from '../../config/content';
import { arena } from '../../config/arena';
import { demoConfig } from '../../config/booking-demo';
import { addDays, dateLabel, duration, localDate, money } from '../../lib/format';
import type { BookingService, PlayerDetails, TimeSlotData } from '../../domain/booking';
import { bookingService } from '../../services/booking';
import { validatePlayer } from '../../services/mock-booking';
import './booking.css';

type State='loading'|'ready'|'error';
export default function Booking({initialCourt,onClose,service=bookingService}:{initialCourt?:string;onClose:()=>void;service?:BookingService}){
 const today=localDate();
 const [step,setStep]=useState(0);
 const [date,setDate]=useState(today);
 const [courtId,setCourtId]=useState(initialCourt&&arena.courts.some(c=>c.id===initialCourt)?initialCourt:arena.courts[0].id);
 const [durationMinutes,setDuration]=useState(90);
 const [slot,setSlot]=useState<TimeSlotData|null>(null);
 const [slots,setSlots]=useState<TimeSlotData[]>([]);
 const [state,setState]=useState<State>('loading');
 const [retry,setRetry]=useState(0);
 const [player,setPlayer]=useState<PlayerDetails>({name:'',phone:'',notes:''});
 const [errors,setErrors]=useState<Partial<Record<keyof PlayerDetails|'date'|'selection'|'submission',string>>>({});
 const [busy,setBusy]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 const submission=useRef<AbortController|null>(null);
 const court=arena.courts.find(c=>c.id===courtId)!;
 const rate=court.rates.find(r=>r.durationMinutes===durationMinutes)!;
 const validDate=date>=today&&date<=addDays(today,demoConfig.horizonDays-1)&&/^\d{4}-\d{2}-\d{2}$/.test(date);
 useEffect(()=>{heading.current?.focus();},[step]);
 useEffect(()=>()=>submission.current?.abort(),[]);
 useEffect(()=>{
  setSlot(null);setSlots([]);setState('loading');
  if(!validDate){setState('ready');return;}
  const controller=new AbortController();
  service.getAvailability({date,courtId,durationMinutes},controller.signal).then(result=>{if(!controller.signal.aborted){setSlots(result.slots);setState('ready');}}).catch(error=>{if(error.name!=='AbortError'&&!controller.signal.aborted)setState('error');});
  return()=>controller.abort();
 },[date,courtId,durationMinutes,retry,service,validDate]);
 function changeDate(value:string){setDate(value);setErrors({});}
 function changeCourt(value:string){setCourtId(value);setDuration(90);setErrors({});}
 function next(){
  setErrors({});
  if(step===0&&!validDate){setErrors({date:c.errors.date});document.getElementById('booking-date')?.focus();return;}
  if(step===1&&!slot){setErrors({selection:c.errors.selection});return;}
  if(step===2){
   const valid=validatePlayer(player);const nextErrors:typeof errors={};
   for(const field of ['name','phone','notes'] as const)if(!valid[field])nextErrors[field]=c.errors[field];
   if(Object.keys(nextErrors).length){setErrors(nextErrors);document.getElementById('booking-'+Object.keys(nextErrors)[0])?.focus();return;}
  }
  setStep(s=>s+1);
 }
 async function submit(){
  if(busy||!slot)return;
  const controller=new AbortController();submission.current=controller;setBusy(true);setErrors({});
  try{
   const result=await service.submitDemo({date,courtId,durationMinutes,slotId:slot.id,player},controller.signal);
   if(!controller.signal.aborted&&result.mode==='demo'&&!result.persisted){setPlayer({name:'',phone:'',notes:''});setStep(4);}
  }catch(error){if(!controller.signal.aborted&&(error as Error).name!=='AbortError')setErrors({submission:c.errors.submission});}
  finally{if(!controller.signal.aborted)setBusy(false);}
 }
 function restart(){setDate(today);setSlot(null);setErrors({});setStep(0);setRetry(r=>r+1);}
 const days=Array.from({length:7},(_,i)=>{const key=addDays(today,i);const d=new Date(key+'T12:00:00Z');return {key,weekday:new Intl.DateTimeFormat('pt-BR',{weekday:'short',timeZone:'UTC'}).format(d).replace('.',''),day:d.getUTCDate(),month:new Intl.DateTimeFormat('pt-BR',{month:'short',timeZone:'UTC'}).format(d).replace('.',''),today:i===0};});
 const summary=<dl className="booking-summary"><div><dt>{c.dateLabel}</dt><dd>{validDate?dateLabel(date):c.date}</dd></div><div><dt>{c.courtLabel}</dt><dd>{court.name}</dd></div>{slot&&<div><dt>{c.timeLabel}</dt><dd>{slot.start} — {slot.end}</dd></div>}<div><dt>{c.durationLabel}</dt><dd>{duration(durationMinutes)}</dd></div><div className="summary-total"><dt>{c.total}</dt><dd>{money(rate.priceCents)}</dd></div></dl>;
 const titles=[c.date,c.timesTitle,c.detailsTitle,c.reviewTitle,c.successTitle];
 return <Dialog open onClose={onClose} title={c.title} description={c.description} className="booking-dialog" footer={step<4?<div className="booking-footer"><div><span className="micro">{c.total}</span><strong>{money(rate.priceCents)} <small>/ {duration(durationMinutes)}</small></strong></div><div className="actions">{step>0&&<Button variant="ghost" disabled={busy} onClick={()=>{setErrors({});setStep(s=>s-1);}}>{c.back}</Button>}<Button disabled={busy||(step===1&&(!slot||state!=='ready'))} onClick={step===3?submit:next} iconRight={<Icon name="arrow-right" size={18}/>}>{busy?c.submitting:step===3?c.confirm:c.next}</Button></div></div>:undefined}>
  {step<4&&<ProgressSteps steps={c.steps} current={step}/>}
  <div className="booking-step">
   {step===4&&<div className="success-icon"><Icon name="circle-check" size={32}/></div>}
   <h3 ref={heading} tabIndex={-1} className="booking-heading">{titles[step]}</h3>
   {step===0&&<div className="booking-fields">
    <DateStrip days={days} value={date} onChange={changeDate}/>
    <Input id="booking-date" label={c.date} type="date" value={date} min={today} max={addDays(today,demoConfig.horizonDays-1)} hint={c.dateHint} error={errors.date} onChange={e=>changeDate(e.target.value)}/>
    <Select label={c.court} value={courtId} onChange={e=>changeCourt(e.target.value)} options={arena.courts.map(c=>({value:c.id,label:c.name}))}/>
    <Select label={c.duration} value={String(durationMinutes)} onChange={e=>setDuration(Number(e.target.value))} options={court.rates.map(r=>({value:String(r.durationMinutes),label:duration(r.durationMinutes)+' · '+money(r.priceCents)}))}/>
   </div>}
   {step===1&&<><p className="booking-hint">{dateLabel(date)} · {court.name} · {duration(durationMinutes)}</p><Badge tone="info">{c.timesHint}</Badge>
    <div className="availability" aria-busy={state==='loading'}>
     {state==='loading'?<p role="status" className="booking-state">{c.loading}</p>:state==='error'?<div className="booking-state"><p role="alert">{c.error}</p><Button variant="secondary" onClick={()=>setRetry(r=>r+1)} iconLeft={<Icon name="refresh-cw" size={18}/>}>{c.retry}</Button></div>:!slots.length?<div className="booking-state" role="status"><Icon name="calendar-days" size={24}/><p>{c.empty}</p><Button variant="secondary" onClick={()=>setStep(0)}>{c.back}</Button></div>:<div className="slot-grid" role="group" aria-label={c.timesTitle}>{slots.map(s=><TimeSlot key={s.id} time={s.start} meta={!s.available?c.unavailable:slot?.id===s.id?c.selected:c.available} status={!s.available?'unavailable':slot?.id===s.id?'selected':'available'} onClick={()=>{setSlot(s);setErrors({});}}/>)}</div>}
    </div>{errors.selection&&<p role="alert">{errors.selection}</p>}</>}
   {step===2&&<form id="player-form" noValidate onSubmit={e=>{e.preventDefault();next();}}><p className="booking-hint">{c.detailsHint}</p><div className="booking-fields"><Input id="booking-name" label={c.name} autoComplete="off" value={player.name} maxLength={demoConfig.maxNameLength} placeholder={c.namePlaceholder} error={errors.name} onChange={e=>setPlayer({...player,name:e.target.value})}/><Input id="booking-phone" label={c.phone} type="tel" inputMode="tel" autoComplete="off" value={player.phone} maxLength={20} placeholder={c.phonePlaceholder} error={errors.phone} onChange={e=>setPlayer({...player,phone:e.target.value})}/><Input id="booking-notes" label={c.notes} optional multiline rows={3} maxLength={demoConfig.maxNotesLength} value={player.notes} hint={c.notesHint} placeholder={c.notesPlaceholder} error={errors.notes} onChange={e=>setPlayer({...player,notes:e.target.value})}/></div><button type="submit" className="visually-hidden" tabIndex={-1}>{c.next}</button></form>}
   {step===3&&<><p className="booking-hint">{c.reviewHint}</p>{summary}<div className="player-review"><p><strong>{c.name}:</strong> {player.name.trim()}</p><p><strong>{c.phone}:</strong> {player.phone}</p>{player.notes&&<p><strong>{c.notes}:</strong> {player.notes}</p>}<Button variant="ghost" onClick={()=>setStep(2)} disabled={busy}>{c.edit}</Button></div><p className="micro">{c.noPayment}</p>{errors.submission&&<p className="booking-error" role="alert">{errors.submission}</p>}</>}
   {step===4&&<div className="booking-success"><p role="status">{c.successText}</p><p className="booking-hint">{c.successNote}</p>{summary}<div className="booking-fields"><Button as="a" href={arena.contact.whatsappUrl} iconRight={<Icon name="arrow-up-right" size={18}/>}>{c.realContact}</Button><Button variant="secondary" onClick={restart}>{c.restart}</Button><Button variant="ghost" onClick={onClose}>{c.close}</Button></div></div>}
  </div>
 </Dialog>;
}
