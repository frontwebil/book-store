import { useSelector } from "react-redux";
import { BookCard } from "../Components/Catalog/BookCard";
import "../css/FavoritesPage.css";
import { Link } from "react-router-dom";

export function FavoritesPage() {
  const { favoritesBook } = useSelector((store) => store.favoritesBooksSlice);

  return (
    <div className="container margin-top">
      <div className="favorites__page--title">Список Бажаного</div>
      <div className="favorites-container">
        {favoritesBook.length > 0 ? (
          favoritesBook.map((book) => <BookCard book={book} key={book._id} />)
        ) : (
          <div className="noFavorites">
            <p>У вас немає книжок в списку бажаного😥</p>
            <Link to="/#catalog" className="text-blue-500">
              До каталогу
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
