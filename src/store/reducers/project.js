import { SET_PROJECT } from "../actions/types";

const initialState = {
	currentProject: 0,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_PROJECT:
			return {
				currentProject: payload.id,
			};
		default:
			return state;
	}
};
