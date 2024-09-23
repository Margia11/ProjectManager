import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import useTitle from "../../useTitle";
import image from "../../images/projects.jpg";
import { FaSearch, FaFilter } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import Project from "../components/Project";
import { useDispatch, useSelector } from "react-redux";
import { addProject, deleteProject, updateProject } from "../notes/project.actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const ProjectsScreen = () => {
	useTitle("Projects");
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.project.list);
	const categories = useSelector((state) => state.category.list);
	const [showAddForm, setShowAddForm] = useState(false);
	const [projectToEdit, setProjectToEdit] = useState(null);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [dueDateRange, setDueDateRange] = useState([null, null]);
	const [newProject, setNewProject] = useState({
		name: "",
		description: "",
		category: "",
		creationDate: "",
		dueDate: null,
		status: "Pending",
		attachments: []
	});
	console.log('Progetti:', searchResults);

	const handleSearchChange = (e) => {
	e.preventDefault();
	setSearchText(e.target.value);
	};

	useEffect(() => {
		executeSearch();
	}, [projects, categories, selectedCategoryFilter, searchText, dueDateRange]);

	const handleSearchClick = () => {
	executeSearch();
	};

	const handleAddClick = () => {
		if (!projectToEdit) {
			setShowAddForm(!showAddForm);
		}
	};

	const handleChange = (e) => {
		setNewProject({ ...newProject, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setNewProject({ ...newProject, dueDate: date });
	};

	const handleEditProject = (project) => {
	if (project.status === "Completed") return;
		setProjectToEdit(project); // Imposta il progetto da modificare
		setNewProject(project); // Popola i campi del modulo con i dati esistenti
		setShowAddForm(true); // Mostra il modulo di modifica
	};

	const handleAddProject = (e) => {
	e.preventDefault();

	const projectWithDate = {
		...newProject,
		creationDate: projectToEdit ? projectToEdit.creationDate : new Date().toISOString(),
		//Mi assicuro che dueDate sia un oggetto Date prima di chiamare toISOString
		dueDate: newProject.dueDate ?
					(newProject.dueDate instanceof Date ?
						newProject.dueDate.toISOString() :
						new Date(newProject.dueDate).toISOString()) :
					null,
		id: projectToEdit ? projectToEdit.id : Date.now(), // Genera un id unico per i nuovi progetti
		completionDate: newProject.status === "Completed"
		? new Date().toISOString() // Imposta la data di completamento se lo stato è "Completed"
		: projectToEdit ? projectToEdit.completionDate : null
		};

	if (projectToEdit)
		dispatch(updateProject(projectWithDate));
	else
		dispatch(addProject(projectWithDate));


	// Reset dei campi e chiusura della modale
	setNewProject({ name: "", description: "", category: "", creationDate: "", dueDate: null , status: "Pending", attachments: []});
	setShowAddForm(false);  // Chiude la modale
	setProjectToEdit(null); // Resetta il progetto in modifica
	};

	const handleDeleteProject = (index) => {
		dispatch(deleteProject(index));
	};

	const handleFilterClick = (e) => {
	e.preventDefault();
	setIsFilterModalOpen(true); // Apre la modale
	};


	const applyFilter = () => {
	setIsFilterModalOpen(false);
	executeSearch(); // Esegui la ricerca per applicare il filtro
	};

	const executeSearch = () => {
		let results = projects;

		if (selectedCategoryFilter) {
			results = results.filter(
				(project) => project.category === selectedCategoryFilter
			);
		}

		if (searchText) {
			results = results.filter(
				(project) =>
					project.name.toLowerCase().includes(searchText.toLowerCase()) ||
					project.description.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		if (dueDateRange[0] && dueDateRange[1]) {
			results = results.filter(
				(project) => new Date(project.dueDate) >= new Date(dueDateRange[0]) &&
							  new Date(project.dueDate) <= new Date(dueDateRange[1])
			);
		}

		setSearchResults(results);
	};

	const handleAttachmentsChange = (e) => {
		const files = Array.from(e.target.files);
		setNewProject({ ...newProject, attachments: files.map(file => ({ name: file.name, url: URL.createObjectURL(file) })) });
	  };

	const pendingProjects = projects.filter((project) => project.status === "Pending");
	const inProgressProjects = projects.filter((project) => project.status === "In Progress");
	const completedProjects = projects.filter((project) => project.status === "Completed");

	return (
		<Hero img={image}>
		<br/>
			<div className="search-bar">
				<div className="form-container">
					<form className="form">
						<label htmlFor="project">
							<p>Search projects</p>
						</label>
						<div className="input-search">
							<input id="project" className="input" value={searchText} onChange={handleSearchChange}/>
							<button type="button" className="btn" onClick={handleSearchClick}>
								<FaSearch className="icon" />
							</button>
						</div>
			<div className="filter-button">
				<button className="btn" onClick={handleFilterClick}>
				<FaFilter className="icon" />Filter</button>
			</div>
			{isFilterModalOpen && (
							<div className="filter-modal">
								<div className="filter-modal-content">
									<h4>Filter Projects</h4>
									<div>
										<select
											value={selectedCategoryFilter}
											onChange={(e) => setSelectedCategoryFilter(e.target.value)}
											className="input"
										>
											<option value="">All Categories</option>
											{categories.map((category) => (
												<option key={category.id} value={category.name}>{category.name}</option>
											))}
										</select>
									</div>
									<div>
										<DatePicker
											selected={dueDateRange[0]}
											onChange={(date) => setDueDateRange([date, dueDateRange[1]])}
											placeholderText="Start Date"
											dateFormat="dd/MM/yyyy"
											className="input"
										/>
										<DatePicker
											selected={dueDateRange[1]}
											onChange={(date) => setDueDateRange([dueDateRange[0], date])}
											placeholderText="End Date"
											dateFormat="dd/MM/yyyy"
											className="input"
										/>
									</div>
									<div className="filter-modal-buttons">
										<button className="btn" onClick={applyFilter}>Apply</button>
										<button className="btn" onClick={() => setIsFilterModalOpen(false)}>Cancel</button>
									</div>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
	<div className="add-project">
	{!projectToEdit && (
		<button className="btn" onClick={handleAddClick}>
		<CiCirclePlus className="icon" />
		</button>
	)}
	</div>
			{showAddForm && (
				<div className="form2">
					<form onSubmit={handleAddProject}>
						<div className="subtitle2">{projectToEdit ? "EDIT YOUR PROJECT" : "ADD YOUR PROJECT"}</div>
						<div className="input-container ic1">
							<input
								className="input2"
								type="text"
								name="name"
								placeholder="Project Name"
								value={newProject.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="input-container ic2">
							<input
								className="input2"
								type="text"
								name="description"
								placeholder="Project Description"
								value={newProject.description}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="input-container ic2">
							<select
								name="category"
								onChange={handleChange}
								value={newProject.category}
								className="input2"
							>
								<option value="">Select Category</option>
								{categories.map((category) => (
									<option key={category.id} value={category.name}>{category.name}</option>
								))}
							</select>
						</div>
						<div className="input-container ic2">
							<DatePicker
								selected={newProject.dueDate}
								onChange={handleDateChange}
								placeholderText="Expiration Date"
								dateFormat="dd/MM/yyyy"
								className="input2"
							/>
						</div>
						<div className="input-container ic2">
							<select
								name="status"
								id="status"
								value={newProject.status}
								onChange={handleChange}
								className="input2"
							>
								<option value="Pending">Pending</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>
						<div className="input-container ic2">
							<input
								type="file"
								name="attachments"
								onChange={handleAttachmentsChange}
								className="input2"
								multiple
							/>
						</div>
									<button className="submit2" type="submit">
										{projectToEdit ? "Save Changes" : "Add Project"}
									</button>
								</form>
							</div>
			)}
		<CardContainer>
				<Card>
					<CardTitle color="yellow">Pending</CardTitle>
					{searchResults.filter(project => project.status === "Pending").map((project, index) => (
						<Project
							key={index}
							name={project.name}
							description={project.description}
							category={project.category}
							creationDate={project.creationDate}
							dueDate={project.dueDate}
							status={project.status}
							attachments={project.attachments}
							handleEditProject={() => handleEditProject(project)}
							handleDeleteProject={() => handleDeleteProject(index)}
						/>
					))}
				</Card>
				<Card>
					<CardTitle color="blue">In Progress</CardTitle>
					{searchResults.filter(project => project.status === "In Progress").map((project, index) => (
						<Project
							key={index}
							name={project.name}
							description={project.description}
							category={project.category}
							creationDate={project.creationDate}
							dueDate={project.dueDate}
							status={project.status}
							attachments={project.attachments}
							handleEditProject={() => handleEditProject(project)}
							handleDeleteProject={() => handleDeleteProject(index)}
						/>
					))}
				</Card>
				<Card>
					<CardTitle color="green">Completed</CardTitle>
					{searchResults.filter(project => project.status === "Completed").map((project, index) => (
						<Project
							key={index}
							name={project.name}
							description={project.description}
							category={project.category}
							creationDate={project.creationDate}
							dueDate={project.dueDate}
							status={project.status}
							completionDate={project.completionDate}
							attachments={project.attachments}
							handleEditProject={() => handleEditProject(project)}
							handleDeleteProject={() => handleDeleteProject(index)}
						/>
					))}
				</Card>
			</CardContainer>
		</Hero>
	);
};

const CardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	flex-wrap: wrap;
`;

const Card = styled.div`
	background: rgba(255, 255, 255, 0.5); /* White background with 70% opacity */
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9); /* Slightly more pronounced shadow */
	margin: 10px;
	padding: 20px;
	flex: 1;
	min-width: 280px; /* Ensures cards are not too small */
	backdrop-filter: blur(100px); /* Optional: Adds a slight blur effect */
	border: 1px solid #fff;
`;

const CardTitle = styled.h3`
	font-family: 'Roboto', sans-serif;
	font-size: 1.5rem; /* Smaller size for the title */
	color: ${({ color }) => color || "#000"};
	margin-bottom: 15px;
	text-align: center;
	font-weight: 900; /* Make the title bold */
`;

export default ProjectsScreen;
