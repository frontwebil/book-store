import { FaHeart } from "react-icons/fa";
import "../../css/AddToFavorites.css";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeFavoritesBooks } from "../../Redux/slices/favoritesBooksSlice";

export function AddToFavorites({ position, book }) {
  const { favoritesBook } = useSelector((store) => store.favoritesBooksSlice);
  const dispatch = useDispatch();
  const isLiked = favoritesBook.some((el) => el._id === book._id);

  const addFavorite = () => {
    dispatch(changeFavoritesBooks(book));
  };

  return (
    <button className={`heart-button ${position}`} onClick={addFavorite}>
      {isLiked ? (
        <FaHeart className="heart-icon liked" />
      ) : (
        <FiHeart className="heart-icon" />
      )}
    </button>
  );
}
