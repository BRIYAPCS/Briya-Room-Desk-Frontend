// src/components/EventModal.jsx
import { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // ✅ import sanitizer
import "../App.css";

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  roomName,
  currentView, // 👈 used for weekday snapping in "work_week"
}) {
  const isEditing = !!initialData?.id;

  // ============================================================
  // Form State
  // ============================================================
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [bookedBy, setBookedBy] = useState("");
  const [description, setDescription] = useState("");

  // ============================================================
  // Load data when editing OR initialize new booking
  // ============================================================
  useEffect(() => {
    if (initialData) {
      // Edit mode → load event data
      setTitle(initialData.title ? decodeURIComponent(initialData.title) : "");
      setStart(
        initialData.start
          ? new Date(initialData.start).toISOString().slice(0, 16)
          : ""
      );
      setEnd(
        initialData.end
          ? new Date(initialData.end).toISOString().slice(0, 16)
          : ""
      );
      setBookedBy(initialData.bookedBy || "");
      setDescription(initialData.description || "");
    } else {
      // Create mode → fresh defaults
      let now = new Date();

      // ✅ If user is in "Work Week" view, snap start/end to weekdays
      if (currentView === "work_week") {
        const day = now.getDay();
        if (day === 6) now.setDate(now.getDate() - 1); // Saturday → Friday
        if (day === 0) now.setDate(now.getDate() + 1); // Sunday → Monday
      }

      const defaultEnd = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
      setStart(now.toISOString().slice(0, 16));
      setEnd(defaultEnd.toISOString().slice(0, 16));
      setTitle("");
      setBookedBy("");
      setDescription("");
    }
  }, [initialData, currentView]);

  if (!isOpen) return null;

  // ============================================================
  // Save handler (sanitize bookedBy & description)
  // ============================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end || !bookedBy) return;

    onSave({
      ...initialData,
      title, // ✅ encoded later in ReservationsPage
      start: new Date(start),
      end: new Date(end),
      bookedBy: DOMPurify.sanitize(bookedBy), // sanitize user input
      description: DOMPurify.sanitize(description), // sanitize description
    });
  };

  // ============================================================
  // Render Modal
  // ============================================================
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? `Edit Booking – ${roomName}` : `Book ${roomName}`}</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <label>Event Title *</label>
          <input
            type="text"
            placeholder="e.g., Team Meeting"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Start Date */}
          <label>Start Date *</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />

          {/* End Date */}
          <label>End Date *</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />

          {/* Booked By */}
          <label>Booked By *</label>
          <input
            type="text"
            value={bookedBy}
            onChange={(e) => setBookedBy(e.target.value)}
            required
          />

          {/* Description */}
          <label>Description</label>
          <textarea
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Actions */}
          <div className="modal-actions">
            <button type="submit" className="btn-confirm">
              {isEditing ? "Update Room" : "Book Room"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
