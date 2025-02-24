import React from 'react';
import Navbar from './component/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
