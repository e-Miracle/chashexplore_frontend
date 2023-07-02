import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _ADMIN_ } from "../../../constants";
import { Raffle, PreviewImage } from "../../../assets";
const Modal = React.lazy(() => import("../../../components/Modal/Modal"));
const Error = React.lazy(() => import("../../../components/ErrorComponent"));
const ModalContent = React.lazy(() =>
  import("../influencer/SingleDraw").then((res) => {
    return { default: res.ModalContent };
  })
);
const Body = React.lazy(() =>
  import(`../influencer/Draws`).then((res) => {
    return { default: res.Body };
  })
);
const dataArr = [
  {
    campaign: "500,000naira New Year Giveaway",
    tickets: 1600,
    amounts: 2808000,
    participant: [Raffle, PreviewImage, Raffle, PreviewImage],
    viewLink: "",
    shareLink: "",
  },
  {
    campaign: "500,000naira New Year Giveaway",
    tickets: 1600,
    amounts: 2808000,
    participant: [Raffle, PreviewImage, Raffle, PreviewImage],
    viewLink: "",
    shareLink: "",
  },
  {
    campaign: "500,000naira New Year Giveaway",
    tickets: 1600,
    amounts: 2808000,
    participant: [Raffle, PreviewImage, Raffle, PreviewImage],
    viewLink: "",
    shareLink: "",
  },
  {
    campaign: "500,000naira New Year Giveaway",
    tickets: 1600,
    amounts: 2808000,
    participant: [Raffle, PreviewImage, Raffle, PreviewImage],
    viewLink: "",
    shareLink: "",
  },
  {
    campaign: "500,000naira New Year Giveaway",
    tickets: 1600,
    amounts: 2808000,
    participant: [Raffle, PreviewImage, Raffle, PreviewImage],
    viewLink: "",
    shareLink: "",
  },
];

const Background = lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);

const Header = () => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="flex items-center justify-between">
        <h2 className="text-primary font-ubuntu text-[1.5rem] lg:text-[2rem]">
          My Draws
        </h2>
        <Link
          to={`/my/dashboard/${_ADMIN_}/draws/create`}
          className="bg-primary text-white rounded-[100px] p-5 hover:opacity-90"
        >
          {" "}
          <FontAwesomeIcon icon={faPlus} className="mr-2 " /> Create New Draw
        </Link>
      </div>
    </Suspense>
  );
};

// const Table = ({
//   onclick,
//   data,
// }: {
//   data: any[];
//   onclick?: (data: any) => void;
// }) => {
//   const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
//   const navigate = useNavigate();
//   return (
//     <Suspense fallback={<Spinner toggle={false} />}>
//       <div className="relative overflow-x-auto  sm:rounded-lg font-ubuntu mt-5">
//         <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-labelLight uppercase bg-bg ">
//             <tr>
//               <th scope="col" className="text-left  py-3 ">
//                 Campaign Name
//               </th>
//               <th scope="col" className="text-center px-6 py-3">
//                 Tickets Sold
//               </th>
//               <th className="text-center px-6 py-3 ">Amount Raised</th>
//               <th className="text-center px-6 py-3 ">Participants</th>
//               <th className="text-center px-6 py-3 " />
//               <th className="text-center px-6 py-3 " />
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data.length > 0 &&
//               data.map((item, i: number) => (
//                 <tr
//                   key={i}
//                   className="bg-white hover:opacity-80 cursor-pointer "
//                   //   onClick={() => onclick(item)}
//                 >
//                   <th
//                     scope="row"
//                     className=" py-4 font-medium  text-heading whitespace-nowrap text-center"
//                   >
//                     {item.campaign}
//                   </th>
//                   <td className="px-6 py-4 text-heading text-center">
//                     {nFormatter(item.tickets, 3)}
//                   </td>
//                   <td className="px-6 py-4 text-heading text-center">
//                     N {Number(item.amounts).toLocaleString()}
//                   </td>
//                   <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
//                     {" "}
//                     <div className="flex items-center relative ">
//                       {item.participant.map((item: string, i: number) => (
//                         <div
//                           key={i}
//                           className={` rounded-full border  w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
//                           style={{
//                             zIndex: i > 0 ? i + 1 : 0,
//                             marginLeft:
//                               i > 0 ? (isMobile ? "-1rem" : "-1rem") : "",
//                             // background:
//                             //   typeof item === "number" ? "#FBFBFD" : item,
//                           }}
//                         >
//                           <img
//                             src={item}
//                             alt={item}
//                             className="w-full h-full object-cover rounded-full border border-primary"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
//                     <button
//                       className="flex items-center bg-[#F4F6F8] rounded-[100px] text-primary p-5 hover:opacity-80"
//                       onClick={() => navigate(`/admin/${item.viewLink}`)}
//                     >
//                       {" "}
//                       <FontAwesomeIcon className="mr-2" icon={faEye} />
//                       View
//                     </button>
//                   </td>
//                   <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
//                     <button
//                       className="flex items-center text-white bg-primary rounded-[100px] text-primary p-5 hover:opacity-80"
//                       onClick={() => navigate(`/admin/${item.shareLink}`)}
//                     >
//                       <FontAwesomeIcon className="mr-2" icon={faShareSquare} />
//                       Share
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </Suspense>
//   );
// };
// const Body = ({ data }: { data: any[] }) => {
//   return (
//     <Suspense fallback={<Spinner toggle={false} />}>
//       <button>
//         <h3 className="text-[#4E5767] text-base lg:text-[1.25rem] font-semibold">
//           Active Draws
//           <FontAwesomeIcon icon={faArrowDown} className="ml-3 text-[#646C79]" />
//         </h3>
//       </button>
//       <Table data={data} />
//     </Suspense>
//   );
// };

const Draws = () => {
  const [id, setId] = React.useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const openModal = (id: number) => {
    setId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setId(null);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin">
        <Header />
        <Background>
          <Body openModal={openModal} />
        </Background>
        <Modal visible={modalIsOpen}>
          <ModalContent
            onclick={closeModal}
            link={
              import.meta.env.MODE === "development"
                ? `http://localhost:5173/raffle-page-preview/${id}`
                : `https://cashexplore.emiracle.me/raffle-page-preview/${id}`
            }
          />
        </Modal>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
