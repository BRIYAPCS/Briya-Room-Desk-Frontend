export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "5rem",
        padding: "1rem",
        textAlign: "center",
        fontSize: "1.2rem",
        color: "#f0f0f0",
      }}
    >
      © {new Date().getFullYear()} | Designed & Engineered by the Briya IT Team | All Rights Reserved.
    </footer>
  );
}
