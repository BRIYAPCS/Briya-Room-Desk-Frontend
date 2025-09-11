import { useState, useEffect } from "react";
import "../App.css";

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  roomName,
}) {
  // Track whether we are editing or creating
  const isEditing = !!initialData?.id;

  // Form state
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [bookedBy, setBookedBy] = useState("");
  const [description, setDescription] = useState("");

  // Load data into form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setStart(initialData.start ? new Date(initialData.start).toISOString().slice(0, 16) : "");
      setEnd(initialData.end ? new Date(initialData.end).toISOString().slice(0, 16) : "");
      setBookedBy(initialData.bookedBy || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end || !bookedBy) return;

    onSave({
      ...initialData, // keep id if editing
      title,
      start: new Date(start),
      end: new Date(end),
      bookedBy,
      description,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? `Edit Booking – ${roomName}` : `Book ${roomName}`}</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Event Title *</label>
          <input
            type="text"
            placeholder="e.g., Team Meeting"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Start Date *</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />

          <label>End Date *</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />

          <label>Booked By *</label>
          <input
            type="text"
            value={bookedBy}
            onChange={(e) => setBookedBy(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit" className="btn-confirm">
              {isEditing ? "Save Changes" : "Book Room"}
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
