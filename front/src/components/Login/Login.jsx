import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      className="login_form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="input">
        <TextField id="filled-basic" label="Mail" variant="filled" />
        <TextField id="filleffd-basic" label="Password" variant="filled" />
        <div className="submitBtn">
          <Button variant="contained">Connexion</Button>
        </div>
      </div>
    </Box>
  );
}
