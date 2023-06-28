import styled from "@emotion/styled";
import { useCallback, useRef, useState } from "react";
// import styles from "./search.module.css";
import { IconContext } from "react-icons";
import { ImSearch } from "react-icons/im";

export const Search = () => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  const handleSearchClick = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <SearchCont ref={searchRef}>
      <button onClick={() => handleSearchClick()}>
        <IconContext.Provider value={{ size: "1.4rem" }}>
          <ImSearch />
        </IconContext.Provider>
      </button>
      <input
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Search pages"
        type="text"
        value={query}
        className={showInput ? "searchInput" : "searchInput searchHidden"}
      />
      {active && query ? (
        <SearchList>
          {results.length > 0 ? (
            results.map(({ id, title, path }, index) => {
              if (index <= 5) {
                return (
                  <li key={id}>
                    <a href={path}>{title}</a>
                  </li>
                );
              }
            })
          ) : (
            <li>No results found</li>
          )}
        </SearchList>
      ) : null}
    </SearchCont>
  );
};

const SearchCont = styled.div`
  position: relative;
  display: flex;
  padding-left: 20px;
  @media (min-width: 768px) {
    padding-left: 0;
  }
  @media (min-width: 900px) {
    display: block;
  }
  & button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin: 8px 5px 0 0;
    @media (min-width: 900px) {
      display: none;
    }
  }
  & input {
    border-radius: 8px;
    display: inline-block;
    padding: 4px;
    transition: all 0.3s ease-out;
    @media (min-width: 768px) {
      bottom: 2px;
      padding: 6px;
      right: 35px;
      position: absolute;
      width: 120px;
    }
    @media (min-width: 900px) {
      bottom: -15px;
      right: 15px;
      width: 150px;
    }
  }
  & input.searchHidden {
    @media (min-width: 768px) {
      bottom: 100px;
    }
    @media (min-width: 900px) {
      bottom: -15px;
    }
  }
  & svg {
    fill: #f99d1c;
    @media (min-width: 768px) {
      fill: white;
    }
  }
`;

const SearchList = styled.ul`
  left: 20px;
  padding: 1rem;
  position: absolute;
  top: 20px;
  @media (min-width: 768px) {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    left: initial;
    min-width: 300px;
    right: 20px;
    text-transform: none;
    z-index: 8;
  }
  & > li,
  & {
    list-style-type: none;
  }
  & a {
    border-bottom: 1px solid #c27e34;
    display: block;
    line-height: 1.3;
    margin: 5px 0;
    padding-bottom: 8px;
  }
`;
