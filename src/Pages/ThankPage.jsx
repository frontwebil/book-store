import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/ThankPage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function ThankPage() {
  const { id } = useParams();
  const { orderId } = useSelector((store) => store.bookSlice);

  const navigate = useNavigate();

  useEffect(() => {
    if (id !== orderId) {
      navigate("/");
    }
  }, [id, navigate, orderId]);

  return (
    <div className="container margin-top">
      <div className="thank-page-text">
        <h3>Ваше Замовлення Прийнято!</h3>
        <p>
          Протягом 30 хвилин ви отримаєте лист на вказану електронну пошту із
          оновленням статусу замовлення. За потреби з вами зв'яжеться наш
          менеджер.
        </p>
        <h2>ID вашого замовлення : {orderId}</h2>
        <Link to={"/"}>На головну!</Link>
      </div>
    </div>
  );
}
