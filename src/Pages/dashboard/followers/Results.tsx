import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { Raffle, BlueLogo } from "../../../assets";
import { useQuery, useInfiniteQuery } from "react-query";
import {
  fetchSingleCampaign,
  fetchWinners,
  fetchReviews,
} from "../../../hooks/customGets";
import toast from "react-hot-toast";
import { getUserData } from "../../../Utils";
import { useParams, useNavigate } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import ReviewCard from "../../../components/ReviewCard/ReviewCard";
const Table = lazy(() => import("../../../components/Table/WinnersTable"));
const Error = React.lazy(() => import("../../../components/ErrorComponent"));
const columnsArr = [
  { Header: "Ticket ID", accessor: "ticketId" },
  { Header: "Prize", accessor: "price" },
  { Header: "Username", accessor: "username" },
  { Header: "Phone Number", accessor: "number" },
];
const Header = ({ id }: { id: number }) => {
  const { isLoading, isError, data, error } = useQuery(
    "singleCampaign",
    () => fetchSingleCampaign(id),
    {
      onSuccess: (data) => {
        if (data) toast.success("successful");
      },
      onError: (err) => {
        if (err) toast.error("An error occured");
      },
    }
  );

  if (isLoading) return <Spinner toggle={false} />;

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
    <div className="flex flex-col  items-center md:flex-row justify-between">
      <h1
        className={
          "text-center md:text-left font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem]"
        }
      >
        {data?.data?.title}
      </h1>
      <p className=" text-center md:text-left mt-[1rem] md:mt-0 text-base lg:text-[1.25rem] text-labels">
        Date Ended: {new Date(data?.data?.end_date).toISOString().split("T")[0]}
      </p>
    </div>
  );
};

const Hero = () => {
  return (
    <div className=" mt-10 bg-white rounded-[10px] p-5 font-ubuntu flex flex-col md:flex-row items-center flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-center md:text-left text-primary text-[1.2rem] lg:text-[1.5rem]">
          Raffle Drawn!!
        </h1>
        <p className="text-center md:text-left text-labels text-sm lg:text-base mt-5">
          This raffle ticket sale has ended and the raffle has been drawn. View
          winners below.
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-[1rem] md:mt-0">
        <img
          src={Raffle}
          alt={Raffle}
          className="w-full  h-[292px] md:h[200px] object-cover shadow-new"
        />
      </div>
    </div>
  );
};

const Winners = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "winners",
    async ({ pageParam = 1 }) => {
      const res = await fetchWinners(id, pageParam);
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
        if (data) toast.success(data?.pages[data?.pages.length - 1]?.message);
      },
      onError: (err) => {
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
      return <Error err={errorMessage} small={true} />;
  }
  return (
    <div className="mt-10">
      <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu">
        Winners
      </h1>
      <>
        {flattenedData && flattenedData.length > 0 ? (
          <>
            <Table
              dataArr={flattenedData}
              observerRef={observerRef}
              normalRef={ref}
              columnsArr={columnsArr}
            />
            {isFetchingNextPage && <Spinner toggle={false} />}
            {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
              <p className="text-sm lg:text-base text-center my-3 text-primary">
                Nothing more to load
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
              Your winners will appear here.
            </p>
          </div>
        )}
      </>
      <div className="my-[1rem] flex justify-center items-center">
        <button
          onClick={() =>
            navigate(
              `/my/dashboard/${getUserData()?.role}/draws/singledraw/${id}`
            )
          }
          className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
        >
          View Draw Recap
        </button>
      </div>
    </div>
  );
};

const Reviews = ({ id }: { id: number }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading
  } = useInfiniteQuery(
    "reviews",
    async ({ pageParam = 1 }) => {
      const res = await fetchReviews(id, pageParam);
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
        if (data) toast.success(data?.pages[data?.pages.length - 1]?.message);
      },
      onError: (err) => {
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
     return <Error err={errorMessage} small={true} />;
  }
  return (
    <div>
      <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu  my-[3rem]">
        Reviews
      </h1>
      <>
        {flattenedData && flattenedData.length > 0 ? (
          <div
            className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0 overflow-y-auto"
            ref={observerRef}
          >
            {flattenedData.map((item, i: number) => (
              <ReviewCard
                key={i}
                noref={i === flattenedData.length - 1 ? ref : null}
                {...item}
              />
            ))}
            {isFetchingNextPage && <Spinner toggle={false} />}
            {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
              <p className="text-sm lg:text-base text-center my-3 text-primary">
                Nothing more to load
              </p>
            )}
          </div>
        ) : (
          <h3 className="text-primary text-sm lg:text-base font-semibold">
            No Reviews
          </h3>
        )}
      </>
    </div>
  );
};

const Results = () => {
  const { id } = useParams();
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <BackgroundDrop>
          <Header id={Number(id)} />
          <Hero />
          <Winners id={Number(id)} />
          <Reviews id={Number(id)} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Results;
