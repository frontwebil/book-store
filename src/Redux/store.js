import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/booksSlices";
import favoritesBooksSlice from "./slices/favoritesBooksSlice";

export const store = configureStore({
  reducer: {
    bookSlice,
    favoritesBooksSlice,
  },
});
