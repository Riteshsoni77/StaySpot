const IS_PROD = import.meta.env.MODE === "production";

const server = IS_PROD
  ? "https://stayspotbackend.onrender.com"
  : "http://localhost:8000";

export default server;