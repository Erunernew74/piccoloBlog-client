import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageUploads from "../imageUploads/ImageUploads";

const SinglePostUpdated = () => {
  //* State per il rendering condizionale
  const [render, setRender] = useState(false);
  //* Per il settaggio dell'immagine che se vogliamo la possiamo cambiare
  const [immagine, setImmagine] = useState("");
  //* Per la validazione dell'immagine da inserire come prop per il form uploadImages
  const [valideImage, setValidImage] = useState(false);
  const [file, setFile] = useState();
  //* Per lo state degli input
  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const { id } = useParams();
  const { title, subtitle, content } = inputs;

  //* useEffect che mi permette di vedere i dati all'interno degli input
  //* nel momento in cui viene cariacat la pagina
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`http://localhost:5000/post/${id}`);
      const data = await res.json();
      setInputs({
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
      });
      setImmagine(`${data._id}.${data.ext}`);
    };
    getPost();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  //* Codice per eseguire l'update anche dell'immagine
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUpdate = new FormData();
    dataUpdate.append("title", title);
    dataUpdate.append("subtitle", subtitle);
    dataUpdate.append("content", content);
    dataUpdate.append("oldImage", immagine);
    dataUpdate.append("image", file);

    const res = await fetch(`http://localhost:5000/post/update/${id}`, {
      method: "PUT",
      body: dataUpdate,
    });
    const data = await res.json();
    setRender(data);
  };

  if (render) {
    window.location.href = "/";
  }
  return (
    <div className="containerFormInsert">
      <form
        className="formIsert"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Update post</h1>
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
          cols="60"
          rows="10"
          id="textAreaPost"
        ></textarea>

        {/* <SunEditor 
          name='content'
          value={content}
          onChange={handleChange}
          width='47%'
          height='250px'
        /> */}
        <img
          src={`http://localhost:5000/images/${immagine}`}
          style={{
            width: "100px",
            height: "100px",
          }}
          className="imageUpdate"
        />
        <ImageUploads
          setValidImage={setValidImage}
          file={file}
          setFile={setFile}
        />

        <div className="buttonFormInsert">
          <button>UPDATE POST</button>
          <button id="resetInsert">RESET</button>
        </div>
      </form>
    </div>
  );
};

export default SinglePostUpdated;
