import React from 'react';
import Navbar from './component/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
