import React, { useState } from "react";
import TaskForm from "./TaskForm";

const Task = ({ task, onDelete, onUpdate }) => {
  const [showUpdateForm, setUpdateForm] = useState(false);

  function hideTaskForm() {
    setUpdateForm(false);
  }

  return (
    <>
      {showUpdateForm ? (
        <TaskForm
          updateFlag={true}
          onUpdate={onUpdate}
          taskDetail={task}
          hideTaskForm={hideTaskForm}
        />
      ) : (
        <div className="card bg-light p-2 mb-4 rounded shadow">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p
              className="text-lg font-weight-bold text-truncate"
              style={{ maxWidth: 100 }}
            >
              {task.description}
            </p>
            <p className={task.completed ? "text-success" : "text-danger"}>
              {task.completed ? "Done" : "Pending"}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger px-2 py-1 rounded btn-sm"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-primary px-2 py-1 rounded ms-1 btn-sm"
              onClick={() => setUpdateForm(!showUpdateForm)}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
