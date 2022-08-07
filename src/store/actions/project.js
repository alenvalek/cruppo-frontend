import { SET_PROJECT } from "../actions/types";
import api from "../../api/api";

export const setProject = (id) => async (dispatch) => {
	dispatch({
		type: SET_PROJECT,
		payload: id,
	});
};
