import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import Modal from "../components/Modal";
import "./Dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const response = await api.post("/projects", projectData);
      setProjects([...projects, response.data]);
      setIsModalOpen(false);
      setFormError(null);
    } catch (err) {
      console.error("Error creating project:", err);
      setFormError(
        err.response?.data?.message ||
          "Failed to create project. Please try again."
      );
    }
  };

  const canCreateProject = projects.length < 4;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Projects</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          disabled={!canCreateProject}
          title={
            !canCreateProject
              ? "Maximum 4 projects allowed"
              : "Create new project"
          }
        >
          <FaPlus className="mr-2" />
          New Project
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <h2>No projects yet</h2>
            <p>Create your first project to get started.</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" />
              Create Project
            </button>
          </div>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card-wrapper">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormError(null);
        }}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          error={formError}
          setError={setFormError}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
