import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import VisitLogForm from './VisitLogForm';
import VisitLogList from './VisitLogList';
import './VisitLog.css';

function generarId() {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function VisitLog() {
  const [visitas, setVisitas] = useLocalStorage('bitacora_visitas', []);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!mensaje) return undefined;
    const temporizador = setTimeout(() => setMensaje(''), 2500);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  function agregarVisita(datos) {
    const nuevaVisita = { id: generarId(), ...datos };
    setVisitas((previas) => [nuevaVisita, ...previas]);
    setMensaje('¡Gracias por tu comentario! Se guardó correctamente.');
  }

  function actualizarVisita(datos) {
    setVisitas((previas) =>
      previas.map((visita) => (visita.id === editandoId ? { ...visita, ...datos } : visita))
    );
    setEditandoId(null);
    setMensaje('Registro actualizado correctamente.');
  }

  function eliminarVisita(id) {
    const confirmado = window.confirm('¿Seguro que deseas eliminar este registro?');
    if (!confirmado) return;
    setVisitas((previas) => previas.filter((visita) => visita.id !== id));
    if (editandoId === id) setEditandoId(null);
    setMensaje('Registro eliminado.');
  }

  const visitaEnEdicion = visitas.find((visita) => visita.id === editandoId) ?? null;
  const visitasOrdenadas = [...visitas].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  return (
    <section id="bitacora" className="contenedor">
      <h2 className="titulo-seccion">Bitácora de visitas</h2>
      <p className="subtitulo-seccion">
        Déjanos tu fecha de visita, tu nickname y un comentario. Puedes editar o eliminar tus
        registros cuando quieras — todo se guarda en este navegador.
      </p>

      <div className="bitacora-layout">
        <div className="caja-form">
          <h3>{visitaEnEdicion ? 'Editar registro' : 'Nuevo registro'}</h3>
          <VisitLogForm
            visitaEnEdicion={visitaEnEdicion}
            onGuardar={visitaEnEdicion ? actualizarVisita : agregarVisita}
            onCancelarEdicion={() => setEditandoId(null)}
          />
          <p className="exito">{mensaje}</p>
        </div>

        <div className="bitacora-registros">
          <p className="bitacora-contador">
            Registros guardados: <strong>{visitas.length}</strong>
          </p>
          <VisitLogList visitas={visitasOrdenadas} onEditar={setEditandoId} onEliminar={eliminarVisita} />
        </div>
      </div>
    </section>
  );
}

export default VisitLog;
