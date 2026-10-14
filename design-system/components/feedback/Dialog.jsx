import React from 'react';
import { Icon } from '../brand/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';
export function Dialog({open,onClose,title,description,footer,variant='center',width,className='',children}) {
 const ref=React.useRef(null); const id=React.useId();
 React.useEffect(()=>{const el=ref.current;if(!open||!el)return;const previous=document.activeElement;const overflow=document.body.style.overflow;el.showModal();document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=overflow;previous?.focus();};},[open]);
 return <dialog ref={ref} className={'pp-native-dialog '+(variant==='drawer'?'pp-native-dialog--drawer ':'')+className} aria-labelledby={id} aria-describedby={description?id+'-desc':undefined} onCancel={e=>{e.preventDefault();onClose?.();}} onClick={e=>{if(e.target===e.currentTarget)onClose?.();}} style={width?{maxWidth:width}:undefined}>
 <div className="pp-dialog__head"><div><h2 id={id} className="pp-dialog__title">{title || 'Detalhes'}</h2>{description?<p id={id+'-desc'} className="pp-dialog__desc">{description}</p>:null}</div>{onClose?<IconButton label="Fechar" variant="secondary" icon={<Icon name="x"/>} onClick={onClose}/>:null}</div>
 <div className="pp-dialog__body">{open?children:null}</div>{footer?<div className="pp-dialog__foot">{footer}</div>:null}</dialog>;
}
