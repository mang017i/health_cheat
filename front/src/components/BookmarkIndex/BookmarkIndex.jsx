import React, { useState, useEffect, useContext, useRef } from "react";
import CheatService from "../../services/Cheat";
import CategoryService from "../../services/Category";
import BookmarkService from "../../services/Bookmark";
import "./BookmarkIndex.css";
import { FilteredCheatsContext } from "../../utils/Context";
import moment from "moment";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BookmarkIndex(props) {
  const navigate = useNavigate();
  const contextValue = useContext(FilteredCheatsContext);
  const [cheats, setCheats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bookmarksArray, setBookmarksArray] = useState([]);

  useEffect(() => {
    getBookmarkForCurrentUser(props.userId);
    getAllCategories();
    return;
  }, [props.userId]);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(typeof value === "string" ? value.split(",") : value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let selectedCategories = [];
    for (let i = 0; i < categoryName.length; i++) {
      if (categoryName[i]) {
        selectedCategories.push(categoryName[i]);
      }
    }
    let userSelectedCategories = selectedCategories.map((category) => {
      return categories.find((cat) => cat.title === category);
    });
    setSelectedCategories(userSelectedCategories);
    setOpen(false);
    localStorage.setItem("search", open);
    setSearch(true);
  }
  async function handleReset(event) {
    event.preventDefault();
    setCategoryName([]);
    setSelectedCategories([]);
    setOpen(true);
    localStorage.setItem("search", open);
    setSearch(false);
  }

  async function getAllCategories() {
    let categories = await CategoryService.findAll().then((response) => {
      return response.data.data;
    });
    setCategories(categories);
  }
  async function getBookmarkForCurrentUser(userId) {
    userId = parseInt(sessionStorage.getItem("user"));

    const response = await BookmarkService.getAllBookmarksForUser(userId);
    const bookmarks = response.data.data;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarksArray(bookmarks.map((bookmark) => bookmark.cheat_id));
    CheatService.findAll().then((response) => {
      const booki = JSON.parse(localStorage.getItem("bookmarks")).map(
        (item) => item.cheat_id
      );
      let result = response.data.data.filter((item) => booki.includes(item.id));
      setCheats(result);
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="cheats_container">
      {sessionStorage.getItem("user") !== null ? (
        <div className="createCheat">
          <Modal />
        </div>
      ) : null}
      <section className="cheatsIndex">
        {contextValue.filteredCheats}
        <div>
          <div>
            {cheats
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cheat) => (
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
      </section>
    </div>
  );
}
