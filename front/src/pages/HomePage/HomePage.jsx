import React from 'react';
import './HomePage.css';
import SearchInCategory from '../../components/SearchInCategory/SearchInCategory';


const HomePage = () => {
  return (
    <div className='container'>
      <h1>Home Page</h1>
      <div>
        <SearchInCategory />
      </div>


    </div>
  );
}

export default HomePage;
