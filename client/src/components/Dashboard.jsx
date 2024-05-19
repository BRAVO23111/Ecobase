import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    actions: [],
    actionSummary: {},
  });
  const [totalActionTime, setTotalActionTime] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "https://ecobase-1.onrender.com/ecoAction/dashboard",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setDashboardData(response.data);

        let total = 0;
        const actions = response.data.actions;
        actions.forEach((action) => {
          const time = parseFloat(action.time);
          if (!isNaN(time)) {
            total += time;
          } else {
            console.error(`Invalid time value for action:`, action);
          }
        });

        setTotalActionTime(total);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 rounded-lg shadow-lg w-full">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center text-green-700">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-600">Action Type Summary</h2>
          <ul>
            {Object.entries(dashboardData.actionSummary).map(
              ([actionType, count]) => (
                <li key={actionType} className="mb-2">
                  <strong className="mr-2 text-green-700">{actionType}:</strong>
                  {count}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-600">Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 md:py-3 px-4 md:px-6 border-b-2 border-gray-300">Action Type</th>
                  <th className="py-2 md:py-3 px-4 md:px-6 border-b-2 border-gray-300">Description</th>
                  <th className="py-2 md:py-3 px-4 md:px-6 border-b-2 border-gray-300">Date</th>
                  <th className="py-2 md:py-3 px-4 md:px-6 border-b-2 border-gray-300">Time (minutes)</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.actions.map((action, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 md:py-3 px-4 md:px-6 border-b">{action.actionType}</td>
                    <td className="py-2 md:py-3 px-4 md:px-6 border-b">{action.description}</td>
                    <td className="py-2 md:py-3 px-4 md:px-6 border-b">
                      {new Date(action.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 md:py-3 px-4 md:px-6 border-b">{action.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-10 bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-600">Total Action Time</h2>
        <p className="text-2xl md:text-3xl text-gray-700">{totalActionTime} minutes</p>
        {totalActionTime > 300 && (
          <p className="text-green-700 text-lg md:text-xl font-bold mt-4">Today's goal complete!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
