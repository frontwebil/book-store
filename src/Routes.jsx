import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./Pages/MainPage";
import App from "./App";
import { CardPage } from "./Pages/CardPage";
import { FavoritesPage } from "./Pages/FavoritesPage";
import { SearchPage } from "./Pages/SearchPage";
import { OrderPage } from "./Pages/OrderPage";
import { ThankPage } from "./Pages/ThankPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/book/:id",
        element: <CardPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/thank/:id",
        element: <ThankPage />,
      },
      {
        path: "*",
      },
    ],
  },
]);
