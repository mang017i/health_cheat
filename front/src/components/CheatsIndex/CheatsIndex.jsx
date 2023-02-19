import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheatService from "../../services/Cheat";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./CheatsIndex.css";

export default function ActionAreaCard() {
  const [cheats, setCheats] = useState([]);
  useEffect(() => {
    getAllCheats();
  }, []);

  async function getAllCheats() {
    await CheatService.findAll().then((response) => {
      console.log(response.data.data, "response.data");
      setCheats(response.data.data);
    });
  }

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
