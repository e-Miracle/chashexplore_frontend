import { Suspense, lazy, useState } from "react";
import { DashBoardLayout } from "../../";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PreviewLogo } from "../../../assets";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import { fetchSingleCampaign } from "../../../hooks/customGets";
import toast from "react-hot-toast";
import { getUserData, convertDateTime, countDown } from "../../../Utils";
import { _INFLUENCER_ } from "../../../constants";
const Timer = lazy(() => import("../../../components/Timer/Timer"));
const Error = lazy(() => import("../../../components/ErrorComponent"));

const PreviewDraw = () => {
  const { id } = useParams();
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const { isLoading, isError, data, error } = useQuery(
    "singleCampaign",
    () => fetchSingleCampaign(Number(id)),
    {
      onSuccess: (data) => {
        console.log(data?.data);
        if (data) toast.success("Successfully fetched campaigns");
      },
      onError: (err) => {
        if (err) toast.error("An error occured");
      },
    }
  );

  const header = (
    <div className="flex items-center">
      <img
        src={PreviewLogo}
        alt={PreviewLogo}
        className="w-[35px] h-[35px] lg:w-[48px] lg:h-[48px] object-contain mr-5"
      />
      <h1
        className={
          "font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem] capitalize"
        }
      >
        <>
          {isMobile
            ? `${data?.data?.influencer?.first_name} ${data?.data?.influencer?.last_name}`.substring(
                0,
                3
              ) + "..."
            : `${data?.data?.influencer?.first_name} ${data?.data?.influencer?.last_name}`}{" "}
          {data?.data?.influencer?.account_verfied != "0" && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
          )}
        </>
      </h1>
    </div>
  );
  const [currentImage, setCurrentImage] = useState<number>(0);
  const Hero = (
    <div className="text-labels mt-10 p-5 font-ubuntu flex flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-[2.5rem] lg:text-[3rem]  font-bold text-center md:text-left">
          {data?.data?.title}
        </h1>
        <p className="my-10 text-[1rem] lg:text-[1.25rem] text-[#4E5767] text-center md:text-left">
          {data?.data?.description}
        </p>
        <div className="flex flex-col flex-wrap md:flex-row items-center justify-between">
          <Link
           to={`/my/dashboard/${
              getUserData()?.role
            }/home/purchase-ticket/${id}/${data?.data?.title}/${
              data?.data?.end_date
            }/${data?.data?.ticket?.ticket_prize}`}
            className="w-full md:w-[48%] inline-block text-center bg-primary text-white rounded-[100px] p-5 text-sm lg:text-base hover:opacity-80"
          >
            Join Raffle Draw{" "}
          </Link>
          <Link
            to={`/my/dashboard/${_INFLUENCER_}/home`}
            className="w-full md:w-[48%] md:w-auto mt-5 md:mt-0 inline-block text-center bg-transparent border-[2px] border-primary text-primary rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
          >
            View Public Raffles
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-5 md:mt-0 ">
        <img
          src={data?.data?.media[currentImage].original_url}
          alt={data?.data?.media[currentImage].uuid}
          loading="lazy"
          className="w-full md:w-[392px] h-[292px] md:h[200px] object-cover shadow-new rounded-md"
        />

        <div className="flex items-center flex-wrap mt-5">
          {data?.data?.media &&
            data?.data?.media.length > 0 &&
            data?.data?.media.map((item: any, i: number) => (
              <div
                key={i}
                className={
                  currentImage === i
                    ? "border border-primary shadow-new rounded-[10px] w-[52px] h-[52px] lg:w-[72px] lg:h-[72px] mr-3 cursor-pointer "
                    : "shadow-new rounded-[10px] w-[52px] h-[52px] lg:w-[72px] lg:h-[72px] mr-3 cursor-pointer "
                }
                onClick={() => setCurrentImage(i)}
              >
                <img
                  src={item.original_url}
                  alt={item.uuid}
                  loading="lazy"
                  className="w-full h-full  object-cover rounded-[10px] "
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const Block1 = (
    <div className="bg-white rounded-[10px] text-labels mt-10 p-5 font-ubuntu">
      <h1 className="text-[1.7rem] lg:text-[2rem] text-center font-bold">
        Prizes
      </h1>

      <p className="my-10 text-center text-[1.2rem] lg:text-[1.5rem]">
        There will be {data?.data?.number_of_winners} winners for this draw.{" "}
      </p>
      <p className="text-center text-[1.2rem] lg:text-[1.5rem]">
        {data?.data?.number_of_winners} tickets will be randomly selected using
        our automatic random name generator for fairness and transparency.
      </p>
    </div>
  );

  const Block2 = (
    <div className="bg-white rounded-[10px] text-labels mt-10 p-5 font-ubuntu">
      <h1 className="text-[1.7rem] lg:text-[2rem] text-center font-bold">
        CashXplore Guarantee
      </h1>

      <p className="my-10 text-center text-[1.2rem] lg:text-[1.5rem]">
        All draws and payments are fully monitored and regulated by CashXplore.
      </p>
      <p className="text-center text-[1.2rem] lg:text-[1.5rem]">
        If the host fails to provide a prize, the winners will receive a share
        of the compensation amounting to [Number]% of all ticket sales.
      </p>
    </div>
  );

  const Block3 = (
    <div className="bg-white rounded-[10px] text-labels mt-10 p-5 font-ubuntu flex flex-col justify-center items-center">
      <Timer
        countDownDate={
          new Date(
            countDown(data?.data?.end_date).year,
            countDown(data?.data?.end_date).month,
            countDown(data?.data?.end_date).day
          )
        }
      />

      <p className="my-10 text-center text-[1.2rem] lg:text-[1.5rem]">
        Raffle Ends on:{" "}
        <span className="font-bold">
          {convertDateTime(data?.data?.end_date)}
        </span>
      </p>
      {/* this does soemthing differently entirely */}
      <Link
       to={`/my/dashboard/${
              getUserData()?.role
            }/home/purchase-ticket/${id}`}
        className="inline-block text-center bg-primary text-white rounded-[100px] p-5 text-sm lg:text-base hover:opacity-80"
      >
        Join Raffle Draw{" "}
      </Link>
    </div>
  );

  const BtnBlock = (
    <div className="flex flex-col md:flex-row items-center justify-end mt-10">
      <Link
        className="w-full md:w-auto inline-block text-center bg-transparent border-[2px] border-primary text-primary rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
        to={`/my/dashboard/${_INFLUENCER_}/update/:id`}
      >
        Continue Editing{" "}
      </Link>
      <button className="w-full md:w-auto md:ml-5 mt-5 md:mt-0 inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80">
        Send
      </button>
    </div>
  );

  if (isLoading) return <Spinner />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return <Error err={errorMessage} />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <div className="bg-bg p-[1rem] mt-5 rounded-[10px] ">
          <div className="flex flex-col md:flex-row justify-between">
            <>{header}</>
            <div className="flex justify-center items-center text-[black]">
              <Timer
                countDownDate={
                  new Date(
                    countDown(data?.data?.end_date).year,
                    countDown(data?.data?.end_date).month,
                    countDown(data?.data?.end_date).day
                  )
                }
              />
            </div>
          </div>
          <>
            {Hero}
            {Block1}
            {Block2}
            {Block3}
            {BtnBlock}
          </>
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default PreviewDraw;
