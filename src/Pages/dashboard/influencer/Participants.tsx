import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { PreviewImage } from "../../../assets";
import { useInfiniteQuery } from "react-query";
import { fetchParticipants } from "../../../hooks/customGets";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useIntersection } from "@mantine/hooks";
const Table = React.lazy(() => import("../../../components/Table/DrawsTable"));
const columnsArr = [
  { Header: "Participants’ Username", accessor: "name" },
  { Header: "Tickets Bought", accessor: "number_of_tickets" },
];
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
    isFetching,
  } = useInfiniteQuery(
    "draws",
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
      initialData: {
        pages: [],
        pageParams: [1],
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
    return (
      <div>
        <p>There was an error fetching the data.</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        {flattenedData && flattenedData.length > 0 ? (
          <>
            <Table
              dataArr={flattenedData}
              columnsArr={columnsArr}
              observerRef={observerRef}
              itemRef={ref}
            />
            {isFetchingNextPage && <Spinner toggle={false} />}
          </>
        ) : (
          <Spinner toggle={false} />
        )}
      </DashBoardLayout>
    </Suspense>
  );
};

export default Participants;
