import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Users</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Users</span>
              <span className="font-bold">0</span>
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Manage Users
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Courses</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Batches</span>
              <span className="font-bold">0</span>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                Create Course
              </button>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Manage Batches
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Educator Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Educators</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Classes</span>
              <span className="font-bold">0</span>
            </div>
            <div className="mt-4">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                Manage Educators
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;