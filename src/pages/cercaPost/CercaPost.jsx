//* Form di ricerca
//* in questa pagina avremo il form di ricerca dei vari post a seconda di come lo vogliamo ricercare
//* cioè in base ai dati che vogliamo usare per ricercare un post o più post

//* Questo componente sarà poi passato a BlogProtected
//* Questo componente è figlio di BlogProtected infatti riceve una prop ossia setDataSearch

import { useEffect, useState } from "react";
import "./cercaPost.css";

const CercaPost = ({ setDataSearch }) => {
  //* Questo state mi serve ad array vuoto per recuperare tramite fetch gli users
  const [autori, setAutori] = useState([]);

  //* State per la ricerca tramite gli input
  const [autore, setAutore] = useState("");
  const [titolo, setTitolo] = useState("");
  const [sottoTitolo, setSottoTitolo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //* Funzione di ricerca, ovviamente è una post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/post/search", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        autore: autore == "Selezione autore" ? "" : autore,
        titolo,
        sottoTitolo,
        startDate,
        endDate,
      }),
    });
    const data = await res.json();
    console.log(data);

    //* Settiamo setDataSearch che è passato come figlio da BlogProtected
    //* I dati che otteniamo dalla ricerca gli settiamo in setDataSearch che poi saranno presenti nella pagina BlogProtected
    //* e andranno a settare dataSearche cioè riempire la variabile dataSearch con questi valori di ricerca
    setDataSearch(data);
  };

  //* Funzione per la richiesta degli user tramite fetch
  //* In questo modo andiamo a far vedere nella select degli autori tutti i nomi degli autori che hanno scritto un post
  //* Ovviamente useremo uno useEffect perché sarà al caricamento della pagina
  useEffect(() => {
    const getAuthor = async () => {
      const res = await fetch("http://localhost:5000/post/autori");
      const data = await res.json();
      const dataArray = [];
      const uniqueArray = data.filter(element => {
        const isDuplicate = dataArray.includes(element.user)
        if(!isDuplicate){
            dataArray.push(element.user)
            return true
        }
        return false
      })
      setAutori(uniqueArray);
    };

    getAuthor();
  }, []);

  const handleReset = () => {
    setAutore("");
    setTitolo("");
    setSottoTitolo("");
    setStartDate("");
    setEndDate("");
    setDataSearch(undefined);
  };

  return (
    <div className="containerFormRicerca">
      <form onSubmit={handleSubmit} className="formRicerca">
        <input
          type="text"
          placeholder="Titolo..."
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sotto titolo..."
          value={sottoTitolo}
          onChange={(e) => setSottoTitolo(e.target.value)}
        />

        <select
          id="autori"
          name="autori"
          value={autore}
          onChange={(e) => setAutore(e.target.value)}
        >
          <option>Seleziona autore</option>
          {autori.map((e, i) => (
            <option key={i}>{e.user}</option>
          ))}
        </select>
        <label id="labelDa">Da:</label>
        <input
          id="inputDa"
          type="date"
          datatype="DD MM YYYY"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label id="labelA">a:</label>
        <input
          id="inputA"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="containerButton">
          <button className="btn-success" id="btn-success">
            CERCA
          </button>
          <input
            type="button"
            className="btn btn-danger"
            onClick={handleReset}
            value="RESET"
            id="resetCerca"
          />
        </div>
      </form>

      {/* chiedere a Valerio */}
      <div>{}</div>
    </div>
  );
};

export default CercaPost;
