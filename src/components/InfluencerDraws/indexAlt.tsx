import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EmptyDraw } from "../../assets";
import { useInfiniteQuery } from "react-query";
import toast from "react-hot-toast";
import { fetchDraws } from "../../hooks/customGets";
import { ENDPOINTS, _INFLUENCER_ } from "../../constants";
import { useIntersection } from "@mantine/hooks";
import Spinner from "../Spinner";
const DrawsTable = React.lazy(() => import("../Table/IndexAlt"));
const Error = React.lazy(() => import("../ErrorComponent"));
const index = () => {
  const dataArr = [
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
  ];
  // dataArr.length = 0;
  const columnsArr = [
    { Header: "Campaign Name", accessor: "campaign" },
    { Header: "Tickets Sold", accessor: "tickets" },
    { Header: "Amount Raised", accessor: "amounts" },
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "draws",
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
    <Suspense>
      <div className="bg-secondary rounded-[10px] p-5 h-full">
        <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
          Top Performing Draws
        </h2>
        {flattenedData && flattenedData.length > 0 ? (
          <>
            {" "}
            <DrawsTable
              dataArr={flattenedData}
              columnsArr={columnsArr}
              observerRef={observerRef}
              itemRef={ref}
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
            <LazyLoadImage
              className="  w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]  my-[1rem]  object-contain"
              src={EmptyDraw}
              placeholderSrc={"https://via.placeholder.com/100x100"}
              alt={EmptyDraw}
            />

            <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
              Your top performing raffle draws appear here. Start creating
              awesome and exciting raffle draws for your audience.
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default index;
