import React from 'react';
import TaskImage from '../assets/task-management-abstract-concept-illustration_335657-2127.avif'

const LandingPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1>Welcome to Your Task Manager</h1>
          <p>
            Organize your tasks efficiently with our Task Manager application.
            Stay on top of your work and boost productivity.
          </p>
          <a href="/signup" className="btn btn-primary">
            Get Started
          </a>
        </div>
        <div className="col-md-6">
          <img
            src={TaskImage}
            alt="Task Manager Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;




// <Tabs></Tabs>