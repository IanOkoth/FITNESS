import CartButton from "./CartButton";

export default function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Voltage Fitness home">
          <i></i>VOLTAGE
        </a>
        <nav className="main" aria-label="Main">
          <a href="#programs">Programs</a>
          <a href="#build">Build my plan</a>
          <a href="#videos">Videos</a>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="tools">
          <CartButton />
          <a className="btn btn-primary btn-sm" href="#contact">
            Book
          </a>
        </div>
      </div>
    </header>
  );
}
