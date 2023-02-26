import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheatService from "../../services/Cheat";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./CheatsIndex.css";
import { FilteredCheatsContext } from "../../utils/Context";

export default function ActionAreaCard() {
  const contextValue = useContext(FilteredCheatsContext);

  const [cheats, setCheats] = useState([]);

  useEffect(() => {
    getAllCheats();
  }, []);

  async function getAllCheats() {
    await CheatService.findAll().then((response) => {
      setCheats(response.data.data);
    });
  }





  const handleDisplayCheatsIndex = () => {
    if (cheats.length > 0) {
      return (
        <div className="fff">
          {cheats.map((cheat) => (
            <Card className="cheatCard_container" sx={{ maxWidth: 345 }}>
              <CardActionArea key={cheat.id} className="cheat_card">
                <CardMedia
                  component="img"
                  height="140"
                  image={cheat.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cheat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cheat.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      );
    }
  };



  const handleDisplayFilteredCheats = () => {
    if (contextValue.filteredCheats && contextValue.filteredCheats.length > 0) {
      return (
        <div>
          {contextValue.filteredCheats.map((cheat) => {
            return (
              <div className="cheatCard">
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "rgb(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={cheat.image}
                      alt="cheat image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {cheat.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cheat.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <section className="cheatsIndex">
      {contextValue.filteredCheats.length === 0 && handleDisplayCheatsIndex()}
      {contextValue.filteredCheats && handleDisplayFilteredCheats()}
    </section>
  );
}
