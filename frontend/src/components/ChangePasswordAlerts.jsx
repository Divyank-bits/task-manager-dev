import React from "react";

const Alerts = ({
  currentPasswordMatch,
  passwordsMatch,
  passwordLengthValid,
}) => {
  return (
    <>
      {currentPasswordMatch ? null : (
        <div className="alert alert-danger" role="alert">
          New Password should be different from current Password
        </div>
      )}
      {passwordsMatch ? null : (
        <div className="alert alert-danger" role="alert">
          New passwords did not match
        </div>
      )}
      {!passwordLengthValid ? (
        <div className="alert alert-danger" role="alert">
          Password should be at least 7 characters long
        </div>
      ) : null}
    </>
  );
};
export default Alerts;















// const [validation, setValidation] = useState({
//   currentPasswordMatch: true,
//   passwordsMatch: true,
//   passwordLengthValid: true,
//  })
