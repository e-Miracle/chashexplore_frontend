import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { useInfiniteQuery } from "react-query";
import { fetchParticipants } from "../../../hooks/customGets";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useIntersection } from "@mantine/hooks";
import { nFormatter } from "../../../Utils";
const Error = React.lazy(() => import("../../../components/ErrorComponent"));

export const Tables = ({
  data,
  normalRef,
}: {
  data: any[];
  normalRef: any;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="relative overflow-x-auto overflow-y-auto h-[95%] border-none sm:rounded-lg font-ubuntu bg-[black]">
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400 font-ubuntu border-none">
          <thead className="text-xs text-gray-700 capitalize ">
            <tr className="h-[70px]">
              <th
                scope="col"
                className="text-[#646C79] text-left  text-sm lg:text-base  py-3 "
              >
                Participants’ Username
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Tickets Bought
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Amounts
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Ticket_uid
              </th>
              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Phone
              </th>

              <th
                scope="col"
                className="text-[#646C79] text-center text-sm lg:text-base px-6 py-3 "
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item: any, i: number) => (
                <tr
                  key={item.id}
                  className="overflow-hidden whitespace-nowrap  hover:opacity-80 cursor-pointer mx-5  h-[100px]  rounded-[10px]  bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-5 "
                >
                  <th
                    scope="row"
                    className=" py-4 font-medium  text-heading whitespace-nowrap text-left capitalize  text-sm lg:text-base"
                    ref={i === data.length - 1 ? normalRef : null}
                  >
                    <span
                      className={`w-[6px] h-[6px]  rounded-full  mx-2 inline-block ${
                        JSON.parse(item.status) ? "bg-green" : "bg-[red]"
                      }`}
                    ></span>{" "}
                    {item.name}
                  </th>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(item.number_of_tickets, 3)}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {nFormatter(item.amount, 3)}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {item.ticket_uid}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 text-heading text-center text-sm lg:text-base">
                    {JSON.parse(item.status) ? "Success" : "failed"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};
const Participants = () => {
  const { id } = useParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery(
    "participants",
    async ({ pageParam = 1 }) => {
      const res = await fetchParticipants({
        page: pageParam,
        drawId: Number(id),
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
    return <Error err={errorMessage} />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <div
          ref={observerRef}
          className="h-[87vh] lg:h-[90vh] border  mt-5 mx-2 lg:mx-0"
        >
          {flattenedData && flattenedData.length > 0 ? (
            <>
              <Tables normalRef={ref} data={flattenedData} />
              {isFetchingNextPage && <Spinner toggle={false} />}
              {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
                <p className="text-sm lg:text-base text-center my-3 text-primary">
                  Nothing more to load
                </p>
              )}
            </>
          ) : (
            <div>sorry there are no participants</div>
          )}
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Participants;
