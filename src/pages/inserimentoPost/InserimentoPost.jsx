import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ImageUploads from "../imageUploads/ImageUploads";
import Cookies from "js-cookie";
import "./inserimentoPost.css";

const InserimentoPost = () => {
  //* Per il rendering condizionale
  const [data, setData] = useState(false);
  //* Per la validazione dell'immagine
  const [validImage, setValidImage] = useState(false);
  //* Per passare le props a ImageUploads.jsx
  const [file, setFile] = useState();

  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    content: "",
    user: "",
  });

  const { title, subtitle, content, user } = input;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInput({
      title: "",
      subtitle: "",
      content: "",
      user: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validImage) {
      return alert(`L'immagine selezionata non è valida`);
    }

    const data = new FormData();
    data.append("title", title);
    data.append("subtitle", subtitle);
    data.append("content", content);
    data.append("user", userData.username);
    data.append("image", file);

    const res = await fetch(`http://localhost:5000/post/insertPost`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data,
    });
    const ris = await res.json();
    setData(ris);
  };

  if (data) return <Navigate to="/insertSuccess" />;

  return (
    <div className="containerFormInsert">
      <form
        className="formIsert"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Inserimento post</h1>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Inserisci il titolo del post"
        />
        <input
          type="text"
          name="subtitle"
          value={subtitle}
          onChange={handleChange}
          placeholder="Inserisci il sottotitolo del post"
        />
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          cols="30"
          rows="10"
          placeholder="Inserisci il contenuto del post"
        ></textarea>

        {/* <SunEditor 
          name='content'
          value={content}
          onChange={handleChange}
          width='47%'
          height='250px'
        /> */}
        <ImageUploads
          setValidImage={setValidImage}
          file={file}
          setFile={setFile}
          className="imageUploadsContainer"
        />
        <input
          type="text"
          name="user"
          value={userData.username}
          onChange={handleChange}
          placeholder="User"
          readOnly
        />
        <div className="buttonFormInsert">
          <button>SUBMIT</button>
          <button id="resetInsert" onClick={handleReset}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default InserimentoPost;
