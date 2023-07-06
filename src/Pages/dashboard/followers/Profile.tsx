import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { nFormatter, getUserData } from "../../../Utils";
import { Raffle } from "../../../assets";
import { BackDrop } from "../influencer/SingleDraw";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { fetchLoggedInUser } from "../../../hooks/customGets";
const Modal = React.lazy(() => import("../../../components/Modal/Modal"));
const Error = React.lazy(() => import("../../../components/ErrorComponent"));
const ActiveDraws = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return { default: res.ActiveDraws };
  })
);

const InActiveDraws = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return { default: res.InActiveDraws };
  })
);
const data = [
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

export const Header = () => {
  // const { isLoading, isError, data, error } = useQuery(
  //   "socials",
  //   ({ pageParam = 1 }) =>
  //     fetchData({
  //       page: pageParam,
  //       endpoint: String(ENDPOINTS.API_INFLUENCER_VERIFY_ACCOUNT),
  //     }),
  //   {
  //     onSuccess: (data) => {
  //       if (data) toast.success("Successful");
  //     },
  //     onError: (err) => {
  //       if (err) toast.error("An error occured");
  //     },
  //   }
  // );
  // if (isLoading) return <Spinner toggle={false} />;

  // if (isError) {
  //   const errorMessage = (error as any).message || "An unknown error occurred";
  //   return (
  //     <div>
  //       <p>There was an error fetching the data.</p>
  //       <p>{errorMessage}</p>
  //     </div>
  //   );
  // }
  // type socialCta = { imgUrl: string; cta: string; color?: string };
  // const socailCta: socialCta[] = [
  //   { imgUrl: Google, cta: "" },
  //   { imgUrl: Twitter, cta: data?.data?.twitter_url, color: "#1D9BF0" },
  //   { imgUrl: Facebook, cta: data?.data?.facebook_url, color: "#1877F2" },
  //   { imgUrl: LinkedIn, cta: data?.data?.linked_url, color: "" },
  //   { imgUrl: Instagram, cta: data?.data?.instagram_url },
  // ];
  return (
    <div className="flex flex-wrap font-ubuntu ">
      <div className="w-full md:w-[70%] flex ">
        <div className=" hidden lg:block  w-[70px] h-[70px] lg:w-[120px]   lg:h-[120px] p-1 rounded-full border-[7px] border-primary border-r-white relative">
          <img
            className="  w-full h-full object-cover rounded-full "
            src={"https://via.placeholder.com/100x100"}
            alt="Image Alt"
          />
          <span className="  w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] bg-green rounded-full absolute right-1 bottom-2"></span>
        </div>
        <div className="lg:ml-5 w-full lg:w-[80%] ">
          <div className=" flex items-center w-full">
            <h3 className="text-labels text-[1.5rem] lg:text-[2rem]">
              {getUserData()?.first_name}
              {getUserData()?.last_name}{" "}
              {/* <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />{" "} */}
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
      {/* <div className="w-full md:w-[30%] mt-5 lg:mt-0 ">
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
      </div> */}
    </div>
  );
};

const Body = ({
  data,
  trigger,
}: {
  data: any[];
  trigger: any;
}) => {
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
          <h2 className="text-primary text-[1.8rem] lg:text-[2rem] mt-3">
            {visible
              ? ` ₦ ${nFormatter(
                  getUserData()?.wallet_balance
                    ? Number(getUserData()?.wallet_balance)
                    : 0,
                  3
                )}`
              : "********"}
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
        <div className="flex justify-center flex-wrap items-center mt-3">
          <button
            onClick={trigger}
            className="w-full max-w-[200px] block bg-primary text-[#fff] text-sm lg:text-base outline-none  py-3 px-5  rounded-[100px] cursor-pointer hover:opacity-80"
          >
            fund Account
          </button>
          <button className=" w-full max-w-[200px] bg-primary text-[#fff] text-sm lg:text-base outline-none  py-3 px-5 mt-5  rounded-[100px] cursor-pointer hover:opacity-80">
            Withdraw Balance
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalContent = ({ onclick }: any) => {
  return (
    <BackDrop onclick={onclick}>
      <div className="font-ubuntu">
        <h4 className="font-bold text-heading text-center text-[1.2rem] lg:text-[1.5rem]">
          How would you like to fund your wallet?
        </h4>
        {/* {loading ? (
          <Spinner toggle={false} />
        ) : (
          <div className="flex items-center justify-center flex-wrap my-5">
            <button
              onClick={() => payWithWallet(data)}
              className=" w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80"
            >
              Pay from Wallet
            </button>
            <button
              onClick={() => payWithFlutterWave()}
              className="mt-[1rem]  xl:mt-0 md:ml-3 w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80"
            >
              Pay using Flutterwave
            </button>
          </div>
        )} */}
        <div className="flex items-center justify-center flex-wrap my-5">
          <button className=" w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80">
            Pay from Paystack
          </button>
          <button className="mt-[1rem]  xl:mt-0 md:ml-3 w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80">
            Pay using Flutterwave
          </button>
        </div>
      </div>
    </BackDrop>
  );
};
const Profile = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
   const { isLoading, isError, data, error } = useQuery(
     "profile",
     () => fetchLoggedInUser(),
     {
       onSuccess: (data) => {
         console.log(data);
         if (data) toast.success("Successfully fetched campaign");
       },
       onError: (err) => {
         if (err) toast.error("An error occured");
       },
     }
   );

   if (isLoading) return <Spinner />;

   if (isError) {
     const errorMessage = (error as any).message || "An unknown error occurred";
     return <Error err={errorMessage} />;
   }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <BackgroundDrop>
          <Header />
          <Body
            data={data}
            trigger={() => setIsOpen((k) => !k)}
          />
          <Modal visible={modalIsOpen}>
            <ModalContent onclick={() => setIsOpen((k) => !k)} />
          </Modal>
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Profile;
