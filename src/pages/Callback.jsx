import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    // const codeVerifier = localStorage.getItem('sf_code_verifier')

    if (!code) {
      setError("No Code Found in URL");
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await axios.post("https://sales-force-validation-rule-manager.onrender.com/auth/token", {
          code: code,
        });

        localStorage.setItem("sf_access_token", response.data.access_token);
        localStorage.setItem("sf_instance_url", response.data.instance_url);

        // navigate('/dashboard');
        window.location.href = "/dashboard";
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };

    fetchToken();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="bg-red-900/40 border border-red-500 text-red-300 px-6 py-4 rounded-xl">
            ⚠️ {error}
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Logging you in...</p>
            <p className="text-gray-400 text-sm mt-1">
              Connecting to Salesforce
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Callback;
