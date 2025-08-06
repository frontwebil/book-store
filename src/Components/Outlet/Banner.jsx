import { Link } from "react-router-dom";
import "../../css/Banner.css";

export function Banner() {
  return (
    <div className="banner">
      <div className="banner-container margin-top">
        <p className="text-white banner-title font-bold">
          Купуй у нас — тут вигідно!
        </p>
        <p className="text-white banner-title">
          Гарантія якості, приємні ціни та швидка доставка.
        </p>
        <p className="text-white banner-title">Обирай надійне — обирай нас!</p>
        <div className="banner-buttons">
          <a href="#catalog" className="yakaboo-button">
            До покупок 🛒
          </a>
          <Link to={"/favorites"} className="yakaboo-button secondary">
            Список Бажаного ❤
          </Link>
        </div>
      </div>
    </div>
  );
}
