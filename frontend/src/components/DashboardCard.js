import React from "react";

const DashboardCard = ({ title, description, buttonText, onClick, color }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg w-64">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${
          color === "blue"
            ? "bg-blue-500 hover:bg-blue-600"
            : color === "green"
            ? "bg-green-500 hover:bg-green-600"
            : color === "yellow"
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;
