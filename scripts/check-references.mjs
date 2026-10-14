import fs from 'node:fs';import path from 'node:path';
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
let total=0;const failures=[];
for(const f of walk('design-system/references').filter(p=>/\.html$/.test(p)&&!p.endsWith('.source.html'))){
 total++;const s=fs.readFileSync(f,'utf8');
 for(const m of s.matchAll(/(?:src|href)="([^"#]+)"/g)){const url=m[1];if(/^(?:https?:|data:|mailto:|tel:|#)/.test(url))continue;if(!fs.existsSync(path.resolve(path.dirname(f),url.split('#')[0])))failures.push(f+': '+url);}
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}console.log(total+' HTMLs: caminhos locais válidos.');

