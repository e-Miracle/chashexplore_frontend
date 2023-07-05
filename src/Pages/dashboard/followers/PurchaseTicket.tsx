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
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackDrop } from "../influencer/SingleDraw";
import { countDown, getUserData } from "../../../Utils";
import { fetchSingleCampaign } from "../../../hooks/customGets";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import useBuyTicket from "../../../hooks/utils/useCustomBankPayment";
import useErrorHandler from "../../../hooks/useErrorHandler";
const Timer = lazy(() => import("../../../components/Timer/Timer"));
const Modal = lazy(() => import("../../../components/Modal/Modal"));
const Error = lazy(() => import("../../../components/ErrorComponent"));
const Ended = lazy(() => import("../../../components/Ended"));

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
      <div className="flex flex-col lg:flex-row items-center justify-between text-pr">
        <h2
          className=" text-[1.2rem] lg:text-[1.5rem] text-primary"
          style={{ color: headerColor }}
        >
          {text}
        </h2>
        {new Date(
          countDown(time).year,
          countDown(time).month,
          countDown(time).day
        ) < new Date() ? (
          <h2
            className=" text-[1.2rem] lg:text-[1.5rem] text-primary"
            style={{ color: headerColor }}
          >
            This draw has Ended
          </h2>
        ) : (
          <Timer
            countDownDate={
              new Date(
                countDown(time).year,
                countDown(time).month,
                countDown(time).day
              )
            }
            color={color}
          />
        )}
      </div>
    </Suspense>
  );
};

const Form = ({
  submit,
  toggleModal,
  id,
  amount,
}: {
  submit: any;
  toggleModal: () => void;
  id: number;
  amount: number;
}) => {
  const formSchema = z.object({
    phone: z.string().refine(validator.isMobilePhone),
    name: z
      .string()
      .min(3, { message: "name must have at least three characters " })
      .max(20, {
        message: "name must not be greater than 20 characters",
      }),
    number_of_tickets: z
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const noOfTickets = watch("number_of_tickets");

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const newData = {
      ...data,
      amount: Number(amount) * Number(data.number_of_tickets),
      campaign_id: Number(id),
    };
    submit(newData);
    toggleModal();
    reset({
      phone: "",
      name: getUserData()?.first_name + " " + getUserData()?.last_name,
      number_of_tickets: 0,
    });
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
            defaultValue={
              getUserData()?.first_name + " " + getUserData()?.last_name
            }
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
            htmlFor="number_of_tickets"
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
            id="number_of_tickets"
            {...register("number_of_tickets", {
              required: "This is required.",
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="number_of_tickets"
            render={({ message }) => (
              <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <h1 className=" text-[1.2rem] lg:text-[1.5rem] text-primary mt-5">
        Amount :{" "}
        {Number(
          amount * (noOfTickets ? Number(noOfTickets) : 0)
        ).toLocaleString()}
      </h1>

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
  data: any;
  payWithFlutterWave: any;
  payWithWallet: any;
  loading: boolean;
};
const ModalContent: React.FC<ModalContent> = ({
  onclick,
  data,
  payWithWallet,
  payWithFlutterWave,
  loading,
}) => {
  return (
    <BackDrop onclick={onclick}>
      <div className="font-ubuntu">
        <h1 className="text-primary text-center  text-[1.8rem] lg:text-[2rem]">
          Ticket Purchase
        </h1>
        <p className="my-5 text-modalParagraph text-center text-[1.2rem] lg:text-[1.5rem]">
          Number of tickets: {data.number_of_tickets}
        </p>
        <p className="my-5 text-modalParagraph text-center text-[1.2rem] lg:text-[1.5rem]">
          Total price: {Number(data.amount).toLocaleString()}
        </p>

        <h4 className="font-bold text-heading text-center text-[1.2rem] lg:text-[1.5rem]">
          How would you like to purchase your tickets?
        </h4>
        {loading ? (
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
        )}
      </div>
    </BackDrop>
  );
};
const PurchaseTicket = () => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    "singleCampaign",
    () => fetchSingleCampaign(Number(id)),
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
  const buyticket = useBuyTicket(() => setLoading(false));
  useErrorHandler(buyticket, "Purchase Successful", "Purchase Error");
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [mainData, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const updateData = (data: any) => {
    console.log(data);
    setData(data);
  };
  const payWithFlutterWave = (): void => {};

  const payWithWallet = async (data: any): Promise<void> => {
    console.log(data);
    setLoading(true);
    await buyticket.mutateAsync(data);
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return <Error err={errorMessage} />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <h1 className="text-rand text-[1.8rem] lg:text-[2rem] my-[1rem] text-center lg:text-left font-bold">
          Ticket Purchase
        </h1>
        <BackgroundDrop>
          {new Date(
            countDown(data?.data?.end_date).year,
            countDown(data?.data?.end_date).month,
            countDown(data?.data?.end_date).day
          ) < new Date() ? (
            <Ended />
          ) : (
            <>
              <Header
                text={String(data?.data?.title)}
                time={data?.data?.end_date}
              />

              <Form
                id={Number(data?.data?.id)}
                amount={Number(data?.data?.ticket?.ticket_prize)}
                toggleModal={() => setIsOpen(true)}
                submit={updateData}
              />
              <Modal visible={modalIsOpen}>
                <ModalContent
                  onclick={() => setIsOpen(false)}
                  data={mainData}
                  payWithFlutterWave={payWithFlutterWave}
                  payWithWallet={payWithWallet}
                  loading={loading}
                />
              </Modal>
            </>
          )}
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default PurchaseTicket;
