import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState(''); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', or 'reset'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'reset') {
      // Password reset flow
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
      if (!passwordRegex.test(newPassword)) {
        alert('New password must be at least 10 characters long, contain at least 1 alphabet, 1 number, and 1 special character.');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }

      try {
        // Reset password API call
        await axios.post('/api/reset-password', {
          userId,
          oldPassword,
          newPassword
        });

        // Send email confirmation
        await axios.post('/api/send-email', {
          to: 'user@example.com',
          subject: 'Password Reset Successful',
          body: 'Your password has been successfully reset.'
        });

        alert('Password reset successful. Check your email for confirmation.');
        resetForm();
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Failed to reset password. Please try again.');
      }
    } else if (mode === 'signup') {
      // Sign-up flow
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      try {
        const response = await axios.post('/api/signup', {
          userId,
          password
        });

        if (response.data.success) {
          alert('Signup successful!');
          // Optionally redirect or reset form
        } else {
          alert('Signup failed. Try a different username.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
      }
    } else {
      // Sign-in flow
      try {
        const response = await axios.post('/api/sign-in', {
          userId,
          password
        });

        if (response.data.success) {
          alert('Sign in successful!');
          // Redirect to a dashboard or another page if needed
        } else {
          alert('Sign in failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        alert('Sign in failed. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setUserId('');
    setPassword('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMode('signin'); // Default back to sign-in mode
  };

  const toggleMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  return (

    
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-10 pb-8 mb-4 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://inteliwaves.com/wp-content/uploads/2021/08/logo-vector.svg" alt="Logo" className="h-16" />
        </div>

        {mode === 'reset' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="userId">
                User ID
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="userId"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="oldPassword">
                Old Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="oldPassword"
                type="password"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="newPassword"
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-300"
                type="submit"
              >
                Reset Password
              </button>
              <button
                className="text-teal-500 font-medium hover:text-teal-600 focus:outline-none focus:text-teal-600 transition-colors duration-300"
                type="button"
                onClick={() => toggleMode('signin')}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : mode === 'signup' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="userId">
                Email
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="userId"
                type="text"
                placeholder="Enter Email ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-300"
                type="submit"
              >
                Sign Up
              </button>
              <button
                className="text-teal-500 font-medium hover:text-teal-600 focus:outline-none focus:text-teal-600 transition-colors duration-300"
                type="button"
                onClick={() => toggleMode('signin')}
              >
                Already have an account? Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="userId">
                User ID
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="userId"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-teal-500"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-300"
                type="submit"
              >
                Sign In
              </button>
              <button
                className="text-teal-500 font-medium hover:text-teal-600 focus:outline-none focus:text-teal-600 transition-colors duration-300"
                type="button"
                onClick={() => toggleMode('signup')}
              >
                Don't have an account? Sign Up
              </button>
              <button
                className="text-teal-500 font-medium hover:text-teal-600 focus:outline-none focus:text-teal-600 transition-colors duration-300"
                type="button"
                onClick={() => toggleMode('reset')}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
