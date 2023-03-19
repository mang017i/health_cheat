import React, { useState, useEffect } from "react";
import "./Minion.css";

// import { useNavigate } from "react-router-dom";

const Minion = () => {
  return (
    <section className="content" id="target">
      <ul className="hair hair-left">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul className="hair hair-right">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="body">
        <div className="glasses">
          <span className="band band-left"></span>
          <span className="band band-right"></span>
          <div className="glass">
            <div className="iris iris-left">
              <div className="shine"></div>
            </div>
          </div>
          <div className="glass">
            <div className="iris iris-right">
              <div className="shine"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mouth">
        <ul className="teeth">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="pants">
        <div className="belt belt-left"></div>
        <div className="belt belt-right"></div>
      </div>
      <div className="super-pants">
        <div className="symbol">
          <div className="s-first-part"></div>
          <div className="s-second-part"></div>
        </div>
      </div>
      <div className="arm arm-left">
        <div className="hand">
          <ul className="fingers fingers-left">
            <li className="finger"></li>
            <li className="finger"></li>
            <li className="finger"></li>
          </ul>
        </div>
      </div>
      <div className="arm arm-right">
        <div className="hand">
          <ul className="fingers fingers-right">
            <li className="finger"></li>
            <li className="finger"></li>
          </ul>
        </div>
      </div>
      <div className="legs">
        <div className="leg"></div>
        <div className="leg"></div>
      </div>
      <div className="shoes shoes-left"></div>
      <div className="shoes shoes-right"></div>
      <div className="coat"></div>
    </section>
  );
};

export default Minion;
