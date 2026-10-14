Modal dialog / mobile bottom sheet / desktop side drawer for confirmations and booking details.

```jsx
<Dialog open={open} onClose={close} title="Cancelar reserva?" footer={<><Button variant="secondary" onClick={close}>Voltar</Button><Button variant="danger">Cancelar</Button></>}>…</Dialog>
```

- Escape and overlay click close
- automatically becomes a bottom sheet on phones
