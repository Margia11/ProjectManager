import { PROJECT_INITIAL_STATE } from "./project.state";
import { PROJECT_ACTION_TYPES } from "./project.types";

export const projectReducer = (state = PROJECT_INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (action.type) {
		case PROJECT_ACTION_TYPES.ADD_PROJECT:
			return {
				...state,
				list: [...state.list, payload],
			};
		case PROJECT_ACTION_TYPES.DELETE_PROJECT:
			return {
				...state,
				list: state.list.filter((project, index) => index !== payload),
			};
		case PROJECT_ACTION_TYPES.UPDATE_PROJECT:
			return {
				...state,
				list: state.list.map(project =>
				  project.id === action.payload.id
					? {
						...action.payload,
						completionDate: action.payload.status === 'Completed' ? new Date().toISOString() : project.completionDate
					  }
					: project
				)
			  };

		default:
			return state;
	}
}

