import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./profile.css";
import { Navigate, useParams } from "react-router-dom";

const Profile = () => {
  
  const [userData, setUserData] = useState({});
  const [data, setData] = useState(false)
 

//* Nel momento in cui si carica la pagina prendiamo i dati dai cookies
  //* per poi vederli laddove vogliamo che vengano visti
  useEffect(() => {
    const setData = async () => {
      const cookie = Cookies.get("user");
      const user = JSON.parse(cookie);
      setUserData(user);
    };
    setData();
  }, []);
  
 
  const [disable, setDisable] = useState(true);

  const handleToggle = () => {
    setDisable(!disable);
  };

  if(data) return <Navigate to='/profileUpdatedSuccess' />

  return (
    <div>
      <div className="containerItemsProfile" >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h1>
            Profilo utente ({userData.isAdmin ? "Amministratore" : "Guest"})
          </h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button
            className="buttonProfile"
            onClick={handleToggle}
            style={
              disable
                ? { color: "white", background: "teal" }
                : { color: "teal", background: "white" }
            }
          >
            {disable ? "ABILITA" : "DISABILITA"}
          </button>
        </div>
      </div>

      <form>
        <div className="containerProfileGenerale">
          <div className="profileContainer">
            <label htmlFor="">Nome utente</label>
            <input 
                type="text" 
                value={userData.nome} 
                disabled />
            <label htmlFor="">Cognome utente</label>
            <input type="text" value={userData.cognome} disabled />
            <label htmlFor="">Username</label>
            <input 
                type="text" 
                value={userData.username} 
                name='userData.username'
                disabled={disable} />
            <label htmlFor="">Email</label>
            <input type="text" value={userData.email} disabled />
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '25px 0'}}>
            <button>AGGIORNA</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
