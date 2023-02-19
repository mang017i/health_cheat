import React from "react";
import "./SearchInCheatName.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CheatService from "../../services/Cheat";

const SearchInCheatName = () => {
  //
  const [cheats, setCheats] = useState([]);
  const [foundCheat, setFoundCheat] = useState([]);
  const [prevInputLength, setPrevInputLength] = useState(0);
  const [searchError, setSearchError] = useState("");


  useEffect(() => {
    getAllCheatNames();
  }, []);

  async function getAllCheatNames() {
    const response = await CheatService.findAll();
    const cheatsResult = response.data.data;
    let cheats = [];
    cheatsResult.forEach((cheat) => {
      cheats.push(cheat);
    });
    console.log(cheats, "cheats");

    setCheats(cheats);
  }

  // commence à filtrer les cheatNames dès que l'utilisateur tape deux lettres
  const handleChange = (event) => {
    let userInput = event.target.value;

    if (userInput.length < prevInputLength) {
      setFoundCheat([]);
      setSearchError("");
    } else if (userInput.length >= 2) {
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
        console.log("Aucun résultat trouvé pour cette recherche");
        setSearchError("Aucun résultat trouvé pour cette recherche");
      } else {
        // met à jour le state avec les cheats filtrées
        setFoundCheat(filteredCheats);
        console.log(filteredCheats, "filteredCheats");
      }
    } else {
      setFoundCheat([]);
    }
    setPrevInputLength(userInput.length);
  };



  return (
    <div>
      <h1>SearchInCheatName</h1>

      <TextField
        id="outlined-basic"
        label="Nom de la fiche "
        variant="outlined"
        onChange={handleChange}
      />

      <h2>Fiches correspondantes à la recherche : </h2>
      <ul>
       {foundCheat && foundCheat.length > 0 ? (
          foundCheat.map((cheat) => {
            return <li key={cheat.id}>{cheat.title}</li>;
          })
        ) : (
          <span className="searchError">{searchError}</span>
        )}
      </ul>

    </div>
  );
};

export default SearchInCheatName;
