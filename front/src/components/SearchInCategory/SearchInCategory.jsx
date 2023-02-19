import React, {useState, useEffect} from 'react';
import './SearchInCategory.css';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Theme, useTheme} from '@mui/material/styles';
import CategoryService from '../../services/Category/index';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchInCategory = () => {


  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setPersonName(

      typeof value === 'string' ? value.split(',') : value,
    );
  };

  async function getAllCategories() {
    const response = await CategoryService.findAll().then((response) => {
      console.log(response.data);
    });

    setCategories(response.data);
    console.log(JSON.stringify(response.data, null, 2), "response.data");
  }



  return (
    <div>
    {console.log(categories)}

      <FormControl sx={{m: 1, minWidth: 120}}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Categorie" />}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}

export default SearchInCategory;
