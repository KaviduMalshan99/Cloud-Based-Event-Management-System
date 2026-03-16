import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:8001"
});

export const eventAPI = axios.create({
  baseURL: "http://localhost:8002"
});

export const registrationAPI = axios.create({
  baseURL: "http://localhost:8003"
});

export const notificationAPI = axios.create({
  baseURL: "http://localhost:8004"
});