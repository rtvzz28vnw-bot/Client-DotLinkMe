import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const OAuthSuccessWrapper = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const userStr = params.get("user");

    if (token && refreshToken && userStr) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userStr));

        // Updated: Pass both token and refreshToken
        login(token, refreshToken, parsedUser);

        // Redirect based on user role
        if (parsedUser.role === "user") {
          navigate("/dashboard");
        } else if (parsedUser.role === "business") {
          navigate("/business");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Failed to parse user data from URL:", err);
        navigate("/login");
      }
    } else {
      console.error("Missing required OAuth parameters");
      navigate("/login");
    }
  }, [search, login, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-white text-lg">Processing login...</p>
      </div>
    </div>
  );
};

export default OAuthSuccessWrapper;
