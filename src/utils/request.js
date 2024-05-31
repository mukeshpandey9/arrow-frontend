import axios from "axios";
import { useAuth } from "../context/Auth";
// baseURL: "http://localhost:8080",
export const API = axios.create({
  baseURL: "https://api.bharathmegaminds.com",
});

API.interceptors.request.use((req) => {
  const auth = localStorage.getItem("auth");
  const { token } = JSON.parse(auth);
  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export const getConfig = async () => {
  try {
    // const response = await axios.get("/app.config.json");
    // const baseEndpoint = response.data.baseendpoint;
    // // Optionally, you can set axios.defaults.baseURL if you want it to apply to all axios instances.
    // axiosInstance.defaults.baseURL = baseEndpoint;
  } catch (error) {
    console.error("Error fetching app config:", error);
    throw error;
  }
};
