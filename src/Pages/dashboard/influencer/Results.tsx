import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Raffle } from "../../../assets";
import { BackDrop } from "./SingleDraw";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { BlueLogo } from "../../../assets";
import moment from  "moment"
const BackgroundDrop = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);
const Table = lazy(() => import("../../../components/Table/WinnersTable"));
const Modal = lazy(() => import("../../../components/Modal/Modal"));
const ReviewCard = lazy(
  () => import("../../../components/ReviewCard/ReviewCard")
);
export const dataArr = [
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
];
export const columnsArr = [
  { Header: "Ticket ID", accessor: "ticketId" },
  { Header: "Prize", accessor: "price" },
  { Header: "Username", accessor: "username" },
  { Header: "Phone Number", accessor: "number" },
];

export const reviewArr = [
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
];
export const Header = ({ title, date }: { title: string; date: Date }) => {
  return (
    <div className="flex flex-col  items-center md:flex-row justify-between">
      <h1
        className={
          "text-center md:text-left font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem]"
        }
      >
        {title}
      </h1>
      <p className=" text-center md:text-left mt-[1rem] md:mt-0 text-base lg:text-[1.25rem] text-labels">
        Date Ended: {date.toString()}
      </p>
    </div>
  );
};

export const Hero = () => {
  return (
    <div className=" mt-10 bg-white rounded-[10px] p-5 font-ubuntu flex flex-col md:flex-row items-center flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-center md:text-left text-primary text-[1.2rem] lg:text-[1.5rem]">
          Raffle Drawn!!
        </h1>
        <p className="text-center md:text-left text-labels text-sm lg:text-base mt-5">
          This raffle ticket sale has ended and the raffle has been drawn. View
          winners below.
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-[1rem] md:mt-0">
        <img
          src={Raffle}
          alt={Raffle}
          className="w-full  h-[292px] md:h[200px] object-cover shadow-new"
        />
      </div>
    </div>
  );
};

export const Winners = ({ data, columns }: { data: any[]; columns: any[] }) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="mt-10">
        <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu">
          Winners
        </h1>
        <Table dataArr={data} columnsArr={columns} />
      </div>
    </Suspense>
  );
};

const Form = () => {
  const formSchema = z.object({
    bankname: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must have at least three characters " })
      .max(30, {
        message: "Name must not be greater than 30 characters",
      }),
    acctnumber: z
      .number({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
      })
      .refine((val) => val >= 1, "amount must be greater than or equal to 1"),
  });

  type FormSchmaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchmaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mt-[1rem]">
      <div className="my-[2rem] flex flex-wrap flex-col  items-center justify-center">
        <input
          className="w-full md:w-[70%] font-ubuntu bg-white text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3 "
          aria-label="amount"
          placeholder="Account Number"
          type="number"
          id="amount"
          {...register("acctnumber", {
            required: "This is required.",
            valueAsNumber: true,
            validate: (value) => value > 0,
          })}
          disabled={isSubmitting}
        />
        <ErrorMessage
          errors={errors}
          name="acctnumber"
          render={({ message }) => (
            <p className="my-1 text-[#E4033B] font-ubuntu text-xs lg:text-sm">
              {message}
            </p>
          )}
        />
        <select
          className="w-full md:w-[70%] font-ubuntu bg-white text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3 "
          aria-label="bankname"
          placeholder="Bank"
          id="bankname"
          {...register("bankname", { required: "This is required." })}
          disabled={isSubmitting}
        >
          <option value="">Bank</option>
          <option value="zenith bank">Zenith bank</option>
          <option value="UBA">UBA</option>
        </select>
        <ErrorMessage
          errors={errors}
          name="bankname"
          render={({ message }) => (
            <p className="my-1 text-[#E4033B] font-ubuntu text-xs lg:text-sm">
              {message}
            </p>
          )}
        />
      </div>

      <div className=" w-full flex justify-center items-center">
        {isSubmitting ? (
          <div>
            <Spinner toggle={false} />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className={
              " bg-primary text-[#fff] text-sm lg:text-base outline-none  py-5 px-8 mt-5 rounded-[100px] cursor-pointer hover:opacity-80"
            }
          >
            Withdraw
          </button>
        )}
      </div>
    </form>
  );
};

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
      <Form />
    </BackDrop>
  );
};

export const Receipts = ({
  data,
  columns,
}: {
  data: any[];
  columns: any[];
}) => {
  return (
    <div>
      <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu  my-[3rem]">
        Receipt
      </h1>

      <div className="bg-bg">
        <div className="flex flex-wrap justify-between items-center">
          <img
            className="  w-[250px] lg:w-[300px] h-[50px] my-[1rem] lg:h-[70px] object-contain"
            src={BlueLogo}
            alt={BlueLogo}
          />
          <h1 className="w-full  md:w-auto text-center md:text-left  text-[1.2rem] lg:text-[1.5rem] text-[#232E43]">
            Genevieve Doe{" "}
            <FontAwesomeIcon
              className="ml-2 text-primary"
              icon={faCheckCircle}
            />{" "}
          </h1>
        </div>
        <h4 className="text-[1.2rem] lg:text-[1.5rem] mt-[1rem] md:mt-0 text-primary text-center font-semibold">
          Payment Successful
        </h4>
        <Table dataArr={data} columnsArr={columns} />
        <p className="mt-[4rem] md:mt-[8rem] mb-[2rem] text-labels text-sm lg-text-base text-center">
          All draws are 100% transparent and randomly generated using a top
          random number picker. Create your free raffle draws today. Go to
          cashxplore.com now.
        </p>
      </div>
      <div className="flex justify-center md:justify-end items-center">
        <button className=" bg-primary text-[#fff] text-sm lg:text-base outline-none  py-5 px-8 mt-5 rounded-[100px] cursor-pointer hover:opacity-80">
          Share Receipt
        </button>
      </div>
    </div>
  );
};

export const Reviews = ({ data }: { data: any[] }) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div>
        <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu  my-[3rem]">
          Reviews
        </h1>
        <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0">
          {data &&
            data.length > 0 &&
            data.map((item, i: number) => <ReviewCard key={i} {...item} />)}
        </div>
      </div>
    </Suspense>
  );
};

const Results = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <BackgroundDrop>
          <Header
            title={"100,000 naira New Year Giveaway!"}
            date={moment().toDate()}
          />
          <Hero />
          <Winners data={dataArr} columns={columnsArr} />
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
          <Reviews data={reviewArr} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Results;
