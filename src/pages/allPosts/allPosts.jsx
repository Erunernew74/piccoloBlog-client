//* in questa pagina andiamo a vedere tutti i post del nostro blog
//* Verranno richiamati tramite la funzione di useEffect e poi tramite una map
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./allPosts.css";
import { FcReading } from "react-icons/fc";
import CercaPost from "../cercaPost/CercaPost";

const AllPosts = () => {
  //* Per mappare la fetch della richiesta di visualizzazione dei post
  const [posts, setPosts] = useState([]);
  //* State per la ricerca dei post
  const [dataSearch, setDataSearch] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`http://localhost:5000/post/allPosts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (dataSearch) {
    if (dataSearch.length == 0) {
      return <Navigate to="/nessunElementoTrovato" />;
    }
    return (
      //* Qui vengono evidenziati i post che rientrano nella ricerca effettuata
      //* Infatti facciamo il map su dataSearch
      <>
        <h1 style={{ textAlign: "center", padding: "25px 0px" }}>Blog</h1>
        <CercaPost setDataSearch={setDataSearch} />
        <div className="containerPosts">
          {dataSearch.map((post) => {
            return (
              <div className="containerCards">
                <div key={post._id} className="cardPosts">
                  <div className="containerImageCardBlog">
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={`http://localhost:5000/images/${post._id}.${post.ext}`}
                        alt=""
                      />
                    </Link>
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <h4 className="linkItems">{post.title}</h4>
                  </Link>
                  <div className="itemsCard">
                    <p>
                      Creato il: {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p>Autore: {post.user}</p>
                    <h5>{post.content.substring(0, 200)}</h5>

                    <button id="btnReadSinglePost">
                      <Link
                        to={`/post/${post._id}`}
                        className="itemsReadSinglePost"
                      >
                        <FcReading id="icon" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    //* qui vengono elencati tutti i post al caricamento della pagina
    //* Infatti viene fatto il map su posts
    <>
      <h1 style={{ textAlign: "center", padding: "25px 0px" }}>Blog</h1>
      <CercaPost setDataSearch={setDataSearch} />
      <div className="containerPosts">
        {posts.map((post) => {
          return (
            <div className="containerCards">
              <div key={post._id} className="cardPosts">
                <div className="containerImageCardBlog">
                  <Link to={`/post/${post._id}`}>
                    <img
                      src={`http://localhost:5000/images/${post._id}.${post.ext}`}
                      alt=""
                    />
                  </Link>
                </div>
                <Link to={`/post/${post._id}`}>
                  <h2 className="linkItems">{post.title}</h2>
                </Link>
                <div className="itemsCard">
                  <p>Creato il: {new Date(post.createdAt).toLocaleString()}</p>
                  <p>Autore: {post.user}</p>
                  <h5>{post.content.substring(0, 200)}</h5>

                  <button id="btnReadSinglePost">
                    <Link
                      to={`/post/${post._id}`}
                      className="itemsReadSinglePost"
                    >
                      <FcReading id="icon" />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllPosts;
