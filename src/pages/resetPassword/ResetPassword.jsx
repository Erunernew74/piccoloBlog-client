//* Pagina dove inserisco la nuova password dopo che ho cliccato sul link che mi è stato mandato via email

import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PasswordChanged from "../passwordChanged/PasswordChanged";
import "./resetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState()
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("");

  const [changedPassword, setChangedPassword] = useState("")

  //* Verifichiamo se il token che gli abbiamo spedito è quello corretto e lo facciamo
  //* nel momento in cui si carica la pagina
  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`)
      setIsValidToken(res.ok)
    }
    checkToken()
  }, [])


  //* Spediamo la password nuova all'utente verificando che la nuova password
  //* inserita corrisponda
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      return alert("Le due password non coincidono")
    }
    const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        newPassword: password
      })
    })
    setChangedPassword(res.ok)
  }

  //* Fin quando non verifichiamo che il token è valido, per cui all'inizio lo mettiamo
  //* undefined, non facciamo vedere nulla nella pagina, neanche il form
  if (isValidToken == undefined) return null;

  //* Se il token non è valido lo reindirizziamo nella pagina di login
  if (isValidToken == false) return <Navigate to="/login" />;

  //* Se la password è stata cambiata correttamente allora lo reindirizziamo verso
  //* un altro componente e diciamo che il cambiamento è avvenuto con successo
  if(changedPassword) return <PasswordChanged />


  return (
    <div className="containerFormResetPass">
      <div className="formContainerresetPass">
        <div className="containeTitleResetPass">
          <h4>Inserisci la nuova password</h4>
        </div>
        <form className="formResetPass" onSubmit={handleSubmit}>
          <div className="formResetPassInput">
            <label htmlFor="" className="formResetLabel">
              New password
            </label>
            <input 
              type="password" 
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formResetInput" />
            <label htmlFor="" className="formResetLabel">
              Confirm new password
            </label>
            <input 
              type="password" 
              name='cPassword'
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="formResetInput" />
          </div>
          {/* <div className="confirmNewPassword">
              
            </div> */}
          <button className="buttonResetPass">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
