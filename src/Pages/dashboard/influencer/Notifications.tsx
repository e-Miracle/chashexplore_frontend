import React, { Suspense, lazy, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "./Profile";
import NotifyToast from "../../../components/NotifyToast/NotifyToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
const data = [
  {
    title: "100,000naira New Year Giveaway Update",
    paragraph:
      "The ticket sales is about to end, get ready for the live draw...",
    status: false,
    time: "31.3.2023; 12:27",
    color: "#1F52AE",
    desc: `Congratulations! You draw payouts have been successfully disbursed to the winners of the competition. View the payment receipt here.Congratulations!`,
  },
  {
    title: "Pending Draw Published",
    paragraph:
      "The ticket sales is about to end, get ready for the live draw...",
    status: true,
    time: "31.3.2023; 12:27",
    color: "#1F52AE",
    desc: `Congratulations! You draw payouts have been successfully disbursed to the winners of the competition. View the payment receipt here.Congratulations!`,
  },
  {
    title: "Winners Successfully Paid",
    paragraph:
      "The ticket sales is about to end, get ready for the live draw...",
    status: false,
    time: "31.3.2023; 12:27",
    color: "#1F52AE",
    desc: `Congratulations! You draw payouts have been successfully disbursed to the winners of the competition. View the payment receipt here.Congratulations!`,
  },
  {
    title: "1100,000naira New Year Giveaway Update",
    paragraph:
      "The ticket sales is about to end, get ready for the live draw...",
    status: true,
    time: "31.3.2023; 12:27",
    color: "#1F52AE",
    desc: `Congratulations! You draw payouts have been successfully disbursed to the winners of the competition. View the payment receipt here.Congratulations!`,
  },
  {
    title: "Winners Successfully Paid",
    paragraph:
      "The ticket sales is about to end, get ready for the live draw...",
    status: false,
    time: "31.3.2023; 12:27",
    color: "#1F52AE",
    desc: `Congratulations! You draw payouts have been successfully disbursed to the winners of the competition. View the payment receipt here.Congratulations!`,
  },
];
const Body = ({}: { data: any[] }) => {
  const [currentNotification, setCurrentNotification] = useState<any>(null);
  const [visible, setVisibility] = useState<boolean>();
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="text-[#000] font-ubuntu mt-[2rem] flex justify-between h-screen md:h-auto">
        <div
          className={
            visible
              ? "hidden md:block md:w-[48%] bg-bg p-[1.5rem] rounded-[10px] ease-in duration-300 z-[5] "
              : "w-full bg-bg p-[1.5rem] rounded-[10px] ease-in duration-300 relative z-[5]"
          }
        >
          {visible && (
            <div className="flex justify-end  mb-5">
              <button
                onClick={() => setVisibility(false)}
                className="bg-[#DBDDE2] text-primary hover:opacity-90 cursor-pointer  w-[24px] h-[24px] rounded-full"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          )}
          {data &&
            data.length > 0 &&
            data.map((item, i: number) => (
              <NotifyToast
                key={i}
                {...item}
                OnClick={() => {
                  setCurrentNotification(item);
                  setVisibility(true);
                }}
              />
            ))}
        </div>{" "}
        {visible && (
          <div className="w-full md:w-[48%] bg-[#FCFCFD] rounded-[10px] p-[1.5rem] ease-in duration-300 relative z-[9]">
            <button
              onClick={() => setVisibility(false)}
              className="md:hidden bg-[#DBDDE2] text-primary hover:opacity-90 cursor-pointer  w-[24px] h-[24px] rounded-full"
            >
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>
            <h1 className="text-heading text-[1.2rem] text-[1.5rem] font-bold">
              {currentNotification && currentNotification.title}
            </h1>
            <hr className="border-0 border-b-[1px] border-b-[#B7B7B9] my-[.5rem]" />
            <h5 className=" text-[#8E939D] text-[10px] lg:text-[12px]">
              {currentNotification && currentNotification.time}
            </h5>

            <p className="text-[#394355] text-sm lg:text-base leading-[2] mt-5">
              {currentNotification && currentNotification.desc}
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};
const Notifications = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <h1 className="text-primary font-ubuntu text-[1.8rem] lg:text-[2rem] text-center md:text-left">
          Notifications
        </h1>
        <Body data={data} />
      </DashBoardLayout>
    </Suspense>
  );
};

export default Notifications;
