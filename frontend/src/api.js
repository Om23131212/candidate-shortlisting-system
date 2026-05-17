import axios from "axios";

const API = axios.create({
  baseURL: "https://candidate-shortlisting-backend-5c2p.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;