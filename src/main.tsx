import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes } from "react-router";
import rootRouter from "./router/root.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>{...rootRouter()}</Routes>
    </BrowserRouter>
  </Provider>
);
