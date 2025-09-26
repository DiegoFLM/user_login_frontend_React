import React, { useState } from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { authApi } from '../services/authApi.js';
import { 
  validateLogin, 
  validateRegister, 
  getErrorMessage 
} from '../validation/authSchemas.js';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
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
    const validation = isRegistering 
      ? validateRegister(formData)
      : validateLogin(formData);
    
    if (!validation.success) {
      const newErrors = {};
      // Corrected: use validation.error.issues instead of validation.error.errors
      validation.error.issues.forEach(issue => {
        const field = issue.path[0];
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // For login, only send username and password
      const payload = isRegistering 
        ? formData 
        : { username: formData.username, password: formData.password };
      
      const data = isRegistering
        ? await authApi.register(payload)
        : await authApi.login(payload);
      
      // Handle successful authentication (e.g., store token, redirect)
      // Explicit console output so it's obvious in the browser console
      console.log('Auth successful (backend response):', data);
      // Navigate to dashboard after successful auth
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    // Clear email field when switching to login mode
    if (!isRegistering) {
      setFormData(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isRegistering ? 'Create Account' : 'Login'}
      </h1>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isRegistering && (
          <Input 
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            placeholder="Enter your email"
          />
        )}

        <Input 
          label="Username"
          type="text"
          value={formData.username}
          onChange={handleInputChange('username')}
          error={errors.username}
          placeholder="Enter your username"
        />

        <Input 
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          placeholder="Enter your password"
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
          onClick={toggleMode}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isRegistering ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;