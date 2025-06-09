import axios from "axios";
import { getCookie } from "./utils/cookie";
const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 5000,
});

api.interceptors.request.use((config) => {
	const token = getCookie("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
export default api;
