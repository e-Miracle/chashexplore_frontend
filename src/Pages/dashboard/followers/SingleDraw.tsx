import React, { Suspense, useState, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Title } from "./Draws";
import { BackgroundDrop } from "../influencer/Profile";
import { Header } from "./PurchaseTicket";
import moment from "moment";
import { BackDrop } from "../influencer/SingleDraw";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { nFormatter } from "../../../Utils";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PreviewImage } from "../../../assets";
const Modal = lazy(() => import("../../../components/Modal/Modal"));

const data = [
  { num: 3, title: "tickets purchased", link: "Hide My Tickets" },
  { num: 400, title: "tickets avaliable", link: "Ticket Cap: 700 tickets" },
  { num: 40, title: "participants", link: "View Participants", icon: true },
];

const ticketTableData = [
  { ticketId: "NYG123456HJ", status: "Pending" },
  { ticketId: "PYG123456HF", status: "Pending" },
  { ticketId: "JYG123456HA", status: "Pending" },
];

export const TicketTable = ({ onclick }: { onclick: (data: any) => void }) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="relative overflow-x-auto  sm:rounded-lg font-ubuntu">
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-labelLight uppercase bg-bg ">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                Ticket ID
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Tickets Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketTableData &&
              ticketTableData.length > 0 &&
              ticketTableData.map((item, i: number) => (
                <tr
                  key={i}
                  className="bg-white hover:opacity-80 cursor-pointer "
                  onClick={() => onclick(item)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-heading whitespace-nowrap text-center"
                  >
                    {item.ticketId}
                  </th>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

const ParticipantsTableData = [
  { imgSrc: PreviewImage, username: "@johnnkobo346", amount: "1" },
  { imgSrc: PreviewImage, username: "@johnnkobo346", amount: "1" },
  { imgSrc: PreviewImage, username: "@johnnkobo346", amount: "1" },
  { imgSrc: PreviewImage, username: "@johnnkobo346", amount: "1" },
  { imgSrc: PreviewImage, username: "@johnnkobo346", amount: "1" },
];

export const ParticipantsTable = () => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="relative overflow-x-auto  sm:rounded-lg font-ubuntu">
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-labelLight uppercase bg-bg ">
            <tr>
              <th scope="col" className=" px-6 py-3">
                Participants’ Username
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Tickets Bought
              </th>
            </tr>
          </thead>
          <tbody>
            {ParticipantsTableData &&
              ParticipantsTableData.length > 0 &&
              ParticipantsTableData.map((item, i: number) => (
                <tr
                  key={i}
                  className="bg-bg border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-heading whitespace-nowrap text-center flex items-center"
                  >
                    <img
                      className="w-[32px] h-[32px] rounded-full object-cover mr-3"
                      src={item.imgSrc}
                      alt={item.imgSrc}
                    />{" "}
                    {item.username}
                  </th>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

export const Boxes = ({
  ticketsPurchased,
  ticketsAvaliable,
  ticketCap,
  ticketPurchased,
  togglePartcipantTables,
  toggleTicketTables,
}: {
  ticketsPurchased: number;
  ticketsAvaliable: number;
  ticketCap: number;
  ticketPurchased: number;
  toggleTicketTables: () => void;
  togglePartcipantTables: () => void;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className=" grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-[2rem] ">
        <div className="p-5 rounded-[10px] font-ubuntu bg-white cursor-pointer flex flex-col items-center ">
          <h2 className="text-primary text-[1.7rem] md:text-[2rem] font-bold">
            {nFormatter(ticketsPurchased, 3)}
          </h2>

          <p className="text-labels text-base md:text-lg font-bold">
            tickets purchased
          </p>

          <button
            onClick={toggleTicketTables}
            className="block text-center mt-[4rem] text-[#646C79] hover:opacity-80"
          >
            View My Tickets
            <FontAwesomeIcon className="ml-2" icon={faLongArrowRight} />
          </button>
        </div>
        <div className="p-5 rounded-[10px] font-ubuntu bg-white cursor-pointer flex flex-col items-center ">
          <h2 className="text-primary text-[1.7rem] md:text-[2rem] font-bold">
            {nFormatter(ticketsAvaliable, 3)}
          </h2>

          <p className="text-labels text-base md:text-lg font-bold">
            tickets available
          </p>

          <button className="block text-center mt-[4rem] text-[#646C79] hover:opacity-80">
            Ticket Cap:{nFormatter(ticketCap, 3)}tickets
          </button>
        </div>
        <div className="p-5 rounded-[10px] font-ubuntu bg-white cursor-pointer flex flex-col items-center ">
          <h2 className="text-primary text-[1.7rem] md:text-[2rem] font-bold">
            {nFormatter(ticketsPurchased, 3)}
          </h2>

          <p className="text-labels text-base md:text-lg font-bold">
            tickets purchased
          </p>

          <button
            onClick={togglePartcipantTables}
            className="block text-center mt-[4rem] text-[#646C79] hover:opacity-80"
          >
            Hide Participants
            <FontAwesomeIcon className="ml-2" icon={faLongArrowRight} />
          </button>
        </div>
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
  title: string;
  price: number;
};
const ModalContent: React.FC<ModalContent> = ({ onclick, title, price }) => {
  return (
    <BackDrop onclick={onclick}>
      <h3 className="text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu text-center">
        {title}
      </h3>
      <h4 className="text-heading font-semibold text-base lg:text-[1.25rem] my-5 text-center">
        Prize: {Number(price).toLocaleString()}
      </h4>
      <p className="text-labels text-sm lg:text-base mt-5 text-center">
        Please enter your account details below to withdraw your prize.
      </p>
      <Form />
    </BackDrop>
  );
};

type ModalContentAlt = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  ticketId: string;
  status: string;
  title: string;
  username: string;
  acctNumber: string;
  bank: string;
};

const ModalContentAlt: React.FC<ModalContentAlt> = ({
  onclick,
  ticketId,
  status,
  title,
  username,
  acctNumber,
  bank,
}) => {
  return (
    <BackDrop onclick={onclick}>
      <div className="font-ubuntu">
        <div className="flex flex-wrap items-center justify-between my-[1rem]">
          <h4 className="text-center md:text-left text-primary uppercase text-[1.2rem] lg:text-[1.5rem] font-semibold">
            Ticket ID: <span className="font-normal">{ticketId}</span>{" "}
          </h4>
          <p className="my-[1rem] md:my-0 text-center md:text-left text-icon text-sm lg:text-base font-semibold">
            Status: <span className="font-normal">{status}</span>
          </p>
        </div>
        <h3 className="text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu text-center">
          {title}
        </h3>
        <h4 className="text-heading font-semibold text-base lg:text-[1.25rem] my-5 text-center">
          {username}
        </h4>
        <p className="text-labels text-base lg:text-[1.25rem] mt-5 text-center">
          Account Number: {"******" + acctNumber.substring(5, 4)}
        </p>
        <p className="text-labels text-base lg:text-[1.25rem] mt-5 text-center">
          Bank: {bank}
        </p>
      </div>
    </BackDrop>
  );
};

const SingleDraw = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalIsOpenAlt, setIsOpenAlt] = useState<boolean>(false);
  const [ticketTable, setTicketTable] = useState<boolean>(true);
  const [partcipantsTable, setPartcipantsTable] = useState<boolean>(false);
  const [ticketDetails, setTicketDetails] = useState<{
    ticketId: string;
    status: string;
    title: string;
    username: string;
    acctNumber: string;
    bank: string;
  }>({
    ticketId: "",
    status: "",
    title: "",
    username: "",
    acctNumber: "",
    bank: "",
  });

  const updateTicketDetails = (data: any) => {
    setTicketDetails({
      ...ticketDetails,
      ticketId: data.ticketId,
      status: data.status,
      username: "@judikay789",
      title: "N100,000 New Year Giveaway!",
      bank: " GTBank",
      acctNumber: "9998098907",
    });
    setIsOpenAlt(true);
  };

  const togglePartcipantTables = () => {
    setTicketTable(false);
    setPartcipantsTable(true);
  };

  const toggleTicketTables = () => {
    setTicketTable(true);
    setPartcipantsTable(false);
  };

  const BoxesProps = {
    ticketsPurchased: 3,
    ticketsAvaliable: 400,
    ticketCap: 400,
    ticketPurchased: 40,
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <Title text="My Draws" />
        <BackgroundDrop>
          <Header
            text="N100,000 New Year Giveaway!"
            time={moment().add(3, "d").toDate()}
            color="#394355"
            headerColor="#4E5767"
          />
          <Boxes
            togglePartcipantTables={togglePartcipantTables}
            toggleTicketTables={toggleTicketTables}
            {...BoxesProps}
          />
          {ticketTable && <TicketTable onclick={updateTicketDetails} />}
          {partcipantsTable && <ParticipantsTable />}
          <Modal visible={modalIsOpen}>
            <ModalContent
              onclick={() => setIsOpen(false)}
              title="N100,000 New Year Giveaway!"
              price={50000}
            />
          </Modal>
          <Modal visible={modalIsOpenAlt}>
            <ModalContentAlt
              onclick={() => setIsOpenAlt(false)}
              {...ticketDetails}
            />
          </Modal>
          <div className="flex justify-center items-center my-5">
            <button
              onClick={() => setIsOpen(true)}
              className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
            >
              Buy More Tickets
            </button>
          </div>
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default SingleDraw;
