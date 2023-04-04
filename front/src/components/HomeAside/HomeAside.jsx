import React, { useState, useEffect } from "react";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";
import "./HomeAside.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";


export default function HomeAside() {
  const navigate = useNavigate();
  const [cheats, setCheats] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCheats();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getAllCheats() {
    await CheatService.findAll().then((response) => {
      const lastThree = response.data.data
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 3);
      setCheats(lastThree);
    });
  }
  async function getAllCategories() {
    await CategoryService.findAll().then((response) => {
      setCategories(response.data.data);
    });
  }


  return (
    <div className="aside_container">
      <div className="lastCheat">
        <h2 className="aside_title">Dernières Fiches</h2>
        {cheats.map((cheat) => (
          <div key={cheat.id} className="cheat_card" onClick={() => handleNavigation(`/cheat/${cheat.id}`)}>
            <div className="cheat_card_image">
              <img src={cheat.image} alt="cheat" />
            </div>
            <div className="cheat_card_title">
              <h3>{cheat.title}</h3>
            </div>
            {/* <div className="cheat_card_category">
              <p>{categories.name}</p>
            </div> */}
            <div className="cheat_card_description">
              <p>{cheat.description}</p>
            </div>
            <div className="cardBlur"></div>
          </div>
        ))}
      </div>
      {/* {sessionStorage.getItem("user") !== null ? ( */}
        <div className="createCheat">
          <Modal />
        </div>
      {/* ) : null} */}
    </div>
  );
}
