import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

export function SearchCard({ book, goToBookPage }) {
  return (
    <Link
      className="search-card"
      to={`/book/${book._id}`}
      key={book._id}
      onClick={() => goToBookPage()}
    >
      <div className="search-card-info">
        <img src={book.imageURL} alt="" />
        <div className="search-card-info-text">
          <h4>{book.title}</h4>
          <p>{book.author}</p>
          <p className="search-card-price">{book.price} грн</p>
        </div>
      </div>
      <MdNavigateNext className="NavigateIcon" />
    </Link>
  );
}
