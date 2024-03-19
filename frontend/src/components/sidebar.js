import React, { useCallback, useState } from "react";
import './../index.css';
import DeckCard from "./deckCard";
import SearchBar from "./searchbar";


const DeckList = (props) => {
    const { deck, onRemove, onSave, getDeck, onSearch } = props;
    const [showSidebar, setShowSidebar] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleUser = useCallback((e) => {
        setUser(e.target.value);
    }, [])

    const handlePass = useCallback((e) => {
        setPass(e.target.value);
    }, [])

    const handleSave = useCallback(() => {
        onSave(user, pass)
    }, [user, pass, onSave])

    const handleGet = useCallback(() => {
        getDeck(user, pass)
    }, [user, pass, getDeck])

    return (
        <div className="w-full">
            <div className="flex fixed w-full items-center justify-start px-6 h-16 md:px-9 md:h-24 bg-white text-gray-700 border-b border-gray-200 z-50">
                <div className="flex flex-row">
                    <svg
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <h1 className="text-2xl md:text-3xl mx-3 md:mx-6">MTG Card Searcher</h1>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center right-0 ml-20">
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>   
            <div className={`left-0 sm:w-1/3 sm:min-w-96 w-full sm:border-r-2 border-black bg-white p-10 fixed text-black h-full ease-in-out duration-300 z-50 overscroll-contain ${showSidebar ? "translate-x-0 " : "-translate-x-full"}`}>
                <button
                    className={`left-0 text-4xl text-black items-center cursor-pointer fixed top-6 z-50 ${showSidebar ? "translate-x-10 " : "-translate-x-full"} ease-in-out duration-300`}
                    onClick={() => setShowSidebar(!showSidebar)}
                    >
                    x
                </button>
                <h1 className="mt-10 mb-4 font-semibold text-4xl">DeckList</h1>
                <div className="flex flex-row">
                    <form >
                        <div className="flex flex-row justify-between">
                            <p className="mr-2 text-2xl">User: </p>
                            <input type="text" id="user" name="username" className="border-2 rounded-lg px-1 w-60 text-xl" onChange={handleUser} ></input>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="mr-2 text-2xl">Pass: </p>
                            <input type="password" id="pass" name="password" className="border-2 rounded-lg px-1 w-60 text-xl" onChange={handlePass} ></input>
                        </div>
                        <div className="flex flex-row justify-evenly">
                            <submit className="text-md text-center my-2 mr-2 px-4 py-1 inline-flex items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-slate-400 text-white hover:bg-slate-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleGet} >Get Deck</submit>
                            <submit className="text-md text-center my-2 px-4 py-1 inline-flex items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-slate-400 text-white hover:bg-slate-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleSave} >Save Deck</submit>
                        </div>
                        
                    </form>
                </div>
                
                <div className="overflow-scroll no-scrollbar h-2/3 border-2 border-slate-900 rounded-md">
                    <div className="m-1">
                        {deck.map(card => (
                            <DeckCard card={card} onRemove={onRemove} />
                        ))}
                    </div>
                    
                </div>    
            </div>
        </div>
        
    )
}

export default DeckList;