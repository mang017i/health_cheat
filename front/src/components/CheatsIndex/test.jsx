import React, { useState, useEffect } from "react";
import "./SearchInCategory.css";
import CategoryService from "../../services/Category/index";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
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
  }
  async function getAllCategories() {
    let categories = await CategoryService.findAll().then((response) => {
      return response.data.data;
    });
    setCategories(categories);
  }
  return (
    <div>      <FormControl sx={{ m: 1, minWidth: 180 }} onClick={handleSubmit}>        <InputLabel id="categories-multiselect-input">Catégories</InputLabel>        <Select
          labelId="categories-multiselect-label"
          id="categories-multiselect"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput label="Catégorie" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >          {categories.map((category) => (
            <MenuItem key={category.id} value={category.title}>              <Checkbox checked={categoryName.indexOf(category.title) > -1} />              <ListItemText primary={category.title} />            </MenuItem>          ))}
        </Select>        <br />        <Button type="submit" variant="outlined" color="primary">          Rechercher
        </Button>      </FormControl>      <div>        <h2>          {" "}
          Catégories sélectionnées :{" "}
          {selectedCategories &&            selectedCategories.map((category) => {
              return <div>{category.title}</div>;
            })}
        </h2>        <h2>          {" "}
          Fiches Correspondantes :{" "}
          {
            <div>              {selectedCategories &&                selectedCategories.map((category) => {
                  return (
                    <div>                      {category.cheats.map((cheatsheet) => {
                        return (
                          <ul>                            <li>{cheatsheet.title}</li>                          </ul>                        );
                      })}
                    </div>                  );
                })}
            </div>          }
        </h2>      </div>    </div>  );
};
export default SearchInCategory;
