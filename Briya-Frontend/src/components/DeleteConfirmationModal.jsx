import "../App.css";

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Delete Event</h2>
        <p className="delete-warning">Are you sure you want to delete this event?</p>

        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
