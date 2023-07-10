import React, { useState } from "react";
import '../styles/SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/data?q=${searchQuery}`);
            const jsonData = await response.json();
            setSearchResults(jsonData);
            console.log(jsonData.fName);
            console.log(searchResults.fName);
            console.log(searchResults.lName);
            setIsSearchPerformed(true);


        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    console.log(searchResults);

    return (
        <>
            <h2 className="SearchBarHeading">Find A Person</h2>
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input
                        className="input2"
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    ></input>
                </div>
                <br></br>
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {isSearchPerformed && searchQuery !== "" && (
                // <div className="search-results">
                //     <h3>Search Results:</h3>
                //     <p>First Name: {searchResults.fName}</p>
                //     <p>Last Name: {searchResults.lName}</p>
                //     <p>Email: {searchResults.email}</p>
                //     <p>Mobile Number: {searchResults.mobileNum}</p>
                // </div>
                <div className="search-results table-layout">
                    <h3>Search Results:</h3>
                    <p>
                        <span>First Name:</span>
                        <span>{searchResults.fName}</span>
                    </p>
                    <p>
                        <span>Last Name:</span>
                        <span>{searchResults.lName}</span>
                    </p>
                    <p>
                        <span>Email:</span>
                        <span>{searchResults.email}</span>
                    </p>
                    <p>
                        <span>Mobile Number:</span>
                        <span>{searchResults.mobileNum}</span>
                    </p>
                </div>
            )}




            {/* <p>fName: {searchResults.fName}</p>
            <p>lName: {searchResults.lName}</p>
            <p>Email: {searchResults.email}</p>
            <p>Mobile Number: {searchResults.mobileNum}</p>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Search Results:</h3>
                    {searchResults.map((result) => (
                        <div key={result._id}>
                            <p>fName: {result.fName}</p>
                            <p>lName: {result.lName}</p>
                            <p>Email: {result.email}</p>
                            <p>Mobile Number: {result.mobileNum}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )} */}

        </>
    );
}

export default SearchBar;
