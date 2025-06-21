import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 md:ml-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Welcome to ClinicPro Dashboard
            </h2>
            <p className="text-sm text-gray-600">
              Manage your doctors and appointments efficiently
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a.99.99 0 010-1.4L19 9.5V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3.5l2.5 2.5a.99.99 0 010 1.4L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* User avatar */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <span className="hidden sm:ml-2 sm:block text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 