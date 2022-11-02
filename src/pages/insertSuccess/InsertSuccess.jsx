import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/ClipLoader";
import ImageSuccess from "../../images/imageSuccess.png";
import "./insertSuccess.css";

const InsertSuccess = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  return (
    <div className="containerInsertSuccess">
      {loader ? (
        <div className="containerSpinnerInsertSuccess">
          <FadeLoader color="#0b0b0b" size={100} />
        </div>
      ) : (
        <div className="insertSuccessItems">
          <div className="insertSuccessItem1">
            <h1>Inserimento avvenuto con successo</h1>
          </div>
          <div className="insertSuccessItem2">
            <img src={ImageSuccess} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InsertSuccess;
