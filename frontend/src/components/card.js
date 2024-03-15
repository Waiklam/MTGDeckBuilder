import React, { useCallback } from "react";
import './../index.css';
import cardback from './../img/cardback.png';

const Card = (props) => {
    const { onAdd, card } = props;

    const addCard = useCallback((e) => {
        onAdd(card);
    }, [onAdd, card]);

    return (
        <div className="flex flex-col rounded-md sm:rounded-2xl bg-base-100 hover:shadow-2xl m-2 flex-grow-0 place-content-center overflow-hidden sm:flex-row min-w-96 sm:w-11/12 md:w-5/6 lg:w-2/3 fill-m z-20">
            <figure className='py-5 sm:w-2/5 bg-slate-300 flex justify-center items-center'><img className='h-52 sm:h-56 md:h-72 object-contain shadow-xl' src={card.img ? card.img : cardback} alt="Movie"/></figure>
            <div className="px-10 py-5 sm:w-3/5 sm:p-10 sm:text-md lg:text-lg bg-slate-100">
                <h2 className="text-xl pb-1 md:pb-2 font-semibold lg:text-2xl">{card.name}</h2>
                <p className=''><strong>Cost: </strong>{card.manaCost}</p>
                <p className=''><strong>Colors: </strong>{card.colors}</p>
                <p className=''><strong>Rarity: </strong>{card.rarity}</p>
                <p className=''><strong>Power: </strong>{card.power}</p>
                <p className=''><strong>Toughness: </strong>{card.toughness}</p>
                <p className=''><strong>Artist: </strong>{card.artist}</p>
                <p className=''><strong>Text: </strong></p><p className=''>{card.text}</p>
                <button type="button" className="py-3 px-4 mt-2 inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={addCard}>
                Add to Deck
                </button>
            </div>
        </div>
    )
}

export default Card;