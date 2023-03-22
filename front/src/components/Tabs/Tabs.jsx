import React, { useState } from "react";
import "./Tabs.css";
import CheatsIndex from "../CheatsIndex/CheatsIndex";
import SearchInCategory from "../SearchInCategory/SearchInCategory";
import BookmarkIndex from "../BookmarkIndex/BookmarkIndex";

function TabsComponent() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="tabs_container">
      <div className="tabs_nav">
        <button onClick={() => handleTabClick(1)}>All Cheats</button>
        <button onClick={() => handleTabClick(2)}>Bookmarks</button>
      </div>
      <div className="tabsContent">
        {activeTab === 1 && (
          <div>
            <CheatsIndex />
          </div>
        )}
        {activeTab === 2 && (
          <div className="bookmark_container">
            <BookmarkIndex />
          </div>
        )}
      </div>
    </div>
  );
}
export default TabsComponent;
