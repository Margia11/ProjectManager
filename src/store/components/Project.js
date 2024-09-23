import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { FaPencilAlt, FaClock, FaSpinner, FaCheckCircle} from "react-icons/fa";
import styled from "styled-components";

const Project = ({ name, description, category,  creationDate , dueDate, handleEditProject ,handleDeleteProject, status, completionDate, attachments}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#f1c40f",
          color: "black",
          icon: <FaClock />
        };
      case "In Progress":
        return {
          backgroundColor: "#3498db",
          color: "white",
          icon: <FaSpinner />
        };
      case "Completed":
        return {
          backgroundColor: "#2ecc71",
          color: "white",
          icon: <FaCheckCircle />
        };
      default:
        return {
          backgroundColor: "gray",
          color: "white",
          icon: null
        };
    }
  };

  const { backgroundColor, color, icon } = getStatusStyles();

  return (
    <Wrapper>
      <div className="card" style={{backgroundColor, color}}>
        <div className="card-content">
          <div className="card-header">
          <div className="status-icon">
              {icon}<span>{status}</span>
          </div>
          <span>{category}</span>
          </div>
          <h3 className="card-title">{name}</h3>
          <p className="card-description">{description}</p>
          {showDetails && (
			<div className="card-details">
				<li>Creation Date: {creationDate ? new Date(creationDate).toLocaleDateString() : "Date not available"}</li>
				<li>Expiration Date: {dueDate ? new Date(dueDate).toLocaleDateString() : "Date not selected"}</li>
				{completionDate && <li>Completion Date: {new Date(completionDate).toLocaleDateString()}</li>}
        {attachments && attachments.length > 0 && (
          <div className="attachments">
            <label>Attachments:</label>
            <li>
              {attachments.map((attachment, index) => (
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
              ))}
            </li>
          </div>
        )}
			</div>
			)}
        </div>
        <div className="button-group">
          <button className="details-btn" onClick={handleToggleDetails}>
            <IoIosArrowDown className="icon"/>
          </button>
          <button className="edit-btn" >
            <FaPencilAlt className="icon" onClick={handleEditProject}/>
          </button>
          <button className="delete-btn" onClick={handleDeleteProject}>
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
    width: calc(33% - 16px); /* 3 cards per row, adjust as needed */
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .status-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
  }

  .card-title {
    font-size: 1.2rem;
    margin: 0;
  }

  .card-description {
    font-size: 0.9rem;
    color: #666;
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

  .attachments {
    margin-top: 8px;
  }

  .attachments li {
    margin-bottom: 4px;
  }

  .delete-btn {
    color: 	#ff0000;
  }

  .icon {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    .card {
      width: calc(50% - 16px); /* 2 cards per row on smaller screens */
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%; /* 1 card per row on very small screens */
    }

  }
`;

export default Project;
