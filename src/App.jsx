import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBooks } from "./Redux/slices/booksSlices";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "./Components/Outlet/Header";
import { ScrollToTop } from "./Components/Outlet/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const statusCart = useSelector((store) => store.bookSlice.status);
  const statusCartMessage = useSelector(
    (store) => store.bookSlice.statusMessage
  );
  const statusFavorite = useSelector(
    (store) => store.favoritesBooksSlice.status
  );
  const statusFavoriteMessage = useSelector(
    (store) => store.favoritesBooksSlice.statusMessage
  );

  useEffect(() => {
    if (statusCart === "successCart") {
      toast.success(
        <span>
          <b>{statusCartMessage}</b> додано до кошика!
        </span>
      );
    } else if (statusCart === "failCart") {
      toast(
        <span>
          🤷 <b>{statusCartMessage}</b> вже додано до кошика!
        </span>
      );
    }
  }, [statusCart, statusCartMessage]);

  useEffect(() => {
    if (statusFavorite === "addedFavorite") {
      toast(
        <span>
          <span style={{ color: "red" }}>❤</span> <b>{statusFavoriteMessage}</b>{" "}
          додано до списку бажаного!
        </span>
      );
    } else if (statusFavorite === "deletedFavorite") {
      toast(
        <span>
          <b>{statusFavoriteMessage}</b> вилучено зі списку бажаного!
        </span>
      );
    }
  }, [statusFavorite, statusFavoriteMessage]);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <div className="outlet">
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "600px",
            fontSize: "16px",
          },
        }}
      />

      <Header/>
      <Outlet />
    </div>
  );
}

export default App;
