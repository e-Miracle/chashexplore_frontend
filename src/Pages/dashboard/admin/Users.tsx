import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Title } from "../followers/Draws";
import { Link } from "react-router-dom";
import { _ADMIN_ } from "../../../constants";
import { Raffle } from "../../../assets";
export const data = [
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 10,
    inactive: 20,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 2,
    inactive: 50,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 6,
    inactive: 20,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 5,
    inactive: 30,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 15,
    inactive: 2,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 10,
    inactive: 20,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 5,
    inactive: 30,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 10,
    inactive: 5,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 10,
    inactive: 20,
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    active: 10,
    inactive: 20,
  },
];
const BackgroundDrop = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);

const UserData = React.lazy(() =>
  import("./index").then((res) => {
    return {
      default: res.UserData,
    };
  })
);

export const Table = ({
  onclick,
  data,
}: {
  data: any[];
  onclick?: (data: any) => void;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="relative overflow-x-auto  sm:rounded-lg font-ubuntu">
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-labelLight uppercase bg-bg ">
            <tr>
              <th scope="col" className="text-left px-1  py-3">
                Name
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Active Draws
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Inactive Draws
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item, i: number) => (
                <tr
                  key={i}
                  className="bg-white hover:opacity-80 cursor-pointer "
                  onClick={() => onclick && onclick(item)}
                >
                  <th
                    scope="row"
                    className="px-1 py-4 font-medium  text-heading whitespace-nowrap text-left"
                  >
                    <UserData
                      item={{
                        imgsrc: item.imgsrc,
                        name: item.name,
                        email: item.email,
                      }}
                    />
                  </th>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.inactive}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.inactive}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

const Users = () => {
  const Links = (
    <div className="lg:flex lg:justify-end lg:items-center font-ubuntu my-3">
      <Link
        to={`/${_ADMIN_}/my/dashboard/registrations`}
        className="capitalize text-center lg:text-right text-primary font-bold text-sm lg:text-base"
      >
        View Pending Registrations Here
      </Link>
    </div>
  );
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin">
        <Title text="Users" />
        {Links}
        <BackgroundDrop>
          <Table data={data} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Users;
