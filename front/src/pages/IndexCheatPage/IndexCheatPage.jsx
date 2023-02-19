import React from "react";
import "./IndexCheatPage.css";
import CheatsIndex from "../../components/CheatsIndex/CheatsIndex";
import Modal from "../../components/Modal/Modal";

const IndexCheatPage = () => {
  return (
    <div className="container">
      <h1>Fiches</h1>
      <Modal />
      <CheatsIndex />
    </div>
  );
};

export default IndexCheatPage;
