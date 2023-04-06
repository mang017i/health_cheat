import React, { useState, useEffect } from "react";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";
import "./HomeAside.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

export default function HomeAside() {
  const navigate = useNavigate();
  const [cheats, setCheats] = useState([]);
  const [imageByCheat, setImageByCheat] = useState([]);

  async function getAllCheats() {
    await CheatService.findAll().then(async (response) => {
      const lastThree = response.data.data
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 3);

      for (let i = 0; i < lastThree.length; i++) {
        const categoryId = lastThree[i].category_id;
        console.log(categoryId, "categoryId");
        const category = await CategoryService.findOne(categoryId);
        console.log(category.data.data, "category");
        lastThree[i].category_name = category.data.data.title;
        if (lastThree[i].id > 17) {
          const cheatId = lastThree[i].id;
          const pictureId = await CheatService.getPictureByCheatId(cheatId);
          const picturePath =
            "http://localhost:8000" + pictureId.data.data.path;
          lastThree[i].picture_path = picturePath;
        }
      }

      setCheats(lastThree);
    });
  }
  useEffect(() => {
    getAllCheats();
  }, []);
  const handleNavigation = (path) => {
    navigate(path);
  };

  console.log(cheats, "cheats");
  return (
    <div className="aside_container">
      <div className="lastCheat">
        <h2 className="aside_title">Dernières Fiches</h2>
        {cheats.map((cheat) => (
          <div
            key={cheat.id}
            className="cheat_card"
            onClick={() => handleNavigation(`/cheat/${cheat.id}`)}
          >
            <div className={`cheat${cheat.image} cheat_card_image`}>
              {cheat.id > 17 && <img src={cheat.picturePath} alt="cheat" />}
            </div>
            <div className="cheat_card_title">
              <h3>{cheat.title}</h3>
            </div>
            <div className="cheat_card_description">
              <p>{cheat.category_name}</p>
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
