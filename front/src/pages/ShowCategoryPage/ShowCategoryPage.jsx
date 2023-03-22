import React from "react";
import "./ShowCategoryPage.css";
import HomeAside from "../../components/HomeAside/HomeAside";
import CategoryShow from "../../components/CategoryShow/CategoryShow";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function ShowCategoryPage() {
  const navigate = useNavigate();
  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  return (
    <div className="Category_container">
      <HomeAside />
      <CategoryShow />
      <Sidebar setCurrentUrl={setCurrentUrl} />
    </div>
  );
};
