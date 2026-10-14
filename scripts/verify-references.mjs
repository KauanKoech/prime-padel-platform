import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const browser=await chromium.launch({channel:'msedge',headless:true});
const failures=[];
for(const file of walk('design-system/references').filter(p=>p.endsWith('.html')&&!p.endsWith('.source.html'))){
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 page.on('pageerror',e=>failures.push(file+': '+e.message));
 page.on('requestfailed',r=>failures.push(file+': '+r.url()));
 await page.goto(pathToFileURL(path.resolve(file)).href);
 await page.waitForTimeout(150);
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
 if(broken.length)failures.push(file+': '+broken.join(','));
 if(file.includes('ui-kits')){if(!(await page.locator('#root').innerText()).trim())failures.push(file+': root vazio');await page.screenshot({path:'.local/'+path.basename(path.dirname(file))+'-reference.png'});}
 await page.close();
}
await browser.close();
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log('28 referências abertas via file:// no Edge: sem erro JS, requisições falhas ou imagens quebradas.');
