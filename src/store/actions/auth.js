import {
	LOGIN_SUCCESS,
	AUTH_FAIL,
	LOGIN_FAIL,
	LOGOUT,
	LOAD_USER_DATA,
} from "../actions/types";
import api, { setAccessToken } from "../../api/api";

export const loginUser = (email, password) => async (dispatch) => {
	const loginDetails = { email, password };

	try {
		const res = await api.post("/authentication", loginDetails);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUserData());
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const loadUserData = () => async (dispatch) => {
	const token = localStorage.getItem("token");
	if (token) {
		setAccessToken(token);
	}

	try {
		const res = await api.get("/authentication");

		dispatch({
			type: LOAD_USER_DATA,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_FAIL,
		});
	}
};

export const logoutUser = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
