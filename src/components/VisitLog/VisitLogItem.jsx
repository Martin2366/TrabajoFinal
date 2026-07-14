import { formatearFechaLarga } from '../../utils/format';

function VisitLogItem({ visita, onEditar, onEliminar }) {
  return (
    <li className="visita-item">
      <div className="visita-item-cabecera">
        <span className="visita-nickname">{visita.nickname}</span>
        <span className="visita-fecha">{formatearFechaLarga(visita.fecha)}</span>
      </div>
      <p className="visita-comentario">{visita.comentario}</p>
      <div className="visita-item-acciones">
        <button type="button" className="btn-secundario" onClick={() => onEditar(visita.id)}>
          Editar
        </button>
        <button type="button" className="btn-peligro" onClick={() => onEliminar(visita.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default VisitLogItem;
