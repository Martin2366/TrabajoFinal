import './Header.css';

function Header({ modoOscuro, onCambiarTema }) {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-flex">
        <span className="logo">Café Altura</span>

        <nav className="nav-principal">
          <a href="#clima">Clima</a>
          <a href="#indicadores">Indicadores</a>
          <a href="#bitacora">Bitácora</a>
        </nav>

        <button
          type="button"
          className="btn-tema"
          onClick={onCambiarTema}
          aria-pressed={modoOscuro}
        >
          {modoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </div>
    </header>
  );
}

export default Header;
