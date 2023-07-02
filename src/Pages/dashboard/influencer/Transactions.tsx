import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "./Profile";
import {
  Campaign,
  Draws,
  convertEndpointToTitle,
  nFormatter,
} from "../../../Utils";
import { fetchCampaigns } from "../../../hooks/customGets";
import { useInfiniteQuery } from "react-query";
import toast from "react-hot-toast";
import { useIntersection } from "@mantine/hooks";
const Error = lazy(() => import("../../../components/ErrorComponent"));

export const Tables = ({
  data,
  observerRef,
  normalRef,
}: {
  data: Campaign[];
  observerRef: any;
  normalRef: any;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div
        ref={observerRef}
        className="relative overflow-x-auto overflow-y-auto h-[calc(100vh-20vh)] border-none sm:rounded-lg font-ubuntu bg-[black]"
      >
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400 font-ubuntu border-none">
          <thead className="text-xs text-gray-700 capitalize ">
            <tr className="h-[70px]">
              <th
                scope="col"
                className="text-[#646C79] text-left  text-sm lg:text-base  py-3 "
              >
                Campaign Name
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Tickets Sold.ticket
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Amounts Raised
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Total Prize(00%)
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Organizer Payout(00%)
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item: Campaign, i: number) => (
                <tr
                  key={item.id}
                  className="overflow-hidden whitespace-nowrap  hover:opacity-80 cursor-pointer mx-5  h-[100px]  rounded-[10px]  bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-5 "
                >
                  <th
                    scope="row"
                    className=" py-4 font-medium  text-heading whitespace-nowrap text-left capitalize  text-sm lg:text-base"
                    ref={i === data.length - 1 ? normalRef : null}
                  >
                    <span className="w-[6px] h-[6px] bg-[red] rounded-full  mx-2 inline-block"></span>{" "}
                    {item.title}
                  </th>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(item.tickets_sold, 3)}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(item.amount_raised, 3)}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(
                      Number(item.number_of_winners) *
                        Number(item.ticket?.ticket_prize),
                      3
                    )}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(
                      Number(item.tickets_sold) *
                        Number(item.ticket?.ticket_prize),
                      3
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};
const Transactions = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "campaigns",
    async ({ pageParam = 1 }) => {
      const res = await fetchCampaigns(pageParam);
      return res;
    },

    {
      getNextPageParam: (_, allPages) => {
        return allPages[allPages.length - 1]?.data.next_page_url
          ? allPages[allPages.length - 1]?.data.current_page + 1
          : null;
      },
      onSuccess: (data) => {
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

  if (isLoading) return <Spinner />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
     return <Error err={errorMessage}  />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <h1 className="text-primary font-ubuntu text-[1.8rem] lg:text-[2rem] text-center md:text-left">
          Transactions
        </h1>
        <BackgroundDrop>
          {flattenedData && flattenedData.length > 0 ? (
            <>
              <Tables
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
            <div className="text-[black]">
              Your transactions would appear here
            </div>
          )}
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
