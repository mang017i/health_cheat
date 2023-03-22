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
  const filterBookmarkCheats = bookmarksArray
  console.log(filterBookmarkCheats, "bookmarksArrayyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  useEffect(() => {
    getBookmarkForCurrentUser(props.userId);
    getAllCategories();
    getAllCheats();
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
    userId = parseInt(localStorage.getItem("user"));

    const response = await BookmarkService.getAllBookmarksForUser(userId);
    const bookmarks = response.data.data;
    setBookmarksArray(bookmarks.map((bookmark) => bookmark.cheat_id));
  }
  async function getAllCheats() {
    console.log(bookmarksArray, "bookmarksAzzzzzzzzzzzzzzzzzzzzzzzrray");
    await CheatService.findAll().then((response) => {
      console.log(response.data.data, "response");
      let result = response.data.data.filter((item) => bookmarksArray.includes(item.id));
      // .map((cheat) => {
      //   cheat.createdAt = moment(cheat.createdAt).format(" HH:mm DD/MM/YYYY");
      //   cheat.title =
      //     cheat.title.charAt(0).toUpperCase() + cheat.title.slice(1);
      //   return cheat;
      // });
      console.log(result, "result");
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
  console.log(bookmarksArray, "ggggggggggggggggggggg");
  return (
    <div className="cheats_container">
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <div className="inputCategory">
          <InputLabel
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
            id="categories-multiselect-label"
          >
            Catégories
          </InputLabel>
          <Select
            labelId="categories-multiselect-label"
            id="categories-multiselect"
            multiple
            value={categoryName}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                <Checkbox checked={categoryName.indexOf(category.title) > -1} />
                <ListItemText primary={category.title} />
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleReset}
            type="submit"
            variant="contained"
            color="primary"
            disabled={categoryName.length === 0}
            className="resetCategoryBtn"
          >
            <span className="material-symbols-outlined">close</span>{" "}
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            className="searchCategoryBtn"
            disabled={categoryName.length === 0}
          >
            <span className="material-symbols-outlined">search</span>
          </Button>
        </div>
      </FormControl>
      {localStorage.getItem("user") !== null ? (
        <div className="createCheat">
          <Modal />
        </div>
      ) : null}
      {search ? (
        <div>
          {selectedCategories &&
            selectedCategories.map((category) => {
              return (
                <div key={category.id}>
                  <div>{category.title}</div>
                  {category.cheats.length === 0 ? (
                    <div className="noCheat">
                      Aucune fiche trouvée dans la catégorie {category.title}
                    </div>
                  ) : (
                    category.cheats
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((cheatsheet) => {
                        return (
                          <div
                            key={cheatsheet.id}
                            className={`cheat_cardIndex ${cheatsheet.id}`}
                            onClick={() =>
                              handleNavigation(`/cheat/${cheatsheet.id}`)
                            }
                          >
                            <div className="blurIndex"></div>
                            <img src={cheatsheet.image} alt="green iguana" />
                            <div className="cheat_cardDescription">
                              <h2 className="cheatTitle">{cheatsheet.title}</h2>
                              <p className="cheatDesc">
                                {cheatsheet.description}
                              </p>
                              <div className="init_cheat">
                                <p className="cheat_creator">
                                  {cheatsheet.creator}
                                </p>
                                <p className="cheat_created">
                                  {cheatsheet.createdAt}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={category.cheats.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              );
            })}
        </div>
      ) : (
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
                    <div className="blurIndex"></div>
                    <img src={cheat.image} alt="green iguana" />
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
      )}
    </div>
  );
}
