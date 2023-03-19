import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../services/Auth";
import { SetCurrentUser } from "../../utils/Context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Email } from "@mui/icons-material";
import { TextField, FormControl, FormHelperText } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(SetCurrentUser);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError(!emailRegex.test(value));
  };
  const handleShowPasswordClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(event.target.value);
    setPasswordLength(newPassword.length);
  };
  const handleLogin = (e) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Email incorrect");
      return;
    } else if (password.length < 5) {
      alert("Le mot de passe doit contenir au moins 5 caractères");
      return;
    }
    AuthService.login({ email, password })
      .then((response) => {
        setUser(response.data.accessToken[1]);
        localStorage.setItem("user", response.data.accessToken[1]);
        handleNavigation("/");
      })
      .catch((error) => {
        console.log(error);
        alert("L'addresse email ou le mot de passe est incorrect");
        return;
      });
  };

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
        <h2>Connexion</h2>
        <p>
          Je n'ai pas encore de compte ?{" "}
          <span onClick={() => handleNavigation("/register")}>
            Je m'inscris
          </span>
        </p>
      </div>

      <div className="input_part">
        <FormControl className="input" error={error}>
          <TextField
            onChange={handleEmailChange}
            id="filled-basic"
            label="Email"
            variant="filled"
            type="email"
            InputProps={{
              endAdornment: (
                <Email
                  color={error ? "error" : "action"}
                  fontSize="small"
                  titleAccess={error ? "Invalid email" : "Valid email"}
                />
              ),
            }}
          />
          {error && <FormHelperText>Invalid email</FormHelperText>}
        </FormControl>
        <Tooltip title="Password must have at least 5 characters">
          <TextField
            id="password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            variant="filled"
            className="input"
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordClick}>
                    {showPassword ? (
                      <VisibilityOff
                        style={{
                          color:
                            passwordLength > 0 && passwordLength < 5
                              ? "red"
                              : "black",
                        }}
                      />
                    ) : (
                      <Visibility
                        style={{
                          color:
                            passwordLength > 0 && passwordLength < 5
                              ? "red"
                              : "black",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        <div className="submitBtn">
          <Button variant="contained" onClick={handleLogin}>
            Connexion
          </Button>
        </div>

        <span onClick={() => handleNavigation("/reset")}>
          Mot de passe oublié
        </span>
      </div>

    </Box>
  );
}
