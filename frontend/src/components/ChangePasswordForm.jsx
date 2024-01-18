import React, {useState}from "react";


const ChangePasswordForm = ({formData, handleSubmit, handleChange}) => {

  const [validationError,seValidationError]= useState( {
    isCurrentPasswaordValid:true,
    isNewPasswordValid:true,
    isConfirmPasswordValid:true
  })
  const handleFormSubmit = ()=> {
    
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="currentPassword" className="form-label">
          Current Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          New Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm New Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;

