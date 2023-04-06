import React, { useState, useEffect } from "react";
import "./CategoryShow.css";
import CategoryService from "../../services/Category/index";
import CheatService from "../../services/Cheat/index";
import { useLocation } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Modal from "../Modal/Modal";
import Button from "@mui/material/Button";

export default function ShowCategoryPage() {
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [cheats, setCheats] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleNavigation = (path) => {
    navigate(path);
  };
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="Category-container">
      {category.length === 0 ? (
        <p>Loading category...</p>
      ) : (
        <h1>Annuaire des fiches de la categorie {category.title} </h1>
      )}
      {cheats.length > 0 ? (
        <div className="jjj">

          <div>
            {cheats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cheat) => (
              <div
              key={cheat.id}
              className={`cheat_cardIndex ${cheat.id}`}
              onClick={() => handleNavigation(`/cheat/${cheat.id}`)}
            >
              {/* <div className="blurIndex"></div> */}
              <div className={`cheat${cheat.image} cheatImagePrint`}>
                {cheat.id > 17 && (
                  <img src={cheat.picturePath} alt="cheat" />
                )}
              </div>
              <div className="cheat_cardDescription">
                <h2 className="cheatTitle">{cheat.title}</h2>
                <p className="cheatDesc">{cheat.description}</p>
                <div className="init_cheat">
                  <p className="cheat_creator">{cheat.creator}</p>
                  <p className="cheat_created">{cheat.createdAt}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cheats.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
      ) : (
        <p>No cheats found for this category.</p>
      )}
    </div>
  );
}
