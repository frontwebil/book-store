import { FaHeart, FaSearch } from "react-icons/fa";
import "../../css/Header.css";
import { Link, useLocation } from "react-router-dom";
import { Search } from "./Search/Search";
import { Cart } from "./Cart/Cart";
import ScreenWidth from "../ScreenWidthValue";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const screenWidth = ScreenWidth();
  const [isFocusedForm, setIsFocusedForm] = useState(false);

  return (
    <header className="bg-[#FFFFFF]">
      <div className="container flex justify-between items-center gap-2.5">
        <Link
          to={"/"}
          className="text-2xl text-[#E10098] font-bold cursor-pointer header-max-width-logo"
        >
          Книжка тут
        </Link>
        {location.pathname !== "/order" ? (
          <>
            <Search
              isFocusedForm={isFocusedForm}
              setIsFocusedForm={setIsFocusedForm}
            />
            <div className="flex items-center header-max-width">
              {screenWidth <= 680 ? (
                <FaSearch className="search-icon-header" onClick={()=>setIsFocusedForm(true)}/>
              ) : (
                ""
              )}
              <Cart className="cart-icon" />
              <Link
                to={"/favorites"}
                className="flex items-center gap-1.5 header-text cursor-pointer"
              >
                <p>Список Бажаного</p>
                <FaHeart className="favorites-icon" />
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
