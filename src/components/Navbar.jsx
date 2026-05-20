import React from "react";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("sf_access_token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("sf_access_token");
    localStorage.removeItem("sf_instance_url");
    window.location.href = "/";
  };
  return (
    <nav className="bg-gray-900 border-b border-blue-500 px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="text-white text-lg sm:text-xl font-bold tracking-wide text-center sm:text-left">
            SF Rules Manager
            </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span className="text-gray-400 text-sm text-center">
                {isLoggedIn ? '🟢 Connected to Salesforce' : '🔴 Not Connected'}
            </span>
            {isLoggedIn && (
                <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition duration-200 w-full sm:w-auto"
                >
                    Logout
                </button>
            )}
        </div>
    </nav>
  );
};

export default Navbar;
