// src/components/EventModal.jsx
import { useState, useEffect } from "react";
import "../App.css";

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  roomName,
  currentView, // 👈 passed from ReservationsPage
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
  // Weekday Helper (snap Sat/Sun → nearest weekday)
  // ============================================================
  const snapToWeekday = (date) => {
    const d = new Date(date);
    const day = d.getDay();

    if (day === 6) d.setDate(d.getDate() - 1); // Saturday → Friday
    if (day === 0) d.setDate(d.getDate() + 1); // Sunday → Monday

    return d;
  };

  // ============================================================
  // Load Data When Modal Opens
  // ============================================================
  useEffect(() => {
    if (initialData?.start && initialData?.end) {
      // Edit mode
      setTitle(initialData.title || "");
      setStart(new Date(initialData.start).toISOString().slice(0, 16));
      setEnd(new Date(initialData.end).toISOString().slice(0, 16));
      setBookedBy(initialData.bookedBy || "");
      setDescription(initialData.description || "");
    } else {
      // Create mode
      let now = new Date();
      if (currentView === "work_week") {
        now = snapToWeekday(now); // 👈 snap if weekend
      }

      const defaultEnd = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
      setTitle("");
      setBookedBy("");
      setDescription("");
      setStart(now.toISOString().slice(0, 16));
      setEnd(defaultEnd.toISOString().slice(0, 16));
    }
  }, [initialData, currentView]);

  if (!isOpen) return null;

  // ============================================================
  // Save Handler
  // ============================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end || !bookedBy) return;

    let startDate = new Date(start);
    let endDate = new Date(end);

    if (currentView === "work_week") {
      startDate = snapToWeekday(startDate);
      endDate = snapToWeekday(endDate);
    }

    onSave({
      ...initialData,
      title,
      start: startDate,
      end: endDate,
      bookedBy,
      description,
    });
  };

  // ============================================================
  // Render
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
