import React from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";

const UserProfile = ({
  userData,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onLogout,
  onLogoutAll,
}) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 rounded shadow">
        <h2 className="card-title text-center font-weight-bold mb-4">
          User Profile
        </h2>
        {userData ? (
          <div>
            <div className="mb-4">
              <p className="mb-2 h5">
                Name: <Link to="/user">{userData.user.name} </Link>
              </p>
              <p className="h6">Email: {userData.user.email}</p>
            </div>
            <div className="row">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <TaskList
                  tasks={userData.tasks}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <TaskForm onAdd={onAddTask} />
                </div>
                <div>
                  <button onClick={onLogout} className="btn btn-danger me-3">
                    Logout
                  </button>
                  <button onClick={onLogoutAll} className="btn btn-danger ">
                    Logout All
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
