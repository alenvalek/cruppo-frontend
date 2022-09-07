import axios from "axios";

const api = axios.create({
	baseURL: "https://cruppobackend.herokuapp.com/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export const setAccessToken = (token) => {
	console.log(token);
	api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export default api;
