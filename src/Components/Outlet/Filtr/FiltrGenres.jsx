import { useDispatch, useSelector } from "react-redux";
import { toggleGengre } from "../../../Redux/slices/booksSlices";

export function FiltrGenres({ allGenres, filters }) {
  const { avaliableGenres } = useSelector((store) => store.bookSlice);
  const dispatch = useDispatch();
  function handleChangeGenres(genre) {
    dispatch(toggleGengre(genre));
  }
  return (
    <div className="filtr-group">
      <h3>
        Жанри <span className="filtr-group-amounts">({allGenres.length})</span>
      </h3>
      <div className="filtr-group-flex">
        {allGenres.map((genre) => (
          <label
            className={`filtr-option ${
              !avaliableGenres.includes(genre) && "disabled"
            }`}
            key={genre}
          >
            <input
              onChange={() => handleChangeGenres(genre)}
              type="checkbox"
              checked={filters.genres.includes(genre) ? true : false}
              disabled={!avaliableGenres.includes(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
}
