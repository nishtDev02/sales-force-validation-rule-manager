import React from "react";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("sf_access_token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("sf_access_token");
    localStorage.removeItem("sf_instance_url");
    window.location.href = "/";
  };
  return (
    <nav className="bg-gray-900 border-b border-blue-500 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="text-white text-xl font-bold tracking-wide">
            SF Rules Manager
            </span>
        </div>

        <div className="flex items-center gap-6">
            <span className="text-gray-400 text-sm">
                {isLoggedIn ? '🟢 Connected to Salesforce' : '🔴 Not Connected'}
            </span>
            {isLoggedIn && (
                <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition duration-200"
                >
                    Logout
                </button>
            )}
        </div>
    </nav>
  );
};

export default Navbar;
