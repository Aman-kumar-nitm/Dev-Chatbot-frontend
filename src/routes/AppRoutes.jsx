
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
  const { loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Routes>
  {/* Public */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/verify-otp" element={<VerifyOtp />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />

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