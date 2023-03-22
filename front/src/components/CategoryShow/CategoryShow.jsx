import React, { useState, useEffect } from "react";
import "./CategoryShow.css";
import CategoryService from "../../services/Category/index";
import CheatService from "../../services/Cheat/index";
import { useLocation } from "react-router-dom";

export default function ShowCategoryPage() {
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [cheats, setCheats] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const currentUrl = location.pathname.split("/")[2];
      try {
        const categoryPage = await CategoryService.findOne(currentUrl).then(
          (response) => {
            return response.data.data;
          }
        );
        setCategory(categoryPage);
      } catch (error) {
        console.log(error);
      }
    }
    getCategory();
  }, [location]);

  useEffect(() => {
    async function getAllCheatsByCurrentCategory() {
      try {
        const cheats = await CheatService.findAll().then((response) => {
          const filteredCheats = response.data.data.filter((cheat) => {
            return cheat.category_id === category.id;
          });
          setCheats(filteredCheats);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllCheatsByCurrentCategory();
  }, [category]);

  return (
    <div className="Category_container">
      {category.length === 0 ? (
        <p>Loading category...</p>
      ) : (
        <h1>Annuaire des fiches de la categorie {category.title} </h1>
      )}
      {cheats.length > 0 ? (
        <div>
          {cheats.map((cheat) => (
            <div key={cheat.id} className="cheat_card">
              <h3>{cheat.title}</h3>
              <p>{cheat.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cheats found for this category.</p>
      )}
    </div>
  );
}
