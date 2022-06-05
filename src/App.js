import React, { useState, useEffect } from "react";
import Quote from "../src/componentes/Quote";
import Spinner from "./componentes/Spinner";

const initialQuote = {
  text: 'Quote',
  author: 'Author:)'
}


function App() {
  const [quote, setQuote] = useState(initialQuote);

  const [loading, setLoading] = useState(false);


  const updateQuote = async () => {
    setLoading(true); /* cuando se actualiza se pone cargando */

    const url = "https://www.breakingbadapi.com/api/quote/random";
    /*es un proceso asincrono x eso hay que usar un await, pero el effect no acepta entonces se crea la funcion de arriba*/
    const res = await fetch(url);
    /*p/extraer la data se pone:*/
    const [newQuote] = await res.json();
    
    /* desestructuramos para simplificar lo de setquote*/
    const { quote: text, author } = newQuote;

    /*almacenamos el nuevo sestado de quote mediante setquote*/
    setQuote( {
      text: text,
      author,
    })
    setLoading(false); /*cuando termina figura el quote*/
  }

  useEffect(() => {
    updateQuote();  
  }, []); /*para poder llamar una funcion, solo la 2era vez que se renderiza un comp se usa useeffect(mas adelante repasar eso)*/

  return (
    <div className="app">
    <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
        />
      <button onClick={() => updateQuote()}> Get Another </button>

    { loading ? <Spinner /> :  <Quote quote = {quote} /> }

  
    </div>
  );
}

export default App;
