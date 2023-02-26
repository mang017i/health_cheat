import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Auth.css";
import {useNavigate} from "react-router-dom";



export default function BasicTextFields() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    <Box
      component="form"
      className="auth_form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="general">
        <div className="title">
          <div className="logo"></div>
          <h1>Health Cheat</h1>
        </div>
        <h2>Inscription</h2>
        <p>J'ai déjà mon compte ? <span onClick={() => handleNavigation("/login")}>Je me connecte</span></p>
      </div>

      <div className="input_part">
        <TextField className="input" id="filled-basic" label="Username" variant="filled" />
        <TextField className="input" id="filleffd-basic" label="Mail" variant="filled" />
        <TextField className="input" id="filleffd-basic" label="Password" variant="filled" />
        <div className="submitBtn">
          <Button variant="contained">Inscription</Button>
        </div>
      </div>
    </Box>
  );
}
