import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import CategoryService from "../../services/Category/index";

// import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    let categories = await CategoryService.findAll().then((response) => {
      return response.data.data;
    });
    console.log(categories);
    setCategories(categories);
  }
  return (
    <nav>
      <ul>
        {categories.map((category) => (
            <li>
              <span class='material-symbols-outlined'>{category.icon}</span>
            </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
