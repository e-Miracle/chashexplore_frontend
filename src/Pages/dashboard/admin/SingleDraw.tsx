import React, { Suspense, useState, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Title } from "../followers/Draws";
import { Header } from "../followers/PurchaseTicket";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { fetchSingleCampaign } from "../../../hooks/customGets";
import { useParams } from "react-router-dom";
const Error = React.lazy(() => import("../../../components/ErrorComponent"));

const Modal = lazy(() => import("../../../components/Modal/Modal"));
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

const ModalContent = React.lazy(() =>
  import("../influencer/SingleDraw").then((res) => {
    return {
      default: res.ModalContent,
    };
  })
);

const TicketTable = React.lazy(() =>
  import("../followers/SingleDraw").then((res) => {
    return {
      default: res.TicketTable,
    };
  })
);

const ParticipantsTable = React.lazy(() =>
  import("../followers/SingleDraw").then((res) => {
    return {
      default: res.ParticipantsTable,
    };
  })
);

const Boxes = React.lazy(() =>
  import("../followers/SingleDraw").then((res) => {
    return {
      default: res.Boxes,
    };
  })
);

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
  const { id } = useParams();
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
  const soldTickets: number = data?.data?.participants.reduce(
    (accumulator: number, currentItem: any) =>
      accumulator + Number(currentItem.number_of_tickets),
    0
  );

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
     ticketsPurchased: soldTickets,
     ticketsAvaliable: data?.data?.ticket?.ticket_sale_cap - soldTickets,
     ticketCap: data?.data?.ticket?.ticket_sale_cap,
     ticketParticpants: data?.data?.participants.length,
     ticket: ticketTable,
     participant: partcipantsTable,
   };

   if (isLoading) return <Spinner />;

   if (isError) {
     const errorMessage = (error as any).message || "An unknown error occurred";
      return <Error err={errorMessage}  />;
   }
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin" backbtn={true}>
        <Title text="My Draws" />
        <BackgroundDrop>
          <Header
            text={data?.data?.title}
            time={data?.data?.end_date}
            color="#394355"
            headerColor="#4E5767"
          />
          <Boxes
            togglePartcipantTables={togglePartcipantTables}
            toggleTicketTables={toggleTicketTables}
            {...BoxesProps}
          />
          {ticketTable && (
            <TicketTable
              data={data?.data?.participants}
              title={data?.data?.title}
              onclick={updateTicketDetails}
            />
          )}
          {partcipantsTable && (
            <ParticipantsTable data={data?.data?.participants} />
          )}
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
          <Modal visible={modalIsOpenAlt}>
            <ModalContentAlt
              onclick={() => setIsOpenAlt(false)}
              {...ticketDetails}
            />
          </Modal>
          <div className="flex justify-center items-center my-5">
            <button className=" w-full md:w-auto  border-2 border-primary text-primary text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80">
              End Campaign
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className=" md:ml-5 w-full md:w-auto bg-primary border-2 border-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
            >
              Share Link
            </button>
          </div>
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default SingleDraw;
