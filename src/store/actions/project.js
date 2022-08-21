import { RESET_PROJECT, SET_PROJECT, SET_PROJECT_INIT } from "../actions/types";
import api from "../../api/api";

export const setProject = (id) => async (dispatch) => {
	try {
		dispatch({
			type: SET_PROJECT_INIT,
			payload: true,
		});
		console.log(id);
		const res = await api.get(`/projects/${id}`);
		dispatch({
			type: SET_PROJECT,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const resetProject = () => async (dispatch) => {
	try {
		dispatch({
			type: SET_PROJECT_INIT,
			payload: false,
		});
		dispatch({
			type: RESET_PROJECT,
			payload: null,
		});
	} catch (error) {
		console.log(error);
	}
};
