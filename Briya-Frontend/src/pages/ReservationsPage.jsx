// src/pages/ReservationsPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";
import EventDetailsModal from "../components/EventDetailsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DOMPurify from "dompurify"; // ✅ sanitizer

// React Big Calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReservationsPage() {
  const { siteName, roomName } = useParams();

  // ✅ Decode for display
  const decodedSiteName = decodeURIComponent(siteName);
  const decodedRoomName = decodeURIComponent(roomName);

  // ============================================================
  // State Management
  // ============================================================
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  // ============================================================
  // Helpers: Date & Time Formatting
  // ============================================================
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatEventTime = (start, end) => {
    const sameDay = formatDate(start) === formatDate(end);
    if (sameDay) {
      return `${formatDate(start)} ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatDate(start)} ${formatTime(start)} - ${formatDate(
        end
      )} ${formatTime(end)}`;
    }
  };

  // ============================================================
  // Event Handlers
  // ============================================================
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    // ✅ Encode only title
    const encodedEvent = {
      ...eventData,
      title: encodeURIComponent(eventData.title),
    };

    if (eventData.id) {
      setEvents(events.map((e) => (e.id === eventData.id ? encodedEvent : e)));
    } else {
      setEvents([...events, { ...encodedEvent, id: Date.now() }]);
    }

    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    setDetailsOpen(false);
    setDeleteOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (selectedEvent?.id) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
    }
    setDeleteOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setDetailsOpen(false);
    setModalOpen(true);
  };

  // ============================================================
  // Calendar Navigation
  // ============================================================
  const handleNavigate = (date) => setCurrentDate(date);
  const handleViewChange = (view) => setCurrentView(view);

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="page-container calendar-page">
      {/* Header */}
      <Header
        title="Briya Room Reservation"
        subtitle={`${decodedSiteName} → ${decodedRoomName}`}
      />

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{ height: 500 }}
          date={currentDate}
          view={currentView}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          defaultView="week"
          views={["month", "week", "work_week", "day"]}
          messages={{
            work_week: "Work Week",
          }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          // ✅ Tooltip shows sanitized description or time
          tooltipAccessor={(event) =>
            event.description
              ? DOMPurify.sanitize(event.description)
              : formatEventTime(event.start, event.end)
          }
          // ✅ Label inside calendar cell:
          // decoded title + optional description preview
          titleAccessor={(event) => {
            const decodedTitle = decodeURIComponent(event.title);
            const safeDescription = DOMPurify.sanitize(event.description || "");
            const preview =
              safeDescription.length > 20
                ? safeDescription.slice(0, 20) + "…"
                : safeDescription;

            return preview ? `${decodedTitle} – ${preview}` : decodedTitle;
          }}
        />
      </div>

      {/* Event Create/Edit Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
        initialData={selectedEvent}
        roomName={decodedRoomName}
        currentView={currentView}
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
