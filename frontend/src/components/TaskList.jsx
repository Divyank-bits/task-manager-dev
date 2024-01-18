import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="container mt-4">
      <div className="card p-4 rounded shadow">
        <h3 className="card-title text-lg font-semibold mb-4">Tasks:</h3>
        <div className="row">
          {tasks.map((task) => (
            <div key={task._id} className="col-lg-4 mb-3">
              <Task task={task} onDelete={onDelete} onUpdate={onUpdate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
