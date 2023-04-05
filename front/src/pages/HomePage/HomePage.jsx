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
          <h2>Bienvenue sur Mémo-soins futurs soignants de l'IFCHU Rennes !</h2>
          <p className="ggg">
            Cette application est l'idée de six étudiantes en école d'infirmier
            : Laeticia, Erell, Katell, Raphaëlle, Stella et Anissa. Elles ont
            travaillé ensemble pour faciliter l'apprentissage et le partage des
            fiches techniques de soins.
          </p>
          <p className="hello">
            Avec cette application, tu peux facilement créer et stocker des
            fiches techniques de soins pour différents types de patients et de
            pathologies. Tu peux également
          </p>
          <p className="hola">
            les organiser et les partager avec tes amis pour favoriser la
            collaboration et l'apprentissage en groupe.
          </p>
          <p className="bonjour">
            L'application est régulièrement mise à jour pour intégrer les
            dernières pratiques et découvertes en matière de soins.
          </p>
          <p className="recapito">
            Cela te permet de toujours avoir accès aux informations les plus
            récentes et les plus pertinentes en matière de soins.
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
