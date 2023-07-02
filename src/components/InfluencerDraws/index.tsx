import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EmptyDraw } from "../../assets";
import { useInfiniteQuery } from "react-query";
import toast from "react-hot-toast";
import { fetchDraws } from "../../hooks/customGets";
import { ENDPOINTS, _INFLUENCER_ } from "../../constants";
import Spinner from "../Spinner";
import { Draws } from "../../Utils";
import { useNavigate } from "react-router-dom";
import { faEye, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { useIntersection } from "@mantine/hooks";
const Modal = React.lazy(() => import("../Modal/Modal"));
const ModalContent = React.lazy(() =>
  import("../../Pages/dashboard/influencer/SingleDraw").then((res) => {
    return { default: res.ModalContent };
  })
);

const index = () => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number | null>(null);
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

  const openModal = (id: number) => {
    setId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setId(null);
  };

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
    <Suspense>
      <div className="bg-secondary rounded-[10px] p-5 h-full">
        <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
          Top Performing Draws{" "}
        </h2>

        {flattenedData && flattenedData.length > 0 ? (
          <>
            <div
              ref={observerRef}
              className="relative overflow-x-auto  sm:rounded-lg font-ubuntu h-[800px]"
            >
              <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-labelLight uppercase bg-bg ">
                  <tr className="h-[70px]">
                    <th
                      scope="col"
                      className=" text-[#646C79] font-ubuntu lg:text-base text-left  py-3"
                    >
                      Campaign Name
                    </th>
                    <th
                      scope="col"
                      className="text-[#646C79] font-ubuntu text-sm lg:text-base text-center px-6 py-3"
                    >
                      Tickets Sold
                    </th>
                    <th
                      scope="col"
                      className="text-[#646C79] font-ubuntu text-sm lg:text-base text-center px-6 py-3"
                    >
                      Amounts Raised
                    </th>
                    <th
                      scope="col"
                      className="text-[#646C79] font-ubuntu text-sm lg:text-base text-center px-6 py-3"
                    >
                      Participants
                    </th>
                    <th scope="col" className="text-center px-6 py-3"></th>
                    <th scope="col" className="text-center px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {flattenedData &&
                    flattenedData.length > 0 &&
                    flattenedData.map((item: Draws, i: number) => (
                      <tr
                        key={item.id}
                        className="bg-white hover:opacity-80 cursor-pointer h-[100px] mx-5"
                      >
                        <th
                          ref={i === flattenedData.length - 1 ? ref : null}
                          scope="row"
                          className=" py-4 font-medium  text-[#232E43]  font-ubuntu text-sm lg:text-base capitalize whitespace-nowrap text-left "
                        >
                          <span className="w-[6px] h-[6px] rounded-full bg-[#FD1826] mx-2 inline-block"></span>{" "}
                          {item.title}
                        </th>
                        <td className="px-6 py-4 text-[#232E43]  font-ubuntu text-sm lg:text-base text-center">
                          {item.tickets_sold}
                        </td>
                        <td className="px-6 py-4 text-[#232E43]  font-ubuntu text-sm lg:text-base text-center">
                          {item.amount_raised}
                        </td>
                        <td className="px-6 py-4 text-[#232E43]  font-ubuntu text-sm lg:text-base text-center">
                          {item.brand_colors &&
                          JSON.parse(item.brand_colors).length > 0 ? (
                            <div className="flex items-center relative  ">
                              {JSON.parse(item.brand_colors).map(
                                (it: string | number, i: number) => (
                                  <div
                                    key={i}
                                    className={` rounded-full   w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                                    style={{
                                      // zIndex: i > 0 ? i + 1 : 0,
                                      marginLeft:
                                        i > 0
                                          ? isMobile
                                            ? "-1rem"
                                            : "-1rem"
                                          : "",
                                      background:
                                        typeof it === "number" ? "#FBFBFD" : it,
                                    }}
                                  ></div>
                                )
                              )}
                              <div
                                className={` relative rounded-full   w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                                style={{
                                  // zIndex: i > 0 ? i + 1 : 0,
                                  marginLeft:
                                    i > 0 ? (isMobile ? "-1rem" : "-1rem") : "",
                                  background: "#FBFBFD",
                                }}
                              >
                                {item.participants_count}
                              </div>
                            </div>
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
                                        i > 0
                                          ? isMobile
                                            ? "-1rem"
                                            : "-1rem"
                                          : "",
                                      background:
                                        typeof it === "number" ? "#FBFBFD" : it,
                                    }}
                                  >
                                    {typeof it === "number" && it + "+"}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-heading text-center">
                          <button
                            onClick={() =>
                              navigate(
                                `/my/dashboard/${_INFLUENCER_}/draws/preview/${item.id}`
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
                          <button
                            onClick={() => openModal(item.id)}
                            className="flex items-center text-white bg-primary rounded-[100px] text-primary p-5 hover:opacity-80"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faShareSquare}
                            />
                            Share
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {isFetchingNextPage && <Spinner toggle={false} />}
            {/* {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-primary text-white"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )} */}
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
      <Modal visible={modalIsOpen}>
        <ModalContent
          onclick={closeModal}
          link={
            import.meta.env.MODE === "development"
              ? `http://localhost:5173/raffle-page-preview/${id}`
              : `https://cashexplore.emiracle.me/raffle-page-preview/${id}`
          }
        />
      </Modal>
    </Suspense>
  );
};

export default index;
