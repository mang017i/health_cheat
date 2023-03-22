import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import CategoryService from "../../services/Category/index";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setCurrentUrl }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    let categories = await CategoryService.findAll().then((response) => {
      return response.data.data;
    });
    setCategories(categories);
  }

  const handleNavigation = (path, id) => {
    setCurrentUrl(id);
    navigate(path);
  };

  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() =>
              handleNavigation(`/category/${category.id}`, category.id)
            }
          >
            <span className="material-symbols-outlined">{category.icon}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
