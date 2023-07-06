import React, { Suspense, lazy, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import NotifyToast from "../../../components/NotifyToast/NotifyToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "react-query";
import toast from "react-hot-toast";
import { fetchNotifications } from "../../../hooks/customGets";
import { useIntersection } from "@mantine/hooks";
import { Notification, countDown } from "../../../Utils";
const Error = lazy(() => import("../../../components/ErrorComponent"));
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
const Body = ({
  data,
  observerRef,
  normalRef,
}: {
  data: any[];
  observerRef: any;
  normalRef: any;
}) => {
  const [currentNotification, setCurrentNotification] =
    useState<Notification>();
  const [visible, setVisibility] = useState<boolean>();
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div
        ref={observerRef}
        className="text-[#000] font-ubuntu mt-[2rem] flex justify-between h-screen md:h-auto"
      >
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
                noref={i === data.length - 1 ? normalRef : null}
                key={i}
                item={item}
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
              {currentNotification && currentNotification?.data?.campaign_title}
            </h1>
            <hr className="border-0 border-b-[1px] border-b-[#B7B7B9] my-[.5rem]" />
            <h5 className=" text-[#8E939D] text-[10px] lg:text-[12px]">
              {currentNotification &&
                new Date(
                  countDown(currentNotification?.created_at).year,
                  countDown(currentNotification?.created_at).month,
                  countDown(currentNotification?.created_at).day
                )
                  .toISOString()
                  .split("T")[0]}
            </h5>

            <p className="text-[#394355] text-sm lg:text-base leading-[2] mt-5">
              {currentNotification && "there is no description still sad asf"}
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};
const Notifications = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "notifications",
    async ({ pageParam = 1 }) => {
      const res = await fetchNotifications({
        page: pageParam,
      });
      return res;
    },

    {
      getNextPageParam: (_, allPages) => {
        return allPages[allPages.length - 1]?.data.next_page_url
          ? allPages[allPages.length - 1]?.data.current_page + 1
          : null;
      },
      onSuccess: (data) => {
        console.log(data);
        if (data) toast.success("Successfully fetched notifications");
      },
      onError: (err) => {
        console.log(err);
        if (err) toast.error("An error occured");
      },
    }
  );
  const flattenedData = data?.pages.flatMap((page) => page.data) || [];
  console.log("flattenedData", flattenedData);
  const observerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: observerRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage)
      fetchNextPage();
  }, [entry]);
  if (isLoading) return <Spinner />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return <Error err={errorMessage} small={true} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <h1 className="text-primary font-ubuntu text-[1.8rem] lg:text-[2rem] text-center md:text-left">
          Notifications
        </h1>
        {flattenedData && flattenedData.length > 0 ? (
          <>
            <Body
              data={flattenedData}
              observerRef={observerRef}
              normalRef={ref}
            />
            {isFetchingNextPage && <Spinner toggle={false} />}
            {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
              <p className="text-sm lg:text-base text-center my-3 text-primary">
                Nothing more to load
              </p>
            )}
          </>
        ) : (
          <div>
            <h1 className="text-primary font-ubuntu text-[1.2rem] lg:text-[1.5rem] text-center md:text-left">
              No notifications yet.
            </h1>
          </div>
        )}
      </DashBoardLayout>
    </Suspense>
  );
};

export default Notifications;
