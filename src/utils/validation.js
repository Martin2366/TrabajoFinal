const NICKNAME_MIN = 3;
const COMENTARIO_MIN = 10;

export function validarFecha(valor) {
  if (!valor) return 'La fecha es obligatoria.';
  const fecha = new Date(`${valor}T00:00:00`);
  if (Number.isNaN(fecha.getTime())) return 'Ingresa una fecha válida.';

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha > hoy) return 'La fecha no puede ser posterior a hoy.';

  return '';
}

export function validarNickname(valor) {
  if (!valor.trim()) return 'El nickname es obligatorio.';
  if (valor.trim().length < NICKNAME_MIN) {
    return `El nickname debe tener al menos ${NICKNAME_MIN} caracteres.`;
  }
  return '';
}

export function validarComentario(valor) {
  if (!valor.trim()) return 'El comentario es obligatorio.';
  if (valor.trim().length < COMENTARIO_MIN) {
    return `El comentario debe tener al menos ${COMENTARIO_MIN} caracteres.`;
  }
  return '';
}

export function validarVisita({ fecha, nickname, comentario }) {
  return {
    fecha: validarFecha(fecha),
    nickname: validarNickname(nickname),
    comentario: validarComentario(comentario),
  };
}

export function esVisitaValida(errores) {
  return Object.values(errores).every((mensaje) => mensaje === '');
}
