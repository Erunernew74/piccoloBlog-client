//* Pagina del form dove inserire la mail per farsi mandare il link per recuperare o resettare la password

import React, { useState, useEffect } from "react";
import "./emailSuccess.css";
import { Navigate } from "react-router-dom";

const FormEmail = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email == '') {
      return alert('Devi scrivere qualcosa nel campo mail')
    }
    await fetch(`http://localhost:5000/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    setData(true);
  };

  if (data) return <Navigate to="/emailSuccess" />;

  return (
    <div>
      <div className="containerEmailSuccess">
        <form className="formEmailSuccess" onSubmit={handleSubmit}>
          <div className="emailSuccessTitle">
            <h5>Inserisci la tua email per resettare la password</h5>
          </div>
          <div className="containerFormEmailSuccess">
            {/* <label htmlFor="email">Email</label> */}
            <input
              placeholder="Insert your email here..."
              className=""
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="emailSuccessButton">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default FormEmail;
