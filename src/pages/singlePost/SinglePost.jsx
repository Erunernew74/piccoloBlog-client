import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./singlePost.css";
import { GrUpdate } from 'react-icons/gr'

const SinglePost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const fecthPost = async () => {
      const res = await fetch(`http://localhost:5000/post/${id}`);
      const data = await res.json();
      setPosts(data);
    };
    fecthPost();
  }, []);
  return (
    <div className="containerPost">
      <h1>{posts.title}</h1>
      <div className="containerImageSinglePost">
        <img
          src={`http://localhost:5000/images/${posts._id}.${posts.ext}`}
          alt=""
        />
      </div>

      <div className="containerItemsSinglePost">
        <h2 id="subtitle">{posts.subtitle}</h2>
        <h4 id="user">Utente: {posts.user}</h4>
        <h4>Creato il: {new Date(posts.createdAt).toLocaleString()}</h4>
        <Link to={`/post/update/${id}`}>
        <GrUpdate id='iconUpdate'/>
        </Link>
        
      </div>

      <div className="containerContentSinglePost">
        <p>{posts.content}</p>
      </div>
    </div>
  );
};

export default SinglePost;
