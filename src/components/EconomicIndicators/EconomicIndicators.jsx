import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatearCLP, formatearFechaCorta } from '../../utils/format';
import './EconomicIndicators.css';

const URL_INDICADORES = 'https://mindicador.cl/api';
const ORDEN = ['dolar', 'euro', 'uf', 'utm'];
const ICONOS = { uf: '🏦', utm: '📊', dolar: '💵', euro: '💶' };

function TarjetaIndicador({ icono, nombre, valor, fecha }) {
  return (
    <article className="tarjeta indicador-tarjeta">
      <div className="indicador-cabecera">
        <span className="indicador-icono" aria-hidden="true">{icono}</span>
        <h3>{nombre}</h3>
      </div>
      <p className="indicador-valor">{formatearCLP(valor)}</p>
      <p className="indicador-fecha">Actualizado: {formatearFechaCorta(fecha)}</p>
    </article>
  );
}

function EconomicIndicators() {
  const [indicadores, setIndicadores] = useState(null);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    async function obtenerIndicadores() {
      setEstado('cargando');
      try {
        const respuesta = await axios.get(URL_INDICADORES, { signal: controlador.signal });
        const { uf, utm, dolar, euro } = respuesta.data;
        setIndicadores({ uf, utm, dolar, euro });
        setEstado('listo');
      } catch (error) {
        if (!axios.isCancel(error)) setEstado('error');
      }
    }

    obtenerIndicadores();
    return () => controlador.abort();
  }, [intentos]);

  return (
    <section id="indicadores" className="contenedor">
      <h2 className="titulo-seccion">Indicadores económicos de Chile</h2>
      <p className="subtitulo-seccion">
        Valores del día obtenidos desde mindicador.cl.
      </p>

      {estado === 'cargando' && (
        <div className="estado-carga">
          <span className="spinner" />
          Cargando indicadores…
        </div>
      )}

      {estado === 'error' && (
        <div className="estado-error">
          No pudimos cargar los indicadores en este momento.
          <button type="button" className="btn-secundario" onClick={() => setIntentos((n) => n + 1)}>
            Reintentar
          </button>
        </div>
      )}

      {estado === 'listo' && indicadores && (
        <div className="indicadores-grid animar-entrada">
          {ORDEN.map((clave) => {
            const dato = indicadores[clave];
            if (!dato) return null;
            return (
              <TarjetaIndicador
                key={clave}
                icono={ICONOS[clave]}
                nombre={dato.nombre}
                valor={dato.valor}
                fecha={dato.fecha}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default EconomicIndicators;
