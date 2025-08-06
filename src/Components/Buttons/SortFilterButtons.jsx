import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, sortBooks } from "../../Redux/slices/booksSlices";
import { CiFilter } from "react-icons/ci";
import "../../css/SortFilterButtons.css";
import { FiltrOverlay } from "../Outlet/Filtr/FiltrOverlay";

const SortFilterButtons = () => {
  const dispatch = useDispatch();
  const [isOpenFiltrOverlay, setIsOpenFiltrOverlay] = useState(false);
  const [sortOption, setSortOption] = useState("byTitle");
  const { filters } = useSelector((store) => store.bookSlice);

  const handleChangeOption = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    dispatch(sortBooks(sortOption));
  }, [dispatch, sortOption]);

  return (
    <div className="sort-row">
      <div className="filtr-container">
        <div
          className="filtr-button"
          onClick={() => {
            setIsOpenFiltrOverlay(!isOpenFiltrOverlay);
          }}
        >
          <p>Фільтр</p>
          <CiFilter className="filtr-icon" />
        </div>
        {filters.genres.length > 0 || filters.authors.length > 0 ? (
          <div
            className="clear-all-filters"
            onClick={() => {
              dispatch(clearFilters());
              dispatch(sortBooks(sortOption));
            }}
          >
            Очистити фільтри 🗑
          </div>
        ) : (
          ""
        )}
      </div>
      <FiltrOverlay
        isOpenFiltrOverlay={isOpenFiltrOverlay}
        setIsOpenFiltrOverlay={setIsOpenFiltrOverlay}
      />
      <select
        className="sort-options"
        value={sortOption}
        onChange={handleChangeOption}
      >
        <option value="byTitle">За назвою</option>
        <option value="newest">За новизною</option>
        <option value="byPriceAsc">Від найдешевших</option>
        <option value="byPriceDesc">Від найдорожчих</option>
      </select>
    </div>
  );
};

export default SortFilterButtons;
