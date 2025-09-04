import React, { useState } from 'react';
import { Shield, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import
import { useAuth } from '../../context/AuthContext';
import UserProfile from '../auth/UserProfile';
import logo from '../../assets/logo.png'; // Use your new logo file

const Header = ({ selectedBatch, currentStep }) => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group"> {/* Add Link here */}
              <div className="">
                <img
                  src={logo}
                  alt="SamAI Shield Logo"
                  width={3672}
                  height={2528}
                  className="w-16 h-11 object-contain" // Adjusts display size, keeps aspect ratio
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">SamAI Shield</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Al-Powered Detection System</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {selectedBatch && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{selectedBatch.id}</span>
                <span className="text-gray-400">•</span>
                <span>Step {currentStep}/3</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="hidden sm:inline">{user?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowProfile(true)}
                  className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  title="View Profile"
                >
                  <span className="text-sm font-medium text-blue-600">{user?.avatar}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </header>
  );
};

export default Header;