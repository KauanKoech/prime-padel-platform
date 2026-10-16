import type { Metadata } from 'next';
import { arena } from '../../content/arena';
import { BookingFlow } from '../../features/booking/BookingFlow';

export const metadata: Metadata = {
  title: `Horários simulados | ${arena.name}`,
  description: 'Experimente a seleção de quadra, data e horário. Nenhuma reserva real será feita.',
};

export default function BookingPage() {
  return <BookingFlow />;
}
