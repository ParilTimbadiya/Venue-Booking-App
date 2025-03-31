import React from 'react';
import Navbar from './component/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';
import UserInput from './component/UserInput';
import buttonsContainer from './component/buttonsContainer';
import Matches from './component/Matches/Matches';
import match from './component/matchDetails/MatchDetails';
import Schedule from './component/Schedule/Schedule';
import Teams from "./component/Teams/Teams3.jsx";
import Series from "./component/Series/Series2.jsx";
import News from './component/News/News.jsx';
import NewsDetail from './component/NewsDetail/NewsDetail2.jsx';
import BatsmenRankings from './component/BatsmenRanking/BatsmenRanking.jsx';
import PhotoGallery from './component/Photos/PhotoGallery.jsx';
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
