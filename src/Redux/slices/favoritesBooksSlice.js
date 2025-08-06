import { createSlice } from "@reduxjs/toolkit";

function loadFavoritesFilms() {
  const dataLocal = localStorage.getItem("favoritesBooks");
  const parseData = dataLocal ? JSON.parse(dataLocal) : [];
  return parseData;
}

const initialState = {
  favoritesBook: loadFavoritesFilms(),
  status: "",
  statusMessage: "",
};

const favoritesBookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeFavoritesBooks: (state, action) => {
      const book = action.payload;
      const isFavoriteBook = state.favoritesBook.some(
        (el) => el._id === book._id
      );
      if (!isFavoriteBook) {
        state.favoritesBook.push(book);
        const stringifyDataBooks = JSON.stringify(state.favoritesBook);
        localStorage.setItem("favoritesBooks", stringifyDataBooks);
        state.status = "addedFavorite";
        state.statusMessage = book.title;
      } else {
        state.favoritesBook = state.favoritesBook.filter(
          (el) => el._id !== book._id
        );
        const stringifyDataBooks = JSON.stringify(state.favoritesBook);
        localStorage.setItem("favoritesBooks", stringifyDataBooks);
        state.status = "deletedFavorite";
        state.statusMessage = book.title;
      }
    },
  },
});

export default favoritesBookSlice.reducer;
export const { changeFavoritesBooks } = favoritesBookSlice.actions;
