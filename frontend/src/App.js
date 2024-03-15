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
    fetch('/card', {
      method: "POST",
      headers: { "Content-type" : "application/json" },
      body: JSON.stringify(searchTerm)
    }).then(res =>
      res.json()).then(data => {
        setData(data);
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
    fetch('/save', {
      method: "POST",
      headers: { "Content-type" : "application/json" },
      body: JSON.stringify([user, pass, deck])
    })
  }, [deck])

  const getDeck = useCallback((user, pass) => {
    fetch('/retrieveDeck', {
      method: "POST",
      headers: { "Content-type" : "application/json" },
      body: JSON.stringify([user, pass])
    }).then(res =>
      res.json()).then(data => {
        setDeck(data);        
    })
  }, []) 

  return (
    <div className='flex flex-col min-h-screen items-center flex-wrap dark:bg-black bg-white duration-200'>
      <DeckList deck={deck} onRemove={removeCard} onSave={saveDeck} getDeck={getDeck} />
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