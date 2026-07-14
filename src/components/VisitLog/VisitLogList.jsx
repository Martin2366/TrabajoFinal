import VisitLogItem from './VisitLogItem';

function VisitLogList({ visitas, onEditar, onEliminar }) {
  if (visitas.length === 0) {
    return <p className="visita-vacio">Aún no hay registros. ¡Sé el primero en dejar un comentario!</p>;
  }

  return (
    <ul className="visita-lista">
      {visitas.map((visita) => (
        <VisitLogItem key={visita.id} visita={visita} onEditar={onEditar} onEliminar={onEliminar} />
      ))}
    </ul>
  );
}

export default VisitLogList;
