import { Link } from "react-router-dom";
import { AddToCart } from "../Buttons/AddToCart";
import { AddToFavorites } from "../Buttons/AddToFavorites";

export function BookCard({ book }) {
  return (
    <div className="book-card">
      <Link to={`/book/${book._id}`}>
        <img src={book.imageURL} alt="" className="book-card-img" />
      </Link>
      <AddToFavorites position={"top-right"} book={book} />
      <Link to={`/book/${book._id}`}>
        <h3 className="book-card-title">{book.title}</h3>
      </Link>
      <h2 className="book-card-author">{book.author}</h2>
      <p className="book-card-price">{book.price} грн</p>
      <AddToCart book={book} />
    </div>
  );
}
