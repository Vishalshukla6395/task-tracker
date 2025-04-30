import React, { useState } from "react";
import "./ProjectForm.css";

const PROJECT_COLORS = [
  "#3563E9",
  "#8265EA",
  "#F04438",
  "#12B76A",
  "#F79009",
  "#6172F3",
  "#FF66C2",
  "#11B886",
];

const ProjectForm = ({ onSubmit, initialData, error, setError }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    color: initialData?.color || PROJECT_COLORS[0],
  });

  const { title, description, color } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error) setError(null);
  };

  const handleColorSelect = (selectedColor) => {
    setFormData({ ...formData, color: selectedColor });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Project title is required");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter project title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter project description"
          rows="3"
        ></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">Project Color</label>
        <div className="color-picker">
          {PROJECT_COLORS.map((colorOption) => (
            <div
              key={colorOption}
              className={`color-option ${
                color === colorOption ? "selected" : ""
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => handleColorSelect(colorOption)}
            ></div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
