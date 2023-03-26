import React, { useState, useEffect } from "react";
import "./SearchInCategory.css";
import CategoryService from "../../services/Category/index";
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

const SearchInCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // utilise une fonction pour mettre à jour le state categoryName avec la valeur de value (qui est un tableau)
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

  return (
    <div className="searchByCategory">
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
            // variant="filled"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                <Checkbox checked={categoryName.indexOf(category.title) > -1} />
                <ListItemText primary={category.title} />
              </MenuItem>
            ))}
          </Select>
        </div>
        {open ? (
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            <span className="material-symbols-outlined">search</span>
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            type="submit"
            variant="contained"
            color="primary"
          >
            <span className="material-symbols-outlined">close</span>{" "}
          </Button>
        )}
      </FormControl>
      {sessionStorage.getItem("user") !== null ? (
        <div className="createCheat">
          <Modal />
        </div>
      ) : null}
      {search ? (
        <div>
          <h2>
            {" "}
            Catégories sélectionnées :{" "}
            {selectedCategories &&
              selectedCategories.map((category) => {
                return <div>{category.title}</div>;
              })}
          </h2>

          <h2>
            {" "}
            Fiches Correspondantes :{" "}
            {
              <div>
                {selectedCategories &&
                  selectedCategories.map((category) => {
                    return (
                      <div key={category.id}>
                        {category.cheats.map((cheatsheet) => {
                          return (
                            <ul key={cheatsheet.id}>
                              <li>{cheatsheet.title}</li>
                            </ul>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            }
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default SearchInCategory;
