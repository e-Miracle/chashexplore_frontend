import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import DrawsCard from "../../../components/DrawsCard/DrawsCard";
import { Raffle } from "../../../assets";
import { fetchDraws, fetchData } from "../../../hooks/customGets";
import { useInfiniteQuery } from "react-query";
import { useIntersection } from "@mantine/hooks";
import { ENDPOINTS } from "../../../constants";
import toast from "react-hot-toast";
import { Draws } from "../../../Utils";
const Error = React.lazy(() => import("../../../components/ErrorComponent"));
const data = [
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 1,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 2,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 3,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 4,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 5,
    price: 150,
  },
];
data.length = 0;

const Top = ({ title }: { title: string }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading
  } = useInfiniteQuery(
    "followerTopDraws",
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: ENDPOINTS.API_INFLUENCER_TOP_DRAWS as string,
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
     return <Error err={errorMessage} small={true} />;
  }
  return (
    <div className="font-ubuntu  bg-bg rounded-[10px] p-[1rem] my-[1rem]">
      <h1 className="text-center md:text-left text-primary text-base font-bold lg:text-[1.25rem]  mb-[1rem]">
        {title}
      </h1>
      <div
        ref={observerRef}
        className="flex overflow-x-auto space-x-8 w-full mt-5"
      >
        {flattenedData && flattenedData.length > 0 ? (
          <>
            {flattenedData.map((item: Draws, i: number) => (
              <DrawsCard
                key={i}
                noref={i === flattenedData.length - 1 ? ref : null}
                item={item}
              />
            ))}
            {isFetchingNextPage && <Spinner toggle={false} />}
          </>
        ) : (
          <h3 className="text-primary text-sm lg:text-base font-semibold">
            No Top Draws
          </h3>
        )}
      </div>
    </div>
  );
};

const Other = ({ title }: { title: string }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "followerOtherDraws",
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: ENDPOINTS.API_INFLUENCER_TOP_DRAWS as string,
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
      return <Error err={errorMessage} small={true} />;
  }
  return (
    <div className="font-ubuntu  bg-bg rounded-[10px] p-[1rem] my-[1rem]">
      <h1 className="text-center md:text-left text-primary text-base font-bold lg:text-[1.25rem]  mb-[1rem]">
        {title}
      </h1>
      <div
        ref={observerRef}
        className="flex overflow-x-auto space-x-8 w-full mt-5"
      >
        {flattenedData && flattenedData.length > 0 ? (
          <>
            {flattenedData.map((item: Draws, i: number) => (
              <DrawsCard
                key={i}
                noref={i === flattenedData.length - 1 ? ref : null}
                item={item}
              />
            ))}
            {isFetchingNextPage && <Spinner toggle={false} />}
          </>
        ) : (
          <h3 className="text-primary text-sm lg:text-base font-semibold">
            No Other Draws
          </h3>
        )}
      </div>
    </div>
  );
};

const Beauty = ({ title }: { title: string }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading
  } = useInfiniteQuery(
    "followerBeautyProducts",
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: ENDPOINTS.API_INFLUENCER_TOP_DRAWS as string,
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
      return <Error err={errorMessage} small={true} />;
  }
  return (
    <div className="font-ubuntu  bg-bg rounded-[10px] p-[1rem] my-[1rem]">
      <h1 className="text-center md:text-left text-primary text-base font-bold lg:text-[1.25rem]  mb-[1rem]">
        {title}
      </h1>
      <div
        ref={observerRef}
        className="flex overflow-x-auto space-x-8 w-full mt-5"
      >
        {flattenedData && flattenedData.length > 0 ? (
          <>
            {flattenedData.map((item: Draws, i: number) => (
              <DrawsCard
                key={i}
                noref={i === flattenedData.length - 1 ? ref : null}
                item={item}
              />
            ))}
            {isFetchingNextPage && <Spinner toggle={false} />}
          </>
        ) : (
          <h3 className="text-primary text-sm lg:text-base font-semibold">
            No Beauty Products
          </h3>
        )}
      </div>
    </div>
  );
};
const index = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <Top title={"Top Performing Draws"} />
        <Other title={"Other Draws"} />
        <Beauty title={"Beauty Products"} />
      </DashBoardLayout>
    </Suspense>
  );
};

export default index;
