const handleGoogleResponse = async (response) => {
  try {
    const googleResponse = await fetch(`${apiUrl} `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ googleToken: response.tokenId }),
    });

    if (googleResponse.ok) {
      console.log("Google login successful");
      const data = await googleResponse.json();
      localStorage.setItem("jwtToken", data.token);
      navigate("/profile");
    } else {
      console.error("Google Login Failed");
      setLoginStatus("Google login failed");
    }
  } catch (error) {
    console.error("Error during Google Login", error);
    setLoginStatus("Error during Google login");
  }
};


New Password Page

import ChangePasswordForm from "../components/ChangePasswordForm";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';


const NewPassword =  (props)=> {
  const [data,setData] = useState()
// const {name,email}= props.match.params
const location = useLocation();
// // const searchParams = new URLSearchParams(props.location.search);
// const searchParams = new URLSearchParams(location.search);
// const name = searchParams.get('name');
// const email = searchParams.get('email');
  useEffect(() => {
    
    // const searchData = new URLSearchParams(location.search);
    // data = searchData.get('data');

    // if (data) {
    //   try {
    //     const data = JSON.parse(decodeURIComponent(data));
    //     console.log(data);
    //   } catch (error) {
    //     console.error('Error parsing JSON:', error);
    //   }
    // } else {
    //   console.warn('No data found in the URL');
    // }
    const searchData = new URLSearchParams(location.search);
    const data = JSON.parse(decodeURIComponent(searchData.get('data')));
    console.log(data);
    setData(data);
  }, [location.search]);

  console.log(data);
  return (
    <div className="container">
      {/* <ChangePasswordForm/> */}

      <div>Hi</div>
      {/* data ? (
    // Use parsed data in the component
  ) : (
    <div>No data found in the URL.</div>
  ) */}
    {/* {data.name }{data.email} */}
    </div>
  )
}
export default NewPassword;
