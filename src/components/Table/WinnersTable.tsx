import React, { Suspense } from "react";
import { useTable } from "react-table";
type Props = {
  dataArr: any[];
  columnsArr: {
    Header: string;
    accessor: string;
  }[];
  observerRef?: any;
  normalRef?: any;
};
const Index: React.FC<Props> = ({
  dataArr,
  columnsArr,
  observerRef,
  normalRef,
}) => {
  const data = React.useMemo(() => dataArr, []);
  const columns: any = React.useMemo(() => columnsArr, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Suspense>
      <div
        ref={observerRef}
        className="relative overflow-x-auto bg-white rounded-[10px] mt-10 h-[500px]"
      >
        <table
          className="w-full text-sm text-white text-gray-500 dark:text-gray-400 z-[1]"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-700 capitalize ">
            {headerGroups.map((head) => (
              <tr {...head.getHeaderGroupProps()}>
                {head.headers.map((column) => (
                  <th
                    className=" text-[#646C79] font-ubuntu text-sm lg:text-base px-6 py-3 "
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  className="overflow-hidden whitespace-nowrap  h-[100px] rounded-[10px]  bg-white font-ubuntu rounded-[10px]  bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-5 "
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      ref={i === data.length - 1 ? normalRef : null}
                      className="text-[#232E43] text-center  font-ubuntu text-sm lg:text-base  px-6 py-4"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}{" "}
                    </td>
                  ))}
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
