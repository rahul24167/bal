import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button"


const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("balAuthToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = async() => {
    await localStorage.removeItem("balAuthToken")
    
    setIsAuthenticated(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
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
