import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import

const Header = ({ selectedBatch, currentStep }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group"> {/* Add Link here */}
              <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition">
                <Shield className="w-6 h-6 text-white" />
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
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              John
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">AD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;