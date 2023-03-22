import React from "react";
import { useContext } from "react";
import "./SearchInCheatName.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CheatService from "../../services/Cheat";
import moment from "moment";
import { FilteredCheatsContext } from "../../utils/Context";

const SearchInCheatName = (props) => {
  const contextValue = useContext(FilteredCheatsContext);

  const [cheats, setCheats] = useState([]);
  const [foundCheat, setFoundCheat] = useState([]);
  const [prevInputLength, setPrevInputLength] = useState(0);

  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getAllCheatNames();
  }, [contextValue.filteredCheats]);

  async function getAllCheatNames() {
    const response = await CheatService.findAll();
    const cheatsResult = response.data.data;
    let cheats = [];
    cheatsResult.forEach((cheat) => {
      cheat.createdAt = moment(cheat.createdAt).format(" HH:mm DD/MM/YYYY");
      cheat.title = cheat.title.charAt(0).toUpperCase() + cheat.title.slice(1);
      cheats.push(cheat);
    });
    setCheats(cheats);
  }

  // commence à filtrer les cheatNames dès que l'utilisateur tape deux lettres
  function handleChange(event) {
    let userInput = event.target.value;

    if (userInput.length < prevInputLength) {
      setFoundCheat([]);
      setSearchError("");
    } else if (userInput.length >= 1) {
      // récupère les noms des cheats
      let cheatsNames = cheats.map((cheat) => {
        return cheat.title;
      });

      // filtre les noms des cheats en fonction de la saisie de l'utilisateur
      const filteredCheatNames = cheatsNames.filter((cheatName) => {
        return cheatName.toLowerCase().startsWith(userInput.toLowerCase());
      });
      // utilise les noms pour matcher dans le tableau d'objet cheats et renvoyer la cheat correspondante
      const filteredCheats = cheats.filter((cheat) => {
        return filteredCheatNames.includes(cheat.title);
      });
      // met à jour le state avec les cheats filtrées
      if (filteredCheats.length === 0) {
        setFoundCheat([]);
        setSearchError("Aucun résultat");
      } else {
        // met à jour le state avec les cheats filtrées
        setFoundCheat(filteredCheats);
        return filteredCheats;
      }
    } else {
      setFoundCheat([]);
    }
    setPrevInputLength(userInput.length);
  }

  const handleClick = () => {
    if (foundCheat.length > 0) {
      let filter = foundCheat;
      if (window.location.pathname !== "/cheats") {
        navigate("/cheats");
        contextValue.updateFilteredCheats(filter);
      } else {
        contextValue.updateFilteredCheats(filter);
      }
    }
  };

  async function handleKeyPress(event) {
    handleChange(event);
    if (event.key === "Enter") {
      handleClick();
    }
  }

  function handleResetSearch() {
    setFoundCheat([]);
    setSearchError("");
    contextValue.updateFilteredCheats([]);
    setPrevInputLength(0);
    setCheats([]);
    let inputClass = document.querySelector(
      ".css-10botns-MuiInputBase-input-MuiFilledInput-input"
    );
    inputClass.value = "";
  }

  return (
    <>
      <div className="input_searchByName">
        <TextField
          style={{
            backgroundColor: "rgb(0, 0, 0, 0.5)",
            borderRadius: "5px",
            height: "90%",
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
          InputProps={{
            style: {
              backgroundColor: "rgb(0, 0, 0, 0.5)",
              color: "white",
            },
          }}
          id="filled-basic"
          label="Nom de la fiche"
          variant="filled"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="searchInput"
          // ajoute error si la recherche n'a pas de résultat et affiche un message d'erreur
          error={searchError.length > 0}
          errormessages={searchError}
        />

        <div
          onClick={handleClick}
          className="searchIcon"
          style={{ cursor: "pointer" }}
        >
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
      <div className="resetSearch" onClick={handleResetSearch}>
        <span className="material-symbols-outlined">close</span>
      </div>
      <div className="searchError">{searchError}</div>
    </>
  );
};

export default SearchInCheatName;
