import axios from "axios";

/* -----------------------------
   AUTH SERVICE
----------------------------- */

export const authAPI = axios.create({
  baseURL: "https://api-gateway.ambitiousmeadow-e7af242d.southeastasia.azurecontainerapps.io/api/auth"
});

// 🔥 ADD THIS
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


/* -----------------------------
   EVENT SERVICE
----------------------------- */

export const eventAPI = axios.create({
  baseURL: "https://event-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});


/* -----------------------------
   REGISTRATION SERVICE
----------------------------- */

export const registrationAPI = axios.create({
  baseURL: "https://registration-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});


/* -----------------------------
   NOTIFICATION SERVICE
----------------------------- */

export const notificationAPI = axios.create({
  baseURL: "https://notification-service.greenbay-a2b6478d.centralindia.azurecontainerapps.io"
});


/* -----------------------------
   Attach JWT Token Automatically
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

/* Apply to secured services */

attachToken(eventAPI);
attachToken(registrationAPI);
attachToken(notificationAPI);