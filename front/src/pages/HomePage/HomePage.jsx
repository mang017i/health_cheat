import React from 'react';
import './HomePage.css';
import HomeAside from '../../components/HomeAside/HomeAside';
import Minion from '../../components/Minion/minion'
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  return (
    <div className='container'>
      <div className='home_container'>
        <HomeAside />
        <Minion />
        <Sidebar setCurrentUrl={setCurrentUrl} />
      </div>


    </div>
  );
}

export default HomePage;
