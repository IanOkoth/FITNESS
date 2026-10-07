export default function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Altitude home">
          <i></i>ALTITUDE
        </a>
        <nav className="main" aria-label="Main">
          <a href="#programs">Programs</a>
          <a href="#build">Build my plan</a>
          <a href="#videos">Videos</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="tools">
          <a className="btn btn-primary btn-sm" href="#contact">
            Book
          </a>
        </div>
      </div>
    </header>
  );
}
