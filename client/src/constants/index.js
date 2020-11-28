export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000"
    : "https://krankj-2-backend.krankj.vercel.app";
