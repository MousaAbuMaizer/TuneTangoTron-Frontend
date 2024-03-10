'use client'
import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const loginSuccess = await response.json();

      if (response.ok && loginSuccess.success) {
        router.push('/main');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="backdrop-blur-lg rounded-lg shadow-lg p-7 max-w-sm w-full m-4 pointer-events-auto bg-white/10">
        <h2 className="text-center text-2xl font-bold text-white mb-2">Log In</h2>
          <form className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
                <div className="mt-1 relative rounded-md shadow-sm">
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Moses123"
                    className="block w-full pl-2 pr-3 py-2 border border-transparent rounded-md bg-primary text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-secondary outline-none"
                  />
                </div>
              </label>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
                <div className="mt-1 relative rounded-md shadow-sm">
                  <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456"
                    className="block w-full pl-2 pr-3 py-2 border border-transparent rounded-md bg-primary text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-secondary outline-none"
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-between text-sm text-white">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" /> Remember Me
              </label>
              <Link href="#" className="text-white hover:text-secondary">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="py-2 w-full mt-4 font-medium shadow-lg rounded-lg bg-secondary text-white hover:bg-accent"
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(event)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
  );
}  

export default LoginPage;
