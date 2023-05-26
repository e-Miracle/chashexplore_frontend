import { Suspense } from "react";
import { initFontAwesome } from "./Pages";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_, _ADMIN_ } from "./constants";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import router from "./routes";
initFontAwesome();
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Toaster position={"top-right"} />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
