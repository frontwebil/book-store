import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../../Redux/slices/booksSlices";

export function CartCard({ book }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(book));
  };

  return (
    <div className="search-card" key={book._id}>
      <div className="search-card-info">
        <Link to={`/book/${book._id}`}>
          <img src={book.imageURL} alt="" />
        </Link>
        <div className="search-card-info-text">
          <Link to={`/book/${book._id}`}>
            <h4>{book.title}</h4>
          </Link>
          <p>{book.author}</p>
          <p className="search-card-price">{book.price} грн</p>
        </div>
      </div>
      <p className="search-card-delete" onClick={() => handleDelete()}>
        Видалити
      </p>
    </div>
  );
}
