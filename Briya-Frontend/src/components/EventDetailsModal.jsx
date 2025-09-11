// src/components/EventDetailsModal.jsx
import DOMPurify from "dompurify"; // ✅ import sanitizer
import "../App.css";

export default function EventDetailsModal({
  isOpen,
  event,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !event) return null;

  // ✅ Decode title for display
  const displayTitle = decodeURIComponent(event.title);

  // ✅ Sanitize bookedBy and description before rendering
  const safeBookedBy = DOMPurify.sanitize(event.bookedBy || "—");
  const safeDescription = DOMPurify.sanitize(event.description || "—");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Event Details</h2>

        <p>
          <strong>Title:</strong> {displayTitle}
        </p>
        <p>
          <strong>Booked By:</strong> {safeBookedBy}
        </p>
        <p>
          <strong>Time:</strong> {event.start?.toLocaleString()} –{" "}
          {event.end?.toLocaleString()}
        </p>
        <p>
          <strong>Description:</strong> {safeDescription}
        </p>

        <div className="modal-actions">
          <button className="btn-confirm" onClick={() => onEdit(event)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(event.id)}>
            Delete
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
