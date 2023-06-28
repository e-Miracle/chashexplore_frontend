import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Spinner from "../../../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPen,
  faEye,
  faEyeSlash,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Google,
  Twitter,
  Facebook,
  LinkedIn,
  Instagram,
} from "../../../assets";
import { nFormatter, getUserData } from "../../../Utils";
import DrawsCard from "../../../components/DrawsCard/DrawsCard";
import { Raffle } from "../../../assets";
import toast from "react-hot-toast";
import { fetchDraws, fetchData } from "../../../hooks/customGets";
import { useInfiniteQuery, useQuery } from "react-query";
import { Draws } from "../../../Utils";
import { ENDPOINTS } from "../../../constants";
import { useIntersection } from "@mantine/hooks";

export const data = [
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

export const BackgroundDrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      {" "}
      <div className="bg-bg p-[1rem] mt-5 rounded-[10px] ">{children}</div>
    </Suspense>
  );
};

export const Header = () => {
  const { isLoading, isError, data, error } = useQuery(
    "socials",
    ({ pageParam = 1 }) =>
      fetchData({
        page: pageParam,
        endpoint: String(ENDPOINTS.API_INFLUENCER_VERIFY_ACCOUNT),
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        if (data) toast.success("Successful");
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
  type socialCta = { imgUrl: string; cta: string; color?: string };
  const socailCta: socialCta[] = [
    { imgUrl: Google, cta: "" },
    { imgUrl: Twitter, cta: data?.data?.twitter_url, color: "#1D9BF0" },
    { imgUrl: Facebook, cta: data?.data?.facebook_url, color: "#1877F2" },
    { imgUrl: LinkedIn, cta: data?.data?.linked_url, color: "" },
    { imgUrl: Instagram, cta: data?.data?.instagram_url },
  ];
  return (
    <div className="flex flex-wrap font-ubuntu">
      <div className="w-full md:w-[70%] flex ">
        <div className=" hidden lg:block relative  w-[70px] h-[70px] lg:w-[120px]   lg:h-[120px] p-1 rounded-full border-[7px] border-primary border-r-white relative">
          <img
            className="  w-full h-full object-cover rounded-full "
            src={"https://via.placeholder.com/100x100"}
            alt="Image Alt"
          />
          <span className="  w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] bg-green rounded-full absolute right-1 bottom-2"></span>
        </div>
        <div className="lg:ml-5 w-full lg:w-[70%] ">
          <div className=" flex items-center w-full">
            <h3 className="text-labels text-[1.5rem] lg:text-[2rem] capitalize">
              {getUserData()?.first_name} {getUserData()?.last_name}{" "}
              {getUserData()?.account_verfied != "0" && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-primary"
                />
              )}{" "}
            </h3>
            <button className="ml-3 lg:ml-10 text-[#797F8A] text-[1.5rem] lg:text-[2rem] cursor-pointer hover:opacity-90">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>

          <p className="text-icon text-sm lg:text-base rounded-[100px] bg-[#F4F6F8] px-7 py-3 text-center mt-3">
            {getUserData()?.email}
          </p>
        </div>
      </div>
      <div className="w-full md:w-[30%] mt-5 lg:mt-0 ">
        {" "}
        <p className="text-[#000] text-sm lg:text-base text-center md:text-left">
          Connect with me:
        </p>
        <div className="flex flex-wrap justify-center md:justify-start  items-center  mt-[3rem]">
          {socailCta.map((item: socialCta, i: number) => (
            <div key={i}>
              {item.cta && (
                <a
                  className="hover:opacity-80 rounded-full shadow-primary p-2 flex justify-center items-center ml-0 mr-2"
                  style={{ background: item?.color }}
                  href={item.cta}
                  target="_blank"
                >
                  {" "}
                  <LazyLoadImage
                    className="w-[20px] md:w-[30px] h-[20px] md:h-[30px] object-contain"
                    src={item.imgUrl}
                    placeholderSrc={"https://via.placeholder.com/72x72"}
                    alt={item.imgUrl}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ActiveDraws = () => {
  const queryKey = ["draws", ENDPOINTS.API_INFLUENCER_ACTIVE_DRAWS];
  const [visible, setVisbility] = useState<boolean>(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isFetching,
    isLoading,
  } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await fetchDraws({
        page: pageParam,
        endpoint: String(ENDPOINTS.API_INFLUENCER_TOP_DRAWS),
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
      {isLoading && <div className="text-black">"Loading..."</div>}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setVisbility(!visible)}
      >
        <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
          Active Draws
        </h3>
        <button>
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </button>
      </div>
      {visible && (
        <div
          className="flex overflow-x-auto space-x-8 w-full mt-5"
          ref={observerRef}
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
              No Active Draws
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export const InActiveDraws = () => {
  const queryKey = ["draws", ENDPOINTS.API_INFLUENCER_INACTIVE_DRAWS];
  const [visible, setVisibility] = useState<boolean>(false);
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
        endpoint: String(ENDPOINTS.API_INFLUENCER_INACTIVE_DRAWS),
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
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu mt-[1rem]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setVisibility(!visible)}
      >
        <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
          Inactive Draws
        </h3>
        <button>
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </button>
      </div>
      {visible && (
        <div
          className="flex overflow-x-auto space-x-8 w-full mt-5"
          ref={observerRef}
        >
          {flattenedData && flattenedData.length > 0 ? (
            <>
              {flattenedData.map((item: Draws, i) => (
                <DrawsCard
                  key={i}
                  item={item}
                  noref={i === flattenedData.length - 1 ? ref : null}
                />
              ))}
              {isFetchingNextPage && <Spinner toggle={false} />}
            </>
          ) : (
            <h3 className="text-primary text-sm lg:text-base font-semibold">
              No InActive Draws
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

const Body = ({ balance, data }: { balance: number; data: any[] }) => {
  const [visible, setVisbility] = useState<boolean>(false);
  return (
    <div className=" bg-white mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem]  md:h-[calc(100vh-30vh)] font-ubuntu">
      <div className="col-span-6 lg:col-span-4">
        <ActiveDraws />
        <InActiveDraws />
      </div>
      <div className="col-span-6 lg:col-span-2 bg-bg rounded-[10px] p-[1rem] ">
        <h3 className="text-heading text-[1.2rem] lg:text-[1.5rem]">
          Wallet Details
        </h3>

        <div className="bg-white mt-5 p-[1rem] rounded-[10px] relative">
          <p className="text-[#8E939D] text-base text-[1.25rem]">
            Wallet Balance:
          </p>
          <h2 className="text-primary text-[1.8rem] text-[2rem] mt-3">
            {visible ? ` ₦ ${nFormatter(balance, 3)}` : "********"}
          </h2>
          <button
            className="absolute right-2 bottom-2"
            onClick={() => setVisbility(!visible)}
          >
            {" "}
            <FontAwesomeIcon
              icon={visible ? faEye : faEyeSlash}
              className="text-[#8E939D]"
            />
          </button>
        </div>
        <div className="flex justify-center items-center mt-3">
          <button className=" bg-primary text-[#fff] text-sm lg:text-base outline-none  py-5 px-8 mt-5 rounded-[100px] cursor-pointer hover:opacity-80">
            Withdraw Balance
          </button>
        </div>
      </div>
    </div>
  );
};
const Profile = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <BackgroundDrop>
          <Header />
          <Body data={data} balance={100000000} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Profile;
