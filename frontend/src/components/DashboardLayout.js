import React from 'react';
// import NavBar from './NavBar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* <NavBar /> */}
      <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;