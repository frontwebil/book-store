import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findBooks,
  setSearchPageContent,
} from "../../../Redux/slices/booksSlices";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SearchCard } from "./SearchCard";

export function Search({ isFocusedForm, setIsFocusedForm }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { searchBooks } = useSelector((store) => store.bookSlice);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(findBooks(searchTerm));
      if (searchTerm.trim().length > 0) {
        setIsFocusedForm(true);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [dispatch, searchTerm, setIsFocusedForm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocusedForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToBookPage = () => {
    setIsFocusedForm(false);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      return;
    }
    setIsFocusedForm(false);
    setSearchTerm("");
    dispatch(setSearchPageContent({ searchTerm, searchBooks }));
    navigate("/search");
  };

  return (
    <>
      <div className={`search-overlay ${isFocusedForm ? "active" : ""}`}></div>
      <div className={`search-container ${isFocusedForm ? "active" : ""}`} ref={wrapperRef}>
        <form className="search-wrapper" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Знайти книгу"
            value={searchTerm}
            onFocus={() => setIsFocusedForm(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Пошук</button>
        </form>
        {searchBooks.length > 0 && isFocusedForm && (
          <>
            <div className="search-resaults">
              {searchBooks.map((book) => (
                <SearchCard
                  goToBookPage={goToBookPage}
                  book={book}
                  key={book._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
