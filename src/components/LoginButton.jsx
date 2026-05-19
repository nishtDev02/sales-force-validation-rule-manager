import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SALESFORCE_CLIENT_ID;
    const callbackUrl = import.meta.env.VITE_SALESFORCE_CALLBACK_URL;
    const loginUrl = import.meta.env.VITE_SALESFORCE_LOGIN_URL;

    const authUrl = `${loginUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}`;

    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-lg transition duration-200 shadow-lg hover:shadow-blue-500/30"
    >
      🔗 Login with Salesforce
    </button>
  );
};

export default LoginButton;