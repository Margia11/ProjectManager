import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";

const Category = ({ name, handleEditCategory, handleDeleteCategory}) => {
	console.log("Category Props:", name);
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <Wrapper>
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">{name}</h3>
        </div>
        <div className="button-group">
          <button className="edit-btn" onClick={handleEditCategory}>
            <FaPencilAlt className="icon"/>
          </button>
          <button className="delete-btn" onClick={handleDeleteCategory}>
            <CiCircleMinus className="icon"/>
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(33% - 16px);
    min-width: 250px;
    max-width: 350px;
    border: 3px solid #fff;
    width: 96%;
    margin-bottom: 16px;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-title {
    font-size: 1.2rem;
    margin: 0;
  }

  .card-details {
    margin-top: 8px;
    font-size: 0.8rem;
    color: #333;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .details-btn, .delete-btn , .edit-btn{
    background: none;
    border: none;
    cursor: pointer;
  }

  .details-btn {
    color: #007bff;
  }

  .delete-btn {
    color: #ff0000;
  }

  .icon {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    .card {
      width: calc(50% - 16px);
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%;
    }
  }
`;

export default Category;
