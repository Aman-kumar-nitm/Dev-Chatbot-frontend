
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VerifyOtp from '../pages/auth/VerifyOtp';
import ForgotPassword from '../pages/auth/ForgetPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// App Pages
import ChatPage from '../pages/app/ChatPage';

const AppRoutes = () => {
  const { loading,user } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Routes>
  {/* Public */}
  <Route path="/login" element={!user ? <Login /> : <Navigate to="/app" />} />
  <Route path="/register" element={!user ? <Register /> : <Navigate to="/app"/>} />
  <Route path="/verify-otp" element={!user ? <VerifyOtp /> : <Navigate to="/app"/>} />
  <Route path="/forgot-password" element={!user ? <ForgotPassword />:<Navigate to="/app"/>} />
  <Route path="/reset-password" element={!user ? <ResetPassword /> :<Navigate to="/app"/>} />

  {/* Protected */}
  <Route element={<ProtectedRoute />}>
    <Route path="/app" element={<ChatPage />} />
  </Route>

  <Route path="/" element={<Navigate to="/app" replace />} />
  <Route path="*" element={<Navigate to="/app" replace />} />
</Routes>

  );
};

export default AppRoutes;