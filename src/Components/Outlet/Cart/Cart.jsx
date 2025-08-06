import { IoCart, IoClose } from "react-icons/io5";
import "../../../css/Cart.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import {
  clearCart,
  closeCart,
  toggleCart,
} from "../../../Redux/slices/booksSlices";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, isOpenCart } = useSelector((store) => store.bookSlice);
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        dispatch(closeCart());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isOpenCart) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll"); // очищення на розмонтування
    };
  }, [isOpenCart]);

  return (
    <>
      <div className={`gray-overlay ${isOpenCart ? "active" : ""}`}></div>
      <div ref={wrapperRef}>
        <div
          className="flex items-center gap-1.5 header-text cursor-pointer"
          onClick={() => dispatch(toggleCart())}
        >
          <p>Кошик</p>
          <IoCart className="cart-icon" />
        </div>
        <div className={`cart-menu ${isOpenCart ? "active" : ""}`}>
          <div className="cart-menu-container">
            <div className="cart-menu-top">
              <h3>Кошик</h3>
              <IoClose
                onClick={() => dispatch(toggleCart())}
                className="icon-close"
              />
            </div>
            {cart.length > 0 && (
              <p
                className="clear-all-button"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Очистити корзину 🗑
              </p>
            )}

            <div className="cart-menu-content">
              {cart.length > 0 ? (
                cart.map((el) => <CartCard book={el} key={el._id} />)
              ) : (
                <p className="empty-cart">Ваш кошик порожній😶</p>
              )}
            </div>
            {cart.length > 0 ? (
              <div className="cart-menu-order-section">
                <div className="order-summary">
                  <p className="order-total-label">Всього</p>
                  <p className="order-total-amount">{totalPrice} грн</p>
                </div>
                <Link
                  to="/order"
                  className="checkout-button"
                  onClick={() => dispatch(closeCart())}
                >
                  Перейти до оформлення замовлення
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
