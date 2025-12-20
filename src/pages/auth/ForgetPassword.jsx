import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      navigate('/reset-password', {
      state: { email }
    });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 glassmorphism p-8 rounded-2xl">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">Forgot Password</h2>
          <p className="mt-2 text-center text-gray-400">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* {success && (
            <div className="p-3 bg-green-900/30 border border-green-800 rounded-lg">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )} */}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           text-white placeholder-gray-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : 'Send Reset Instructions'}
          </Button>

          <div className="text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;