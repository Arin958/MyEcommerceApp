import React from "react";
import { FaMale, FaFemale, FaGenderless } from "react-icons/fa";

const genderOptions = [
  { label: "Men", icon: <FaMale />, color: "text-blue-500" },
  { label: "Women", icon: <FaFemale />, color: "text-pink-500" },
  { label: "Unisex", icon: <FaGenderless />, color: "text-purple-500" },
];

const GenderSideBar = ({ selectedGenders, setSelectedGenders }) => {
  const handleSelect = (gender) => {
    if (selectedGenders[0] === gender) {
      // Deselect if the same gender is clicked again
      setSelectedGenders([]);
    } else {
      // Select only one gender
      setSelectedGenders([gender]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Gender
      </h3>
      <ul className="space-y-2">
        {genderOptions.map(({ label, icon, color }) => (
          <li key={label}>
            <div
              onClick={() => handleSelect(label)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  selectedGenders.includes(label)
                    ? "bg-indigo-50 border border-indigo-100"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  selectedGenders.includes(label)
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-500"
                } ${color}`}
              >
                {icon}
              </div>
              <label
                htmlFor={label}
                className={`cursor-pointer flex-1 ${
                  selectedGenders.includes(label)
                    ? "font-medium text-gray-900"
                    : "text-gray-600"
                }`}
              >
                {label}
              </label>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedGenders.includes(label)
                    ? "bg-indigo-500 border-indigo-500"
                    : "border-gray-300"
                }`}
              >
                {selectedGenders.includes(label) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenderSideBar;
