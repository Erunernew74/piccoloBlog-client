import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const HomeProtected = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const setData = async () => {
      const cookie = Cookies.get("user");
      const user = JSON.parse(cookie);
      setUserData(user);
    };
    setData();
  }, []);

  if (userData.isAdmin) {
    return (
      <div>
        <h1>Pagina amministratore: {userData.nome} {userData.cognome}</h1>
        <h3>{userData.email}</h3>
      </div>
    );
  }

  return(
    <div>
      <h1>Pagina utente {userData.nome}</h1>
    </div>
  )
};

export default HomeProtected;
