import React, { useState, useEffect } from "react";
import "./CheatShow.css";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";
import EquipmentService from "../../services/Equipment";
import BookmarkService from "../../services/Bookmark";
import MaterialService from "../../services/Material";
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

export default function CheatShow(props) {
  const location = useLocation();
  const [cheat, setCheat] = useState([]);
  const [category, setCategory] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [steps, setSteps] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [imageByCheat, setImageByCheat] = useState([]);
  // const [materialsCheat, setMaterialsCheat] = useState([]);

  const data = {
    user_id: parseInt(sessionStorage.getItem("user")),
    cheat_id: cheat.id,
  };
  // const styles = {
  //   backgroundImage: 'url("./tensiometre.png")',
  //   padding: '10px',
  //   borderRadius: '5px',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '50px',
  //   width: '50px',
  // };
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
        setSteps(Object.entries(result.step));
        let cheatId = parseInt(location.pathname.split("/")[2]);
        let res = await BookmarkService.findBookmarkByUserAndCheat(
          userId,
          cheatId
        );
        if (res.data.code === 200) {
          setBookmarked(true);
        }

        getOneCategory(cheat.data.data.category_id);
      } catch (error) {
        console.log(error);
      }
    }
    getOneCheat();
    async function fetchData() {
      let cheatId = parseInt(location.pathname.split("/")[2]);
      const equipment = await EquipmentService.getAllEquipmentsForCheat(
        cheatId
      );
      console.log(equipment, "equipment");
      const materials = await MaterialService.findAll(props.cheatId);
      console.log(materials, "materials");
      const filtered = materials.data.data.filter((m) => {
        return equipment.data.data.find((e) => e.material_id === m.id);
      });
      console.log(filtered, "filtered");
      setFilteredMaterials(filtered);
      // const materialArray = filteredMaterials.map((m) => {
      //   return m.image;
      // });
      // console.log(materialArray, "materialArray");
      // setMaterialsCheat(materialArray);
    }
    fetchData();
    async function getPictureByCheatId() {
      const pictureId = await CheatService.getPictureByCheatId(cheatId);
      console.log(pictureId, "picturerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrId");
      setImageByCheat('http://localhost:8080' + pictureId.data.data.path);
    }
    getPictureByCheatId();
  }, [location.pathname, userId, props.cheatId, cheatId]);

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
    console.log(filteredMaterials, "filteredMaterials");
    console.log(imageByCheat, "imageByCheattttttttttttttttttttttttttttttttttttttttt");
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
            <img src={imageByCheat} alt="cheat" />
          </div>
          <div className="cheatCardPrint">
            <div className="cheatRecommendation">
              <h3>Recommandation</h3>
              <p>{cheat.recommendation}</p>
            </div>
            <div className="cheatStep">
              <h3>étapes</h3>
              {steps.map((key, index) => (
                <p key={key[0]}>{index + 1}- {key[1]}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="signature">
          <div className="cheatMaterials">
            <h3>Matériels Utilisés</h3>
            <div className="materialsByCheat">
              {/* <div style={styles}></div> */}
              {filteredMaterials.map((m) => (
                <div key={m.id}>
                  <div className={`${m.image} materialChoose`}></div>
                  <p>{m.name}</p>
                </div>
              ))}
            </div>
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
