import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
const walk = p => fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const errors=[];
for(const file of [...walk('src'),...walk('design-system/components')].filter(p=>p.endsWith('.css'))){
 const root=postcss.parse(fs.readFileSync(file,'utf8'));
 root.walkDecls(d=>{ if(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(d.value))errors.push(file+': cor sem token: '+d.toString());
 if(/(?:padding|margin|gap|radius|shadow|font|line-height|letter-spacing)/.test(d.prop) && /\d(?:px|rem|em)\b/.test(d.value))errors.push(file+': medida visual sem token: '+d.toString()); });
}
if(errors.length){console.error(errors.join('\\n'));process.exit(1)}
console.log('Aderência: cores e medidas visuais usam tokens canônicos.');

