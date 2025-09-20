// src/components/AuthForm.jsx
import React, { useState } from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { authApi } from '../services/authApi.js';

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isRegistering && !formData.email) {
      newErrors.email = 'Please enter an email.';
    }
    if (!formData.username) {
      newErrors.username = 'Please enter a username.';
    }
    if (!formData.password) {
      newErrors.password = 'Please enter a password.';
    }
    if (isRegistering && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = isRegistering
        ? await authApi.register(formData)
        : await authApi.login(formData);
      
      // Handle successful authentication (e.g., store token, redirect)
      console.log('isRegistering:', isRegistering);
      console.log('Auth successful:', data);
      
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        User Account
      </h1>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isRegistering && (
          <Input 
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="Enter your email"
            error={errors.email}
          />
        )}

        <Input 
          label="Username"
          type="text"
          value={formData.username}
          onChange={handleInputChange('username')}
          placeholder="Enter your username"
          error={errors.username}
        />

        <Input 
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter your password"
          error={errors.password}
          showPasswordToggle={true}
        />

        {errors.general && (
          <div className="text-red-500 text-sm text-center">
            {errors.general}
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <Button 
            type="submit"
            label={isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
            disabled={isLoading}
          />
        </div>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrors({});
          }}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isRegistering ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;