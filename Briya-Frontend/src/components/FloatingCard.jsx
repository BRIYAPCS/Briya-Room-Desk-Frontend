// src/components/FloatingCard.jsx
// Reusable floating card component for sites/rooms
// ✅ Automatically decodes titles so they always render clean in the UI.

import "../App.css";

export default function FloatingCard({
  image,
  title,
  onClick,
  variant = "default",
}) {
  // ✅ Always decode the title for display
  const displayTitle = decodeURIComponent(title || "");

  return (
    <div className={`floating-card ${variant}`} onClick={onClick}>
      {/* Card Image */}
      <img src={image} alt={displayTitle} className="floating-card-img" />

      {/* Card Title */}
      <h3 className="floating-card-title">{displayTitle}</h3>
    </div>
  );
}
