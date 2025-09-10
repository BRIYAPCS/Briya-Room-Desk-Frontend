import Logo from "./Logo";

export default function Header({ title, subtitle }) {
  return (
    <header style={{ textAlign: "center", padding: "20px" }}>
      <Logo />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}
