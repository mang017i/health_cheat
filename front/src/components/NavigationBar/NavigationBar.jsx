import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import UserService from "../../services/User/index";
import SearchInCheatName from "../../components/SearchInCheatName/SearchInCheatName";

const settings = ["Accueil", "Mon compte", "Déconnexion"];

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const [anchorElUser, setAnchorElUser] = useState([]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    let users = await UserService.getUserById(1).then((response) => {
      return response.data.data;
    });
    console.log(users);
    setUsers(users);
  }

  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo">
        <div className="logoNav" onClick={() => handleNavigation("/")}></div>
      </div>
      <div className="navigation-bar__menu">
        <ul>
          <li className="menuNav" onClick={() => handleNavigation("/categories")}>Catégories</li>
          <li className="menuNav" onClick={() => handleNavigation("/cheats")}>Fiches</li>
        </ul>
      </div>
      <div className="settings">
        <SearchInCheatName />

        <Box className="avatarUser" sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <img className="avatar" src={users.avatar} alt="" />
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default NavigationBar;
