import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    // No localStorage changes per request; just navigate back to the auth page
    navigate('/');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h2>
      <p className="mb-6">You are successfully authenticated.</p>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
