// One-time, content-preserving mechanical normalization. Run only on a fresh copy.
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
let count=0;const extracted=[];
const file='design-system/components/pp-components.css';
const css=postcss.parse(fs.readFileSync(file,'utf8'));
css.walkDecls(d=>{
 if(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|-?\d*\.?\d+(?:px|rem|em)\b/i.test(d.value)){
 const name='--component-'+(++count);extracted.push({name,value:d.value,selector:d.parent.selector,property:d.prop});d.value='var('+name+')';
 }
});
fs.writeFileSync(file,css.toString());
fs.writeFileSync('design-system/tokens/components.css','/* Extracted verbatim from export component declarations; provenance in component-token-map.json. */\n:root {\n'+extracted.map(x=>'  '+x.name+': '+x.value+';').join('\n')+'\n}\n');
fs.writeFileSync('design-system/tokens/component-token-map.json',JSON.stringify(extracted,null,2)+'\n');
for(const f of walk('design-system/references').filter(f=>/\.(html|jsx|css)$/.test(f))){
 let s=fs.readFileSync(f,'utf8').replaceAll('assets/logo/','assets/brand/');
 // Every copied reference gained the references/ path segment.
 s=s.replaceAll('../../styles.css','../../../styles.css').replaceAll('../../assets/','../../../assets/');
 if(f.includes('guidelines'))s=s.replaceAll('../styles.css','../../styles.css').replaceAll('../assets/','../../assets/');
 s=s.replaceAll("const BASE = '../../'","const BASE = '../../../'");
 // Reference booking remains illustrative, but never persists personal data.
 s=s.replaceAll('localStorage.getItem(', 'window.referenceMemory.getItem(').replaceAll('localStorage.setItem(', 'window.referenceMemory.setItem(').replaceAll('localStorage.removeItem(', 'window.referenceMemory.removeItem(');
 fs.writeFileSync(f,s);
 if(f.endsWith('.html'))fs.renameSync(f,f.replace(/\.html$/,'.source.html'));
}
console.log('Extraídos '+count+' tokens de componentes sem mudança de valores.');

