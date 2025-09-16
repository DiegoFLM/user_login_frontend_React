import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder for API call
    console.log('Registering user with:', { name, email, password });

    // You would replace this with a real API call to your backend
    try {
      // Example of a fake success response
      const response = await new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
      
      if (response.success) {
        setMessage('Registration successful!');
        // Clear the form after successful submission
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
      {message && (
        <p className="text-sm text-center text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default RegisterForm;
