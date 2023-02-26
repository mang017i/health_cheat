import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";
import IndexCheatPage from "./pages/IndexCheatPage/IndexCheatPage";
import { FilteredCheatsContext } from "./utils/Context";


function App() {

  const [filteredCheats, setFilteredCheats] = useState([])

  const contextValue = {
    filteredCheats: filteredCheats,
    updateFilteredCheats: setFilteredCheats
  }



  return (
    <div className="health_cheat">
      <BrowserRouter>
      <FilteredCheatsContext.Provider value={contextValue}>
        <NavigationBar />
        <Sidebar />
        {/* <SearchInCategory /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cheats" element={<IndexCheatPage />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="*" element={<h1>404</h1>} />
          {/* <Route path="/cheat/:id" element={<ShowCheatPage />} /> */}*

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
        </FilteredCheatsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
