import { BACKEND_URL } from "@/config";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("balAuthToken");
  if(token) {
    setIsAuthenticated(true);
  }
  
  const handleLogout = async() => {
    await localStorage.removeItem("balAuthToken")
    
    setIsAuthenticated(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <NavLink
            className="text-sm font-medium hover:underline underline-offset-4"
            to="signup"
          >
            SignUp
          </NavLink>
          <NavLink
            className="text-sm font-medium hover:underline underline-offset-4"
            to="signin"
          >
            SignIn
          </NavLink>
        </>
      )}
    </>
  );
};

export default Auth;
