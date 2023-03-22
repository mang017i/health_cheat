import React from 'react';
import './ShowCheatPage.css';
import ShowCheat from '../../components/CheatShow/CheatShow';
import { useParams } from "react-router-dom";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const ShowCheatPage = () => {
  const { id } = useParams();
  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  const navigate = useNavigate();
  return (
    <div className="showcheat">
      <ShowCheat/>
      <Sidebar setCurrentUrl={setCurrentUrl} />
    </div>
  );
}

export default ShowCheatPage;
