import React, { Suspense, lazy, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faShare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  nFormatter,
  countDown,
  getUserData,
  getSocialUrl,
} from "../../../Utils";
import { PreviewImage } from "../../../assets";
import { fetchSingleCampaign } from "../../../hooks/customGets";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_ } from "../../../constants";
import { fetchData } from "../../../hooks/customGets";
import { ENDPOINTS } from "../../../constants";
import {
  Google,
  Twitter,
  Facebook,
  LinkedIn,
  Instagram,
} from "../../../assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Modal = lazy(() => import("../../../components/Modal/Modal"));
const Timer = lazy(() => import("../../../components/Timer/Timer"));
const Table = lazy(() => import("../../../components/Table/DrawsTable"));
const CopyText = lazy(() => import("../../../components/CopyText/CopyText"));
const Error = lazy(() => import("../../../components/ErrorComponent"));

const Header = ({ title, endDate }: { title: string; endDate: string }) => {
  const header = (
    <div className="">
      <h1
        className={
          "font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem]"
        }
      >
        {title}
      </h1>
    </div>
  );
  return (
    <div className="flex flex-col  items-center md:flex-row justify-between">
      <>{header}</>
      <div className="flex justify-center items-center">
        <Timer
          countDownDate={
            new Date(
              countDown(endDate).year,
              countDown(endDate).month,
              countDown(endDate).day
            )
          }
          color="#394355"
          background="#FBFBFD"
        />
      </div>
    </div>
  );
};

const Boxes = ({
  data,
  id,
  participants,
}: {
  data: any[];
  id: number;
  participants: any[];
}) => {
  const alertUser = () =>
    participants.length === 0 && toast.error("No participants data");
  return (
    <div className=" grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] ">
      {data &&
        data.length > 0 &&
        data.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-[10px] font-ubuntu bg-white cursor-pointer flex flex-col items-center "
          >
            <h2 className="text-primary text-[1.7rem] md:text-[2rem] font-bold">
              {nFormatter(item.num, 3)}
            </h2>

            <p className="text-labels text-base md:text-lg font-bold">
              {item.title}
            </p>

            {item.link && (
              <Link
                to={
                  participants.length > 0
                    ? `/my/dashboard/${_INFLUENCER_}/draws/participants/${id}`
                    : ""
                }
                onClick={alertUser}
                className="block text-center mt-[4rem] text-[#646C79] hover:opacity-80"
              >
                {item.link}
                {item.icon && (
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faLongArrowAltRight}
                  />
                )}
              </Link>
            )}
          </div>
        ))}
    </div>
  );
};

type BtnProp = {
  onClickShare?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const Buttons: React.FC<BtnProp> = ({ onClickShare }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[1rem] flex justify-center items-center">
      <button
        onClick={() => navigate(`/my/dashboard/${_INFLUENCER_}/create`)}
        className="w-full md:w-auto md:ml-5 mt-5 md:mt-0 inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
      >
        Host Live Draw
      </button>
      <button
        onClick={onClickShare}
        className="w-full md:w-auto md:ml-5 mt-5 md:mt-0 inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
      >
        {" "}
        <FontAwesomeIcon className="mr-2" icon={faShare} />
        Share Link
      </button>
    </div>
  );
};

type ModalProp = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
};
export const BackDrop: React.FC<ModalProp> = ({ onclick, children }) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="bg-white shadow-normal w-[90%] md:w-1/2 rounded-[10px] p-[2rem] relative max-w-[768px] font-ubuntu z-[999999]">
        <button
          onClick={onclick}
          className="absolute top-[.5rem] right-[.2rem] md:top-[1rem] md:right-[1rem] text-xl lg:text-3xl text-[#4E5767]"
        >
          <FontAwesomeIcon className="mr-2" icon={faTimesCircle} />
        </button>
        {children}
      </div>
    </Suspense>
  );
};

type ModalContent = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  link: string;
};
export const ModalContent: React.FC<ModalContent> = ({ onclick, link }) => {
  const navigate = useNavigate();
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
    return <Error err={errorMessage} small={true} />;
  }
  type socialCta = {
    imgUrl: string;
    cta: string;
    color?: string;
    shareLink?: string;
  };
  const socailCta: socialCta[] = [
    { imgUrl: Google, cta: "" },
    {
      imgUrl: Twitter,
      cta: data?.data?.twitter_url,
      color: "#1D9BF0",
      shareLink: "https://twitter.com/intent/tweet",
    },
    { imgUrl: Facebook, cta: data?.data?.facebook_url, color: "#1877F2" },
    { imgUrl: LinkedIn, cta: data?.data?.linked_url, color: "" },
    { imgUrl: Instagram, cta: data?.data?.instagram_url },
  ];
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <BackDrop onclick={onclick}>
        <h3 className="text-primary text-center text-[1.8rem] md:text-[2rem]">
          Share Raffle Link
        </h3>
        {/* <SocialComponent option={false} /> */}
        {getUserData()?.account_verfied === "1" ? (
          <div className="w-full flex flex-wrap justify-center   items-center   my-[1rem]">
            {socailCta.map((item: socialCta, i: number) => {
              const text: string = "Check out this draw";
              const url: string = encodeURIComponent(
                import.meta.env.MODE === "development"
                  ? `http://localhost:5173`
                  : `https://cashexplore.emiracle.me`
              );
              const share = getSocialUrl(item.cta, text, url);
              return (
                <div key={i}>
                  {item.cta && (
                    <a
                      className="hover:opacity-80 rounded-full shadow-primary p-2 flex justify-center items-center ml-0 mr-2"
                      style={{ background: item?.color }}
                      href={share ? share : item.cta}
                      target="_blank"
                      rel="noopener noreferrer"
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
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-wrap items-center justify-center">
            <h3 className="text-[#394355] text-center text-base lg:text-lg mt-5">
              Account Verification not done or incomplete for your socials
              sharing. Click on the button to verify
            </h3>
            <button
              onClick={() => navigate(`/my/dashboard/${_INFLUENCER_}/create`)}
              className="w-full md:w-auto  my-5  inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-3 px-5 text-sm lg:text-base hover:opacity-80"
            >
              Verify Account
            </button>
          </div>
        )}
        <p className="text-[#394355] text-center text-sm md:text-base">
          Or Copy link here
        </p>
        <div className="w-full  flex justify-center items-center  my-[1rem]">
          <CopyText text={link} />
        </div>
      </BackDrop>
    </Suspense>
  );
};
const SingleDraw = () => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    "singleCampaign",
    () => fetchSingleCampaign(Number(id)),
    {
      onSuccess: (data) => {
        console.log(data?.data);
        if (data) toast.success("Successfully fetched campaign");
      },
      onError: (err) => {
        if (err) toast.error("An error occured");
      },
    }
  );
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const dataArr = [
    {
      imgSrc: PreviewImage,
      email: "@johnnkobo346",
      score: 10,
    },
    {
      imgSrc: PreviewImage,
      email: "@johnnkobo346",
      score: 10,
    },
    {
      imgSrc: PreviewImage,
      email: "@johnnkobo346",
      score: 10,
    },
  ];
  const flattenedData =
    data?.data?.participants.flatMap(({ name, number_of_tickets }: any) => ({
      imgSrc: PreviewImage,
      email: "@" + name,
      score: number_of_tickets,
    })) || [];
  const columnsArr = [
    { Header: "Participants’ Username", accessor: "email" },
    { Header: "Tickets Bought", accessor: "score" },
  ];

  const dataCop = [
    {
      num: data?.data?.tickets_sold,
      title: "tickets sold",
      link: `Ticket Cap: ${data?.data?.ticket?.ticket_sale_cap} tickets`,
    },
    { num: data?.data?.amount_raised, title: "raised" },
    {
      num: data?.data?.participants.length,
      title: "participants",
      link: "View Participants",
      icon: true,
    },
  ];

  if (isLoading) return <Spinner />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return <Error err={errorMessage} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <div className="bg-bg p-[1rem] mt-5 rounded-[10px] ">
          <Header title={data?.data.title} endDate={data?.data?.end_date} />
          <Boxes
            data={dataCop}
            id={Number(id)}
            participants={data?.data?.participants}
          />
          <Table dataArr={flattenedData} columnsArr={columnsArr} />
          <Buttons onClickShare={() => setIsOpen(true)} />
          <Modal visible={modalIsOpen}>
            <ModalContent
              onclick={() => setIsOpen(false)}
              link={
                import.meta.env.MODE === "development"
                  ? `http://localhost:5173/raffle-page-preview/${id}`
                  : `https://cashexplore.emiracle.me/raffle-page-preview/${id}`
              }
            />
          </Modal>
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default SingleDraw;
