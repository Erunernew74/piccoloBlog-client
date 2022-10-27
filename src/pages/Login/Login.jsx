import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../AuthComponent";
import FadeLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const { isAuth, setIsAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    setIsAuth(res.ok);
  };

  if (isAuth) return <Navigate to="/loginSuccess" />;

  return (
    <div className="container">
      {loading ? (
        <FadeLoader color="#0b0b0b" size={100}/>
      ) : (
        <div className="loginContainer">
          <div className="containerTitle">
            <h1 className="titleLogin">Login page</h1>
          </div>
          <form className="formLogin" onSubmit={handleSubmit}>
            <div className="containerForm">
              <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="forgotPassword">
              <p>Dimenticato la password? Clicca <Link to='/reset-password' >qui</Link></p>
            </div>
            <div className="containerButtonLogin">
              <button className="buttonLogin">Login</button>
            </div>
          </form>
          <span className="spanRegister">
            Non sei ancora registrato? Vai <Link to="/register">qui</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
