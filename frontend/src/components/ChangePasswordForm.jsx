import React, { useState } from "react";

const ChangePasswordForm = ({
  formData,
  handleSubmit,
  handleChange,
  forgotflag,
}) => {
  const [validationError, setValidationError] = useState({
    isCurrentPasswordValid: true,
    isNewPasswordDifferent: true,
    isNewPasswordLengthValid: true,
    isConfirmPasswordValid: true,
  });

  const validationForm = () => {
    const error = {
      isCurrentPasswordValid: !forgotflag || (formData.currentPassword.length > 6),
      isNewPasswordDifferent: formData.currentPassword !== formData.newPassword,
      isNewPasswordLengthValid: formData.newPassword.length >= 7,
      isConfirmPasswordValid: formData.newPassword === formData.confirmPassword,
    };

    setValidationError(error);
    return Object.values(error).every((isValid) => isValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      handleSubmit(e);
    } else {
      console.log('Validation Error');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {forgotflag && (
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password:
          </label>
          <input
            type="password"
            className={`form-control ${validationError.isCurrentPasswordValid ? '' : 'is-invalid'}`}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          {!validationError.isCurrentPasswordValid && (
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
          className={`form-control ${
            validationError.isNewPasswordDifferent && validationError.isNewPasswordLengthValid
              ? ''
              : 'is-invalid'
          }`}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        {!validationError.isNewPasswordDifferent && (
          <div className="invalid-feedback">New Password should be different from Old Password</div>
        )}
        {!validationError.isNewPasswordLengthValid && (
          <div className="invalid-feedback">Password length should be minimum 7</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm New Password:
        </label>
        <input
          type="password"
          className={`form-control ${validationError.isConfirmPasswordValid ? '' : 'is-invalid'}`}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {!validationError.isConfirmPasswordValid && (
          <div className="invalid-feedback">Both Passwords should match</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
