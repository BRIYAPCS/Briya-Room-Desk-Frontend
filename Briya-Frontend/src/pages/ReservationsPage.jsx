// src/pages/ReservationsPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";
import EventDetailsModal from "../components/EventDetailsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DOMPurify from "dompurify";

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

  // Allowed booking range
  const minHour = 8; // ⏰ 8:00 AM
  const maxHour = 16.5; // ⏰ 4:30 PM (16:30)

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
    return sameDay
      ? `${formatDate(start)} ${formatTime(start)} - ${formatTime(end)}`
      : `${formatDate(start)} ${formatTime(start)} - ${formatDate(
          end
        )} ${formatTime(end)}`;
  };

  // ============================================================
  // Event Handlers
  // ============================================================
  const handleSelectSlot = ({ start, end }) => {
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;

    // ⛔ prevent selection outside working hours
    if (startHour < minHour || endHour > maxHour) return;

    setSelectedEvent({ start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    const encodedEvent = {
      ...eventData,
      title: encodeURIComponent(eventData.title), // ✅ encode title only
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
  // Overlap Detection (semi-transparent effect)
  // ============================================================
  const isOverlapping = (event, allEvents) => {
    return allEvents.some(
      (e) => e.id !== event.id && e.start < event.end && e.end > event.start
    );
  };

  // ============================================================
  // 🚧 Placeholder for dnd-kit integration (future step)
  // ============================================================
  // Here we’ll later add drag + resize behavior using dnd-kit
  // → It works with both mouse (desktop) and touch (mobile)
  // For now, resizing/moving is handled manually in modals.

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="page-container calendar-page">
      <Header
        title="Briya Room Reservation"
        subtitle={`${decodedSiteName} → ${decodedRoomName}`}
      />

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
          onNavigate={setCurrentDate}
          onView={setCurrentView}
          defaultView="week"
          views={["month", "week", "work_week", "day"]}
          messages={{ work_week: "Work Week" }}
          showAllEvents={false}
          min={new Date(1970, 1, 1, 8, 0, 0)}
          max={new Date(2030, 1, 1, 16, 30, 0)}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          tooltipAccessor={(event) =>
            event.sanitizedDescription ||
            formatEventTime(event.start, event.end)
          }
          titleAccessor={(event) => {
            const cleanTitle = decodeURIComponent(event.title);
            const descPreview = event.sanitizedDescription
              ? ` - ${event.sanitizedDescription.substring(0, 20)}...`
              : "";
            return `${cleanTitle}${descPreview}`;
          }}
          components={{
            // Gray out restricted hours
            timeSlotWrapper: ({ children, value }) => {
              const hour = value.getHours() + value.getMinutes() / 60;
              const isRestricted = hour < minHour || hour >= maxHour;
              const className = isRestricted ? "restricted-slot" : "";
              return <div className={className}>{children}</div>;
            },
          }}
          // Overlapping events visual
          eventPropGetter={(event) => {
            const overlapping = isOverlapping(event, events);
            let style = {
              backgroundColor: "#3174ad",
              color: "white",
              borderRadius: "6px",
              border: "none",
              padding: "2px 4px",
              opacity: overlapping ? 0.75 : 1, // 👈 fade overlapping events
            };
            return { style };
          }}
        />
      </div>

      <Footer />

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
