import React from 'react'
import './SearchBar.css'
import { useState } from 'react';

const SearchBar = (props) => {

    const [term, setTerm] = useState('');

    const search = () => {
        props.onSearch(term)
    }

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            return search()
        }
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist"
                    onChange={handleTermChange}
                    onKeyPress={handleEnter}
                    />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar;