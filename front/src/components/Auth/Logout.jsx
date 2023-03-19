import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";


const LogoutModal = ({ open, handleClose, handleLogout }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="modal"
    >
      <div className="ffffffff">
        <Button variant="contained" color="secondary" onClick={handleLogout}>Log out</Button>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
