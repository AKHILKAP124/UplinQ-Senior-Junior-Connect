import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouterProvider router={AppRoutes}></RouterProvider>
      </PersistGate>
    </Provider>
  </>
);
