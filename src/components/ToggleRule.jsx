import React from "react";

const ToggleRule = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
        isActive
          ? "bg-green-600 hover:bg-red-600 text-white"
          : "bg-red-600 hover:bg-green-600 text-white"
      }`}
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
};

export default ToggleRule;
