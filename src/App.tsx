import { Suspense } from "react";
import {
  Home,
  About,
  NotFound,
  SignUp,
  ForgotPassword,
  ResetPassword,
  AccountVerification,
  DashBaordHome,
  initFontAwesome,
  FollowersDashboard,
  FollowersDraws,
  FollowersTransactions,
  FollowersSettings,
  InflunecersDashboard,
  InflunecersDraws,
  InflunecersNewDraw,
  InflunecersTransactions,
  InflunecersSettings,
} from "./Pages";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_ } from "./constants";
import Spinner from "./components/Spinner";
initFontAwesome();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/register", element: <SignUp /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/account-verifcation", element: <AccountVerification /> },
        { path: "/my/dashboard", element: <DashBaordHome /> },
        {
          path: `/${_FOLLOWER_}/my/dashboard`,
          element: <FollowersDashboard />,
        },
        {
          path: `/${_FOLLOWER_}/my/draws`,
          element: <FollowersDraws />,
        },
        {
          path: `/${_FOLLOWER_}/my/transactions`,
          element: <FollowersTransactions />,
        },
        {
          path: `/${_FOLLOWER_}/my/settings`,
          element: <FollowersSettings />,
        },
        {
          path: `/${_INFLUENCER_}/my/dashboard`,
          element: <InflunecersDashboard />,
        },
        {
          path: `/${_INFLUENCER_}/my/draws`,
          element: <InflunecersDraws />,
        },
        {
          path: `/${_INFLUENCER_}/my/draws/create`,
          element: <InflunecersNewDraw />,
        },
        {
          path: `/${_INFLUENCER_}/my/transactions`,
          element: <InflunecersTransactions />,
        },
        {
          path: `/${_INFLUENCER_}/my/settings`,
          element: <InflunecersSettings />,
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
