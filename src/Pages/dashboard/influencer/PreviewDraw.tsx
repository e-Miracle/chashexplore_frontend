import { Suspense, lazy, useState } from "react";
import { DashBoardLayout } from "../../";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PreviewLogo } from "../../../assets";
import { useMediaQuery } from "react-responsive";
import { PreviewImage } from "../../../assets";
const Timer = lazy(() => import("../../../components/Timer/Timer"));

const imgArray: string[] = [PreviewImage, PreviewImage, PreviewImage];

const PreviewDraw = () => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const header = (
    <div className="flex items-center">
      <img
        src={PreviewLogo}
        alt={PreviewLogo}
        className="w-[35px] h-[35px] lg:w-[48px] lg:h-[48px] object-contain mr-5"
      />
      <h1
        className={
          "font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem]"
        }
      >
        <>
          {isMobile ? "Genevieve Doe".substring(0, 3) + "..." : "Genevieve Doe"}{" "}
          <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
        </>
      </h1>
    </div>
  );

  const [currentImage, setCurrentImage] = useState<number>(0);
  const Hero = (
    <div className="text-labels mt-10 p-5 font-ubuntu flex flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-[2.5rem] lg:text-[3rem]  font-bold text-center md:text-left">
          N100,000 New Year Giveaway!
        </h1>
        <p className="my-10 text-[1rem] lg:text-[1.25rem] text-[#4E5767] text-center md:text-left">
          Lörem ipsum nydyhet seskap. Parasade trening. Prenosade dinade. Ogisk.
          Obångar krore suprall. Ode oska jag besesk. Lörem ipsum nydyhet
          seskap. Parasade trening.{" "}
        </p>
        <div className="flex flex-col flex-wrap md:flex-row items-center justify-between">
          <Link
            to={"/"}
            className="w-full md:w-[48%] inline-block text-center bg-primary text-white rounded-[100px] p-5 text-sm lg:text-base hover:opacity-80"
          >
            Join Raffle Draw{" "}
          </Link>
          <Link
            to={"/"}
            className="w-full md:w-[48%] md:w-auto mt-5 md:mt-0 inline-block text-center bg-transparent border-[2px] border-primary text-primary rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
          >
            View Public Raffles
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-5 md:mt-0 ">
        <img
          src={imgArray[currentImage]}
          alt={imgArray[currentImage]}
          className="w-full md:w-[392px] h-[292px] md:h[200px] object-cover shadow-new"
        />

        <div className="flex items-center flex-wrap mt-5">
          {imgArray &&
            imgArray.length > 0 &&
            imgArray.map((item: string, i: number) => (
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
                  src={item}
                  alt={item}
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
        There will be 5 winners for this draw.{" "}
      </p>
      <p className="text-center text-[1.2rem] lg:text-[1.5rem]">
        5 tickets will be randomly selected using our automatic random name
        generator for fairness and transparency.
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
      <Timer />

      <p className="my-10 text-center text-[1.2rem] lg:text-[1.5rem]">
        Raffle Ends on:{" "}
        <span className="font-bold">5th February 2023, 04:50pm</span>
      </p>
      <Link
        to="/"
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
        to={`/influencer/my/draws/create`}
      >
        Continue Editing{" "}
      </Link>
      <button className="w-full md:w-auto md:ml-5 mt-5 md:mt-0 inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80">
        Send
      </button>
    </div>
  );

  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <div className="bg-bg p-[1rem] mt-5 rounded-[10px] ">
          <div className="flex flex-col md:flex-row justify-between">
            <>{header}</>
            <div className="flex justify-center items-center">
              <Timer  />
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
