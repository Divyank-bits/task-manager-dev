import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Error fetching profile data");
      }
    } catch (error) {
      console.error("Error during profile data fetch:", error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchProfileData();
      } else {
        console.error("Error adding task");
      }
    } catch (error) {
      console.error("Error during task addition:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Refresh tasks after deleting one
        fetchProfileData();
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error during task deletion:", error);
    }
  };
  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // Refresh tasks after deleting one
        fetchProfileData();
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error during task updation:", error);
    }
  };
  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("jwtToken");
        navigate('/login')
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error during user deletion:", error);
    }
  };
  const handleLogOutAll = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("JWT token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/logoutAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("jwtToken");
        navigate('/login')
      } else {
        console.error("Error Logging out");
      }
    } catch (error) {
      console.error("Error during Logging out:", error);
    }
  };

  return (
    <UserProfile
      userData={userData}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onUpdateTask={handleUpdateTask}
      onLogout={handleLogOut}
      onLogoutAll={handleLogOutAll}
    />
  );
};

export default ProfilePage;
