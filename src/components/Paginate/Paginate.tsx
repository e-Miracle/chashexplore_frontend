import React, { useState, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  previousPage: any;
  nextPage: any;
  currentPage: number;
};

const index: React.FC<Props> = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Suspense>
      <div className={"mt-5 flex justify-end items-center"}>
        <ul>
          <li
            onClick={previousPage}
            className={
              " text-sm hover:opacity-80 bg-[bl] inline-block cursor-pointer bg-primary text-white rounded-[4px] p-2 "
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                currentPage === number
                  ? "inline-block text-sm cursor-pointer text-primary mx-1 rounded-[4px]  p-2 "
                  : " inline-block text-sm cursor-pointer opacity-50 rounded-[4px] mx-1 p-2 text-[#213F7D]"
              }
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          ))}
          {currentPage >= pageNumbers[pageNumbers.length - 1] ? null : (
            <li
              onClick={nextPage}
              className={
                " ml-0 text-sm hover:opacity-80 inline-block cursor-pointer bg-primary text-white rounded-[4px] p-2"
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          )}
        </ul>
      </div>
    </Suspense>
  );
};

export default index;
