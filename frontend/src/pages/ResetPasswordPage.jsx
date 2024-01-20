import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassowrd: "",
  });
  const { email, token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { newPassword,confirmPassword } = formData;
    console.log(newPassword)
    try {
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, newPassword }),
      });
      if (response.ok) {
        setMessage("Password reset Successfully");
        setFormData({
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-6">
          <div className="card-body">
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            <ChangePasswordForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              forgotflag={false}
            />
            <div className="mt-3">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
