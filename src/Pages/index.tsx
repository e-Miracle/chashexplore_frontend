import { lazy } from "react";

//pages
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const NotFound = lazy(() => import("./NotFound"));
const SignUp = lazy(() => import("./SignUp"));
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const ResetPassword = lazy(() => import("./ResetPassword"));
const AccountVerification = lazy(() => import("./AccountVerification"));
const DashBaordHome = lazy(() => import("./dashboard"))

//followers pages
const FollowersDashboard = lazy(() => import("./dashboard/followers"));
const FollowersDraws = lazy(() => import("./dashboard/followers/Draws"));
const FollowersTransactions = lazy(() => import("./dashboard/followers/Transactions"));
const FollowersSettings = lazy(() => import("./dashboard/followers/Settings"));

//influncers pages
const InflunecersDashboard = lazy(() => import("./dashboard/influencer"));
const InflunecersDraws = lazy(() => import("./dashboard/influencer/Draws"));
const InflunecersTransactions = lazy(
  () => import("./dashboard/influencer/Transactions")
);
const InflunecersSettings = lazy(
  () => import("./dashboard/influencer/Settings")
);

//general components
const Spinner = lazy(() => import("../components/Spinner"));

//layouts
const AuthFormLayout = lazy(() => import("../components/Layouts/AuthForms"));
const PageLayout = lazy(() => import('../components/Layouts/PageLayout'))
const DashBoardLayout = lazy(() => import('../components/Layouts/DashboardLayout'))

//utils
//lazyload
const initFontAwesome = await import("../Utils/initFontawesome").then(
  (module) => {
    return module.initFontAwesome;
  }
);


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
  InflunecersDashboard,
  InflunecersDraws,
  InflunecersTransactions,
  InflunecersSettings,
};
