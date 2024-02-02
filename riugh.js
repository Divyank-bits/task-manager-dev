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
