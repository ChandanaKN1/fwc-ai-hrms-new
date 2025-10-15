export default function DashboardCard({ title, description, buttonText, color, onClick }) {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-green-600 hover:bg-green-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      </div>
      <button
        onClick={onClick}
        className={`${colorClasses[color]} text-white font-semibold py-2 px-4 rounded transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
}
