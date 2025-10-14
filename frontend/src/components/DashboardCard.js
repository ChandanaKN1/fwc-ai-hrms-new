import React from "react";

export default function DashboardCard({
  title,
  description,
  buttonText,
  color = "blue",
  onClick,
}) {
  const btn = {
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  }[color];

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-md h-full min-h-[220px] flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {/* Bottom Button */}
      <button
        onClick={onClick}
        className={`mt-4 w-full px-4 py-2 rounded font-medium text-white text-center ${btn}`}
      >
        {buttonText}
      </button>
    </div>
  );
}
