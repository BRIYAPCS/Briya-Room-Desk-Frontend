// src/pages/RoomsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCard from "../components/FloatingCard";
import sites from "../data/dummySites";
import "../App.css";

export default function RoomsPage() {
  const { siteName } = useParams();
  const navigate = useNavigate();

  // Find the site based on the URL param
  const site = sites.find((s) => s.name === siteName);
  const siteRooms = site ? site.rooms : [];

  return (
    <div className="page-container">
      {/* Header */}
      <Header
        title="Briya Room Reservation"
        subtitle={`${siteName} – Choose a Room`}
      />

      {/* Floating Cards */}
      <div className="card-grid">
        {siteRooms.map((room, index) => (
          <FloatingCard
            key={index}
            image={room.image}
            title={room.name}
            variant="wide" // 👈 wide variant for rooms
            onClick={() =>
              navigate(
                `/reservations/${encodeURIComponent(
                  siteName
                )}/${encodeURIComponent(room.name)}`
              )
            }
          />
        ))}

        {siteRooms.length === 0 && <p>No rooms found for {siteName}.</p>}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
