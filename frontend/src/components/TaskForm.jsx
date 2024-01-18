import React, { useEffect, useState } from "react";

const TaskForm = ({
  onAdd,
  updateFlag,
  onUpdate,
  taskDetail,
  hideTaskForm,
}) => {
  const [newTask, setNewTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTaskAction = () => {
    if (newTask.trim() !== "") {
      if (updateFlag) {
        onUpdate(taskDetail._id, {
          description: newTask,
          completed: isCompleted,
        });
        hideTaskForm();
      } else {
        onAdd({ description: newTask, completed: isCompleted });
      }
      setNewTask("");
      setIsCompleted(false); // Resetting the status
    }
  };

  useEffect(() => {
    if (updateFlag) {
      setNewTask(taskDetail.description);
      setIsCompleted(taskDetail.completed);
    }
  }, [updateFlag]);

  return (
    <div className="bg-light p-4 rounded shadow-md">
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          id="completedCheckbox"
        />
        <label className="form-check-label ml-2" htmlFor="completedCheckbox">
          Completed
        </label>
      </div>

      <button className="btn btn-primary" onClick={handleTaskAction}>
        {updateFlag ? "Update" : "Add Task"}
      </button>
    </div>
  );
};

export default TaskForm;
