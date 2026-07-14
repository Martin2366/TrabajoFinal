import { useEffect, useState } from 'react';
import { esVisitaValida, validarVisita } from '../../utils/validation';

const VISITA_VACIA = { fecha: '', nickname: '', comentario: '' };
const SIN_TOCAR = { fecha: false, nickname: false, comentario: false };
const SIN_ERRORES = { fecha: '', nickname: '', comentario: '' };

function VisitLogForm({ visitaEnEdicion, onGuardar, onCancelarEdicion }) {
  const [valores, setValores] = useState(VISITA_VACIA);
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [tocado, setTocado] = useState(SIN_TOCAR);

  const enEdicion = Boolean(visitaEnEdicion);

  useEffect(() => {
    if (visitaEnEdicion) {
      setValores({
        fecha: visitaEnEdicion.fecha,
        nickname: visitaEnEdicion.nickname,
        comentario: visitaEnEdicion.comentario,
      });
    } else {
      setValores(VISITA_VACIA);
    }
    setErrores(SIN_ERRORES);
    setTocado(SIN_TOCAR);
  }, [visitaEnEdicion]);

  function manejarCambio(campo, valor) {
    const nuevosValores = { ...valores, [campo]: valor };
    setValores(nuevosValores);
    if (tocado[campo]) {
      setErrores(validarVisita(nuevosValores));
    }
  }

  function manejarBlur(campo) {
    setTocado((previo) => ({ ...previo, [campo]: true }));
    setErrores(validarVisita(valores));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const erroresActuales = validarVisita(valores);
    setErrores(erroresActuales);
    setTocado({ fecha: true, nickname: true, comentario: true });
    if (!esVisitaValida(erroresActuales)) return;

    onGuardar({
      fecha: valores.fecha,
      nickname: valores.nickname.trim(),
      comentario: valores.comentario.trim(),
    });

    setValores(VISITA_VACIA);
    setErrores(SIN_ERRORES);
    setTocado(SIN_TOCAR);
  }

  const formularioValido = esVisitaValida(validarVisita(valores));
  const hoy = new Date().toISOString().slice(0, 10);

  return (
    <form className="visita-form" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="fecha">Fecha de la visita</label>
        <input
          type="date"
          id="fecha"
          max={hoy}
          className={tocado.fecha && errores.fecha ? 'invalido' : ''}
          value={valores.fecha}
          onChange={(evento) => manejarCambio('fecha', evento.target.value)}
          onBlur={() => manejarBlur('fecha')}
        />
        <span className="error">{tocado.fecha ? errores.fecha : ''}</span>
      </div>

      <div className="campo">
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          placeholder="Tu nombre o apodo"
          className={tocado.nickname && errores.nickname ? 'invalido' : ''}
          value={valores.nickname}
          onChange={(evento) => manejarCambio('nickname', evento.target.value)}
          onBlur={() => manejarBlur('nickname')}
        />
        <span className="error">{tocado.nickname ? errores.nickname : ''}</span>
      </div>

      <div className="campo">
        <label htmlFor="comentario">Comentario</label>
        <textarea
          id="comentario"
          placeholder="Cuéntanos qué te pareció tu visita"
          className={tocado.comentario && errores.comentario ? 'invalido' : ''}
          value={valores.comentario}
          onChange={(evento) => manejarCambio('comentario', evento.target.value)}
          onBlur={() => manejarBlur('comentario')}
        />
        <span className="error">{tocado.comentario ? errores.comentario : ''}</span>
      </div>

      <div className="visita-form-acciones">
        <button type="submit" className="btn-principal" disabled={!formularioValido}>
          {enEdicion ? 'Guardar cambios' : 'Agregar registro'}
        </button>
        {enEdicion && (
          <button type="button" className="btn-secundario" onClick={onCancelarEdicion}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default VisitLogForm;
