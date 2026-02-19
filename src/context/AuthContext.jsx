
import React, { createContext, useState, useContext, useEffect , useMemo } from 'react';
import { authApi } from '../api/authApi';

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
  try {
    const response = await authApi.getMe();

    setUser(response.data); // ✅ FIX
    setTokenBalance(response.data.tokenBalance || 0);
  } catch (error) {
    console.error('Auth check failed:', error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};


  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    setUser(response.data.user);
    setTokenBalance(response.data.user?.tokenBalance || 0);
    return response.data;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    return response.data;
  };

  const verifyOtp = async (otpData) => {
    const response = await authApi.verifyOtp(otpData);
    setUser(response.data.user);
    setTokenBalance(response.data.user?.tokenBalance || 0);
    return response.data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setTokenBalance(0);
      
    }
  };

  const updateTokenBalance = (newBalance) => {
    setTokenBalance(newBalance);
  };

  const value = useMemo(() => ({
  user,
  tokenBalance,
  loading,
  setUser,
  login,
  register,
  verifyOtp,
  logout,
  updateTokenBalance,
  checkAuth
}), [user, tokenBalance, loading]);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};