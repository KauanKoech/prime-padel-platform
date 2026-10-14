import fs from 'node:fs';
import path from 'node:path';
import {build,transform} from 'esbuild';
const root=path.resolve('design-system/references');
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
await build({stdin:{contents:`import React from 'react';import * as ReactDOM from 'react-dom/client';import * as DS from './design-system/index.js';window.React=React;window.ReactDOM=ReactDOM;window.PrimePadelDesignSystem_093c26=DS;window.referenceMemory={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};`,resolveDir:process.cwd()},bundle:true,outfile:path.join(root,'runtime.js'),format:'iife',minify:true,loader:{'.png':'dataurl'},define:{'process.env.NODE_ENV':'"production"'}});
for(const file of walk(root).filter(f=>f.endsWith('.source.html'))){
 let s=fs.readFileSync(file,'utf8');
 const runtime=path.relative(path.dirname(file),path.join(root,'runtime.js')).replaceAll('\\','/');
 s=s.replace(/<script[^>]+src="https:[^"]+"[^>]*><\/script>\s*/g,'').replace(/<script[^>]+src="[^"]*_ds_bundle.js"[^>]*><\/script>/g,'<script src="'+runtime+'"></script>');
 const matches=[...s.matchAll(/<script type="text\/babel"(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)];
 for(const m of matches){const code=m[1]?fs.readFileSync(path.join(path.dirname(file),m[1]),'utf8'):m[2];const out=await transform(code,{loader:'jsx',jsxFactory:'React.createElement',minify:false});s=s.replace(m[0],'<script>\n'+out.code+'\n</script>');}
 s=s.replace('<body>','<body><aside style="padding:var(--space-3);background:var(--bg-warm);font:var(--type-micro)">Referência visual do export. Dados fictícios, não são ofertas da Prime Padel.</aside>');
 fs.writeFileSync(file.replace('.source.html','.html'),s);
}
console.log('Referências HTML independentes geradas com componentes canônicos e runtime local.');

