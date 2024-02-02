import React, { useEffect, useState } from "react";
import { auth, provider } from "../../../private/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function SignIn() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    try{
    // signInWithPopup(auth, provider).then((data) => {
    //   setValue(data.user.email);
    //   // localStorage.setItem("email", data.user.email);
    // });
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    console.log(email);
    // Update state and make API call
    // setValue(email);
    // console.log("Value is: "+ value)
    setValue(email, () => {
      console.log("Value is now: " + value);
  });
  
  const response = await fetch(`${apiUrl}/googlelogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:  JSON.stringify({ email }),
  });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("jwtToken", token);
      navigate("/profile");
    }
    }
    catch(error) {
      console.log(error)
    }
  };

  const handleSignUpGoogle = async (e)=> {
    try {
      const data = await signInWithPopup(auth,provider);
      const email= data.user.email;

      
    } catch(e) {

    }
  }

  useEffect(() => {
    // setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      {value ? (
        "/login"
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}

export default SignIn;
