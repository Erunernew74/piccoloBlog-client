import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./register.css";
import FadeLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // const notify =  async(e) => {
  //   e.preventDefault()
  //   if (
  //     nome === "" ||
  //     cognome === "" ||
  //     username === "" ||
  //     email === "" ||
  //     password === "" ||
  //     passwordVerify === ""
  //   ) {
  //     toast.warning("Alcuni campi sono vuoti", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  //* Per il renderig condizionale
  const [data, setData] = useState(false);
  const [input, setInput] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
    passwordVerify: "",
  });

  const { nome, cognome, username, email, password, passwordVerify } = input;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(
      nome ==='' ||
      cognome ==='' ||
      username ==='' ||
      email ==='' ||
      password ==='' ||
      passwordVerify ===''
      ) {
        return alert(`Devi compilare tutti i campi`)
      }
    

    const res = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        username: username,
        email: email,
        password: password,
        passwordVerify: passwordVerify,
      }),
    });
    const newData = await res.json();
    setData(newData);
  };

 

  const handleReset = (e) => {
    e.preventDefault();
    setInput({
      nome: "",
      cognome: "",
      username: "",
      email: "",
      password: "",
      passwordVerify: "",
    });
  };

  if (data) return <Navigate to="/registerSuccess" />;

  return (
    <div className="register-container">
      {loader ? (
        <FadeLoader color="#0b0b0b" size={100} />
      ) : (
        <div className="registerContainer">
          <h1>Register page</h1>
          <form className="registerForm" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={handleChange}
              placeholder="Nome..."
            />
            <input
              type="text"
              name="cognome"
              value={cognome}
              onChange={handleChange}
              placeholder="Cognome..."
            />
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username..."
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email..."
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password..."
            />
            <input
              type="password"
              name="passwordVerify"
              value={passwordVerify}
              onChange={handleChange}
              placeholder="Conferma password..."
            />
            <div className="registerButton">
              <button>Submit</button>
              {/* <ToastContainer /> */}
              <button onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
