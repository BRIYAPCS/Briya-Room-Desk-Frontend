export default function LoadingModal({ message = "Loading...", show = false }) {
  if (!show) return null; // don't render if not visible

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          minWidth: "200px",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #ddd",
            borderTop: "4px solid #007BFF",
            borderRadius: "50%",
            margin: "0 auto 15px",
            animation: "spin 1s linear infinite",
          }}
        />

        {/* Message */}
        <p style={{ margin: 0, fontSize: "1.1rem", color: "#333" }}>{message}</p>
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
