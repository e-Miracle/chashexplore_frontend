import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import {
  faPlus,
  faEye,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PrizeDraw } from "../../../assets";
import { _INFLUENCER_, ENDPOINTS } from "../../../constants";
import { BackgroundDrop } from "./Profile";
import { useQuery, useInfiniteQuery, QueryClient } from "react-query";
import toast from "react-hot-toast";
import { fetchCampaigns, fetchDraws } from "../../../hooks/customGets";
import { Campaign, convertEndpointToTitle } from "../../../Utils";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useIntersection } from "@mantine/hooks";
const Pagination = React.lazy(
  () => import("../../../components/Paginate/Paginate")
);

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-primary font-ubuntu text-[1.5rem] lg:text-[2rem]">
        My Draws
      </h2>
      <Link
        to={`/my/dashboard/${_INFLUENCER_}/create`}
        className="bg-primary text-white rounded-[100px] p-5 hover:opacity-90"
      >
        {" "}
        <FontAwesomeIcon icon={faPlus} className="mr-2 " /> Create New Draw
      </Link>
    </div>
  );
};

const color: { [key: string]: string } = {
  Top: "",
  Pending: "#FDCB18",
  Active: "#18FD66",
  inActive: "#FD1818",
};

const Table = ({
  data,
  observerRef,
  normalRef,
  title = String(ENDPOINTS.API_INFLUENCER_TOP_DRAWS),
}: {
  data: Campaign[];
  observerRef: any;
  normalRef: any;
  title: string;
}) => {
  const navigate = useNavigate();
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div
        ref={observerRef}
        className="relative overflow-x-auto overflow-y-auto h-[calc(100vh-20vh)]  sm:rounded-lg font-ubuntu bg-[black]"
      >
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-labelLight uppercase bg-bg ">
            <tr className="h-[70px]">
              <th scope="col" className="text-left  py-3">
                Campaign Name
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Tickets Sold
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Amounts Raised
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Participants
              </th>
              <th scope="col" className="text-center px-6 py-3"></th>
              <th scope="col" className="text-center px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item: Campaign, i: number) => (
                <tr
                  key={item.id}
                  className="bg-white hover:opacity-80 cursor-pointer h-[100px] mx-5"
                >
                  <th
                    scope="row"
                    className=" py-4 font-medium  text-heading whitespace-nowrap text-left capitalize "
                    ref={i === data.length - 1 ? normalRef : null}
                  >
                    <span
                      style={{
                        background:
                          color[convertEndpointToTitle(title) as string],
                      }}
                      className="w-[6px] h-[6px] rounded-full  mx-2 inline-block"
                    ></span>{" "}
                    {item.title}
                  </th>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.tickets_sold}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.amount_raised}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {/* {item.participants.length > 0 ? (
                      <>
                        {item.brand_colors &&
                          JSON.parse(item.brand_colors).length > 0 && (
                            <div>
                              {JSON.parse(item.brand_colors).map(
                                (it: string, i: number) => (
                                  <div
                                    key={i}
                                    className={` rounded-full border  w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                                    style={{
                                      zIndex: i > 0 ? i + 1 : 0,
                                      marginLeft:
                                        i > 0
                                          ? isMobile
                                            ? "-1rem"
                                            : "-1rem"
                                          : "",
                                      background: it,
                                    }}
                                  ></div>
                                )
                              )}
                            </div>
                          )}
                        <div
                          className={` rounded-full border  w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                          style={{
                            zIndex: i > 0 ? i + 1 : 0,
                            marginLeft:
                              i > 0 ? (isMobile ? "-1rem" : "-1rem") : "",
                            background: "#FBFBFD",
                          }}
                        >
                          {item.number_of_winners + "+"}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center relative ">
                        {["#F91C1C", "#1F52AE", "#E38A38", 36].map(
                          (it: string | number, i: number) => (
                            <div
                              key={i}
                              className={` rounded-full border  w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                              style={{
                                zIndex: i > 0 ? i + 1 : 0,
                                marginLeft:
                                  i > 0 ? (isMobile ? "-1rem" : "-1rem") : "",
                                background:
                                  typeof it === "number" ? "#FBFBFD" : it,
                              }}
                            >
                              {typeof it === "number" &&
                                item.ticket?.ticket_sale_cap + "+"}
                            </div>
                          )
                        )}
                      </div>
                    )} */}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/my/dashboard/${_INFLUENCER_}/draws/singledraw/${item.id}`
                        )
                      }
                      className="flex items-center bg-[#F4F6F8] rounded-[100px] text-primary p-5 hover:opacity-80"
                    >
                      {" "}
                      <FontAwesomeIcon className="mr-2" icon={faEye} />
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    <button className="flex items-center text-white bg-primary rounded-[100px] text-primary p-5 hover:opacity-80">
                      <FontAwesomeIcon className="mr-2" icon={faShareSquare} />
                      Share
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

const Body = () => {
  const [currentUrl, setCurrentUrl] = React.useState<string>(
    String(ENDPOINTS.API_INFLUENCER_TOP_DRAWS)
  );

  const queryKey = ["draws", currentUrl];
  const queryClient = new QueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: currentUrl,
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

  React.useEffect(() => {
    // Refetch the data when the search string changes
    // This will trigger a fresh query with the updated search string
    queryClient.invalidateQueries(queryKey);
  }, [currentUrl, queryKey, queryClient]);

  const draws = [
    { name: "top", endpoint: String(ENDPOINTS.API_INFLUENCER_TOP_DRAWS) },
    { name: "active", endpoint: String(ENDPOINTS.API_INFLUENCER_ACTIVE_DRAWS) },
    {
      name: "inactive",
      endpoint: String(ENDPOINTS.API_INFLUENCER_INACTIVE_DRAWS),
    },
    {
      name: "pending",
      endpoint: String(ENDPOINTS.API_INFLUENCER_PENDING_DRAWS),
    },
  ];

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
    <div className=" mt-[1rem] lg:mt-10 bg-bg md:h-[calc(100vh-20vh)]  p-[1rem] lg:p-[2rem] rounded-[10px] ">
      <select
        className="font-ubuntu capitalize bg-bg text-[#4E5767]  text-[1.2rem] lg:text-[1.5rem] outline-none"
        onChange={(e) => setCurrentUrl(e.target.value)}
      >
        {draws.map((item, i) => (
          <option
            className="text-sm lg:text-base"
            key={i}
            value={item.endpoint}
          >
            {item.name} draws
          </option>
        ))}
      </select>
      <>
        {flattenedData && flattenedData.length > 0 ? (
          <>
            <Table
              data={flattenedData}
              observerRef={observerRef}
              normalRef={ref}
              title={currentUrl}
            />
            {isFetchingNextPage && <Spinner toggle={false} />}
            {/* <Pagination
              postsPerPage={postsPerPage}
              totalPosts={campaigns ? campaigns?.length : 0}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={currentPage}
            /> */}
          </>
        ) : (
          <>
            {isFetching ? (
              <Spinner toggle={false} />
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <LazyLoadImage
                  className="  w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]  my-[1rem]  object-contain"
                  src={PrizeDraw}
                  placeholderSrc={"https://via.placeholder.com/100x100"}
                  alt={PrizeDraw}
                />

                <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
                  Your {convertEndpointToTitle(currentUrl)} performing raffle
                  draws appear here. Start creating awesome and exciting raffle
                  draws for your audience.
                </p>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};
const Index = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <Header />
        <Body />
      </DashBoardLayout>
    </Suspense>
  );
};

export default Index;
