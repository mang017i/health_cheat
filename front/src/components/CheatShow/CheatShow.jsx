import React, { useState, useEffect } from "react";
import "./CheatShow.css";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";
import BookmarkService from "../../services/Bookmark";
import { useLocation } from "react-router-dom";
import moment from "moment";

function PrintComponent({ children }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printCheat_container">
      {children}

      <button className="print" onClick={handlePrint}>
        <span className="material-symbols-outlined">print</span>
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
  const location = useLocation();
  const [cheat, setCheat] = useState([]);
  const [category, setCategory] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  const data = {
    user_id: parseInt(sessionStorage.getItem("user")),
    cheat_id: cheat.id,
  };
  const userId = parseInt(sessionStorage.getItem("user"));
  const cheatId = cheat.id;
  useEffect(() => {
    async function getOneCategory(categoryId) {
      try {
        const category = await CategoryService.findOne(categoryId);
        setCategory(category.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getOneCheat() {
      const currentUrl = location.pathname.split("/")[2];
      try {
        const cheat = await CheatService.findOne(currentUrl);
        const result = {
          ...cheat.data.data,
          created: moment(cheat.data.data.createdAt).format(
            "DD/MM/YYYY à HH:mm"
          ),
        };
        setCheat(result);
        console.log(userId, "userId");
        let cheatId = parseInt(location.pathname.split("/")[2]);
        console.log(cheatId, "cheatId");
        let res = await BookmarkService.findBookmarkByUserAndCheat(
          userId,
          cheatId
        );
        console.log(res, "res");
        if (res.data.code === 200) {
          setBookmarked(true);
        }

        getOneCategory(cheat.data.data.category_id);
      } catch (error) {
        console.log(error);
      }
    }
    getOneCheat();
  }, []);

  async function createBookmarks(data) {
    await BookmarkService.addCheatToUser(data).then((response) => {
      if (response.status === 200) {
        setBookmarked(true);
      }
    });
  }
  async function deleteBookmarks(userId, cheatId) {
    await BookmarkService.removeBookmarkFromUser(userId, cheatId);
    setBookmarked(false);
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
            <span>{category.title}</span>
          </div>
          <p>{cheat.description}</p>
          {bookmarked ? (
            <span
              className="material-symbols-outlined deleteFromBook"
              onClick={() => deleteBookmarks(userId, cheatId)}
            >
              heart_minus
            </span>
          ) : (
            <span
              className="material-symbols-outlined addToBook"
              onClick={() => createBookmarks(data)}
            >
              heart_plus
            </span>
          )}
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
