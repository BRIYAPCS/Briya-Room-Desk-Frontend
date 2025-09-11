import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// React Big Calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Import library CSS (⚠️ REQUIRED)
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer setup
const localizer = momentLocalizer(moment);

// Sample events (later connect to DB)
const events = [
  {
    title: "ESOL Leadership Meeting",
    start: new Date(2025, 8, 3, 12, 0),
    end: new Date(2025, 8, 3, 13, 0),
  },
  {
    title: "Team Training",
    start: new Date(2025, 8, 4, 10, 0),
    end: new Date(2025, 8, 4, 11, 30),
  },
];

export default function ReservationsPage() {
  const { siteName, roomName } = useParams();

  return (
    <div className="page-container">
      <Header
        title="Briya Room Reservation"
        subtitle={`${siteName} → ${roomName}`}
      />

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          defaultView="week"
          style={{ height: 500 }}
          selectable
        />
      </div>

      <Footer />
    </div>
  );
}
