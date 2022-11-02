import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./nessunElementoTrovato.css";

const NessunElementotrovato = () => {
  return (
    <div className="containerEleNnTrovato">
      <div className="containerEleNnTrovato1">
        <h1>Nessun Elemento trovato</h1>
        <Link to="/post/allPosts">
          <button className="btnElementoNonTrovato">TORNA AL BLOG</button>
        </Link>
      </div>
      <div className="containerEleNnTrovato2">
        
      </div>
    </div>
  );
};

export default NessunElementotrovato;
