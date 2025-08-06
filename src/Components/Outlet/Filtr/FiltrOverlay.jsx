import { useEffect, useRef } from "react";
import "../../../css/FiltrOverlay.css";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { changeFilteredBooks } from "../../../Redux/slices/booksSlices";
import { FiltrGenres } from "./FiltrGenres";
import { FiltrAuthors } from "./FiltrAuthors";
import { FiltrPrice } from "./FiltrPrice";

export function FiltrOverlay({ isOpenFiltrOverlay, setIsOpenFiltrOverlay }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpenFiltrOverlay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpenFiltrOverlay]);

  const { allGenres, allAuthors, books, filters } = useSelector(
    (store) => store.bookSlice
  );

  const filteredBooks = () => {
    const filteredData = books.filter(
      (book) =>
        (filters.authors.length === 0 ||
          filters.authors.includes(book.author)) &&
        (filters.genres.length === 0 || filters.genres.includes(book.genre)) &&
        book.price >= filters.priceMin &&
        book.price <= filters.priceMax
    );

    dispatch(changeFilteredBooks(filteredData));
  };

  useEffect(() => {
    filteredBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <div
        className={`gray-overlay ${isOpenFiltrOverlay ? "active" : ""} `}
      ></div>
      <div
        className={`filtr-overlay ${isOpenFiltrOverlay ? "active" : ""} `}
        ref={wrapperRef}
      >
        <div className="filtr-overlay-container">
          <div className="filtr-overlay-top">
            <h3>Оберіть Фільтри</h3>
            <IoClose
              onClick={() => setIsOpenFiltrOverlay(false)}
              className="icon-close"
            />
          </div>
          <div className="filtr-overlay-content">
            <FiltrAuthors allAuthors={allAuthors} filters={filters} />
            <FiltrGenres allGenres={allGenres} filters={filters} />
            <FiltrPrice />
          </div>
        </div>
      </div>
    </>
  );
}
