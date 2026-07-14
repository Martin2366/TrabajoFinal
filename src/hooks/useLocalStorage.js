import { useEffect, useState } from 'react';

export function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(key);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch {
      // almacenamiento no disponible (modo privado, cuota excedida, etc.)
    }
  }, [key, valor]);

  return [valor, setValor];
}
