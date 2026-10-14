import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { readFileSync } from 'node:fs';
const original = JSON.parse(readFileSync(new URL('./design-system/lint/_adherence.oxlintrc.json', import.meta.url)));
const selectors = original.rules['no-restricted-syntax'].slice(1).filter(r => !r.selector.includes('JSXIdentifier[name!=') && !/DateStripDay|TableColumn|TabItem/.test(r.selector));
export default tseslint.config(
 { ignores: ['dist/**', 'design-system/references/**', 'design-system-export/**', 'node_modules/**'] },
 js.configs.recommended,
 ...tseslint.configs.recommended,
 { files: ['**/*.{js,jsx,ts,tsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } }, rules: { 'no-restricted-syntax': ['error', ...selectors], '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }] } },
 { files: ['design-system/components/**/*.jsx'], rules: { '@typescript-eslint/no-unused-vars': 'off', '@typescript-eslint/no-this-alias': 'off', 'prefer-const': 'off', 'no-restricted-syntax': 'off' } },
 { files: ['src/**/*.{ts,tsx}'], rules: { 'no-restricted-imports': ['error', { patterns: [{ group: ['**/design-system/components/**','**/references/**'], message: 'Use o barrel canônico design-system/index.js.' }] }] } }
);

