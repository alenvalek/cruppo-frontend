import {
	LOGIN_SUCCESS,
	AUTH_FAIL,
	LOGIN_FAIL,
	LOGOUT,
	LOAD_USER_DATA,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	loading: true,
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOAD_USER_DATA:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				loading: false,
			};
		case LOGIN_FAIL:
		case AUTH_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				user: null,
				token: null,
				loading: false,
			};
		default:
			return state;
	}
};
