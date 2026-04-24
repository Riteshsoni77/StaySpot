const server =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://stayspotbackend.onrender.com";

export default server;