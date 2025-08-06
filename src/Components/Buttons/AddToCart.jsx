import { useDispatch } from "react-redux";
import { addBookToCart, toggleCart } from "../../Redux/slices/booksSlices";

export function AddToCart({ book }) {
  const dispatch = useDispatch();

  const addToCart = (event) => {
    event.stopPropagation();
    dispatch(addBookToCart(book));
    dispatch(toggleCart());
  };

  return (
    <button className="addToCart-button" onClick={addToCart}>
      Додати до кошика
    </button>
  );
}
