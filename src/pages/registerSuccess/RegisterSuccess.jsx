import React from "react";
import logoRegisterSuccess from "../../images/registerSuccess.png";
import './registerSuccess.css'

const registerSuccess = () => {
  return (
    <div className="containerRegister">
      <div className="registerContainer1">
        <h1>Registrazione avvenuta con successo</h1>
        <h4>Controlla la tua email e conferma la registrazione</h4>
      </div>
      <div className="registerContainer2">
        <img src={logoRegisterSuccess} alt="" />
      </div>
    </div>
  );
};

export default registerSuccess;
