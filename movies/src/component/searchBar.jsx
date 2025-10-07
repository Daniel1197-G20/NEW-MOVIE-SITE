import React from "react";
import SearchIcon from "../search.svg";
import "../App.css";
const SearchBar = ({ searchTerm, setSearchTerm, searchMovies }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.toLowerCase() === "honey") {
        alert("🍯 Sweet Surprise! You unlocked the Honey Easter Egg!");
      } else {
        searchMovies(searchTerm, true, 1);
      }
    }
  };

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
        onKeyDown={handleKeyDown}
      />
      <img
        src={SearchIcon}
        alt="search"
        title="Search"
        tabIndex={0}
        onClick={() => {
          if (searchTerm.toLowerCase() === "honey") {
            alert("🍯 Sweet Surprise! You unlocked the Honey Easter Egg!");
          } else {
            searchMovies(searchTerm, true, 1);
          }
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default SearchBar;
