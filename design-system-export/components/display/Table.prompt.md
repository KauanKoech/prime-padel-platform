Admin data table (bookings, customers, payments) that turns into stacked cards on phones.

```jsx
<Table columns={[{key:'cliente',header:'Cliente',primary:true},{key:'valor',header:'Valor',align:'right',num:true}]} rows={rows} onRowClick={open}/>
```

- mark the identifying column `primary`; it becomes the card title on mobile
