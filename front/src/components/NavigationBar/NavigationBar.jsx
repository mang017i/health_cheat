import React, { useState, useEffect, useContext } from "react";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchInCheatName from "../../components/SearchInCheatName/SearchInCheatName";
import { SetCurrentUser } from "../../utils/Context";
import UserService from "../../services/User/index";
import LogoutModal from "../Auth/Logout.jsx";
// import Button from "@mui/material/Button";

// const settings = ["Accueil", "Mon compte", "Déconnexion"];

const NavigationBar = () => {
  // const [users, setUsers] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState();

  const { setUser } = useContext(SetCurrentUser);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setOpen(false);
    sessionStorage.removeItem("user");
    handleNavigation("/");
  };
  const handleOpenUserMenu = (event) => {
    getCurrentUser();
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function getCurrentUser() {
    let users = await UserService.getUserById(
      sessionStorage.getItem("user")
    ).then((response) => {
      let currentImage = parseInt(response.data.data.avatar.match(/\d+/)[0]);
      setCurrentAvatar(currentImage);
      console.log(users);
      return response.data.data;
    });
    // setUsers(users);
  }

  return (
    <div className="navigation-bar">
      <div onClick={() => handleNavigation("/")} className="navigation-bar__logo">
        <div className="logoNav " ></div>
        <div className="appHealth">
          <p>MÉMO-SOINS</p>
          <p>IFCHU Rennes</p>
        </div>
      </div>
      <div className="navigation-bar__menu">
        <ul>
          <li onClick={() => handleNavigation("/categories")}>Catégories</li>
          {window.location.pathname !== "/cheats" ? (
            <li onClick={() => handleNavigation("/cheats")}>Fiches</li>
          ) : (
            <li
              onClick={() => handleNavigation("/cheats")}
              style={{ display: "none" }}
            >
              Fiches
            </li>
          )}
        </ul>
      </div>
      <div className="settings">
        <Box className="searchBar" sx={{ flexGrow: 1 }}>
          <SearchInCheatName />
        </Box>

        {!/^\d+$/.test(sessionStorage.getItem("user")) ? (
          <div className="auth">
            <button
              onClick={() => {
                handleNavigation("/register");
                window.location.reload();
              }}
            >
              Inscription
            </button>
            <button
              onClick={() => {
                handleNavigation("/login");
                window.location.reload();
              }}
            >
              Connexion
            </button>
          </div>
        ) : (
          <Box className="avatarUser" sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className={`minion${currentAvatar} currentAvatar`}></div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleNavigation("/cheats");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Mon compte</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleOpen();
                }}
              >
                {" "}
                <Typography textAlign="center">Déconnexion</Typography>
              </MenuItem>
              <LogoutModal
                open={open}
                handleClose={handleClose}
                handleLogout={handleLogout}
              />
            </Menu>
          </Box>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
