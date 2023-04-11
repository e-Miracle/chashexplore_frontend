export const PAGES = {
  DASHBOARD_PAGE: "/my/dashboard",

  //   PAYMENT_LINK_PAGE: "/my/payment-link",
  //   GET_PAID_PAGE: "/my/get-paid",
  //   GET_PAID_PAGE_SUCCESS: "/my/get-paid/success",
  //   GET_PAID_PAGE_UPDATE: "/my/get-paid/update",

  LOGIN_PAGE: "/",
  REGISTER_PAGE: "/signup",
  VERIFY_PAGE: "/register",

  USER_PROFILE_PAGE: "/my/profile",
};

export const USER = {
  _USER_TOKEN: "__user_auth__",
};

export const _FOLLOWER_ = "follower";
export const _INFLUENCER_ = "influencer";

export const USER_TYPES = {
  _FOLLOWER_: "follower",
  _INFLUENCER_: "influencer",
};

export const dashBoardLinks = [
  {
    path: "/my/dashboard",
    title: "Dashboard",
    icon: "object-group",
  },
  {
    path: "/my/draws",
    title: "My Draws",
    icon: "ticket",
  },
  {
    path: "/my/transactions",
    title: "Transactions",
    icon: "sleigh",
  },
  {
    path: "/my/settings",
    title: "Settings",
    icon: "cog",
  },
];

export const influencerCards = [
  {
    name: "Number of raffles created",
    icon: "ticket",
    route: "",
    color: "linear-gradient(72.28deg, #1345A6 3.03%, #9DDDFF 100.76%)",
    type: "raffles"
  },
  {
    name: "Participants’ Reach",
    icon: "users",
    route: "",
    color: "linear-gradient(70.64deg, #830C97 3.95%, #FB0AA9 100%)",
    type: "participants"
  },
  {
    name: "Number of tickets sold",
    icon: "money-bill",
    route: "",
    color: "linear-gradient(252.55deg, #9DDDFF 0%, #2896D0 98.69%)",
    type: "tickets"
  },
];
