import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./UserForm";

const UpdateUserPage = ({ user, handleUpdateUser, formData, handleChange }) => {
  const [showUpdateForm, setUpdateForm] = useState(false);

  function hideUpdateForm() {
    setUpdateForm(false);
  }

  const navigate = useNavigate();

  useEffect(() => {
    // fetchUserData();
  }, []);

  return (
    <>
      {showUpdateForm ? (
        <UpdateForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdateUser}
          isUpdate={true}
          hideUpdateForm={hideUpdateForm}
          buttonText="Update"
        />
      ) : (
        <button
          onClick={() => setUpdateForm(!showUpdateForm)}
          className="btn btn-primary me-2"
        >
          Update User
        </button>
      )}
    </>
  );
};

export default UpdateUserPage;
