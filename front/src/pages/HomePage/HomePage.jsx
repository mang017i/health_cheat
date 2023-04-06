import React from "react";
import "./HomePage.css";
import HomeAside from "../../components/HomeAside/HomeAside";
import Minion from "../../components/Minion/minion";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const setCurrentUrl = (newUrl) => {
    navigate(`/category/${newUrl}`);
  };
  return (
    <div className="container">
      <div className="home_container">
        <HomeAside />
        <Minion />
        <div className="blurHeart"></div>
        <Sidebar setCurrentUrl={setCurrentUrl} />
        <div className="presentation">
          <h2>
            Hello, hello, bienvenue sur Mémo-soins futurs soignants de l'IFCHU
            Rennes !
          </h2>
          <p className="intro">
            Nous nous appelons Erell, Anissa, Raphaëlle, Stella et Laetitia,
            nous sommes 5 étudiantes en soins infirmiers de troisième année
            (promotion 2020-2023).
          </p>
          <p className="ggg">
            Dans le cadre de l’UE optionnelle 5.7.S6, nous avons travaillé sur
            le thème des techniques de soins. Notre projet a pour but de
            faciliter les premières prises de poste et/ou les soins peu
            rencontrés lors de la formation.
          </p>
          <p className="hello">
            En effet, durant nos 3 ans de formation, nous avons toutes été
            confrontées à des soins jamais ou peu vu. Cela a amené notre groupe
            à concevoir l'idée de détailler ces soins sur un endroit accessible
            à tous,
          </p>
          <p className="hola">
            qui serait adapté à l’hygiène nécessaire en service mais également à
            la facilité d’accès.
          </p>
          <p className="bonjour">
            Avec cette application, tu peux facilement créer et stocker des
            fiches techniques de soins pour différents types de patients et de
            pathologies.
          </p>
          <p className="recapito">
            Tu peux également les organiser et les partager avec tes amis pour
            favoriser la collaboration et l'apprentissage en groupe.
          </p>
          <p className="recapita">
            En somme, mémo-soins est un outil précieux pour t'aider à améliorer
            ta connaissance et ta compréhension des soins tout en collaborant
            avec d'autres étudiants en école d'infirmier.
          </p>
          <p className="recap">
            Avec mémo-soins, tu pourras faire des fiches techniques de soins
            comme un pro et impressionner tes profs (ou tes patients) ! Alors,
            qu'attends-tu pour devenir le roi/la reine des soins ?
          </p>
        </div>
        <div className="presentationBack"></div>
        <div className="whiteCircle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default HomePage;
