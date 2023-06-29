import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { PreviewImage } from "../../../assets";
const Table = React.lazy(() => import("../../../components/Table/DrawsTable"));
const dataArr = [
  {
    imgSrc: PreviewImage,
    name: "@johnnkobo346",
    number_of_tickets: 10,
  },
  {
    imgSrc: PreviewImage,
    name: "@johnnkobo346",
    number_of_tickets: 10,
  },
  {
    imgSrc: PreviewImage,
    name: "@johnnkobo346",
    number_of_tickets: 10,
  },
];
const columnsArr = [
  { Header: "Participants’ Username", accessor: "name" },
  { Header: "Tickets Bought", accessor: "number_of_tickets" },
];
const Participants = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <Table dataArr={dataArr} columnsArr={columnsArr} />
      </DashBoardLayout>
    </Suspense>
  );
};

export default Participants;
