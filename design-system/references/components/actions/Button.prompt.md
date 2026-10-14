Pill call-to-action; use for every primary/secondary action across landing, booking and admin.

```jsx
<Button variant="primary" iconRight={<Icon name="arrow-right" size={18}/>}>Reservar quadra</Button>
<Button variant="secondary">Ver planos</Button>
<Button variant="onBrand" size="lg" block>Confirmar reserva</Button>
```

- variants: primary (green), secondary (outline), tint, ghost, onBrand (white on green), outlineOnBrand, danger
- sizes sm 36 / md 44 / lg 52 — md is the minimum on mobile
- `block` for sticky mobile footers; `as="a"` + href for links
