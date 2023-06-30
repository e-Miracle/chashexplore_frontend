import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { Title } from "./Draws";
import DrawsCard from "../../../components/DrawsCard/DrawsCardAlt2";
import { Raffle } from "../../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { fetchDraws } from "../../../hooks/customGets";
import { useIntersection } from "@mantine/hooks";
import { ENDPOINTS } from "../../../constants";
import { Draws } from "../../../Utils";
import { useInfiniteQuery } from "react-query";
import toast from "react-hot-toast";
const data = [
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 1,
    ticketId: "GN24812ER",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 2,
    ticketId: "GN24806DF",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 3,
    ticketId: "GN24805GH",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 4,
    ticketId: "GN24809YM",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 5,
    ticketId: "GN24809HN",
  },
];

const ActiveDraws = ({ text }: { text: string }) => {
  const [visible, setVisbility] = useState<boolean>(true);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "followerActiveDraws",
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: ENDPOINTS.API_INFLUENCER_ACTIVE_DRAWS as string,
      });
      return res;
    },

    {
      getNextPageParam: (_, allPages) => {
        return allPages[allPages.length - 1]?.data.next_page_url
          ? allPages[allPages.length - 1]?.data.current_page + 1
          : null;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
      onSuccess: (data) => {
        console.log(data);
        if (data) toast.success(data?.pages[data?.pages.length - 1]?.message);
      },
      onError: (err) => {
        console.log(err);
        if (err) toast.error("An error occured");
      },
    }
  );
  const flattenedData = data?.pages.flatMap((page) => page.data.data) || [];
  const observerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: observerRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage)
      fetchNextPage();
  }, [entry]);

  if (isFetching) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return (
      <div>
        <p>There was an error fetching the data.</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
      <button onClick={() => setVisbility(!visible)}>
        <h3 className="text-[#4E5767] text-base lg:text-[1.25rem] font-semibold">
          {text}{" "}
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </h3>
      </button>
      {visible && (
        <>
          {flattenedData && flattenedData.length > 0 ? (
            <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0 h-[80vh]">
              {flattenedData.map((item: Draws, i: number) => (
                <DrawsCard
                  key={i}
                  noref={i === flattenedData.length - 1 ? ref : null}
                  item={item}
                />
              ))}
              {isFetchingNextPage && <Spinner toggle={false} />}
            </div>
          ) : (
            <h3 className="text-primary text-sm lg:text-base font-semibold">
              No Active Draws
            </h3>
          )}
        </>
      )}
    </div>
  );
};

const InactiveDraws = ({ text }: { text: string }) => {
  const [visible, setVisbility] = useState<boolean>(true);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "followerInactiveDraws",
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: ENDPOINTS.API_INFLUENCER_INACTIVE_DRAWS as string,
      });
      return res;
    },

    {
      getNextPageParam: (_, allPages) => {
        return allPages[allPages.length - 1]?.data.next_page_url
          ? allPages[allPages.length - 1]?.data.current_page + 1
          : null;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
      onSuccess: (data) => {
        console.log(data);
        if (data) toast.success(data?.pages[data?.pages.length - 1]?.message);
      },
      onError: (err) => {
        console.log(err);
        if (err) toast.error("An error occured");
      },
    }
  );
  const flattenedData = data?.pages.flatMap((page) => page.data.data) || [];
  const observerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: observerRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage)
      fetchNextPage();
  }, [entry]);

  if (isFetching) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return (
      <div>
        <p>There was an error fetching the data.</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
      <button onClick={() => setVisbility(!visible)}>
        <h3 className="text-[#4E5767] text-base lg:text-[1.25rem] font-semibold">
          {text}{" "}
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </h3>
      </button>
      {visible && (
        <>
          {flattenedData && flattenedData.length > 0 ? (
            <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0 h-[80vh]">
              {flattenedData.map((item: Draws, i: number) => (
                <DrawsCard
                  key={i}
                  noref={i === flattenedData.length - 1 ? ref : null}
                  item={item}
                />
              ))}
              {isFetchingNextPage && <Spinner toggle={false} />}
            </div>
          ) : (
            <h3 className="text-primary text-sm lg:text-base font-semibold">
              No Active Draws
            </h3>
          )}
        </>
      )}
    </div>
  );
};
const Transactions = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <Title text="My Tickets" />
        <BackgroundDrop>
          {" "}
          <ActiveDraws text="Active Draws" />
          <InactiveDraws text="Inactive  Draws" />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
