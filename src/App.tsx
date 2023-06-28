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
  InflunecersPreviewDraw,
  InflunecersSingleDraw,
  InflunecersResults,
  InflunecersProfile,
  InflunecersActiveTransaction,
  InflunecersNotifications,
  FollowersViewRaffle,
  FollowersRafflePagePreview,
  FollowersPurchaseTicket,
  FollowersSingleDraw,
  FollowersResults,
  FollowersProfile,
  FollowersNotification,
  FollowersTicket,
  AdminDashboard,
  AdminRegistration,
  AdminRaffles,
  AdminDraws,
  AdminCreateDraws,
  AdminPreviewDraws,
  AdminSingleDraws,
  AdminResults,
  AdminUsers,
  AdminInfluencers,
  AdminFollowers,
  AdminTransactions,
  AdminSingleTransaction,
} from "./Pages";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_, _ADMIN_ } from "./constants";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
<<<<<<< Updated upstream
initFontAwesome();

=======
import router from "./routes";
import { setAuthToken } from "./Utils";
initFontAwesome();
setAuthToken();
>>>>>>> Stashed changes
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
          path: `/${_FOLLOWER_}/my/dashboard/view-raffle`,
          element: <FollowersViewRaffle />,
        },
        {
          path: `/${_FOLLOWER_}/my/dashboard/raffle-page-preview`,
          element: <FollowersRafflePagePreview />,
        },
        {
          path: `/${_FOLLOWER_}/my/dashboard/purchase-ticket`,
          element: <FollowersPurchaseTicket />,
        },
        {
          path: `/${_FOLLOWER_}/my/draws`,
          element: <FollowersDraws />,
        },
        {
          path: `/${_FOLLOWER_}/my/draws/singledraw`,
          element: <FollowersSingleDraw />,
        },
        {
          path: `/${_FOLLOWER_}/my/transactions`,
          element: <FollowersTicket />,
        },
        {
          path: `/${_FOLLOWER_}/my/settings`,
          element: <FollowersSettings />,
        },
        {
          path: `/${_FOLLOWER_}/profile`,
          element: <FollowersProfile />,
        },
        {
          path: `/${_FOLLOWER_}/my/draws/results`,
          element: <FollowersResults />,
        },
        {
          path: `/${_FOLLOWER_}/my/notifications`,
          element: <FollowersNotification />,
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
          path: `/${_INFLUENCER_}/my/draws/preview`,
          element: <InflunecersPreviewDraw />,
        },
        {
          path: `/${_INFLUENCER_}/my/draws/singledraw`,
          element: <InflunecersSingleDraw />,
        },
        {
          path: `/${_INFLUENCER_}/my/draws/results`,
          element: <InflunecersResults />,
        },
        {
          path: `/${_INFLUENCER_}/profile`,
          element: <InflunecersProfile />,
        },
        {
          path: `/${_INFLUENCER_}/my/transactions`,
          element: <InflunecersTransactions />,
        },
        {
          path: `/${_INFLUENCER_}/my/transactions/active`,
          element: <InflunecersActiveTransaction />,
        },
        {
          path: `/${_INFLUENCER_}/my/notifications`,
          element: <InflunecersNotifications />,
        },
        {
          path: `/${_INFLUENCER_}/my/settings`,
          element: <InflunecersSettings />,
        },
        {
          path: `/${_ADMIN_}/my/dashboard`,
          element: <AdminDashboard />,
        },
        {
          path: `/${_ADMIN_}/my/dashboard/registrations`,
          element: <AdminRegistration />,
        },
        {
          path: `/${_ADMIN_}/my/dashboard/raffles`,
          element: <AdminRaffles />,
        },
        {
          path: `/${_ADMIN_}/my/draws`,
          element: <AdminDraws />,
        },
        {
          path: `/${_ADMIN_}/my/draws/create`,
          element: <AdminCreateDraws />,
        },
        {
          path: `/${_ADMIN_}/my/draws/preview`,
          element: <AdminPreviewDraws />,
        },
        {
          path: `/${_ADMIN_}/my/draws/singledraw`,
          element: <AdminSingleDraws />,
        },
        {
          path: `/${_ADMIN_}/my/draws/results`,
          element: <AdminResults />,
        },
        {
          path: `/${_ADMIN_}/my/users`,
          element: <AdminUsers />,
        },
        {
          path: `/${_ADMIN_}/my/users/${_INFLUENCER_}`,
          element: <AdminInfluencers />,
        },
        {
          path: `/${_ADMIN_}/my/users/${_FOLLOWER_}`,
          element: <AdminFollowers />,
        },
        {
          path: `/${_ADMIN_}/my/transactions`,
          element: <AdminTransactions />,
        },
        {
          path: `/${_ADMIN_}/my/transactions/transaction/:id`,
          element: <AdminSingleTransaction />,
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<Spinner />}>
      <Toaster position={"top-right"} />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
