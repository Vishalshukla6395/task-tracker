import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import api from "../services/api";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import ProjectForm from "../components/ProjectForm";
import Modal from "../components/Modal";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await api.get(`/projects/${projectId}`);
        setProject(projectResponse.data);

        const tasksResponse = await api.get(`/projects/${projectId}/tasks`);
        setTasks(tasksResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to load project. Please try again.");
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post(`/projects/${projectId}/tasks`, taskData);
      setTasks([...tasks, response.data]);
      setIsTaskModalOpen(false);
      setFormError(null);
    } catch (err) {
      console.error("Error creating task:", err);
      setFormError(
        err.response?.data?.message ||
          "Failed to create task. Please try again."
      );
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(
        `/projects/${projectId}/tasks/${taskData._id}`,
        taskData
      );
      setTasks(
        tasks.map((task) =>
          task._id === response.data._id ? response.data : task
        )
      );
      setIsTaskModalOpen(false);
      setCurrentTask(null);
      setFormError(null);
    } catch (err) {
      console.error("Error updating task:", err);
      setFormError(
        err.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    }
  };

  const handleTaskStatusChange = async (taskId, updatedTask) => {
    try {
      const response = await api.put(
        `/projects/${projectId}/tasks/${taskId}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) =>
          task._id === response.data._id ? response.data : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
      setError("Failed to update task status. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      setProject(response.data);
      setIsProjectModalOpen(false);
      setFormError(null);
    } catch (err) {
      console.error("Error updating project:", err);
      setFormError(
        err.response?.data?.message ||
          "Failed to update project. Please try again."
      );
    }
  };

  const handleDeleteProject = async () => {
    try {
      await api.delete(`/projects/${projectId}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">Project not found</div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail fade-in">
      <div
        className="project-detail-header"
        style={{ borderBottomColor: project.color }}
      >
        <button
          className="btn btn-secondary back-button"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="project-title-container">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setIsProjectModalOpen(true)}
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="task-container">
        <div className="task-header">
          <h2 className="task-section-title">Tasks</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentTask(null);
              setIsTaskModalOpen(true);
            }}
          >
            <FaPlus className="mr-2" />
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <h3>No tasks yet</h3>
              <p>Create your first task to get started.</p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => {
                  setCurrentTask(null);
                  setIsTaskModalOpen(true);
                }}
              >
                <FaPlus className="mr-2" />
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="task-sections">
            <div className="task-section">
              <h3 className="task-status-heading">
                To Do <span className="task-count">{todoTasks.length}</span>
              </h3>
              <div className="task-list">
                {todoTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onStatusChange={handleTaskStatusChange}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>

            <div className="task-section">
              <h3 className="task-status-heading">
                In Progress{" "}
                <span className="task-count">{inProgressTasks.length}</span>
              </h3>
              <div className="task-list">
                {inProgressTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onStatusChange={handleTaskStatusChange}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>

            <div className="task-section">
              <h3 className="task-status-heading">
                Completed{" "}
                <span className="task-count">{completedTasks.length}</span>
              </h3>
              <div className="task-list">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onStatusChange={handleTaskStatusChange}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setCurrentTask(null);
          setFormError(null);
        }}
        title={currentTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
          initialData={currentTask}
          error={formError}
          setError={setFormError}
        />
      </Modal>

      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setFormError(null);
        }}
        title="Edit Project"
      >
        <ProjectForm
          onSubmit={handleUpdateProject}
          initialData={project}
          error={formError}
          setError={setFormError}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Project"
      >
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </p>
          <p>All tasks associated with this project will also be deleted.</p>

          <div className="delete-confirmation-buttons">
            <button className="btn btn-danger" onClick={handleDeleteProject}>
              Delete Project
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
