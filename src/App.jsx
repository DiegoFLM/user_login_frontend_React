import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
