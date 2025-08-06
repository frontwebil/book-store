import { useDispatch } from "react-redux";
import { tooggleAuthor } from "../../../Redux/slices/booksSlices";

export function FiltrAuthors({ allAuthors, filters }) {
  // const { avaliableAuthors } = useSelector((store) => store.bookSlice);
  const dispatch = useDispatch();
  function handleChangeAuthors(author) {
    dispatch(tooggleAuthor(author));
  }
  return (
    <div className="filtr-group">
      <h3>
        Автори{" "}
        <span className="filtr-group-amounts">({allAuthors.length})</span>
      </h3>
      <div className="filtr-group-flex">
        {allAuthors.map((author) => (
          <label key={author} className="filtr-option">
            <input
              type="checkbox"
              onChange={() => handleChangeAuthors(author)}
              checked={filters.authors.includes(author) ? true : false}
            />
            {author}
          </label>
        ))}
      </div>
    </div>
  );
}
