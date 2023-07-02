import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import DrawsCard from "../../../components/DrawsCard/DrawsCardAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Raffle } from "../../../assets";
import { fetchDraws, fetchData } from "../../../hooks/customGets";
import { useInfiniteQuery } from "react-query";
import { useIntersection } from "@mantine/hooks";
import { ENDPOINTS } from "../../../constants";
import toast from "react-hot-toast";
import { Draws } from "../../../Utils";
const Error = React.lazy(() => import("../../../components/ErrorComponent"));

export const Title = ({ text }: { text: string }) => {
  return (
    <h2 className="text-primary font-ubuntu text-[1.5rem] lg:text-[2rem] capitalize">
      {text}
    </h2>
  );
};

const ActiveDraws = ({ text }: { text: string }) => {
  const [visible, setVisbility] = useState<boolean>(true);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
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
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
        <button onClick={() => setVisbility(!visible)}>
          <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
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
              <>
                <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0 h-[80vh]">
                  {flattenedData.map((item: Draws, i: number) => (
                    <DrawsCard
                      key={i}
                      noref={i === flattenedData.length - 1 ? ref : null}
                      item={item}
                      name={"john Doe"}
                    />
                  ))}
                </div>
                {isFetchingNextPage && <Spinner toggle={false} />}
                {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
                  <p className="text-sm lg:text-base text-center my-3 text-primary">
                    Nothing more to load
                  </p>
                )}
              </>
            ) : (
              <h3 className="text-primary text-sm lg:text-base font-semibold">
                No Active Draws
              </h3>
            )}
          </>
        )}
      </div>
    </Suspense>
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
    isLoading,
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
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
        <button onClick={() => setVisbility(!visible)}>
          <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
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
              <>
                <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0 h-[80vh]">
                  {flattenedData.map((item: Draws, i: number) => (
                    <DrawsCard
                      key={i}
                      noref={i === flattenedData.length - 1 ? ref : null}
                      item={item}
                      name={"john Doe"}
                    />
                  ))}
                </div>
                {isFetchingNextPage && <Spinner toggle={false} />}
                {!data?.pages[data?.pages.length - 1]?.data?.next_page_url && (
                  <p className="text-sm lg:text-base text-center my-3 text-primary">
                    Nothing more to load
                  </p>
                )}
              </>
            ) : (
              <h3 className="text-primary text-sm lg:text-base font-semibold">
                No Active Draws
              </h3>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};
const Index = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <Title text="My Draws" />
        <BackgroundDrop>
          <ActiveDraws text="Active Draws" />
          <InactiveDraws text="Inactive  Draws" />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Index;
