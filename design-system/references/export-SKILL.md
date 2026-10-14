---
name: prime-padel-design
description: Use this skill to generate well-branded interfaces and assets for Prime Padel, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `styles.css` → link it; tokens in `tokens/`, component classes in `components/pp-components.css`.
- Components (React): `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md`.
- Full screens to copy patterns from: `ui_kits/landing`, `ui_kits/booking`, `ui_kits/admin`.
- Logos: `assets/logo/*.png` (white on green, green on light). Icons: Lucide (CDN), stroke 1.75.
- Copy is pt-BR, warm and concise, "você" implied, no emoji.
