import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import ReservationsPage from "./pages/ReservationsPage";

// ✅ App handles navigation between pages
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Rooms for a given site */}
        <Route path="/rooms/:siteName" element={<RoomsPage />} />

        {/* Reservations for a specific room */}
        <Route path="/reservations/:siteName/:roomName" element={<ReservationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
