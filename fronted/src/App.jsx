import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import InternationalLiveMatch from './component/InternationalLiveMatch';
import LocalLiveScore from './component/LocalLiveScore';
import Details from './component/Details';
import Openers from './component/Openers';
import Contact from './component/Contact';
import Toss from './component/Toss';
import Signin from './component/Signin';
import Signup from './component/Signup';
import BookVenue from './Venue/BookVenue';
import AddVenue from './Venue/AddVenue'; // Import the AddVenue component
import ErrorBoundary from './component/ErrorBoundary'; // Import ErrorBoundary
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';

const App = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
};

export default App;
