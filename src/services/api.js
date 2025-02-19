import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (credentials) => API.post("/auth/login", credentials);
export const fetchExpenses = async () => API.get("/expenses");
