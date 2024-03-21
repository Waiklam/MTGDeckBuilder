import React, { useCallback, useState } from "react";
import './../index.css';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { onSearch } = props;


    const handleInput = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        onSearch(searchTerm);
    }, [onSearch, searchTerm]);

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row text-center rounded-3xl bg-white z-20 p-16 lg:p-0 w-full">
            <h1 className="text-3xl sm:text-4xl lg:hidden font-medium mb-10 text-center">Search For a Card!</h1>
            <div className="flex flex-row w-full justify-center">
                <input
                    className="p-2 px-5 w-2/3 mr-3 border-2 border-slate-200 rounded-2xl text-black"
                    onChange={handleInput}
                    placeholder="Search?"
                    onKeyDown={handleKeyDown}
                />
                <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-2xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}

export default SearchBar;