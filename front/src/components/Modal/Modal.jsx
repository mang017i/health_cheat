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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TextareaAutosize } from "@mui/material";
import CheatService from "../../services/Cheat/index";
import UserService from "../../services/User/index";
import EquipmentService from "../../services/Equipment/index";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CategoryService from "../../services/Category/index";

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
  const [stringifyStep] = useState({});
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [creator, setCreator] = useState("");
  const [cheatIds, setCheatIds] = useState("");
  const [categories, setCategories] = useState([]);
  const [inputValues, setInputValues] = useState([""]);
  const [category, setCategory] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { setUser } = useContext(SetCurrentUser);

  useEffect(() => {
    getAllMaterials();
    getAllCategories();
    getCurrentUser();
    CheatService.findAll().then((response) => {
      let cheatId = response.data.data.length + 1;
      return setCheatIds(cheatId);
    });
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleSaveValues = () => {
    for (let i = 0; i < inputValues.length; i++) {
      const key = `step${i + 1}`;
      stringifyStep[key] = inputValues[i];
    }
  };

  const isLastInputValid = inputValues[inputValues.length - 1].length >= 5;

  const handleChange = (event) => {
    setMaterialName(event.target.value);
  };
  async function getAllCategories() {
    let categories = await CategoryService.findAll().then((response) => {
      return response.data.data;
    });
    setCategories(categories);
  }
  async function getAllMaterials() {
    let materials = await MaterialService.findAll().then((response) => {
      return response.data.data;
    });
    setMaterials(materials);
  }
  const handleTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const handleDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };
  const handleRecommendation = (event) => {
    const { value } = event.target;
    setRecommendation(value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  async function getCurrentUser() {
    await UserService.getUserById(sessionStorage.getItem("user"))
      .then((response) => {
        let createBy = response.data.data.username;
        return setCreator(createBy);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSubmit(e) {
    let materialIds = [];
    await MaterialService.findAll().then((response) => {
      materialIds = selectedMaterials.map(
        (name) =>
          response.data.data.filter((material) => material.name === name)[0]?.id
      );
      return materialIds;
    });

    const datum = {
      title,
      description,
      category_id: category,
      step: stringifyStep,
      recommendation,
      creator,
    };
    console.log(datum);
    await CheatService.create(datum).then((response) => {
      console.log(response.data.data, "response.data.data");
    });

    for (let i = 0; i < materialIds.length; i++) {
      const data = {
        material_id: materialIds[i],
        cheat_id: cheatIds,
      };
      await EquipmentService.addCheatToMaterial(data).then((response) => {
        console.log(response.data.data, "response.data.data");
      });
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("cheat_id", cheatIds);

    CheatService.uploadFile(formData)
      .then((response) => {
        console.log("Fichier téléchargé avec succès :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du fichier :", error);
      });
    window.location.reload();
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
            <div className="input_part">
              <div className="inputBasics">
                <TextField
                  className="input"
                  onChange={handleTitle}
                  id="filled-basic"
                  label="Titre"
                  variant="filled"
                />
                <Button variant="contained" component="label">
                  Télécharge une photo pour ta fiche
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                </Button>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Catégory
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleCategory}
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="textarea">
                <TextField
                  id="outlined-multiline-static"
                  onChange={handleDescription}
                  label="Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Description ici ..."
                />
                <TextField
                  id="outlined-multiline-static"
                  onChange={handleRecommendation}
                  label="Recommandation"
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Recommandation ici ..."
                />
                <Stepper orientation="horizontal">
                  {inputValues.map((value, index) => (
                    <Step key={index}>
                      <StepLabel>Step {index + 1}</StepLabel>
                      <TextareaAutosize
                        value={value}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </Step>
                  ))}
                </Stepper>
                <Button onClick={handleAddInput} disabled={!isLastInputValid}>
                  Add input
                </Button>
                <p className="matos">Sélectionne du matériel :</p>
                <Select
                  labelId="materials-multiselect-label"
                  id="Materials-multiselect"
                  multiple
                  value={materialName}
                  onChange={handleChange}
                  renderValue={(selected) => {
                    setSelectedMaterials(selected);
                    return selected.join(", ");
                  }}
                >
                  {materials.map((material) => (
                    <MenuItem key={material.id} value={material.name}>
                      <Checkbox
                        checked={materialName.indexOf(material.name) > -1}
                      />
                      <ListItemText primary={material.name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="submitBtn">
                <Button
                  onClick={() => {
                    handleSaveValues();
                    handleSubmit();
                  }}
                  variant="contained"
                >
                  Création
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
