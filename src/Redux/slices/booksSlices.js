import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "axios";

function loadCartData() {
  const dataLocal = localStorage.getItem("cart");
  const parseData = dataLocal ? JSON.parse(dataLocal) : [];
  return parseData;
}

const initialState = {
  books: [],
  startBooks: [],
  filteredBooks: [],
  filters: {
    genres: [],
    authors: [],
    priceMin: "",
    priceMax: "",
  },
  currentBook: null,
  cart: loadCartData(),
  status: "",
  statusMessage: "",
  searchBooks: [],
  searchTerm: "",
  searchPageContent: {
    term: "",
    books: [],
  },
  allGenres: [],
  allAuthors: [],
  avaliableAuthors: [],
  avaliableGenres: [],
  isOpenCart: false,
  orderId: "",
};

export const getAllBooks = createAsyncThunk("axiosBooks/get", async () => {
  try {
    const response = await axios.get(`https://backend-books-production-49d3.up.railway.app/api/books`, {
      headers: {
        "secret-api-key": `${import.meta.env.VITE_API_KEY}`,
      },
    });
    return response.data.books;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookToCart: (state, action) => {
      const book = action.payload;
      if (state.cart.some((item) => item._id === book._id)) {
        state.status = "failCart";
        state.statusMessage = book.title;
        return;
      }
      state.cart.push(book);
      const stringifyDataCart = JSON.stringify(state.cart);
      localStorage.setItem("cart", stringifyDataCart);
      state.status = "successCart";
      state.statusMessage = book.title;
    },
    removeFromCart: (state, action) => {
      const book = action.payload;
      state.cart = state.cart.filter((el) => el._id !== book._id);
      const stringifyDataCart = JSON.stringify(state.cart);
      localStorage.setItem("cart", stringifyDataCart);
    },
    changeCurrentBook: (state, action) => {
      const bookId = action.payload;
      const currentBook = state.books.find((el) => el._id === bookId);
      state.currentBook = currentBook || null;
    },
    findBooks: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      let baseList = [];
      state.searchTerm = action.payload;
      if (action.payload === "" || state.searchTerm === "") {
        state.searchBooks = [];
      } else {
        baseList = state.books;
        state.searchBooks = baseList.filter((book) =>
          book.title.toLowerCase().includes(searchTerm)
        );
      }
    },
    setSearchPageContent: (state, action) => {
      const { searchTerm, searchBooks } = action.payload;
      state.searchPageContent = {
        term: searchTerm,
        books: searchBooks,
      };
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    sortBooks: (state, action) => {
      const sortOption = action.payload;
      switch (sortOption) {
        case "newest":
          if (state.filteredBooks.length > 0) {
            state.filteredBooks = state.filteredBooks.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
          } else {
            state.books = state.books.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
          }
          break;
        case "byTitle":
          if (state.filteredBooks.length > 0) {
            state.filteredBooks = state.filteredBooks.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          } else {
            state.books = state.books.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          }
          break;
        case "byPriceAsc":
          if (state.filteredBooks.length > 0) {
            state.filteredBooks = state.filteredBooks.sort(
              (a, b) => a.price - b.price
            );
          } else {
            state.books = state.books.sort((a, b) => a.price - b.price);
          }
          break;
        case "byPriceDesc":
          if (state.filteredBooks.length > 0) {
            state.filteredBooks = state.filteredBooks.sort(
              (a, b) => b.price - a.price
            );
          } else {
            state.books = state.books.sort((a, b) => b.price - a.price);
          }
          break;
        default:
          if (state.filteredBooks.length > 0) {
            state.filteredBooks = state.filteredBooks.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          } else {
            state.books = state.books.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          }
      }
    },
    changeFilteredBooks: (state, action) => {
      const data = action.payload;
      state.filteredBooks = data;
      state.avaliableGenres = [
        ...new Set(state.filteredBooks.map((book) => book.genre)),
      ];
      state.avaliableAuthors = [
        ...new Set(state.filteredBooks.map((book) => book.author)),
      ];
    },
    tooggleAuthor: (state, action) => {
      const author = action.payload;
      const filters = state.filters;
      if (filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (a) => a !== author
        );
      } else {
        state.filters.authors.push(author);
      }
    },
    toggleGengre: (state, action) => {
      const genre = action.payload;
      const filters = state.filters;
      if (filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter((a) => a !== genre);
      } else {
        state.filters.genres.push(genre);
      }
    },
    toggleMinPrice: (state, action) => {
      const minPrice = action.payload;
      state.filters.priceMin = minPrice;
    },
    toggleMaxPrice: (state, action) => {
      const maxPrice = action.payload;
      state.filters.priceMax = maxPrice;
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        genres: [],
        authors: [],
      };
      state.filteredBooks = [];
    },
    toggleCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    },
    closeCart: (state) => {
      state.isOpenCart = false;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.fulfilled, (state, action) => {
        const sorted = [...action.payload].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        state.books = sorted;
        state.startBooks = sorted;
        state.allGenres = [...new Set(state.books.map((book) => book.genre))];
        state.allAuthors = [...new Set(state.books.map((book) => book.author))];
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default bookSlice.reducer;
export const {
  addBookToCart,
  changeCurrentBook,
  findBooks,
  setSearchPageContent,
  removeFromCart,
  clearCart,
  sortBooks,
  changeFilteredBooks,
  tooggleAuthor,
  toggleGengre,
  toggleMinPrice,
  toggleMaxPrice,
  clearFilters,
  toggleCart,
  closeCart,
  setOrderId,
} = bookSlice.actions;
