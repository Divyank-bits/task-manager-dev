import ChangePasswordForm from "../components/ChangePasswordForm";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const NewPassword = (props) => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [signupStatus, setSignupStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const searchData = new URLSearchParams(location.search);
      const rawData = searchData.get("data");
      if (rawData) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(rawData));
          console.log(parsedData);
          setData(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.warn("No data found in the URL");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Handle form submission
      const { newPassword } = formData;
      const { name, email } = data;
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password: newPassword }),
      });
      if (response.ok) {
        setSignupStatus("success");
        console.log("Signup successful");
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        // if (errorData.success === false ) {
        //   //for email already exits
        //   setSignupStatus(`This mail already exits. Please try with different account`);
        // } 
        // else{
        setSignupStatus(`${errorData.error}`); 
      // }
        // }
        console.error("Signup failed", errorData);
      }
    } catch (error) {
      setSignupStatus("Error during signup");
      console.error("Error during signup:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-6">
          <div className="card-body">
            <h2 className="text-center mb-4">Set Password</h2>
            {signupStatus && (
              <div className="alert alert-danger" role="alert">
                {signupStatus}
              </div>
            )}
            <ChangePasswordForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              forgotflag={false}
            />
            <div className="mt-3">

              <Link to="/signup">Back to Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
