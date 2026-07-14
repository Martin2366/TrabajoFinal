import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Weather from './components/Weather/Weather';
import EconomicIndicators from './components/EconomicIndicators/EconomicIndicators';
import VisitLog from './components/VisitLog/VisitLog';
import Footer from './components/Footer/Footer';

function App() {
  const [modoOscuro, setModoOscuro] = useLocalStorage('tema-oscuro', false);

  useEffect(() => {
    document.body.classList.toggle('oscuro', modoOscuro);
  }, [modoOscuro]);

  return (
    <>
      <Header modoOscuro={modoOscuro} onCambiarTema={() => setModoOscuro((valor) => !valor)} />
      <main>
        <Hero />
        <Features />
        <Weather />
        <EconomicIndicators />
        <VisitLog />
      </main>
      <Footer />
    </>
  );
}

export default App;
