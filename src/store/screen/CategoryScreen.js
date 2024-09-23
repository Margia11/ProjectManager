import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import useTitle from "../../useTitle";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Category from "../components/Category";
import { updateCategory, addCategory, deleteCategory } from "../notes/category.actions";
import styled from "styled-components";

const CategoryScreen = () => {
  useTitle("Categories");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.list);
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });

  useEffect(() => {
	executeSearch();
  }, [categories]);

  const handleSearchChange = (e) => {
	setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
	executeSearch();
  };

  const handleAddClick = () => {
	if (!categoryToEdit) {
	  setShowAddForm(!showAddForm);
	}
  };

  const handleChange = (e) => {
	setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleEditCategory = (category) => {
	setCategoryToEdit(category);
	setNewCategory(category);
	setShowAddForm(true);
  };

  const handleAddCategory = (e) => {
	e.preventDefault();
	const categoryWithId = {
	  ...newCategory,
	  id: categoryToEdit ? categoryToEdit.id : Date.now(),
	};

	if (categoryToEdit) {
	  dispatch(updateCategory(categoryWithId));
	} else {
	  dispatch(addCategory(categoryWithId));
	}

	setNewCategory({ name: "" });
	setShowAddForm(false);
	setCategoryToEdit(null);
  };

  const handleDeleteCategory = (id) => {
	dispatch(deleteCategory(id));
	setSearchResults(searchResults.filter(category => category.id !== id));
  };

  const executeSearch = () => {
	const results = categories.filter(
	  (category) => category.name.toLowerCase().includes(searchText.toLowerCase())
	);
	setSearchResults(results);
  };

  return (
	<Hero>
	  <br />
	  <div className="search-bar">
		<div className="form-container">
		  <form className="form">
			<label htmlFor="category">
			  <p>Search categories</p>
			</label>
			<div className="input-search">
			  <input
				id="category"
				className="input"
				value={searchText}
				onChange={handleSearchChange}
			  />
			  <button type="button" className="btn" onClick={handleSearchClick}>
				<FaSearch className="icon" />
			  </button>
			</div>
		  </form>
		</div>
	  </div>
	  <div className="add-category">
		{!categoryToEdit && (
		  <button className="btn" onClick={handleAddClick}>
			<CiCirclePlus className="icon" />
		  </button>
		)}
	  </div>
	  {showAddForm && (
		<div className="form2">
		  <form onSubmit={handleAddCategory}>
			<div className="subtitle2">
			  {categoryToEdit ? "EDIT CATEGORY" : "ADD CATEGORY"}
			</div>
			<div className="input-container ic1">
			  <input
				className="input2"
				type="text"
				name="name"
				placeholder="Category Name"
				value={newCategory.name}
				onChange={handleChange}
				required
			  />
			</div>
			<button className="submit2" type="submit">
			  {categoryToEdit ? "Save Changes" : "Add Category"}
			</button>
		  </form>
		</div>
	  )}
	  <CardContainer>
		{searchResults.map((category) => (
		  <Category
			key={category.id}
			name={category.name}
			handleEditCategory={() => handleEditCategory(category)}
			handleDeleteCategory={() => handleDeleteCategory(category.id)}
		  />
		))}
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

export default CategoryScreen;
