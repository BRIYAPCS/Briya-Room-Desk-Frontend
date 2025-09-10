import { useNavigate } from "react-router-dom";

export default function BackButton({ to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // go to a specific route if provided
    } else {
      navigate(-1); // go back one step in history
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        margin: "10px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
    >
      ⬅ Back
    </button>
  );
}
