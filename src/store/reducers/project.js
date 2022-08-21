import { SET_PROJECT, RESET_PROJECT, SET_PROJECT_INIT } from "../actions/types";

const initialState = {
	currentProject: null,
	isProjectLoading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_PROJECT_INIT:
			return {
				...state,
				isProjectLoading: payload,
			};
		case SET_PROJECT:
			return {
				...state,
				currentProject: payload,
			};
		case RESET_PROJECT:
			return {
				isProjectLoading: true,
				currentProject: null,
			};
		default:
			return state;
	}
};
