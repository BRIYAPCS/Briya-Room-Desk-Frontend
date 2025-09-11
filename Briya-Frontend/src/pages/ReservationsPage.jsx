import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";
import EventDetailsModal from "../components/EventDetailsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"; // 👈 import

// Calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReservationsPage() {
  const { siteName, roomName } = useParams();

  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Create new event (slot click)
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setModalOpen(true);
  };

  // View details (event click)
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  // Save event (new or edit)
  const handleSaveEvent = (eventData) => {
    if (eventData.id) {
      setEvents(events.map((e) => (e.id === eventData.id ? eventData : e)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setModalOpen(false);
    setSelectedEvent(null);
  };

  // Open confirmation modal
  const handleDeleteEvent = () => {
    setDetailsOpen(false);
    setDeleteOpen(true);
  };

  // Confirm delete
  const confirmDeleteEvent = () => {
    if (selectedEvent?.id) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
    }
    setDeleteOpen(false);
    setSelectedEvent(null);
  };

  // Switch to edit mode
  const handleEditEvent = (event) => {
    setDetailsOpen(false);
    setModalOpen(true);
  };

  return (
    <div className="page-container calendar-page">
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
          style={{ height: 500 }}
          selectable
          defaultView="week"
          views={["month", "week", "day"]}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      <Footer />

      {/* Event Create/Edit Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
        initialData={selectedEvent}
        roomName={roomName}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isDetailsOpen}
        event={selectedEvent}
        onClose={() => setDetailsOpen(false)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDeleteEvent}
      />
    </div>
  );
}
