import { Dialog } from '../../../design-system';
import { bookingCopy as c } from '../../config/content';
export default function Booking({onClose}:{initialCourt?:string;onClose:()=>void}){
 return <Dialog open onClose={onClose} title={c.title} description={c.description}><p>{c.loading}</p></Dialog>;
}
