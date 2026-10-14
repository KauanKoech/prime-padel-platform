import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import inventory from '../design-system/INVENTORY.json';
describe('migração canônica',()=>{
 it('preserva os nove assets e as quatro fontes pelos hashes',()=>{
  for(const file of inventory.files.filter(f=>f.classification==='canônico' && /^(assets|fonts)\//.test(f.path))){
   expect(createHash('sha256').update(readFileSync(file.destination!)).digest('hex').toUpperCase()).toBe(file.sha256);
  }
 });
 it('preserva exatamente as regras de aderência como referência',()=>{
  const item=inventory.files.find(f=>f.path==='_adherence.oxlintrc.json')!;
  expect(createHash('sha256').update(readFileSync(item.destination!)).digest('hex').toUpperCase()).toBe(item.sha256);
 });
});
