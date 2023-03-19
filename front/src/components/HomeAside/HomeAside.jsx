import React, { useState, useEffect } from "react";
import CheatService from "../../services/Cheat";
import "./HomeAside.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";


export default function HomeAside() {
  const navigate = useNavigate();
  const [cheats, setCheats] = useState([]);

  useEffect(() => {
    getAllCheats();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getAllCheats() {
    await CheatService.findAll().then((response) => {
      console.log('>>>>>>>>>>',response.data.data);
      const lastThree = response.data.data
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 3);
      setCheats(lastThree);
    });
  }

  return (
    <div className="aside_container">
      <div className="lastCheat">
        <h2 className="aside_title">Dernières Fiches</h2>
        {cheats.map((cheat) => (
          <div className="cheat_card" onClick={() => handleNavigation(`/cheat/${cheat.id}`)}>
            <div className="cheat_card_image">
              <img src={cheat.image} alt="cheat" />
            </div>
            <div className="cheat_card_title">
              <h3>{cheat.title}</h3>
            </div>
            <div className="cheat_card_description">
              <p>{cheat.description}</p>
            </div>
            <div className="cardBlur"></div>
            <span className="material-symbols-outlined addToBookmark">
              add_circle
            </span>
          </div>
        ))}
      </div>
      {localStorage.getItem("user") !== null ? (
        <div className="createCheat">
          <Modal />
        </div>
      ) : null}
    </div>
  );
}
