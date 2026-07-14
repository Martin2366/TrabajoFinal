import './Features.css';

const CARACTERISTICAS = [
  {
    icono: '🏔️',
    titulo: 'Granos de altura',
    texto: 'Cultivados sobre los 1.500 metros para un sabor más concentrado.',
  },
  {
    icono: '🔥',
    titulo: 'Tueste artesanal',
    texto: 'Tostamos en lotes pequeños cada semana, nunca con meses de bodega.',
  },
  {
    icono: '📦',
    titulo: 'Despacho a todo Chile',
    texto: 'Llega a tu casa en 24 a 72 horas, recién molido o en grano.',
  },
];

function TarjetaCaracteristica({ icono, titulo, texto }) {
  return (
    <article className="tarjeta">
      <div className="icono">{icono}</div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  );
}

function Features() {
  return (
    <section className="caracteristicas contenedor">
      {CARACTERISTICAS.map((caracteristica) => (
        <TarjetaCaracteristica key={caracteristica.titulo} {...caracteristica} />
      ))}
    </section>
  );
}

export default Features;
