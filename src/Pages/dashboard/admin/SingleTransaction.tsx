import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { useParams } from "react-router-dom";
import { dataArr, columnsArr, reviewArr } from "../influencer/Results";
const Table = lazy(() => import("../../../components/Table/WinnersTable"));
const Modal = lazy(() => import("../../../components/Modal/Modal"));
const Error = React.lazy(() => import("../../../components/ErrorComponent"));
const ReviewCard = lazy(
  () => import("../../../components/ReviewCard/ReviewCard")
);
const BackgroundDrop = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);
const BackDrop = React.lazy(() =>
  import("../influencer/SingleDraw").then((res) => {
    return {
      default: res.BackDrop,
    };
  })
);
const Header = lazy(() =>
  import("../influencer/Results").then((res) => {
    return { default: res.Header };
  })
);

const Hero = lazy(() =>
  import("../influencer/Results").then((res) => {
    return { default: res.Hero };
  })
);

const Winners = lazy(() =>
  import("../influencer/Results").then((res) => {
    return { default: res.Winners };
  })
);

const Receipts = lazy(() =>
  import("../influencer/Results").then((res) => {
    return { default: res.Receipts };
  })
);

const Reviews = lazy(() =>
  import("../influencer/Results").then((res) => {
    return { default: res.Reviews };
  })
);

type ModalContent = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const ModalContent: React.FC<ModalContent> = ({ onclick }) => {
  return (
    <BackDrop onclick={onclick}>
      <h3 className="text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu text-center">
        Payment Successful!
      </h3>
      <p className="text-labels text-sm lg:text-base mt-5 text-center">
        All winners have been paid successfully. Please enter your account
        details below to withdraw your earnings.
      </p>
      <div className="flex justify-center items-center my-5">
        <button className=" md:ml-5 w-full md:w-auto bg-primary border-2 border-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80">
          Withdraw
        </button>
      </div>
    </BackDrop>
  );
};

const SingleTransaction = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const { id } = useParams();
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <BackgroundDrop>
          <Header id={Number(id)} />
          <Hero />
          <Winners id={Number(id)} columns={columnsArr} />
          <div className="flex justify-center items-center my-10">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full md:w-auto  inline-block text-center border-[2px] border-primary bg-primary text-white rounded-[100px] py-5 px-10 text-sm lg:text-base hover:opacity-80"
            >
              Pay Winners
            </button>
          </div>
          <Modal visible={modalIsOpen}>
            <ModalContent onclick={() => setIsOpen(false)} />
          </Modal>
          <Receipts data={dataArr} columns={columnsArr} />
          <Reviews id={Number(id)} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default SingleTransaction;
