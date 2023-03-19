import React, { useState, useEffect } from "react";
import "./CheatShow.css";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";

import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

function PrintComponent({ children }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printCheat_container">
      {children}

      <button className="print" onClick={handlePrint}>
        <span class="material-symbols-outlined">print</span>
      </button>

      <style>
        {`
          @media print {
            /* Supprimez les en-têtes et pieds de page */
            @page, .printCheat_container  { margin: 0; }
            .cheat_card_content { width: 100%; height: 100%; }
            .cheat_card_imagePrint { width: 100%; height: 100%; display:flex; justify-content: center; }
            header, footer, nav, aside, .navigation-bar, .blurCheat, .print, .addToBook, .cheat_card_imagePrint { display: none; }
            .cheatforprint { flex-direction: column; height: 100%; width: 100%; align-items: center; }
            .cheatImagePrint { width: 100%; height: 250px; display:flex; justify-content: center; }
            .cheatCardPrint { width: 100%; display:flex; justify-content: center; }
            .printTitle{ width: 110%; justify-content: center; align-items: center; display: flex; }
            .titleCheatContent{
              margin-bottom: 20px;
            }
            .cheatRecommendation p, .cheatStep p{
              color: black;
            }
          }
        `}
      </style>
    </div>
  );
}

export default function CheatShow() {
  const location = useLocation(); // Retrieve the current URL
  const navigate = useNavigate();
  const [cheat, setCheat] = useState([]);
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    getOneCheat();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getOneCheat(id) {
    const currentUrl = location.pathname.split("/")[2]; // Retrieve the current URL
    await CheatService.findOne(currentUrl).then((response) => {
      console.log(">>>>>>>>>>", response.data.data);
      const result = {
        ...response.data.data,
        created: moment(response.data.data.createdAt).format(
          "DD/MM/YYYY à HH:mm"
        ),
      };
      setCheat(result);
    });
    console.log("zzzzzzzzzz", cheat.category_id);
    await CategoryService.findOne(cheat.category_id).then((response) => {
      console.log(">>>>>>>>>>", response.data.data);
      setCategory(response.data.data.title);
    });
  }
  return (
    <PrintComponent>
      <div className="cheat_card_imagePrint">
        <img src={cheat.image} alt="cheat" />
      </div>
      <div className="blurCheat"></div>
      <div className="cheat_card_content">
        <div className="titleCheatContent">
          <div className="printTitle">
            <h3>{cheat.title}</h3>
            <span>{Category}</span>
          </div>
          <p>{cheat.description}</p>
          <span class="material-symbols-outlined addToBook">heart_plus</span>
        </div>
        <div className="cheatforprint">
          <div className="cheatImagePrint">
            <img src={cheat.image} alt="cheat" />
          </div>
          <div className="cheatCardPrint">
            <div className="cheatRecommendation">
              <h3>Recommandation</h3>
              <p>{cheat.recommendation}</p>
            </div>
            <div className="cheatStep">
              <h3>étapes</h3>
              <p>{cheat.step}</p>
            </div>
          </div>
        </div>
        <div className="signature">
          <div className="cheatMaterials">
            <h3>Matériels Utilisés</h3>
            <p>{cheat.material}</p>
          </div>
          <div className="creator">
            <p className="create">Signé par {cheat.creator}</p>
            <p className="create">Crée le {cheat.created}</p>
          </div>
        </div>
      </div>
    </PrintComponent>
  );
}
