import { USER, ENDPOINTS, _FOLLOWER_, _INFLUENCER_, PAGES } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Influencer } from "./types";
import { Navigate } from "react-router-dom";

export const getUserData = (): Influencer => {
  const user = sessionStorage.getItem(USER._USER_TOKEN);
  // console.log(JSON.parse(user));
  return JSON.parse(user as any) as Influencer;
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const toNum = (num: number) => (num ? Number(num).toLocaleString() : 0);

export const storeUserData = (data: any) =>
  sessionStorage.setItem(
    USER._USER_TOKEN,
    JSON.stringify({ ...data?.message?.user, token: data?.message?.token })
    // JSON.stringify({ token: data?.access_token, isVerified: data?.isVerified })
  );
export const storeSocialData = async (data: any) =>
  await sessionStorage.setItem(
    USER._USER_TOKEN,
    JSON.stringify({ ...data?.user, token: data?.token })
  );

export const storeIdentificationTypes = (data: any) =>
  sessionStorage.setItem(
    USER._INFLUENCER_IDENTIFICATION_TYPES_,
    JSON.stringify(data)
  );

export const getIdentificationTypes = () => {
  const types = sessionStorage.getItem(USER._INFLUENCER_IDENTIFICATION_TYPES_);
  return JSON.parse(types as any);
};

export const updateUserData = (key: string, value: any) => {
  if (typeof sessionStorage.getItem(USER._USER_TOKEN) === "string") {
    const user = JSON.parse(sessionStorage.getItem(USER._USER_TOKEN) as string);
    sessionStorage.setItem(
      USER._USER_TOKEN,
      JSON.stringify({ ...user, [key]: value })
    );
  }
};

export const convertEndpointToTitle = (endpoint: string) => {
  const title = endpoint.replace("/", "").replace("-draws", "");
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export const toTimeString = (serverDate: string) => {
  if (!serverDate) return "";
  let time = new Date(serverDate)
    .toTimeString()
    .slice(0, 5)
    .split(":")
    .map((a) => +a);

  let hours = time[0];
  let timeMeridian = "am";

  if (hours > 12 && hours < 24) {
    hours = time[0] - 12;
    time[0] = hours;
    timeMeridian = "pm";
  }
  if (hours === 24) {
    time[0] = time[0] - 12;
    timeMeridian = "am";
  }

  if (time[1] <= 9) {
    time[1] = 0 + time[1];
  }
  return `${time.join(":")} ${timeMeridian}`;
};

export const convertDateTime = (datetimeString: string) => {
  // Parse the datetime string into a Date object
  const datetime = new Date(datetimeString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = datetime.getDate();
  const monthIndex = datetime.getMonth();
  const year = datetime.getFullYear();
  // Get the hour
  const hour = datetime.getHours();

  // Get the minutes
  const minutes = datetime.getMinutes();

  const seconds = datetime.getSeconds();

  // Get the meridiem
  const meridiem = hour >= 12 ? "pm" : "am";
  //   const year = date.getFullYear();

  const formattedDate = `${day}th ${monthNames[monthIndex]} ${year}, ${hour}:${minutes}${seconds} ${meridiem}`;

  return formattedDate;
};

export const countDown = (date: any) => {
  const newDate = new Date(date);
  return {
    year: newDate.getFullYear(),
    month: newDate.getMonth(),
    day: newDate.getDate(),
  };
};

export const toDateString = (serverDate: string) => {
  let date = new Date(serverDate).toDateString();
  let dateArr = date.split(" ");

  // if (date === new Date().toDateString()) return "Today";

  return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`;
};

export const apiRequest = (token: string) =>
  axios.create({
    baseURL: ENDPOINTS.API_BASE_URL as string,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const setAuthToken = () => {
  if (getUserData()?.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      getUserData()?.token
    }`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getDateIsoString = (date: Date) => {
  if (
    date
      .toISOString()
      .split("T")[0]
      .match(/^\d{2}-\d{2}-\d{4}$/)
  )
    return date;
  return date.toISOString().split("T")[0].split("-").reverse().join("-");
};

export const changeContentTypeHeader = (isImage: boolean = false) => {
  if (isImage) {
    axios.defaults.headers.common["Content-Type"] = `multipart/formdata`;
  } else {
    axios.defaults.headers.common["Content-Type"] = `application/json`;
  }
};

export const logout = () => {
  sessionStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  return <Navigate to={PAGES.LOGIN_PAGE} />;
};

export const socialRequest = async (
  name: string,
  type: typeof _FOLLOWER_ | typeof _INFLUENCER_,
  cb?: Function
) => {
  const reqUrl =
    (((ENDPOINTS.API_BASE_URL as string) +
      ENDPOINTS.API_INFLUENCER_AUTH_SOCIAL) as string) +
    name +
    `/${type}`;
  try {
    const res = await axios.get(reqUrl);
    console.log(res.data);
    cb && cb();
    return res.data;
  } catch (err: any) {
    toast.error(`${err?.message}`);
    err.response?.data && toast.error(`${err.response?.data?.message}`);
    cb && cb();
  }
};

export const loadUser = () => {
  if (getUserData()?.token)
    return <Navigate to={`/my/dashboard/${getUserData()?.role}/home`} />;
  return;
};

export * from "./types";
