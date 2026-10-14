import React from 'react';
import ReactDOM from 'react-dom/client';
import '../design-system/styles.css';
import { Logo, Button } from '../design-system';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><main className="pp-container"><Logo /><h1>Prime Padel</h1><p>Design system integrado. Landing em preparação.</p><Button>Agendamento demonstrativo</Button></main></React.StrictMode>);

