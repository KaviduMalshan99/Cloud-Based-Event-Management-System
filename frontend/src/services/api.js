import axios from "axios";

/* -----------------------------
   AUTH SERVICE
----------------------------- */

export const authAPI = axios.create({
  baseURL: "http://localhost:8001"
});


/* -----------------------------
   EVENT SERVICE
----------------------------- */

export const eventAPI = axios.create({
  baseURL: "http://localhost:8002"
});


/* -----------------------------
   REGISTRATION SERVICE
----------------------------- */

export const registrationAPI = axios.create({
  baseURL: "http://localhost:8003"
});


/* -----------------------------
   NOTIFICATION SERVICE
----------------------------- */

export const notificationAPI = axios.create({
  baseURL: "http://localhost:8004"
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