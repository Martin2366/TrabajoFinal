import { useEffect, useState } from 'react';
import { obtenerInfoClima } from '../../utils/weatherCodes';
import './Weather.css';

const LATITUD = -20.2137;
const LONGITUD = -70.1522;
const URL_CLIMA =
  `https://api.open-meteo.com/v1/forecast?latitude=${LATITUD}&longitude=${LONGITUD}` +
  '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code' +
  '&timezone=America%2FSantiago';

function DetalleClima({ icono, etiqueta, valor }) {
  return (
    <div className="detalle-clima">
      <span className="detalle-clima-icono" aria-hidden="true">{icono}</span>
      <div>
        <p className="detalle-clima-etiqueta">{etiqueta}</p>
        <p className="detalle-clima-valor">{valor}</p>
      </div>
    </div>
  );
}

function Weather() {
  const [clima, setClima] = useState(null);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    async function obtenerClima() {
      setEstado('cargando');
      try {
        const respuesta = await fetch(URL_CLIMA, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error('No se pudo obtener el clima');
        const datos = await respuesta.json();
        setClima(datos.current);
        setEstado('listo');
      } catch (error) {
        if (error.name !== 'AbortError') setEstado('error');
      }
    }

    obtenerClima();
    return () => controlador.abort();
  }, [intentos]);

  const info = clima ? obtenerInfoClima(clima.weather_code) : null;

  return (
    <section id="clima" className="contenedor">
      <h2 className="titulo-seccion">Clima en Iquique</h2>
      <p className="subtitulo-seccion">
        Condiciones actuales obtenidas en tiempo real desde Open-Meteo.
      </p>

      {estado === 'cargando' && (
        <div className="estado-carga">
          <span className="spinner" />
          Cargando clima…
        </div>
      )}

      {estado === 'error' && (
        <div className="estado-error">
          No pudimos cargar el clima en este momento.
          <button type="button" className="btn-secundario" onClick={() => setIntentos((n) => n + 1)}>
            Reintentar
          </button>
        </div>
      )}

      {estado === 'listo' && clima && info && (
        <div className="tarjeta clima-tarjeta animar-entrada">
          <div className="clima-principal">
            <span className="clima-icono-grande" aria-hidden="true">{info.icono}</span>
            <div>
              <p className="clima-temperatura">{Math.round(clima.temperature_2m)}°C</p>
              <p className="clima-estado">{info.texto}</p>
            </div>
          </div>

          <div className="clima-detalles">
            <DetalleClima icono="💧" etiqueta="Humedad" valor={`${clima.relative_humidity_2m}%`} />
            <DetalleClima icono="💨" etiqueta="Viento" valor={`${clima.wind_speed_10m} km/h`} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Weather;
