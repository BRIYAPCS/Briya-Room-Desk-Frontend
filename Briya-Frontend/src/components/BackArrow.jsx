import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional icon library

export default function BackArrow() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        fontSize: "1rem",
        marginBottom: "1rem",
      }}
    >
      <ArrowLeft size={20} style={{ marginRight: "6px" }} />
      Back
    </button>
  );
}
