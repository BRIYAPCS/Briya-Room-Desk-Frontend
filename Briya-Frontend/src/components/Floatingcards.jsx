export default function FloatingCard({ image, title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "10px",
        margin: "10px",
        width: "220px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3 style={{ marginTop: "10px", fontSize: "1.1rem" }}>{title}</h3>
    </div>
  );
}
