import React from "react";
import "./IndexCheatPage.css";
import CheatsIndex from "../../components/CheatsIndex/CheatsIndex";
import Modal from "../../components/Modal/Modal";
import SearchInCategory from "../../components/SearchInCategory/SearchInCategory";
import HomeAside from "../../components/HomeAside/HomeAside";

const IndexCheatPage = () => {
  return (
    <div className="cheat_container">
      <h1>Annuaire des fiches</h1>
      {/* <SearchInCheatName /> */}
      {/* <Modal /> */}
      <SearchInCategory />
      <CheatsIndex />
      <HomeAside />
    </div>
  );
};

export default IndexCheatPage;
