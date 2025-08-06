import { useDispatch, useSelector } from "react-redux";
import "../css/OrderPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderSection } from "../Components/OrderPage/OrderSection";
import { OrderPrice } from "../Components/OrderPage/OrderPrice";
import { clearCart, setOrderId } from "../Redux/slices/booksSlices";

export function OrderPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.bookSlice);
  const [orderUserInfo, setOrderUserInfo] = useState({
    name: "Ілля",
    surname: "Сухомлин",
    tel: "+380500521571",
    mail: "gollpfd@gmail.com",
    address: "Poltava",
    comment: "",
    delivery: "Нова пошта",
    books: cart,
  });
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (cart.length <= 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const sendOrderToBackend = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderUserInfo, books: cart }),
      });

      if (!response.ok) {
        // Если статус не 2xx — выбрасываем ошибку
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка при відправці замовлення");
      }

      const data = await response.json();
      sendOrderRequestTelegram(data._id);

      console.log("Замовлення успішно створено:", data);
    } catch (error) {
      console.error("Помилка при відправленні замовлення:", error.message);
    }
  };

  const sendOrderRequestTelegram = async (orderID) => {
    const message = `
      <b>У вас нове звернення від ${orderUserInfo.name} ${orderUserInfo.surname}</b> \n<i>Номер телефону:</i>${orderUserInfo.tel}\n\nДля обробки замовлення перейдіть на сайт \n<a href="https://admin-page-books.vercel.app/">https://admin-page-books.vercel.app/</a>
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${
        import.meta.env.VITE_TELEGRAM_BOT_API_KEY
      }/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
          parse_mode: "html",
          text: message,
        }),
      }
    );

    if (response.ok) {
      setOrderUserInfo({
        name: "",
        surname: "",
        tel: "",
        mail: "",
        address: "",
        comment: "",
        delivery: "Нова пошта",
      });
      dispatch(setOrderId(orderID));
      navigate(`/thank/${orderID}`);
      setTimeout(() => {
        dispatch(clearCart());
      }, 300);
    }
  };

  return (
    <div className="container margin-top">
      <h2 className="orderPage-title">Оформлення Замовлення</h2>
      <form className="order-wrapper" onSubmit={(e) => sendOrderToBackend(e)}>
        <OrderSection
          cart={cart}
          orderUserInfo={orderUserInfo}
          setOrderUserInfo={setOrderUserInfo}
        />
        <OrderPrice totalPrice={totalPrice} cart={cart} />
      </form>
    </div>
  );
}
