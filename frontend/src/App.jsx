// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDetails from "./pages/UserDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePasswordPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import GLogin from "./pages/GoogleSignIn"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:email/:token" element={<ResetPassword />} />
          <Route path="/glogin" element={<GLogin/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
