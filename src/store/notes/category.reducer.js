import { CATEGORY_ACTION_TYPES } from './category.types';

const INITIAL_STATE = {
  list: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_ACTION_TYPES.ADD_CATEGORY:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
	case CATEGORY_ACTION_TYPES.DELETE_CATEGORY:
		const updatedList = state.list.filter(category => category.id !== action.payload);
		return {
		  ...state,
		  list: updatedList,
		};
    case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY:
		return {
			...state,
			list: state.list.map(category =>
			  category.id === action.payload.id ? action.payload : category
			),
		  };
    default:
      return state;
  }
};
