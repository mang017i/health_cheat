import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./Auth.css";
import AuthService from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import AvatarModal from "../AvatarModal/AvatarModal";
import { AvatarContext } from "../../utils/Context";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Email } from "@mui/icons-material";
import { TextField, FormControl, FormHelperText } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);

    // Check if the entered email is valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError(!emailRegex.test(value));
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(event.target.value);
    setPasswordLength(newPassword.length);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    if (e.target.value.length >= 5) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  const handleRegister = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Email incorrect");
      return;
    } else if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    } else if (password.length < 5) {
      alert("Le mot de passe doit contenir au moins 5 caractères");
      return;
    } else if (username.length < 5) {
      alert("Le nom d'utilisateur doit contenir au moins 5 caractères");
      return;
    } else if (!selectedAvatar) {
      alert("Veuillez choisir un avatar");
      return;
    }
    const avatar = `../../../../back/public/images/avatar/${selectedAvatar}.png`;
    AuthService.register({ username, email, password, avatar })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
    handleNavigation("/login");
  };

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
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
            <h1>Mémo soins</h1>
          </div>
          <h2>Inscription</h2>
          <p>
            J'ai déjà mon compte ?{" "}
            <span onClick={() => handleNavigation("/login")}>
              Je me connecte
            </span>
          </p>
        </div>

        <div className="input_part">
          <div className={`${selectedAvatar} avatarChoose`}></div>
          <AvatarModal />
          <TextField
            onChange={handleUsernameChange}
            className="input"
            id="filled-basic"
            label="Username"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {validUsername ? (
                    <Tooltip title="Valid username">
                      <IconButton className="infoIcon">
                        <CheckIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Username must be at least 5 characters long">
                      <IconButton className="infoIcon">
                        <InfoIcon color="black" />
                      </IconButton>
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <FormControl className="input" error={error}>
            <TextField
              onChange={handleEmailChange}
              label="Email"
              variant="filled"
              type="email"
              InputProps={{
                endAdornment: (
                  <Email
                    color={error ? "error" : "action"}
                    fontSize="small"
                    titleAccess={error ? "Invalid email" : "Valid email"}
                    className = "emailIcon"
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
          <TextField
            id="confirm-password-input"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            variant="filled"
            className="input"
            onChange={handleConfirmPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfirmPasswordClick}>
                    {showConfirmPassword ? (
                      <VisibilityOff
                        style={{
                          color: password === confirmPassword ? "black" : "red",
                        }}
                      />
                    ) : (
                      <Visibility
                        style={{
                          color: password === confirmPassword ? "black" : "red",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="submitBtn">
            <Button onClick={() => handleRegister()} variant="contained">
              Inscription
            </Button>
          </div>
        </div>
      </Box>
    </AvatarContext.Provider>
  );
}
