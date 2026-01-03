import React, { useState } from 'react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [email, setEmail] = useState('ankit.k@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // On successful login, pass the user data up to the App component
      onLogin(data.user);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white p-6">
      <div className="w-full max-w-sm">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-wider">
            SPARK <span className="text-orange-400">KHOJ</span>
          </h1>
          <p className="text-blue-200 mt-2 text-sm max-w-xs mx-auto">
            Real-Time Sports Talent Identification and Opportunity Integration
          </p>
        </header>
        <main>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</p>}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              />
              <div className="text-right mt-2">
                <button type="button" className="text-sm text-blue-300 hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-3 mt-2 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging In...' : 'LOG IN'}
            </button>
          </form>
          <footer className="text-center mt-6 pt-6 border-t border-blue-800">
             <p className="text-blue-200 mb-3">Don't have an account?</p>
            <button
              onClick={onNavigateToRegister}
              className="w-full py-3 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-lg hover:bg-orange-400 hover:text-blue-900 transition-colors"
            >
              CREATE NEW ACCOUNT
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LoginScreen;