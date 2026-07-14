# Café Altura — SPA en React

Aplicación de una sola página (SPA) hecha con **React + Vite**, basada en el sitio estático
original de "Café Altura" (Iquique, Chile). Reorganiza ese diseño en componentes reutilizables y
añade tres módulos funcionales: clima en tiempo real, indicadores económicos de Chile y una
bitácora de visitas con CRUD completo.

## Funcionalidades

### Clima en Iquique
Muestra la temperatura actual, el estado del cielo (con ícono), la humedad y la velocidad del
viento, obtenidos en tiempo real mediante `fetch` desde la API pública de
[Open-Meteo](https://open-meteo.com/) (no requiere API key). Mientras carga se muestra un spinner,
y si la petición falla se muestra un mensaje de error con botón para reintentar.

### Indicadores económicos
Muestra el valor del día de la **UF**, la **UTM**, el **Dólar** y el **Euro**, obtenidos mediante
`axios` desde la API de [mindicador.cl](https://mindicador.cl/). Los valores se presentan
formateados como moneda chilena (CLP), con la fecha de última actualización de cada uno.

### Bitácora de visitas (CRUD)
Formulario para dejar un comentario con fecha de visita, nickname y comentario. Permite:

- **Crear** un nuevo registro.
- **Ver** todos los registros guardados, ordenados del más reciente al más antiguo.
- **Editar** un registro existente (el formulario se rellena automáticamente).
- **Eliminar** un registro (con confirmación).

Todos los registros persisten en `localStorage`, por lo que se mantienen aunque se recargue la
página. El formulario valida en tiempo real:

- Campos obligatorios (fecha, nickname, comentario).
- Nickname de al menos 3 caracteres.
- Comentario de al menos 10 caracteres.
- Fecha válida y no futura.

Los mensajes de error aparecen bajo cada campo apenas el usuario sale de él, y el botón de guardar
permanece deshabilitado hasta que el formulario es válido.

### Modo claro / oscuro
Botón en la cabecera que alterna el tema visual de toda la aplicación. La preferencia elegida se
guarda en `localStorage` y se mantiene entre visitas.

## Cómo se usa

1. Al entrar, la app saluda según la hora del día y muestra la presentación de la marca.
2. La sección **Clima** y **Indicadores** cargan sus datos automáticamente al abrir la página.
3. En **Bitácora**, se completa el formulario y se presiona "Agregar registro" para guardar un
   comentario; cada registro guardado aparece en la lista de la derecha con botones para editarlo
   o eliminarlo.
4. El botón "🌙 Modo oscuro" / "☀️ Modo claro" en la cabecera cambia el tema en cualquier momento.

## Conceptos de React utilizados

**Componentes.** La app está dividida en componentes independientes bajo `src/components/`
(`Header`, `Hero`, `Features`, `Weather`, `EconomicIndicators`, `VisitLog`, `Footer`), cada uno con
su propio archivo `.css`. Algunos se dividen a su vez en subcomponentes de presentación, por
ejemplo `TarjetaCaracteristica` dentro de `Features`, `DetalleClima` dentro de `Weather`,
`TarjetaIndicador` dentro de `EconomicIndicators`, y `VisitLogItem`/`VisitLogForm`/`VisitLogList`
dentro de `VisitLog`.

**Props.** Los datos bajan de componente padre a hijo mediante props: `App` le pasa `modoOscuro` y
`onCambiarTema` a `Header`; `Features` mapea un arreglo de características y le pasa cada una como
props a `TarjetaCaracteristica`; `EconomicIndicators` hace lo mismo con cada indicador hacia
`TarjetaIndicador`; y `VisitLog` le pasa la lista de visitas y los manejadores `onEditar`/
`onEliminar` a `VisitLogList`, que a su vez los reenvía a cada `VisitLogItem`.

**useState.** Se usa para manejar estado local en cada componente: el estado de carga/error y los
datos recibidos en `Weather` y `EconomicIndicators`, los valores/errores/campos-tocados del
formulario en `VisitLogForm`, y el id en edición más el mensaje de confirmación en `VisitLog`. El
hook propio `useLocalStorage` (en `src/hooks/useLocalStorage.js`) envuelve `useState` para
sincronizar automáticamente el estado con `localStorage`, y se usa tanto para el tema oscuro
(`App`) como para el arreglo de visitas (`VisitLog`).

**useEffect.** Se usa para efectos secundarios: calcular el saludo dinámico al montar `Hero`,
disparar las peticiones `fetch`/`axios` al montar `Weather` y `EconomicIndicators` (cancelándolas
si el componente se desmonta), aplicar la clase `oscuro` al `<body>` cuando cambia el tema en
`App`, sincronizar el formulario con la visita seleccionada en `VisitLogForm`, y ocultar el mensaje
de éxito de la bitácora después de unos segundos en `VisitLog`.

## Stack

- React 19 + Vite
- Axios
- CSS con variables (sin frameworks de UI)

## Ejecutar el proyecto localmente

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
  components/
    Header/               Cabecera con navegación y toggle de tema
    Hero/                  Sección de bienvenida con saludo dinámico
    Features/              Tarjetas de características del producto
    Weather/               Clima de Iquique (fetch)
    EconomicIndicators/    Indicadores económicos (axios)
    VisitLog/              CRUD de la bitácora de visitas (localStorage)
    Footer/
  hooks/
    useLocalStorage.js     Sincroniza un estado con localStorage
  utils/
    validation.js          Validaciones del formulario de la bitácora
    format.js               Formato de moneda y fechas
    weatherCodes.js          Mapeo de códigos WMO a texto/ícono
docs/                       Build de producción (generado por `npm run build`)
```
