import React, { useState, useEffect, useRef } from "react";
// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    // To skip the initial render
    if (initial.current) {
      initial.current = false;
      return;
    }

    const searchTimer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [inputValue, setSearchTerm]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
