import axios from "axios";
const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 5000,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token && config.url.startsWith("/products") && config.method.toLowerCase() === "get") {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
export default api;
