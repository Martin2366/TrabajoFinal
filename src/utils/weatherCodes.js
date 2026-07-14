// Códigos WMO usados por Open-Meteo -> texto e icono en español.
const CODIGOS_CLIMA = {
  0: { texto: 'Cielo despejado', icono: '☀️' },
  1: { texto: 'Mayormente despejado', icono: '🌤️' },
  2: { texto: 'Parcialmente nublado', icono: '⛅' },
  3: { texto: 'Nublado', icono: '☁️' },
  45: { texto: 'Niebla', icono: '🌫️' },
  48: { texto: 'Niebla con escarcha', icono: '🌫️' },
  51: { texto: 'Llovizna ligera', icono: '🌦️' },
  53: { texto: 'Llovizna moderada', icono: '🌦️' },
  55: { texto: 'Llovizna intensa', icono: '🌧️' },
  61: { texto: 'Lluvia ligera', icono: '🌧️' },
  63: { texto: 'Lluvia moderada', icono: '🌧️' },
  65: { texto: 'Lluvia intensa', icono: '🌧️' },
  71: { texto: 'Nevada ligera', icono: '🌨️' },
  73: { texto: 'Nevada moderada', icono: '🌨️' },
  75: { texto: 'Nevada intensa', icono: '❄️' },
  80: { texto: 'Chubascos ligeros', icono: '🌦️' },
  81: { texto: 'Chubascos moderados', icono: '🌧️' },
  82: { texto: 'Chubascos violentos', icono: '⛈️' },
  95: { texto: 'Tormenta eléctrica', icono: '⛈️' },
  96: { texto: 'Tormenta con granizo', icono: '⛈️' },
  99: { texto: 'Tormenta con granizo fuerte', icono: '⛈️' },
};

export function obtenerInfoClima(codigo) {
  return CODIGOS_CLIMA[codigo] ?? { texto: 'Condición desconocida', icono: '🌡️' };
}
