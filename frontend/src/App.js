import React, { useState, useCallback } from 'react';
import "./index.css";
import SearchBar from './components/searchbar';
import DeckList from './components/sidebar';
import Card from './components/card';
import background from './img/background.jpg';

function App() {
  const [data, setData] = useState([]);
  const [deck, setDeck] = useState([]);
  
  const search = useCallback((searchTerm) => {
    fetch("https://pi5bzkj7f4p5cij6amvmgb5fwm0ekksw.lambda-url.us-east-2.on.aws/" , {
      method: "POST",
      headers: { 
        "Content-type" : "application/json"
      },
      body: searchTerm
    }).then(res =>
      res.json()).then(data => {
        return setData(data);
    })
  }, [])

  const addCard = useCallback((card) => {
    if (deck.length < 100) {
      setDeck((prevDeck) => [card, ...prevDeck]);
    }
  }, [deck])

  const removeCard = useCallback ((card) => {
    setDeck((prevDeck) => prevDeck.filter((currentCard) => currentCard.id !== card.id))
  }, [])

  const saveDeck = useCallback((user, pass) => {
    fetch("https://vxllz3nhmdwxl7fgxeqgw43vt40fjdsb.lambda-url.us-east-2.on.aws/", {
      method: "POST",
      headers: { 
        "Content-type" : "application/json"
      },
      body: JSON.stringify({ "user": user, "pass": pass, "deck": deck })
    })
  }, [deck])

  const getDeck = useCallback((user, pass) => {
    fetch("https://i7gmxmnbdm5xt3jgx56evjxutm0xtcqa.lambda-url.us-east-2.on.aws/", {
      method: "POST",
      headers: { 
        "Content-type" : "application/json"
      },
      body: JSON.stringify({ "user": user, "pass": pass })
    }).then(res =>
      res.json()).then(data => {
        setDeck(data);        
    })
  }, []) 

  return (
    <div className='flex flex-col min-h-screen items-center flex-wrap bg-white duration-200'>
      <DeckList deck={deck} onRemove={removeCard} onSave={saveDeck} getDeck={getDeck} onSearch={search} />
      <div className='lg:hidden fill-m min-w-96 sm:w-11/12 md:w-5/6 mt-20 md:mt-32 z-20'>
        <SearchBar onSearch={search} />
      </div>
      <div className='pt-2 lg:pt-32'>

      </div>
      {data.map(card => (
        <Card onAdd={addCard} onRemove={removeCard} card={card} />
      ))}
      <img className='fixed z-0 w-full h-full object-cover' src={background} alt='background'/>
    </div>
  )
}

export default App