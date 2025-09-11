import "../App.css";

export default function EventDetailsModal({
  isOpen,
  event,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !event) return null;

  // ============================================================
  // Helpers to format date & time
  // ============================================================

  // Format full date (Month Day, Year)
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Format time only (12-hour with minutes)
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // Build formatted time string
  const formatEventTime = (start, end) => {
    const sameDay = formatDate(start) === formatDate(end);

    if (sameDay) {
      // Example: Sep 10, 2025 8:00 AM - 3:00 PM
      return `${formatDate(start)} ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      // Example: Sep 10, 2025 8:00 AM - Sep 11, 2025 2:00 PM
      return `${formatDate(start)} ${formatTime(start)} - ${formatDate(
        end
      )} ${formatTime(end)}`;
    }
  };

  // ============================================================
  // Render Modal
  // ============================================================
  return (
    <div className="modal-overlay">
      <div className="modal event-details">
        <h2>Event Details</h2>

        <p className="event-detail"><strong>Title:</strong> {event.title}</p>
        <p className="event-detail"><strong>Booked By:</strong> {event.bookedBy || "—"}</p>
        <p className="event-detail">
          <strong>Time:</strong> {formatEventTime(event.start, event.end)}
        </p>
        <p className="event-detail">
          <strong>Description:</strong> {event.description || "—"}
        </p>

        <div className="modal-actions">
          {onEdit && (
            <button className="btn-confirm" onClick={() => onEdit(event)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="btn-delete" onClick={() => onDelete(event.id)}>
              Delete
            </button>
          )}
          <button className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
