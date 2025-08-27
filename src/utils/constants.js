

//production
//export const BASE_URL = "/api"; 

// dev
export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://13.53.142.211:5000"; 

//export const BASE_URL = "/api";

