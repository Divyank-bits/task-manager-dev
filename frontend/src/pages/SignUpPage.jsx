import React, { useState } from "react";
import SignupForm from "../components/UserForm";
import { useNavigate, Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
  });
  const [signupStatus, setSignupStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSignupStatus('success');
        console.log("Signup successful");
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.log( errorData);
        if (errorData.success === false) {
          //for email already exits
          setSignupStatus(`${errorData.error}`);
        } //else {
        //   //other error
        //   setSignupStatus(`${errorData.error}`);
        // }
        console.error("Signup failed", errorData);
      }
    } catch (error) {
      setSignupStatus("Error during signup");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h2 className="text-center">Signup</h2>
            </div>
            <div className="card-body">
              {signupStatus && (
                <div className="alert alert-danger" role="alert">
                  {signupStatus}
                </div>
              )}
              <SignupForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isUpdate={false}
                buttonText="Signup"
              />
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Existing User?{" "}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
