export default function FloatingCard({ image, title, onClick, variant = "default" }) {
  return (
    <div className={`floating-card ${variant}`} onClick={onClick}>
      <img src={image} alt={title} className="floating-card-img" />
      <h3 className="floating-card-title">{title}</h3>
    </div>
  );
}
