import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, progress }) => {
  return (
    <div className="app-container">
      <Sidebar progress={progress} />
      <main className="main-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
