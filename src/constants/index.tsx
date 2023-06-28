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
  INFLUENCER_ACCOUNT_VALIDATION: "/account-verification",
};

export const USER = {
  _USER_TOKEN: "__user_auth__",
  _INFLUENCER_IDENTIFICATION_TYPES_: "__INFLUENCER_IDENTIFICATION_TYPES__",
};

export const _FOLLOWER_ = "follower";
export const _INFLUENCER_ = "influencer";
export const _ADMIN_ = "admin";

export const USER_TYPES = {
  _FOLLOWER_: "follower",
  _INFLUENCER_: "influencer",
  _ADMIN_: "admin",
};

export const dashBoardLinks = [
  {
    path: `/my/dashboard/${_INFLUENCER_}`,
    title: "Dashboard",
    icon: "object-group",
  },
  {
    path: `/my/dashboard/${_INFLUENCER_}/draws`,
    title: "My Draws",
    icon: "ticket",
  },
  {
    path: `/my/dashboard/${_INFLUENCER_}/transactions`,
    title: "Transactions",
    icon: "sleigh",
  },
  {
    path: `/my/dashboard/${_INFLUENCER_}/settings`,
    title: "Settings",
    icon: "cog",
  },
];

export const followersdashBoardLinks = [
  {
    path: `/my/dashboard/${_FOLLOWER_}`,
    title: "Dashboard",
    icon: "object-group",
  },
  {
    path: `/my/dashboard/${_FOLLOWER_}/draws`,
    title: "My Draws",
    icon: "ticket",
  },
  {
    path: `/my/dashboard/${_FOLLOWER_}/transactions`,
    title: "My Tickets",
    icon: "sleigh",
  },
  {
    path: `/my/dashboard/${_FOLLOWER_}/settings`,
    title: "Settings",
    icon: "cog",
  },
];

export const adminDashBoardLinks = [
  {
    path: `/my/dashboard/${_ADMIN_}`,
    title: "Dashboard",
    icon: "object-group",
  },
  {
    path: `/my/dashboard/${_ADMIN_}/draws`,
    title: "Draws",
    icon: "ticket",
  },
  {
    path: `/my/dashboard/${_ADMIN_}/transactions`,
    title: "Transactions",
    icon: "sleigh",
  },
  {
    path: `/my/dashboard/${_ADMIN_}/users`,
    title: "Users",
    icon: "users",
  },
  {
    path: `/my/dashboard/${_ADMIN_}/setting`,
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
    type: "raffles",
  },
  {
    name: "Participants’ Reach",
    icon: "users",
    route: "",
    color: "linear-gradient(70.64deg, #830C97 3.95%, #FB0AA9 100%)",
    type: "participants",
  },
  {
    name: "Number of tickets sold",
    icon: "money-bill",
    route: "",
    color: "linear-gradient(252.55deg, #9DDDFF 0%, #2896D0 98.69%)",
    type: "tickets",
  },
];

export const influencerCardsAlt = [
  {
    name: "Number of influencers",
    icon: "ticket",
    route: "",
    color: "linear-gradient(72.28deg, #1345A6 3.03%, #9DDDFF 100.76%)",
    type: "raffles",
    text: "See influencers here",
  },
  {
    name: "Number of pending registrations",
    icon: "users",
    route: "",
    color: "linear-gradient(70.64deg, #830C97 3.95%, #FB0AA9 100%)",
    type: "participants",
    text: "See pending registrations here",
  },
  {
    name: "Number of pending raffles",
    icon: "money-bill",
    route: "",
    color: "linear-gradient(252.55deg, #9DDDFF 0%, #2896D0 98.69%)",
    type: "tickets",
    text: "See pending raffles here",
  },
];

type Object = {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

// count 168
export const currency_list: Object = {
  AFA: { name: "Afghan Afghani", symbol: "؋" },
  ALL: { name: "Albanian Lek", symbol: "Lek" },
  DZD: { name: "Algerian Dinar", symbol: "دج" },
  AOA: { name: "Angolan Kwanza", symbol: "Kz" },
  ARS: { name: "Argentine Peso", symbol: "$" },
  AMD: { name: "Armenian Dram", symbol: "֏" },
  AWG: { name: "Aruban Florin", symbol: "ƒ" },
  AUD: { name: "Australian Dollar", symbol: "$" },
  AZN: { name: "Azerbaijani Manat", symbol: "m" },
  BSD: { name: "Bahamian Dollar", symbol: "B$" },
  BHD: { name: "Bahraini Dinar", symbol: ".د.ب" },
  BDT: { name: "Bangladeshi Taka", symbol: "৳" },
  BBD: { name: "Barbadian Dollar", symbol: "Bds$" },
  BYR: { name: "Belarusian Ruble", symbol: "Br" },
  BEF: { name: "Belgian Franc", symbol: "fr" },
  BZD: { name: "Belize Dollar", symbol: "$" },
  BMD: { name: "Bermudan Dollar", symbol: "$" },
  BTN: { name: "Bhutanese Ngultrum", symbol: "Nu." },
  BTC: { name: "Bitcoin", symbol: "฿" },
  BOB: { name: "Bolivian Boliviano", symbol: "Bs." },
  BAM: { name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  BWP: { name: "Botswanan Pula", symbol: "P" },
  BRL: { name: "Brazilian Real", symbol: "R$" },
  GBP: { name: "British Pound Sterling", symbol: "£" },
  BND: { name: "Brunei Dollar", symbol: "B$" },
  BGN: { name: "Bulgarian Lev", symbol: "Лв." },
  BIF: { name: "Burundian Franc", symbol: "FBu" },
  KHR: { name: "Cambodian Riel", symbol: "KHR" },
  CAD: { name: "Canadian Dollar", symbol: "$" },
  CVE: { name: "Cape Verdean Escudo", symbol: "$" },
  KYD: { name: "Cayman Islands Dollar", symbol: "$" },
  XOF: { name: "CFA Franc BCEAO", symbol: "CFA" },
  XAF: { name: "CFA Franc BEAC", symbol: "FCFA" },
  XPF: { name: "CFP Franc", symbol: "₣" },
  CLP: { name: "Chilean Peso", symbol: "$" },
  CLF: { name: "Chilean Unit of Account", symbol: "CLF" },
  CNY: { name: "Chinese Yuan", symbol: "¥" },
  COP: { name: "Colombian Peso", symbol: "$" },
  KMF: { name: "Comorian Franc", symbol: "CF" },
  CDF: { name: "Congolese Franc", symbol: "FC" },
  CRC: { name: "Costa Rican Colón", symbol: "₡" },
  HRK: { name: "Croatian Kuna", symbol: "kn" },
  CUC: { name: "Cuban Convertible Peso", symbol: "$, CUC" },
  CZK: { name: "Czech Republic Koruna", symbol: "Kč" },
  DKK: { name: "Danish Krone", symbol: "Kr." },
  DJF: { name: "Djiboutian Franc", symbol: "Fdj" },
  DOP: { name: "Dominican Peso", symbol: "$" },
  XCD: { name: "East Caribbean Dollar", symbol: "$" },
  EGP: { name: "Egyptian Pound", symbol: "ج.م" },
  ERN: { name: "Eritrean Nakfa", symbol: "Nfk" },
  EEK: { name: "Estonian Kroon", symbol: "kr" },
  ETB: { name: "Ethiopian Birr", symbol: "Nkf" },
  EUR: { name: "Euro", symbol: "€" },
  FKP: { name: "Falkland Islands Pound", symbol: "£" },
  FJD: { name: "Fijian Dollar", symbol: "FJ$" },
  GMD: { name: "Gambian Dalasi", symbol: "D" },
  GEL: { name: "Georgian Lari", symbol: "ლ" },
  DEM: { name: "German Mark", symbol: "DM" },
  GHS: { name: "Ghanaian Cedi", symbol: "GH₵" },
  GIP: { name: "Gibraltar Pound", symbol: "£" },
  GRD: { name: "Greek Drachma", symbol: "₯, Δρχ, Δρ" },
  GTQ: { name: "Guatemalan Quetzal", symbol: "Q" },
  GNF: { name: "Guinean Franc", symbol: "FG" },
  GYD: { name: "Guyanaese Dollar", symbol: "$" },
  HTG: { name: "Haitian Gourde", symbol: "G" },
  HNL: { name: "Honduran Lempira", symbol: "L" },
  HKD: { name: "Hong Kong Dollar", symbol: "$" },
  HUF: { name: "Hungarian Forint", symbol: "Ft" },
  ISK: { name: "Icelandic Króna", symbol: "kr" },
  INR: { name: "Indian Rupee", symbol: "₹" },
  IDR: { name: "Indonesian Rupiah", symbol: "Rp" },
  IRR: { name: "Iranian Rial", symbol: "﷼" },
  IQD: { name: "Iraqi Dinar", symbol: "د.ع" },
  ILS: { name: "Israeli New Sheqel", symbol: "₪" },
  ITL: { name: "Italian Lira", symbol: "L,£" },
  JMD: { name: "Jamaican Dollar", symbol: "J$" },
  JPY: { name: "Japanese Yen", symbol: "¥" },
  JOD: { name: "Jordanian Dinar", symbol: "ا.د" },
  KZT: { name: "Kazakhstani Tenge", symbol: "лв" },
  KES: { name: "Kenyan Shilling", symbol: "KSh" },
  KWD: { name: "Kuwaiti Dinar", symbol: "ك.د" },
  KGS: { name: "Kyrgystani Som", symbol: "лв" },
  LAK: { name: "Laotian Kip", symbol: "₭" },
  LVL: { name: "Latvian Lats", symbol: "Ls" },
  LBP: { name: "Lebanese Pound", symbol: "£" },
  LSL: { name: "Lesotho Loti", symbol: "L" },
  LRD: { name: "Liberian Dollar", symbol: "$" },
  LYD: { name: "Libyan Dinar", symbol: "د.ل" },
  LTC: { name: "Litecoin", symbol: "Ł" },
  LTL: { name: "Lithuanian Litas", symbol: "Lt" },
  MOP: { name: "Macanese Pataca", symbol: "$" },
  MKD: { name: "Macedonian Denar", symbol: "ден" },
  MGA: { name: "Malagasy Ariary", symbol: "Ar" },
  MWK: { name: "Malawian Kwacha", symbol: "MK" },
  MYR: { name: "Malaysian Ringgit", symbol: "RM" },
  MVR: { name: "Maldivian Rufiyaa", symbol: "Rf" },
  MRO: { name: "Mauritanian Ouguiya", symbol: "MRU" },
  MUR: { name: "Mauritian Rupee", symbol: "₨" },
  MXN: { name: "Mexican Peso", symbol: "$" },
  MDL: { name: "Moldovan Leu", symbol: "L" },
  MNT: { name: "Mongolian Tugrik", symbol: "₮" },
  MAD: { name: "Moroccan Dirham", symbol: "MAD" },
  MZM: { name: "Mozambican Metical", symbol: "MT" },
  MMK: { name: "Myanmar Kyat", symbol: "K" },
  NAD: { name: "Namibian Dollar", symbol: "$" },
  NPR: { name: "Nepalese Rupee", symbol: "₨" },
  ANG: { name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  TWD: { name: "New Taiwan Dollar", symbol: "$" },
  NZD: { name: "New Zealand Dollar", symbol: "$" },
  NIO: { name: "Nicaraguan Córdoba", symbol: "C$" },
  NGN: { name: "Nigerian Naira", symbol: "₦" },
  KPW: { name: "North Korean Won", symbol: "₩" },
  NOK: { name: "Norwegian Krone", symbol: "kr" },
  OMR: { name: "Omani Rial", symbol: ".ع.ر" },
  PKR: { name: "Pakistani Rupee", symbol: "₨" },
  PAB: { name: "Panamanian Balboa", symbol: "B/." },
  PGK: { name: "Papua New Guinean Kina", symbol: "K" },
  PYG: { name: "Paraguayan Guarani", symbol: "₲" },
  PEN: { name: "Peruvian Nuevo Sol", symbol: "S/." },
  PHP: { name: "Philippine Peso", symbol: "₱" },
  PLN: { name: "Polish Zloty", symbol: "zł" },
  QAR: { name: "Qatari Rial", symbol: "ق.ر" },
  RON: { name: "Romanian Leu", symbol: "lei" },
  RUB: { name: "Russian Ruble", symbol: "₽" },
  RWF: { name: "Rwandan Franc", symbol: "FRw" },
  SVC: { name: "Salvadoran Colón", symbol: "₡" },
  WST: { name: "Samoan Tala", symbol: "SAT" },
  STD: { name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  SAR: { name: "Saudi Riyal", symbol: "﷼" },
  RSD: { name: "Serbian Dinar", symbol: "din" },
  SCR: { name: "Seychellois Rupee", symbol: "SRe" },
  SLL: { name: "Sierra Leonean Leone", symbol: "Le" },
  SGD: { name: "Singapore Dollar", symbol: "$" },
  SKK: { name: "Slovak Koruna", symbol: "Sk" },
  SBD: { name: "Solomon Islands Dollar", symbol: "Si$" },
  SOS: { name: "Somali Shilling", symbol: "Sh.so." },
  ZAR: { name: "South African Rand", symbol: "R" },
  KRW: { name: "South Korean Won", symbol: "₩" },
  SSP: { name: "South Sudanese Pound", symbol: "£" },
  XDR: { name: "Special Drawing Rights", symbol: "SDR" },
  LKR: { name: "Sri Lankan Rupee", symbol: "Rs" },
  SHP: { name: "St. Helena Pound", symbol: "£" },
  SDG: { name: "Sudanese Pound", symbol: ".س.ج" },
  SRD: { name: "Surinamese Dollar", symbol: "$" },
  SZL: { name: "Swazi Lilangeni", symbol: "E" },
  SEK: { name: "Swedish Krona", symbol: "kr" },
  CHF: { name: "Swiss Franc", symbol: "CHf" },
  SYP: { name: "Syrian Pound", symbol: "LS" },
  TJS: { name: "Tajikistani Somoni", symbol: "SM" },
  TZS: { name: "Tanzanian Shilling", symbol: "TSh" },
  THB: { name: "Thai Baht", symbol: "฿" },
  TOP: { name: "Tongan Pa'anga", symbol: "$" },
  TTD: { name: "Trinidad & Tobago Dollar", symbol: "$" },
  TND: { name: "Tunisian Dinar", symbol: "ت.د" },
  TRY: { name: "Turkish Lira", symbol: "₺" },
  TMT: { name: "Turkmenistani Manat", symbol: "T" },
  UGX: { name: "Ugandan Shilling", symbol: "USh" },
  UAH: { name: "Ukrainian Hryvnia", symbol: "₴" },
  AED: { name: "United Arab Emirates Dirham", symbol: "إ.د" },
  UYU: { name: "Uruguayan Peso", symbol: "$" },
  USD: { name: "US Dollar", symbol: "$" },
  UZS: { name: "Uzbekistan Som", symbol: "лв" },
  VUV: { name: "Vanuatu Vatu", symbol: "VT" },
  VEF: { name: "Venezuelan BolÃvar", symbol: "Bs" },
  VND: { name: "Vietnamese Dong", symbol: "₫" },
  YER: { name: "Yemeni Rial", symbol: "﷼" },
  ZMK: { name: "Zambian Kwacha", symbol: "ZK" },
  ZWL: { name: "Zimbabwean dollar", symbol: "$" },
};
<<<<<<< Updated upstream
=======

export const ENDPOINTS: { [key: string]: string | Function } = {
  API_BASE_URL: import.meta.env.VITE_APP_API_URL,

  // influencer auth URL
  API_INFLUENCER_AUTH_SIGNUP: "/auth/influencer-register",
  API_INFLUENCER_AUTH_LOGIN: "/auth/influencer-login",
  API_INFLUENCER_AUTH_VERIFY: "/auth/influencer-verify-email",
  API_INFLUENCER_AUTH_FORGOT_PASSWORD: "/auth/influencer-forgot-password",
  API_INFLUENCER_AUTH_SOCIAL: "/auth/social/",
  API_INFLUENCER_VERIFY_ACCOUNT: "/account-verification",
  API_INFLUENCER_VERIFYABLE_TYPES: (identificationType: number) =>
    `/account-verification/${identificationType}`,
  API_INFLUENCER_CREATE_CAMPAIGN: "/campaigns",
  API_INFLUENCER_TOP_DRAWS: "/top-draws",
  API_INFLUENCER_ACTIVE_DRAWS: "/active-draws",
  API_INFLUENCER_INACTIVE_DRAWS: "/inactive-draws",
  API_INFLUENCER_PENDING_DRAWS: "/pending-draws",

  // follower Auth URl
  API_FOLLOWER_AUTH: "auth/follower/",
  API_FOLLOWER_AUTH_LOGIN: "/follower/register",
  API_FOLLOWER_AUTH_SIGNUP: "/follower/login",
};

export const MAX_FILE_SIZE: number = 1000000;
export const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
>>>>>>> Stashed changes
