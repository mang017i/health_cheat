import React from "react";
import "./IndexCheatPage.css";
import CheatsIndex from "../../components/CheatsIndex/CheatsIndex";
import SearchInCategory from "../../components/SearchInCategory/SearchInCategory";
import HomeAside from "../../components/HomeAside/HomeAside";
import TabsComponent from "../../components/Tabs/Tabs";


const IndexCheatPage = () => {
  return (
    <div className="cheat_container">
      <h1>Annuaire des fiches</h1>
      <TabsComponent />
      <HomeAside />
    </div>
  );
};

export default IndexCheatPage;
