import React, { useState, useEffect } from "react";
import "./passwordChanged.css";
import FadeLoader from "react-spinners/ClipLoader";

const PasswordChanged = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  return (
    <div className="containerPasswordChanged">
      {loader ? (
        <FadeLoader color="#0b0b0b" size={100} />
      ) : (
        <h1>Password cambiata correttamente</h1>
      )}
    </div>
  );
};

export default PasswordChanged;
