import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import { useAuth } from "../../pages/AuthComponent";
import Cookies from "js-cookie";

const Navigation = () => {
  const { isAuth, setIsAuth } = useAuth();
  const [userData, setUserData] = useState({});

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

  const removeJwt = async () => {
    const res = await fetch(`http://localhost:5000/auth/logout`, {
      credentials: "include",
    });
    setIsAuth(false);
    Cookies.remove('user')
  };

  if (isAuth) {
    if (userData.isAdmin) {
      return (
        <nav className="navbar">
          <Link to="/homeProtected" className="items">
            <h3 className="logo">ERUNER</h3>
          </Link>

          <ul className="nav-links">
            <Link to="/homeProtected" className="items">
              <li>Home protected</li>
            </Link>
            <Link to="/insertPost" className="items">
              <li>Inserimento post</li>
            </Link>
            <Link to="/profile" className="items">
              <li>Profilo</li>
            </Link>
            <Link to="/profile" className="items">
              <li>admin</li>
            </Link>
            <Link to="/logoutSuccess" className="items">
              <li onClick={removeJwt}>Logout</li>
            </Link>
          </ul>
        </nav>
      );
    } else{
      return (
        <nav className="navbar">
          <Link to="/homeProtected" className="items">
            <h3 className="logo">ERUNER</h3>
          </Link>

          <ul className="nav-links">
            <Link to="/homeProtected" className="items">
              <li>Home protected</li>
            </Link>
            <Link to="/insertPost" className="items">
              <li>Inserimento post</li>
            </Link>
            <Link to="/profile" className="items">
              <li>Profilo</li>
            </Link>

            <Link to="/logoutSuccess" className="items">
              <li onClick={removeJwt}>Logout</li>
            </Link>
          </ul>
        </nav>
      );
    }
         
  }

  return (
    <nav className="navbar">
      <Link to="/" className="items">
        <h3 className="logo">ERUNER</h3>
      </Link>

      <ul className="nav-links">
        <Link to="/" className="items">
          <li>Home</li>
        </Link>
        <Link to="/post/allPosts" className="items">
          <li>Blog</li>
        </Link>
        <Link to="/login" className="items">
          <li>Login</li>
        </Link>
        <Link to="/register" className="items">
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
