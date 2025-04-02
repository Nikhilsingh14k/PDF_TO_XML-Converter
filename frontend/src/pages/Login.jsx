import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg sm:p-10 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {state === 'sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {state === 'sign Up' ? 'Please signup to book appointment' : 'Please login to book appointment'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            {state === 'sign Up' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {state === 'sign Up' ? 'Create Account' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          {state === 'sign Up' ? (
            <p className="text-gray-600">
              Already have an account?{' '}
              <span 
                onClick={() => setState('Login')} 
                className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Create an Account?{' '}
              <span 
                onClick={() => setState('sign Up')} 
                className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium"
              >
                Sign Up here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;