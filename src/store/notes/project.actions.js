import { PROJECT_ACTION_TYPES } from "./project.types";

export const addProject = (project) => ({
	type: PROJECT_ACTION_TYPES.ADD_PROJECT,
	payload: project,
});

export const deleteProject = (index) => ({
	type: PROJECT_ACTION_TYPES.DELETE_PROJECT,
	payload: index,
});

export const updateProject = (updatedProject) => ({
	type: PROJECT_ACTION_TYPES.UPDATE_PROJECT,
	payload: updatedProject,
});

