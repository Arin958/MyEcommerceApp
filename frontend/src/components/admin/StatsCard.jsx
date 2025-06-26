// src/components/admin/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, change, icon, trend }) => {
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  const trendIcon = trend === "up" ? (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12 13a1 1 0 100-2H9v-1h2a1 1 0 100-2H9V7a1 1 0 112 0v1h2a1 1 0 010 2h-2v1h2a1 1 0 010 2h-2v1a1 1 0 11-2 0v-1H5a1 1 0 010-2h2v-1H5a1 1 0 010-2h2V8a1 1 0 10-2 0v1H1a1 1 0 000 2h2v1H1a1 1 0 000 2h2v1a1 1 0 102 0v-1h2a1 1 0 010 2H5v1a1 1 0 102 0v-1h2a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-md bg-indigo-500 text-white flex items-center justify-center">
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className={`font-medium ${trendColor}`}>
            {trendIcon} {change}
          </span>{" "}
          <span className="text-gray-500">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;