import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthSuccess = ({ token, user }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      login(token, user); 
      navigate("/"); 
    }
  }, [token, user]); 

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
