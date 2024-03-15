import React, { useCallback } from "react";
import './../index.css';
import minus from './../img/minus.png'

const DeckCard = (props) => {
    const { card, onRemove } = props;

    const removeCard = useCallback((e) => {
        onRemove(card)
    }, [onRemove, card])

    return (
        <div className="flex flex-row overflow-hidden flex-nowrap pl-1 group border-2 border-slate-200 rounded-lg hover:border-slate-400 justify-between items-center">
            <p className="text-nowrap text-lg sm:text-lg overflow-hidden z-10">{card.name}</p>
            <button className="flex justify-center items-center leading-none mx-2 text-center w-4 z-20" onClick={removeCard}><img className="h-4 w-4 max-w-none" src={minus} alt="minus"/></button>
        </div>
    )
}

export default DeckCard;