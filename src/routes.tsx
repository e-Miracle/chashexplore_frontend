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
  VerifyEmail,
  ResendEmailVerification,
  FollowersTransactions,
  FollowersSettings,
  InflunecersDashboard,
  InflunecersDraws,
  InflunecersNewDraw,
  InflunecersUpdateDraw,
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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_, _ADMIN_ } from "./constants";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import AuthorizedPages from "./modules/authorizedPages";
import ProtectedPages from "./modules/protectedPages";
import ValidateRoles from "./modules/validateRoles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedPages />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      { path: "/about", element: <About /> },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/resend-email",
        element: <ResendEmailVerification />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/account-verification",
    errorElement: <NotFound />,
    element: <AccountVerification />,
  },
  {
    path: "/update/account-verification",
    errorElement: <NotFound />,
    element: <AccountVerification />,
  },
  {
    path: "/my/dashboard",
    element: <AuthorizedPages />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/my/dashboard", element: <DashBaordHome /> },
      {
        path: `/my/dashboard/${_FOLLOWER_}`,
        element: <FollowersDashboard />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/view-raffle`,
        element: <FollowersViewRaffle />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/raffle-page-preview`,
        element: <FollowersRafflePagePreview />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/purchase-ticket`,
        element: <FollowersPurchaseTicket />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/draws`,
        element: <FollowersDraws />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/draws/singledraw/:id`,
        element: <FollowersSingleDraw />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/transactions`,
        element: <FollowersTicket />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/settings`,
        element: <FollowersSettings />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/profile`,
        element: <FollowersProfile />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/draws/results`,
        element: <FollowersResults />,
      },
      {
        path: `/my/dashboard/${_FOLLOWER_}/notifications`,
        element: <FollowersNotification />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}`,
        element: <InflunecersDashboard />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/draws`,
        element: <InflunecersDraws />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/create`,
        element: <InflunecersNewDraw />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/preview/:id`,
        element: <InflunecersPreviewDraw />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/update/:id`,
        element: <InflunecersUpdateDraw />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/draws/singledraw/:id`,
        element: <InflunecersSingleDraw />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/draws/results/:id`,
        element: <InflunecersResults />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/profile`,
        element: <InflunecersProfile />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/transactions`,
        element: <InflunecersTransactions />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/transactions/active`,
        element: <InflunecersActiveTransaction />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/notifications`,
        element: <InflunecersNotifications />,
      },
      {
        path: `/my/dashboard/${_INFLUENCER_}/settings`,
        element: <InflunecersSettings />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/dashboard`,
        element: <AdminDashboard />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/registrations`,
        element: <AdminRegistration />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/raffles`,
        element: <AdminRaffles />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/draws`,
        element: <AdminDraws />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/draws/create`,
        element: <AdminCreateDraws />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/preview`,
        element: <AdminPreviewDraws />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/singledraw`,
        element: <AdminSingleDraws />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/results`,
        element: <AdminResults />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/users`,
        element: <AdminUsers />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/users/${_INFLUENCER_}`,
        element: <AdminInfluencers />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/users/${_FOLLOWER_}`,
        element: <AdminFollowers />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/transactions`,
        element: <AdminTransactions />,
      },
      {
        path: `/my/dashboard/${_ADMIN_}/transactions/transaction/:id`,
        element: <AdminSingleTransaction />,
      },
    ],
  },
]);

export default router;
