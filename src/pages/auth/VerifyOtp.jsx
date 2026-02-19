import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { FiKey } from 'react-icons/fi';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || '';

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      await verifyOtp({ email, otp: otpCode });
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 glassmorphism p-8 rounded-2xl">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">Verify OTP</h2>
          <p className="mt-2 text-center text-gray-400">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-gray-800 border border-gray-700 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 
                           focus:border-transparent text-white"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2"
            disabled={loading || otp.join('').length !== 6}

          >
            {loading ? <Loader size="sm" /> : (
              <>
                <FiKey />
                Verify OTP
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
                onClick={() => {
                  // TODO: Implement resend OTP
                  alert('Resend OTP functionality to be implemented');
                }}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;