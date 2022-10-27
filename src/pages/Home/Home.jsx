import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import immagine from "../../images/img01.png";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="containerHome1">
        <img src={immagine} id="image01" alt="immagine" />
      </div>
      <div className="containerHome2">
        <h5>Il tuo blog personalizzato</h5>
        <div className="parag">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
            nunc id nulla egestas commodo eu vitae eros. Proin quis justo a ante
            vestibulum egestas.
          </p>
        </div>
        <Link to="/login" className="link">
          <button className="linkButton">CREA</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
