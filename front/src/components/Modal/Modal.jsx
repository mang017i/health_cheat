import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import "./Modal.css";
import MaterialService from "../../services/Material/index";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

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

export default function TransitionsModal() {
  const [materials, setMaterials] = useState([]);
  const [materialName, setMaterialName] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  useEffect(() => {
    getAllMaterials();
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMaterialName(typeof value === "string" ? value.split(",") : value);
  };
  async function getAllMaterials() {
    let materials = await MaterialService.findAll().then((response) => {
      console.log(response.data.data, "response.data.datadddddddddddddddd");
      return response.data.data;
    });
    console.log(materials);
    setMaterials(materials);
  }
  return (
    <div>
      <Button onClick={handleOpen}>Je crée ma fiche</Button>
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
          <Box sx={style} className="modal_content">
            <div className="general">
              <div className="title">
                <div className="logo"></div>
                <h1>Health Cheat</h1>
              </div>
              <h2>Création de ma fiche</h2>
            </div>
            <div className="input_part">
              <TextField
                className="input"
                id="filled-basic"
                label="Titre"
                variant="filled"
              />
              <div className="not_important">
                <TextField
                  className="input"
                  id="filled-basic"
                  label="Username"
                  variant="filled"
                />
                <TextField
                  className="input"
                  id="filled-basic"
                  label="Télécharge une image"
                  variant="filled"
                />
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                placeholder="Description ici ..."
              />
              <TextField
                id="outlined-multiline-static"
                label="Étape importante"
                multiline
                rows={3}
                variant="outlined"
                placeholder="Étape ici ..."
              />
              <TextField
                id="outlined-multiline-static"
                label="Recommandation"
                multiline
                rows={3}
                variant="outlined"
                placeholder="Recommandation ici ..."
              />
              <Select
                labelId="materials-multiselect-label"
                id="Materials-multiselect"
                multiple
                value={materialName}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                // variant="filled"
              >
                {materials.map((material) => (
                  <MenuItem key={material.id} value={material.name}>
                    <Checkbox
                      checked={materialName.indexOf(material.name) > -1}
                    />
                    <ListItemText primary={material.name} />
                    <img src={material.image} alt="" />
                  </MenuItem>
                ))}
              </Select>
              <div className="submitBtn">
                <Button variant="contained">Création</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
