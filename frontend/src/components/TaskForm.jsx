import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit, initialData, error, setError, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      let formattedDate = "";
      if (initialData.dueDate) {
        const date = new Date(initialData.dueDate);
        formattedDate = date.toISOString().split("T")[0];
      }

      setFormData({
        ...initialData,
        dueDate: formattedDate,
      });
    }
  }, [initialData]);

  const { title, description, status, priority, dueDate } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter task description"
          rows="2"
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={handleChange}
            className="form-control"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate" className="form-label">
          Due Date (optional)
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={dueDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Task" : "Create Task"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
