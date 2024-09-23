import { CATEGORY_ACTION_TYPES } from "./category.types";

export const addCategory = (category) => ({
	type: CATEGORY_ACTION_TYPES.ADD_CATEGORY,
	payload: category,
});

export const deleteCategory = (id) => ({
	type: CATEGORY_ACTION_TYPES.DELETE_CATEGORY,
	payload: id,
});

export const updateCategory = (updatedCategory) => ({
	type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY,
	payload: updatedCategory,
});
