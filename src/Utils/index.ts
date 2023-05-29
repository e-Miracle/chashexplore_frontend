import { USER, ENDPOINTS } from "../constants";
import axios from "axios";

export const getUserData = () => {
  const user = sessionStorage.getItem(USER._USER_TOKEN);
  // console.log(JSON.parse(user));
  return JSON.parse(user as any);
};

export function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

export const toNum = (num:number) => (num ? Number(num).toLocaleString() : 0);

export const storeUserData = (data: any) =>
  sessionStorage.setItem(
    USER._USER_TOKEN,
    JSON.stringify({ ...data?.message?.user, token: data?.message?.token })
    // JSON.stringify({ token: data?.access_token, isVerified: data?.isVerified })
  );

export const updateUserData = (key: string, value: any) => {
  if (typeof sessionStorage.getItem(USER._USER_TOKEN) === "string") {
    const user = JSON.parse(sessionStorage.getItem(USER._USER_TOKEN) as string);
     sessionStorage.setItem(
       USER._USER_TOKEN,
       JSON.stringify({ ...user, [key]: value })
     );
  } 
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

export const toTimeString = (serverDate:string) => {
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

export const toDateString = (serverDate:string) => {
  let date = new Date(serverDate).toDateString();
  let dateArr = date.split(" ");

  // if (date === new Date().toDateString()) return "Today";

  return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`;
};

export const apiRequest = (token:string) =>
  axios.create({
    baseURL: ENDPOINTS.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });