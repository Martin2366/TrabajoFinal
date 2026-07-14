import { useEffect, useState } from 'react';
import './Hero.css';

function obtenerSaludo(hora) {
  if (hora >= 6 && hora < 12) return '¡Buenos días!';
  if (hora >= 12 && hora < 20) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

function Hero() {
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    const hora = new Date().getHours();
    setSaludo(obtenerSaludo(hora));
  }, []);

  return (
    <section className="hero">
      <div className="contenedor">
        <p className="saludo">{saludo}</p>
        <h1>Café de altura, tostado como en casa</h1>
        <p className="hero-sub">
          Granos seleccionados del norte de Chile, tostados en pequeños lotes y enviados
          frescos hasta tu puerta. Revisa el clima de Iquique, los indicadores económicos
          del día y déjanos tu comentario en la bitácora de visitas.
        </p>
        <a href="#bitacora" className="btn-principal">Dejar mi comentario</a>
      </div>
    </section>
  );
}

export default Hero;
