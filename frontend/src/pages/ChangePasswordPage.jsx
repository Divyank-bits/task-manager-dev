import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Alerts from "../components/ChangePasswordAlerts";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable
  const [currentPasswordMatch, setCurrentPasswordMatch] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // Reset passwordsMatch state when the user types
    setPasswordsMatch(true);
    setCurrentPasswordMatch(true);
    setPasswordLengthValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const { currentPassword, newPassword, confirmPassword } = formData;
    
    // Add validation if needed for matching passwords
    if (currentPassword === newPassword) {
      setCurrentPasswordMatch(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    if (newPassword.length < 7 || currentPassword.length < 7) {
      setPasswordLengthValid(false);
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT Token Expired");
        return;
      }

      const response = await fetch(
        `${apiUrl}/profile/changepassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      if (response.ok) {
        alert("Password Changed Successfully");
        navigate("/login");
      } else {
        const responseData = await response.json();
        console.error("Password change failed:", responseData.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Change Password</h2>
                <Alerts
                  currentPasswordMatch={currentPasswordMatch}
                  passwordsMatch={passwordsMatch}
                  passwordLengthValid={passwordLengthValid}
                />
                <ChangePasswordForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  forgotflag={true}
                />
                <Link to="/profile" className="btn btn-link mt-2">
                  Go back to Profile Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;