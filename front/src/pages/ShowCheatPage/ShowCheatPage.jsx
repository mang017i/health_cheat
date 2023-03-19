import React from 'react';
import './ShowCheatPage.css';
import ShowCheat from '../../components/CheatShow/CheatShow';
import { useParams } from "react-router-dom";


const ShowCheatPage = () => {
  const { id } = useParams();
  console.log("!!!!!!!!!!!!!!!!!!!!",id);
  return (
    <div className="showcheat">
      <ShowCheat/>
    </div>
  );
}

export default ShowCheatPage;
