# Café Altura — SPA en React

Aplicación de una sola página (SPA) hecha con React + Vite, basada en el sitio estático original de
"Café Altura". Incluye clima en tiempo real, indicadores económicos de Chile y una bitácora de
visitas con CRUD completo persistido en `localStorage`.

## Funcionalidades

- **Clima en Iquique**: temperatura, estado del cielo, humedad y viento obtenidos vía `fetch` desde
  la API de [Open-Meteo](https://open-meteo.com/) (sin necesidad de API key).
- **Indicadores económicos**: UF, UTM, Dólar y Euro obtenidos vía `axios` desde
  [mindicador.cl](https://mindicador.cl/).
- **Bitácora de visitas**: CRUD (crear, ver, editar, eliminar) con validación de formulario
  (campos obligatorios, largo mínimo de nickname y comentario, fecha válida no futura) y
  persistencia en `localStorage`.
- **Modo claro / oscuro** con preferencia guardada en `localStorage`.

## Stack

- React 19 + Vite
- Axios
- CSS con variables (sin frameworks de UI)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages

El build ya está generado en la carpeta [`docs/`](docs) y listo para publicarse en
`https://<usuario>.github.io/TrabajoFinal/` (ver `base` en [vite.config.js](vite.config.js)).

Pasos:

1. Sube este repositorio a GitHub (rama `main`), incluyendo la carpeta `docs/`.
2. En GitHub → Settings → Pages → Build and deployment → Source, elige **"Deploy from a branch"**.
3. Branch: **`main`**, carpeta: **`/docs`** → Save.

No se necesita ningún comando adicional: `docs/` ya contiene el sitio compilado. Si vuelves a
modificar el código fuente, corre `npm run build` de nuevo para regenerar `docs/` antes de subir
los cambios.

> Si el repositorio tiene otro nombre, actualiza el valor de `base` en `vite.config.js` para que
> coincida (`/nombre-del-repo/`) y vuelve a compilar.

## Estructura

```
src/
  components/
    Header/        Cabecera con navegación y toggle de tema
    Hero/           Sección de bienvenida con saludo dinámico
    Features/       Tarjetas de características del producto
    Weather/        Clima de Iquique (fetch)
    EconomicIndicators/  Indicadores económicos (axios)
    VisitLog/       CRUD de la bitácora de visitas (localStorage)
    Footer/
  hooks/
    useLocalStorage.js
  utils/
    validation.js   Validaciones del formulario de la bitácora
    format.js        Formato de moneda y fechas
    weatherCodes.js   Mapeo de códigos WMO a texto/ícono
```
