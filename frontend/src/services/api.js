import axios from "axios";

/* -----------------------------
   BASE URL (API Gateway)
----------------------------- */
const BASE_URL = "https://api-gateway.ambitiousmeadow-e7af242d.southeastasia.azurecontainerapps.io";

/* -----------------------------
   SERVICES (ALL via Gateway)
----------------------------- */
export const authAPI = axios.create({
  baseURL: `${BASE_URL}/api/auth`
});

export const eventAPI = axios.create({
  baseURL: `${BASE_URL}/api/events`
});

export const registrationAPI = axios.create({
  baseURL: `${BASE_URL}/api/register`
});

export const notificationAPI = axios.create({
  baseURL: `${BASE_URL}/api/notify`
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
   Handle Unauthorized (GLOBAL)
----------------------------- */
const handleAuthError = (api) => {
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );
};


/* -----------------------------
   Apply Interceptors
----------------------------- */
[
  authAPI,
  eventAPI,
  registrationAPI,
  notificationAPI
].forEach((api) => {
  attachToken(api);
  handleAuthError(api);
});