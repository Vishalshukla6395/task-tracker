import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const { _id, title, description, color, createdAt } = project;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link
      to={`/projects/${_id}`}
      className="project-card"
      style={{ borderTopColor: color }}
    >
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        <div className="project-card-footer">
          <div className="project-card-date">
            <FaRegClock className="project-card-icon" />
            <span>Created {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
