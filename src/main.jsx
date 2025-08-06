import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
