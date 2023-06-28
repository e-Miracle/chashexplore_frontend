import { lazy } from "react";
import { initFontAwesome } from "../Utils/initFontawesome";

//pages
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const NotFound = lazy(() => import("./NotFound"));
const SignUp = lazy(() => import("./SignUp"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const AccountVerification = lazy(() => import("./AccountVerification"));
const DashBaordHome = lazy(() => import("./dashboard"));

//followers pages
const FollowersDashboard = lazy(() => import("./dashboard/followers"));
const FollowersDraws = lazy(() => import("./dashboard/followers/Draws"));
const FollowersTransactions = lazy(
  () => import("./dashboard/followers/Transactions")
);
const FollowersSettings = lazy(() => import("./dashboard/followers/Settings"));
const FollowersViewRaffle = lazy(
  () => import("./dashboard/followers/ViewRaffle")
);
const FollowersRafflePagePreview = lazy(
  () => import("./dashboard/followers/RafflePageReview")
);
const FollowersPurchaseTicket = lazy(
  () => import("./dashboard/followers/PurchaseTicket")
);

const FollowersSingleDraw = lazy(
  () => import("./dashboard/followers/SingleDraw")
);
const FollowersResults = lazy(() => import("./dashboard/followers/Results"));
const FollowersProfile = lazy(() => import("./dashboard/followers/Profile"));
const FollowersNotification = lazy(
  () => import("./dashboard/followers/Notifications")
);
const FollowersTicket = lazy(() => import("./dashboard/followers/Tickets"));

//influncers pages
const InflunecersDashboard = lazy(() => import("./dashboard/influencer"));
const InflunecersDraws = lazy(() => import("./dashboard/influencer/Draws"));
const InflunecersNewDraw = lazy(
  () => import("./dashboard/influencer/CreateDraw")
);
const InflunecersUpdateDraw = lazy(
  () => import("./dashboard/influencer/UpdateDraw")
);
const InflunecersSingleDraw = lazy(
  () => import("./dashboard/influencer/SingleDraw")
);
const InflunecersPreviewDraw = lazy(
  () => import("./dashboard/influencer/PreviewDraw")
);
const InflunecersTransactions = lazy(
  () => import("./dashboard/influencer/Transactions")
);
const InflunecersSettings = lazy(
  () => import("./dashboard/influencer/Settings")
);

const InflunecersResults = lazy(() => import("./dashboard/influencer/Results"));

const InflunecersProfile = lazy(() => import("./dashboard/influencer/Profile"));
const InflunecersNotifications = lazy(
  () => import("./dashboard/influencer/Notifications")
);
const InflunecersActiveTransaction = lazy(
  () => import("./dashboard/influencer/ActiveTransaction")
);

//admin section
const AdminDashboard = lazy(() => import("./dashboard/admin"));
const AdminRegistration = lazy(() => import("./dashboard/admin/Registrations"));
const AdminRaffles = lazy(() => import("./dashboard/admin/Raffles"));
const AdminDraws = lazy(() => import("./dashboard/admin/Draws"));
const AdminCreateDraws = lazy(() => import("./dashboard/admin/CreateDraw"));
const AdminPreviewDraws = lazy(() => import("./dashboard/admin/PreviewDraw"));
const AdminSingleDraws = lazy(() => import("./dashboard/admin/SingleDraw"));
const AdminResults = lazy(() => import("./dashboard/admin/Results"));
const AdminUsers = lazy(() => import("./dashboard/admin/Users"));
const AdminInfluencers = lazy(() => import("./dashboard/admin/Influencer"));
const AdminFollowers = lazy(() => import("./dashboard/admin/Follower"));
const AdminTransactions = lazy(() => import("./dashboard/admin/Transaction"));
const AdminSingleTransaction = lazy(() => import("./dashboard/admin/SingleTransaction"));
//general components
const Spinner = lazy(() => import("../components/Spinner"));

//layouts
const AuthFormLayout = lazy(() => import("../components/Layouts/AuthForms"));
const PageLayout = lazy(() => import("../components/Layouts/PageLayout"));
const DashBoardLayout = lazy(
  () => import("../components/Layouts/DashboardLayout")
);

//utils
//lazyload
// const initFontAwesome = await import("../Utils/initFontawesome").then(
//   (module) => {
//     return module.initFontAwesome;
//   }
// );

export {
  Home,
  About,
  NotFound,
  Spinner,
  AuthFormLayout,
  SignUp,
  ForgotPassword,
  ResetPassword,
  AccountVerification,
  PageLayout,
  DashBoardLayout,
  DashBaordHome,
  initFontAwesome,
  FollowersDashboard,
  FollowersDraws,
  FollowersTransactions,
  FollowersSettings,
  FollowersViewRaffle,
  FollowersPurchaseTicket,
  FollowersSingleDraw,
  InflunecersDashboard,
  InflunecersDraws,
  InflunecersNewDraw,
  InflunecersUpdateDraw,
  InflunecersPreviewDraw,
  InflunecersTransactions,
  InflunecersSettings,
  InflunecersSingleDraw,
  InflunecersResults,
  InflunecersProfile,
  InflunecersActiveTransaction,
  InflunecersNotifications,
  FollowersRafflePagePreview,
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
};
