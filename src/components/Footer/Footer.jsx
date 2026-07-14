import './Footer.css';

function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="pie">
      <div className="contenedor">© {anio} Café Altura · Iquique, Chile</div>
    </footer>
  );
}

export default Footer;
