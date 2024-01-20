import React, { useState } from "react";

const ChangePasswordForm = ({
  formData,
  handleSubmit,
  handleChange,
  forgotflag,
}) => {
  const [validationError, setValidationError] = useState({
    isCurrentPasswaordValid: true,
    isNewPasswordValid: true,
    isConfirmPasswordValid: true,
  });
  
  const validationForm = ()=> {
    const error = {
      isCurrentPasswaordValid: formData.currentPassword.length>6,
      isNewPasswordValid:  (formData.currentPassword!==formData.newPassword),
      isConfirmPasswordValid:  (formData.newPassword===formData.confirmPassword),
      isLengthValid: formData.newPassword.length>6 
    }
    setValidationError(error);
    return Object.values(error).every((isValid)=>isValid)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {forgotflag && (
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password:
          </label>
          <input
            type="password"
            className={`form-control ${validationError.isCurrentPasswaordValid?'':'is-invalid'} `}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          {!validationError.isCurrentPasswaordValid && (
          <div className="invalid-feedback">Current Password is invalid</div>
        )}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          New Password:
        </label>
        <input
          type="password"
          className={`form-control ${validationError.isNewPasswordValid || validationError.isLengthValid ?'':'is-invalid'} `}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        {!validationError.isNewPasswordValid && (
          <div className="invalid-feedback"> New Password should be different from Old Password</div>
        )}
        {!validationError.isLengthValid && (
          <div className="invalid-feedback">Password length should be minimum 7 </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm New Password:
        </label>
        <input
          type="password"
          className={`form-control ${validationError.isConfirmPasswordValid?'':'is-invalid'} `}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {!validationError.isConfirmPasswordValid && (
          <div className="invalid-feedback"> Both Password should be same</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
