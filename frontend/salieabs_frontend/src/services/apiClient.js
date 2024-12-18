// src/services/apiClient.js
import axios from "axios";

// Initialize Axios instance
const REACT_APP_API_BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE_URL, // Using the base URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
