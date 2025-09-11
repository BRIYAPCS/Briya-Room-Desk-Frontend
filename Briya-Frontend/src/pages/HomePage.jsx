import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCard from "../components/FloatingCard";
import sites from "../data/dummySites";
import "../App.css";   // ✅ fixed import

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Header */}
      <Header
        title="Briya Room Reservation"
        subtitle="Choose a Site"
      />

      {/* Floating Cards */}
      <div className="card-grid">
        {sites.map((site) => (
          <FloatingCard
            key={site.id}
            image={site.image}
            title={site.name}
            variant="default"   // 👈 default size for homepage
            onClick={() => navigate(`/rooms/${site.name}`)}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
