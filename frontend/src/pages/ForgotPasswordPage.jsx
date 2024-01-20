import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm";

const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAlert({
          type: "success",
          message: "Password reset email sent successfully",
        });
        // navigate('/login')
      } else {
        const responseData = await response.json();
        // console.error("An unexpected error occurred:", error);
        setAlert({
          type: "error",
          message:
            responseData.message || "Failed to send password reset email",
        });
      }
    } catch (e) {
      // console.error("An unexpected error occurred:", error);
      setAlert({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div className="card col-md-6">
          <div className="card-body">
            <h2 className="text-center mb-4">Forgot Password</h2>
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Reset Password
              </button>
            </form>
            <div className="mt-3">
              <Link to="/login">Go back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
