import briyaLogo from "../img/Briya-Logo.png";

export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={briyaLogo}
          alt="Briya Logo"
          className="logo-img"
        />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </header>
  );
}
