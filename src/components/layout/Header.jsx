import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { tokenBalance, user } = useAuth();
  
  // Calculate percentage for progress bar (assuming 1000 tokens max)
  const maxTokens = user?.role === 'Dev-Pro' ? 1000 : 1000;
  const percentage = Math.min((tokenBalance / maxTokens) * 100, 100);
  
  return (
    <header className="sticky top-0 z-40 glassmorphism p-4 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Dev-Chatbot</h1>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-300">Role: {user?.role}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Token Meter */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-300">
                  Tokens: {tokenBalance}/{maxTokens}
                </div>
                <div className="text-xs text-gray-400">
                  {user?.role === 'Dev-Pro' ? 'Pro Plan' : 'Free Plan'}
                </div>
              </div>
              <div className="w-32">
                <div className="h-5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      percentage > 90 ? 'bg-red-500' : 
                      percentage > 70 ? 'bg-yellow-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;