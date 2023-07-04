import { Suspense, useEffect } from "react";
import { initFontAwesome } from "./Pages";
import "./App.css";
import { RouterProvider, useNavigate } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_, _ADMIN_, USER } from "./constants";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import router from "./routes";
import { setAuthToken, loadUser, getUserData } from "./Utils";
import Cookies from "js-cookie";
import { fetchUser } from "./hooks/customGets";
if (getUserData()?.role || Cookies.get(USER.__TOKEN__)) setAuthToken();
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
