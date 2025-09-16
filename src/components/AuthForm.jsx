import React, { useState } from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';

const AuthForm = () => {
  // State for the username and password input fields.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // State to handle potential loading or error messages.
  const [messageUsername, setMessageUsername] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [messageEmail, setMessageEmail] = useState('');

  const [isRegistering, setIsRegistering] = useState(false);

  // Function to handle the registration logic.
  const handleRegister = (e) => {
    e.preventDefault();
    setMessageEmail('');
    setMessageUsername('');
    setMessagePassword('');
    if (!email) {
      setMessageEmail('Please enter an email.');
    }
    if (!username){
      setMessageUsername('Please enter a username.');
    }
    if (!password) {
      setMessagePassword('Please enter a password.');
    }
    // Placeholder for your registration API call.
    console.log('Attempting to registering with:', { username, password });
    return
  };

  // Function to handle the login logic.
  const handleLogin = (e) => {
    e.preventDefault();
    setMessageUsername('');
    setMessagePassword('');
    if (!username){
      setMessageUsername('Please enter a username.');
    }
    if (!password) {
      setMessagePassword('Please enter a password.');
    }
    // Placeholder for your login API call.
    console.log('Attempting to log in with:', { username, password });
    return
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        User Account
      </h1>
      
      <form className="space-y-4" onSubmit={
          (e) => {
            handleFormSubmit(e)
          }}>
        {isRegistering && <Input 
          label="Email" 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
          message={messageEmail}
        />}

        <Input 
          label="Username" 
          id="username" 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter your username"
          message={messageUsername}
        />

        <Input 
          label="Password" 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password"
          message={messagePassword}
        />

        <div className="pt-4 flex justify-center">
          <Button 
            type="submit"
            label={isRegistering ? 'Register' : 'Login'} 
          />
        </div>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isRegistering ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
