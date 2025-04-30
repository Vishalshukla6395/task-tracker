import React, { useState } from 'react';
import { FaCheck, FaEdit, FaTrash, FaRegClock } from 'react-icons/fa';
import './TaskItem.css';

const TaskItem = ({ task, onStatusChange, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'todo': return 'status-todo';
      default: return '';
    }
  };

  const handleStatusToggle = () => {
    let newStatus;
    if (task.status === 'todo') {
      newStatus = 'in-progress';
    } else if (task.status === 'in-progress') {
      newStatus = 'completed';
    } else {
      newStatus = 'todo';
    }
    onStatusChange(task._id, { ...task, status: newStatus });
  };

  return (
    <div 
      className={`task-item ${getStatusClass(task.status)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="task-checkbox" onClick={handleStatusToggle}>
        {task.status === 'completed' && <FaCheck className="task-check-icon" />}
      </div>
      
      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        
        <div className="task-meta">
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          
          {task.dueDate && (
            <span className="task-due-date">
              <FaRegClock className="task-icon" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      
      <div className={`task-actions ${isHovered ? 'visible' : ''}`}>
        <button 
          className="task-action-btn edit"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <FaEdit />
        </button>
        <button 
          className="task-action-btn delete"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;