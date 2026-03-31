import axios from "axios";

/* -----------------------------
   BASE URL
----------------------------- */
const BASE_URL = "https://api-gateway.ambitiousmeadow-e7af242d.southeastasia.azurecontainerapps.io";

/* -----------------------------
   AUTH SERVICE (via Gateway)
----------------------------- */
export const authAPI = axios.create({
  baseURL: `${BASE_URL}/api/auth`
});

/* -----------------------------
   EVENT SERVICE (unchanged)
----------------------------- */
export const eventAPI = axios.create({
  baseURL: "https://event-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});

/* -----------------------------
   REGISTRATION SERVICE (unchanged)
----------------------------- */
export const registrationAPI = axios.create({
  baseURL: "https://registration-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});

/* -----------------------------
   NOTIFICATION SERVICE (unchanged)
----------------------------- */
export const notificationAPI = axios.create({
  baseURL: "https://notification-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});

/* -----------------------------
   Attach JWT Token (GLOBAL)
----------------------------- */
const attachToken = (api) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

/* -----------------------------
   Handle Unauthorized (Optional but useful)
----------------------------- */
const handleAuthError = (api) => {
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );
};

/* -----------------------------
   Apply Interceptors
----------------------------- */
attachToken(authAPI);
attachToken(eventAPI);
attachToken(registrationAPI);
attachToken(notificationAPI);

handleAuthError(authAPI);