import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateUser from "../components/UpdateUser";

const UserDetailsPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`http://localhost:3000/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setFormData({
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          age: data.user.age,
        })
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during user data fetch:", error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      console.log("update frot");
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`http://localhost:3000/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...formData,
        }));
        fetchUserData();
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error during user update:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`http://localhost:3000/profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Clear the JWT token
        localStorage.removeItem("jwtToken");
        navigate("/login");
      } else {
        console.error("Error during user deletion");
      }
    } catch (error) {
      console.error("Error during user deletion:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 rounded shadow-md">
            <h2 className="card-title text-2xl font-weight-bold mb-4">
              User Details
            </h2>
            {userData ? (
              <div>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Age: {userData.age}</p>

                {/* Update User Button */}
                <UpdateUser
                  handleUpdateUser={handleUpdateUser}
                  user={userData}
                  handleChange={handleChange}
                  formData={formData}
                />

                {/* Delete User Button */}
                <button
                  onClick={handleDeleteUser}
                  className="btn btn-danger p-2 rounded-md hover:bg-red-600 "
                >
                  Delete User
                </button>
                <p>
                  <Link to={"/profile"}>Go to Profile Page</Link>
                </p>
                <p>
                  <Link to={"/password"}> Change Password</Link>
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;