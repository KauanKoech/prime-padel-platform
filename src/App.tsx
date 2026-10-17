import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import { Coaches } from './components/Coaches';
import { Community } from './components/Community';
import { Courts } from './components/Courts';
import { Events } from './components/Events';
import { FinalCta } from './components/FinalCta';
import { Footer, WhatsAppFloat } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Lessons } from './components/Lessons';
import { Store } from './components/Store';
import { Values } from './components/Values';
import { Visit } from './components/Visit';
import { site } from './content/site';
import { BookingProvider } from './features/booking/BookingContext';
import { BookingDialog } from './features/booking/BookingDialog';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/landing.css';
import './styles/booking.css';

export function App() {
  const reduce = useReducedMotion();
  return (
    // LazyMotion + m.*: só os recursos de animação de DOM usados (bundle menor)
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* Rolagem suave. Âncoras com offset 0: o html tem scroll-padding-top (altura do cabeçalho), que o Lenis respeita. */}
        {!reduce && <ReactLenis root options={{ lerp: 0.085, anchors: { offset: 0 } }} />}
        <BookingProvider>
          <a className="skip" href="#conteudo">
            {site.skip}
          </a>
          <Header />
          <main id="conteudo">
            <Hero />
            <Values />
            <Courts />
            <Lessons />
            <Coaches />
            <Events />
            <Store />
            <Community />
            <Visit />
            <FinalCta />
          </main>
          <Footer />
          <WhatsAppFloat />
          <BookingDialog />
        </BookingProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
