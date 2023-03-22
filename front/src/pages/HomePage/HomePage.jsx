import React from 'react';
import './HomePage.css';
import HomeAside from '../../components/HomeAside/HomeAside';
import Minion from '../../components/Minion/Minion'
import Sidebar from '../../components/Sidebar/Sidebar';
import Test from '../../components/test/test';
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
        <Test />
        <Minion />
        <Sidebar setCurrentUrl={setCurrentUrl} />
      </div>


    </div>
  );
}

export default HomePage;
