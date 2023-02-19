import React from "react";
import "./IndexCheatPage.css";
import CheatsIndex from "../../components/CheatsIndex/CheatsIndex";
import Modal from "../../components/Modal/Modal";
import SearchInCheatName from "../../components/SearchInCheatName/SearchInCheatName";

const IndexCheatPage = () => {
  return (
    <div className="container">
      <h1>Fiches</h1>
      <SearchInCheatName />
      <Modal />
      <CheatsIndex />
    </div>
  );
};

export default IndexCheatPage;
