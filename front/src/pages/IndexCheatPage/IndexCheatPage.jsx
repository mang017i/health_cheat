import React from "react";
import "./IndexCheatPage.css";
import HomeAside from "../../components/HomeAside/HomeAside";
import TabsComponent from "../../components/Tabs/Tabs";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const IndexCheatPage = () => {
  const navigate = useNavigate();
  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  return (
    <div className="cheat_container">
      <h1>Annuaire des fiches</h1>
      <TabsComponent />
      <HomeAside />
      <Sidebar setCurrentUrl={setCurrentUrl} />
    </div>
  );
};

export default IndexCheatPage;
