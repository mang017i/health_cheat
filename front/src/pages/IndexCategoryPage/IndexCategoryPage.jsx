import React, { useState, useEffect } from "react";
import "./IndexCategoryPage.css";
import HomeAside from "../../components/HomeAside/HomeAside";
import CategoryService from "../../services/Category/index";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function IndexCategoryPage() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  useEffect(() => {
    async function getAllCategories() {
      try {
        const categoryPage = await CategoryService.findAll().then(
          (response) => {
            return response.data.data;
          }
        );
        setCategory(categoryPage);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategories();
  }, []);
  return (
    <div className="Category_container">
      <HomeAside />
      <Sidebar setCurrentUrl={setCurrentUrl} />
      <h1>Annuaire des Catégories</h1>
      <div className="Category_container">
        {category.map((category) => {
          return (
            <div key={category.id} className="Category_card">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <img src={category.image} alt="cheat" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
