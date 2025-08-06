import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changeCurrentBook } from "../Redux/slices/booksSlices";
import { useEffect } from "react";
import { Spinner } from "../Components/Preloader/Spinner";
import { AddToCart } from "../Components/Buttons/AddToCart";
import "../css/CardPage.css";
import { BookInfo } from "../Components/CardPage/BookInfo";
import { AddToFavorites } from "../Components/Buttons/AddToFavorites";

export function CardPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook, books } = useSelector((store) => store.bookSlice);

  useEffect(() => {
    if (books.length > 0) {
      dispatch(changeCurrentBook(id));
    }
  }, [books, dispatch, id]);

  if (!books.length) return <Spinner />;

  if (!currentBook) return <Spinner />;

  return (
    <div className="container margin-top">
      <div className="navigation-row">
        <Link to="/">Каталог</Link>
        <span className="breadcrumb-separator">›</span>
        <p>{currentBook.title}</p>
      </div>

      <div className="card__page--title">{currentBook.title}</div>
      <div className="card__page--content">
        <div className="card__page--img">
          <img src={currentBook.imageURL} alt="" />
          <AddToFavorites position={"top-right"} book={currentBook} />
        </div>
        <BookInfo currentBook={currentBook} />
        <div className="card__page--book-price-block">
          <div className="card__page--book-column">
            <p className="availability">📗 Паперова книга: В наявності</p>
            <p className="delivery">🚚 Доставка 1–3 дні</p>
            <p className="warranty">🔁 14 днів на повернення</p>
          </div>
          <p className="card__page--price">{currentBook.price} грн</p>
          <AddToCart book={currentBook} />
        </div>
      </div>
    </div>
  );
}
