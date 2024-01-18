import React,{useState} from "react";

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
  const [validationError,setValidationError] = useState({
    isEmailValid: true,
    isPasswordValid: true
  })

  const validationForm = ()=> {
    const error = {
      isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      isPasswordValid: formData.password.length>6
    }
    setValidationError(error);
    return Object.values(error).every((isValid)=>isValid)
  };

  const handleFormSubmit = (e)=> {
    e.preventDefault();
    if(validationForm()) {
      handleSubmit(e);
    }
    else {
      console.log('Validation Error')
    }
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address:
        </label>
        <input
          type="email"
          className={`form-control ${validationError.isEmailValid?'':'is-invalid'}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // required
        />
        {!validationError.isEmailValid && (
          <div className="invalid-feedback">Please enter a valid email address</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className={`form-control ${validationError.isPasswordValid?"":"is-invalid"}`}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          // required
        />
        {!validationError.isPasswordValid && (
            <div className="invalid-feedback">Password must be at least 7 characters.</div>
          )}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
