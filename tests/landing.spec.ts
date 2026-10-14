import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { addDays, localDate } from '../src/lib/format';

test('landing: navegação, galeria, FAQ, imagens e acessibilidade',async({page},testInfo)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toContainText('Seu próximo jogo');
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'.local/'+testInfo.project.name+'-hero.png'});
 await page.screenshot({path:'.local/'+testInfo.project.name+'-full.png',fullPage:true});
 expect(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src))).toEqual([]);
 expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 await page.getByRole('button',{name:'A arena tem loja de equipamentos?'}).click();
 await expect(page.getByText('Sim. A West Padel Store')).toBeVisible();
 const gallery=page.getByRole('button',{name:'Ampliar imagem: Day Use'});
 await gallery.click();await expect(page.getByRole('dialog',{name:'Day Use'})).toBeVisible();
 await page.getByRole('button',{name:'Próxima imagem'}).click();
 await expect(page.getByRole('dialog',{name:'Open Prime Padel'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(gallery).toBeFocused();
 if(testInfo.project.name==='mobile'){
  await page.getByRole('button',{name:'Abrir navegação'}).click();
  await page.getByRole('dialog').getByRole('link',{name:'Quadras',exact:true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
 }
 expect(errors).toEqual([]);
});

test('agendamento completo, validação, edição e ausência de persistência',async({page},testInfo)=>{
 const sent:string[]=[];page.on('request',r=>{if(r.method()==='POST')sent.push(r.url());});
 await page.goto('/');
 await page.getByRole('button',{name:'Escolher quadra ANTÍDOTO',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Seu próximo jogo'});
 await expect(dialog).toBeVisible();
 await expect(page.getByLabel('Escolha a quadra')).toHaveValue('antidoto');
 await page.getByLabel('Escolha a data',{exact:true}).fill(addDays(localDate(),1));
 await page.getByLabel('Duração da partida').selectOption('60');
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByRole('button',{name:/Disponível/}).first().click();
 expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 await page.screenshot({path:'.local/'+testInfo.project.name+'-booking.png'});
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await dialog.getByRole('button',{name:'Continuar',exact:true}).last().click();
 await expect(page.getByText('Informe um nome com pelo menos 2 caracteres.')).toBeVisible();
 await expect(page.getByLabel('Nome',{exact:true})).toBeFocused();
 await page.getByLabel('Nome',{exact:true}).fill('Pessoa de exemplo');
 await page.getByLabel('Telefone com DDD').fill('(49) 99999-9999');
 await page.getByLabel('Observações').fill('Somente um teste.');
 await dialog.getByRole('button',{name:'Continuar',exact:true}).last().click();
 await expect(page.getByRole('heading',{name:'Tudo pronto para revisar?'})).toBeVisible();
 await expect(dialog.locator('.summary-total')).toContainText('140');
 await page.getByRole('button',{name:'Editar dados'}).click();
 await expect(page.getByLabel('Nome',{exact:true})).toHaveValue('Pessoa de exemplo');
 await dialog.getByRole('button',{name:'Continuar',exact:true}).last().click();
 await page.getByRole('button',{name:'Concluir demonstração'}).click();
 await expect(page.getByRole('heading',{name:'Experiência concluída.'})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Nenhuma reserva real foi registrada.');
 expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 await page.getByRole('button',{name:'Fechar demonstração'}).click();
 expect(sent).toEqual([]);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 await page.getByRole('button',{name:'Agendar quadra',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Escolha a data',exact:true})).toBeVisible();
});

test('estados vazio, erro recuperável e data inválida',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Agendar quadra',exact:true}).click();
 await page.getByLabel('Escolha a data',{exact:true}).fill('');
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.getByText('Escolha uma data válida nos próximos 14 dias.')).toBeVisible();
 await page.getByLabel('Escolha a data',{exact:true}).fill(addDays(localDate(),6));
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Nenhum horário demonstrativo');
 await page.getByRole('button',{name:'Voltar',exact:true}).last().click();
 await page.getByLabel('Escolha a data',{exact:true}).fill(addDays(localDate(),12));
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.getByRole('alert')).toContainText('Não foi possível carregar');
 await page.getByRole('button',{name:'Tentar novamente'}).click();
 await expect(page.getByRole('button',{name:/Disponível/}).first()).toBeVisible();
});

test('layouts sem overflow, foco modal e movimento reduzido',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 for(const width of [320,390,768,1440,1920]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 }
 await page.setViewportSize({width:390,height:844});
 const trigger=page.getByRole('button',{name:'Agendar quadra',exact:true});await trigger.click();
 for(let i=0;i<20;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);}
 await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
