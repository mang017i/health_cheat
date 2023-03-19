import React, { useState, useEffect, useContext } from "react";
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
import { SetCurrentUser } from "../../utils/Context";

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
  const { setUser } = useContext(SetCurrentUser);
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
      return response.data.data;
    });
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
          <Box sx={style} className="modal_content modalCreate">
            <div className="general">
              <div className="title">
                <div className="logo"></div>
                <h1>Health Cheat</h1>
              </div>
              <h2>Création de ma fiche</h2>
            </div>
            <div className="input_part">
              <div className="inputBasics">

              <TextField
                className="input"
                id="filled-basic"
                label="Titre"
                variant="filled"
              />
                <Button variant="contained">Télécharge une photo pour ta fiche</Button>
              </div>
              <div className="textarea">

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
              <p className="matos">Sélectionne du matériel :</p>
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
              </div>
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
