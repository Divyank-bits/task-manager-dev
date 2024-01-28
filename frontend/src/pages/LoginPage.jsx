import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { GoogleLogin } from "react-google-login";
// import googleConfig from "../../../backend/src/private/google-config";

const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(null); // New state for login status
  const navigate = useNavigate();
  // console.log("API Base URL:", import.meta.env.VITE_REACT_APP_API_BASE_URL);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);
        navigate("/profile");
      } else {
        console.error("Login Failed");
        setLoginStatus("Incorrect credentials"); // Set the login status for error message
      }
    } catch (error) {
      console.error("Error during Login", error);
      setLoginStatus("Error during login"); // Set the login status for error message
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      const googleResponse = await fetch(`${apiUrl} `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleToken: response.tokenId }),
      });

      if (googleResponse.ok) {
        console.log("Google login successful");
        const data = await googleResponse.json();
        localStorage.setItem("jwtToken", data.token);
        navigate("/profile");
      } else {
        console.error("Google Login Failed");
        setLoginStatus("Google login failed");
      }
    } catch (error) {
      console.error("Error during Google Login", error);
      setLoginStatus("Error during Google login");
    }
  };
  // console.log(`${apiUrl}/login`)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              {loginStatus && (
                <div className="alert alert-danger" role="alert">
                  {loginStatus}
                </div>
              )}
              <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
              <GoogleLogin
                clientId=""
                buttonText="Login with Google"
                onSuccess={handleGoogleResponse}
                onFailure={handleGoogleResponse}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                New User?{" "}
                <Link to="/signup" className="text-primary">
                  Sign up here
                </Link>{" "}
                |{" "}
                <Link to="/forgot-password" className="text-primary">
                  Forgot Password?
                </Link>
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
