import React, { useState, useEffect, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "./AvatarModal.css";
import { AvatarContext } from "../../utils/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const avatarArray = [1, 2, 3, 4, 5, 6];

export default function TransitionsModal() {

  const { setSelectedAvatar } = useContext(AvatarContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSelectAvatar(event) {
    setSelectedAvatar(event.target.value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Choisis ton avatar</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className="modal"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modal_content avatarModal">
            <div className="general">
              <div className="title">
                <div className="logo"></div>
                <h1>Health Cheat</h1>
              </div>
              <h2>Choisis ton avatar</h2>
            </div>
            <div className="input_part">
              <form method="get" action="">
                <div className="avatarRadio">
                  {avatarArray.map((avatar) => {
                    return (
                      <div key={avatar} className="avatarItem">
                        <input
                          type="radio"
                          id={`minion${avatar}`}
                          name="avatar"
                          value={`minion${avatar}`}
                          onChange={handleSelectAvatar}
                        />
                        <label for={`minion${avatar}`}>
                          <div className={`minion${avatar} avatarChoose`}></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </form>
              <div className="submitBtn">
                <Button onClick={handleClose} variant="contained">
                  C'est parti !
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
