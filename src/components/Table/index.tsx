import React, { Suspense } from "react";
import { useTable } from "react-table";
import { faEye, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
type Props = {
  dataArr: any[];
  columnsArr: {
    Header: string;
    accessor: string;
  }[];
  observerRef?: React.RefObject<HTMLDivElement>;
  itemRef?: any
};
const Index: React.FC<Props> = ({
  dataArr,
  columnsArr,
  observerRef,
  itemRef,
}) => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const data = React.useMemo(() => dataArr, []);
  const columns: any = React.useMemo(() => columnsArr, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Suspense>
      <div
        ref={observerRef}
        className="relative overflow-x-auto  sm:rounded-lg mt-10"
      >
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400 z-[1]"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-700 capitalize ">
            {headerGroups.map((head) => (
              <tr {...head.getHeaderGroupProps()}>
                {head.headers.map((column) => (
                  <th
                    className="text-[#646C79] font-ubuntu text-sm lg:text-base px-6 py-3 "
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
                <th className="text-[#646C79] font-ubuntu text-sm lg:text-base px-6 py-3 ">
                  Participants
                </th>
                <th className="text-[#646C79] font-ubuntu text-sm lg:text-base px-6 py-3 " />
                <th className="text-[#646C79] font-ubuntu text-sm lg:text-base px-6 py-3 " />
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i:number) => {
              prepareRow(row);
              return (
                <tr
                  className="overflow-hidden whitespace-nowrap  h-[100px] rounded-[10px]  bg-white font-ubuntu rounded-[10px]  bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-5 "
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      ref={i === data.length - 1 ? itemRef : null}
                      className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}{" "}
                    </td>
                  ))}
                  <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
                    {" "}
                    <div className="flex items-center relative ">
                      {["#F91C1C", "#1F52AE", "#E38A38", 36].map(
                        (item: string | number, i: number) => (
                          <div
                            key={i}
                            className={` rounded-full border  w-[30px] h-[30px] border-0 flex items-center justify-center text-xs`}
                            style={{
                              zIndex: i > 0 ? i + 1 : 0,
                              marginLeft:
                                i > 0 ? (isMobile ? "-1rem" : "-1rem") : "",
                              background:
                                typeof item === "number" ? "#FBFBFD" : item,
                            }}
                          >
                            {typeof item === "number" && item + "+"}
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
                    <button className="flex items-center bg-[#F4F6F8] rounded-[100px] text-primary p-5 hover:opacity-80">
                      {" "}
                      <FontAwesomeIcon className="mr-2" icon={faEye} />
                      View
                    </button>
                  </td>
                  <td className="text-[#232E43]  font-ubuntu text-sm lg:text-base  px-6 py-4">
                    <button className="flex items-center text-white bg-primary rounded-[100px] text-primary p-5 hover:opacity-80">
                      <FontAwesomeIcon className="mr-2" icon={faShareSquare} />
                      Share
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

export default Index;
