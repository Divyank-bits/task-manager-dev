import React, {useState} from "react";

const SignupForm = ({
  formData,
  handleChange,
  handleSubmit,
  isUpdate,
  buttonText,
  hideUpdateForm,
}) => {
  // console.log(handleSubmit)
  const [validationError,setValidationError] = useState({
    isNameValid:true,
    isEmailValid: true,
    isPasswordValid: true,
    isAgeValid:true
  })

  const validateForm = ()=> {
    const error = {
      isNameValid: formData.name.trim() !=="",
      isEmailValid: isUpdate ||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      isPasswordValid: isUpdate || formData.password.length>=6,
      isAgeValid: formData.age>0
    }
    setValidationError(error);
    return Object.values(error).every((isValid)=> isValid);
  };

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    if(validateForm()) {
      if(isUpdate)
        hideUpdateForm();
      handleSubmit(e);
    }
    
    else{
      console.log('Validation Failed')
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label" >
          Name:
        </label>
        <input
          type="text"
          className={`form-control ${validationError.isNameValid?"":"is-invalid"}`}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          // required
        />
        {!validationError.isNameValid && (
          <div className="invalid-feedback"> Name cannot be empty</div>
        )}
      </div>
      {!isUpdate && (
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >
            Email address:
          </label>
          <input
            type="email"
            className={`form-control ${validationError.isEmailValid?"":"is-invalid"}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // required
          />
          {!validationError.isEmailValid && (
          <div className="invalid-feedback"> Please enter a valid email address</div>
        )}
        </div>
      )}
      
      {!isUpdate && (
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
      )}
      <div className="mb-3">
        <label htmlFor="age"className="form-label" >
          Age:
        </label>
        <input
          type="number"
          className={`form-control ${validationError.isAgeValid?"":"is-invalid"}`}
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          // required
        />
        {!validationError.isAgeValid && (
          <div className="invalid-feedback"> Age should be greater than 0.</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-2">
        {buttonText}
      </button>
    </form>
  );
};

export default SignupForm;
