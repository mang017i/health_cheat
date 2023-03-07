import React from 'react';
import './HomePage.css';
import SearchInCategory from '../../components/SearchInCategory/SearchInCategory';
import HomeAside from '../../components/HomeAside/HomeAside';
import Minion from '../../components/Minion/Minion'



const HomePage = () => {
  return (
    <div className='container'>
      <div className='home_container'>
        <HomeAside />
        <Minion />
      </div>


    </div>
  );
}

export default HomePage;
