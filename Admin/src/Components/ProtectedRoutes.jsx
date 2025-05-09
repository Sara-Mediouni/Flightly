import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin") 
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    if (!token) {
      setIsRedirecting(true); 
      setTimeout(() => {
        setIsRedirecting(false); 
      }, 2000); 
    }
  }, [token]);

 

  if (!token) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;
