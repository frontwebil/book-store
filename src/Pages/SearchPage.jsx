import { useSelector } from "react-redux";
import "../css/SearchPage.css";
import { BookCard } from "../Components/Catalog/BookCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SearchPage() {
  const navigate = useNavigate();
  const { searchPageContent } = useSelector((store) => store.bookSlice);
  const { term, books } = searchPageContent;

  useEffect(() => {
    if (!term && books.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container margin-top">
      <h3 className="searchPage-title">Результати пошуку "{term}"</h3>
      <div className="searchPage-container">
        {books.length > 0 ? (
          books.map((book) => <BookCard book={book} key={book._id} />)
        ) : (
          <div className="noFavorites">
            <p>Нічого не знайдено по запиту "{term}"</p>
            <Link to="/#catalog" className="text-blue-500">
              На головну
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
