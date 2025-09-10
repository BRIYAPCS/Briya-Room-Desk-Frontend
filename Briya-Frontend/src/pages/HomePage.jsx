import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FloatingCard from "../Components/FloatingCard";
import sites from "../Data/dummySites";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Header */}
      <Header
        title="Briya Room Reservation"
        subtitle="Choose a Site"
      />

      {/* Floating Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "15px",
          padding: "20px",
          flex: "1",
        }}
      >
        {sites.map((site) => (
          <FloatingCard
            key={site.id}
            image={site.image}
            title={site.name}
            onClick={() => navigate(`/rooms/${site.name}`)}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
