import { combineReducers } from 'redux';
import { projectReducer } from './notes/project.reducer';
import { categoryReducer } from './notes/category.reducer';

export const rootReducer = combineReducers({
	project: projectReducer,
	category: categoryReducer,
});


