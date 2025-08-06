import { useSelector } from "react-redux";
import "../../css/BookCard.css";
import { BookCard } from "./BookCard";
import { Spinner } from "../Preloader/Spinner";

export default function Catalog() {
  const { books, filteredBooks, filters } = useSelector(
    (store) => store.bookSlice
  );

  const actualData = filteredBooks.length > 0 ? filteredBooks : books;

  const isHaveFilters = Object.values(filters).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );

  if (!books || books.length === 0) return <Spinner />;

  return (
    <div className="">
      <div className="catalog" id="catalog">
        {isHaveFilters && filteredBooks.length === 0
          ? (<p className="not-found-filters">За цими фільтрами нічого не знайдено</p>)
          : actualData.map((book) => <BookCard book={book} key={book._id} />)}
      </div>
    </div>
  );
}
