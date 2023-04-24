import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import moment from "moment";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";
import {
  faBars,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackDrop } from "../influencer/SingleDraw";
const Timer = lazy(() => import("../../../components/Timer/Timer"));
const Modal = lazy(() => import("../../../components/Modal/Modal"));

const payWithFlutterWave = (): void => {};

const payWithWallet = (): void => {};

export const Header = ({
  text,
  time,
  color = "#1F52AE",
  headerColor,
}: {
  text: string;
  time: any;
  color?: string;
  headerColor?: string;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h2
          className=" text-[1.2rem] lg:text-[1.5rem]"
          style={{ color: headerColor }}
        >
          {text}
        </h2>
        <Timer countDownDate={time} color={color} />
      </div>
    </Suspense>
  );
};

const Form = ({
  submit,
  toggleModal,
}: {
  submit: any;
  toggleModal: () => void;
}) => {
  const formSchema = z.object({
    phone: z.string().refine(validator.isMobilePhone),
    name: z
      .string()
      .min(3, { message: "name must have at least three characters " })
      .max(20, {
        message: "name must not be greater than 20 characters",
      }),
    noOfTickets: z
      .number({
        required_error: "number of tickets  is required",
        invalid_type_error: "number of tickets must be a number",
      })
      .positive(),
  });
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
    submit(data);
    toggleModal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[3rem]">
        <label
          htmlFor="name"
          className="w-full lg:w-[30%] inline-block text-labels font-ubuntu  text-sm lg:text-base "
        >
          Name
        </label>
        <div className="w-full lg:w-[80%] ">
          <input
            className={
              errors.name && errors.name.message
                ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="name"
            placeholder="John Doe"
            type="tel"
            id="name"
            {...register("name", { required: "This is required." })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>
      <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[1rem]">
        <label
          htmlFor="phone"
          className="w-full lg:w-[30%] inline-block text-labels font-ubuntu  text-sm lg:text-base "
        >
          Phone Number
        </label>
        <div className="w-full lg:w-[80%] ">
          <input
            className={
              errors.phone && errors.phone.message
                ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="phone"
            placeholder="Please enter your phone number"
            type="tel"
            id="phone"
            {...register("phone", { required: "This is required." })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
        <div className="lg:w-[30%]">
          <label
            htmlFor="noOfTickets"
            className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
          >
            Number of Tickets
          </label>
          <p className="font-ubuntu text-sm lg:text-base mt-3  text-forms lg:w-[80%] mb-3 lg:mb-0">
            The more tickets you purchase, the higher your chances of winning.
          </p>
        </div>

        <div className="w-full lg:w-[80%] ">
          <input
            className={`w-full  border text-sm bg-bg lg:text-base text-forms border-formborder p-5 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="winners"
            placeholder="How many tickets are you purchasing?"
            type="number"
            id="noOfTickets"
            {...register("noOfTickets", {
              required: "This is required.",
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="noOfTickets"
            render={({ message }) => (
              <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className=" w-full p-[1rem] lg:p-0 md:flex md:items-end md:justify-end">
        {isSubmitting ? (
          <div>
            <Spinner toggle={false} />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
          >
            Purchase Tickets
          </button>
        )}
      </div>
    </form>
  );
};

type Data = {
  price: number;
  numberOfTickets: number;
  phone?: string;
};

type ModalContent = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  data: Data;
};
const ModalContent: React.FC<ModalContent> = ({
  onclick,
  data: { price, numberOfTickets },
}) => {
  return (
    <BackDrop onclick={onclick}>
      <div className="font-ubuntu">
        <h1 className="text-primary text-center  text-[1.8rem] lg:text-[2rem]">
          Ticket Purchase
        </h1>
        <p className="my-5 text-modalParagraph text-center text-[1.2rem] lg:text-[1.5rem]">
          Number of tickets: {numberOfTickets}
        </p>
        <p className="my-5 text-modalParagraph text-center text-[1.2rem] lg:text-[1.5rem]">
          Total price: {price}
        </p>

        <h4 className="font-bold text-heading text-center text-[1.2rem] lg:text-[1.5rem]">
          How would you like to purchase your tickets?
        </h4>
        <div className="flex items-center justify-center flex-wrap my-5">
          <button
            onClick={payWithWallet}
            className=" w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80"
          >
            Pay from Wallet
          </button>
          <button
            onClick={payWithFlutterWave}
            className="mt-[1rem] md:mt-0 md:ml-3 w-full md:w-auto bg-secondary border-2 border-btnBorder font-semibold text-heading text-sm lg:text-base  py-3 px-10  rounded-[10px] cursor-pointer hover:opacity-80"
          >
            Pay using Flutterwave
          </button>
        </div>
      </div>
    </BackDrop>
  );
};
const PurchaseTicket = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [mainData, setData] = React.useState<Data>({
    price: 4000,
    numberOfTickets: 4,
  });

  const updateData = (data: any) => {
    console.log(data);
    setData({
      ...mainData,
      phone: data.phone,
      numberOfTickets: data.noOfTickets,
      price: data.noOfTickets * 1000,
    });
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <h1 className="text-rand text-[1.8rem] lg:text-[2rem] my-[1rem] text-center lg:text-left font-bold">
          Ticket Purchase
        </h1>
        <BackgroundDrop>
          <Header
            text="N100,000 New Year Giveaway!"
            time={moment().add(3, "d").toDate()}
          />

          <Form toggleModal={() => setIsOpen(true)} submit={updateData} />
          <Modal visible={modalIsOpen}>
            <ModalContent onclick={() => setIsOpen(false)} data={mainData} />
          </Modal>
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default PurchaseTicket;
