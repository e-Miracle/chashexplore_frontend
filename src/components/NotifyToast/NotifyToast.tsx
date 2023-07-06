import React from "react";
import { Notification, countDown } from "../../Utils";

type Props = {
  item: Notification;
  OnClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  noref: any;
};
const NotifyToast: React.FC<Props> = ({ item, OnClick, noref }) => {
  return (
    <>
     
      <div
        ref={noref}
        onClick={OnClick}
        className={
          item.read_at
            ? ` before:content-[''] before:border-l-[10px] before:border-[#BABCC1] before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-[8px]   relative cursor-pointer bg-[#F4F6F8] mb-[1rem] rounded-[8px] p-[1rem] hover:opacity-80`
            : ` before:content-[''] before:border-l-[10px] before:border-primary before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-[8px]   relative cursor-pointer bg-[#F4F6F8] mb-[1rem] rounded-[8px] p-[1rem] hover:opacity-80`
        }
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between ml-0 md:ml-[0rem] md:pl-[3rem]  ">
          <div className="w-auto  ">
            <h1 className="text-heading text-bold text-base lg:text-[1.25rem]">
              {item?.data?.title}
            </h1>
            <p className="mt-3 text-labelLight text-[10px] lg:text-[12px]">
              {item?.data?.description}
            </p>
          </div>
          <div className="w-auto flex lg:flex-col items-end justify-between    ">
            <h5 className="text-[0.75rem] lg:text-[0.875rem] capitalize">
              {item.read_at ? (
                <span className=" text-[#18FD66]">Read</span>
              ) : (
                <span className=" text-[#FD1818]">UnRead</span>
              )}
            </h5>
            <p className="text-[#BABCC1] mt-3  text-[10px] lg:text-[12px]">
              {
                new Date(
                  countDown(item.created_at).year,
                  countDown(item.created_at).month,
                  countDown(item.created_at).day
                )
                  .toISOString()
                  .split("T")[0]
              }
            </p>
          </div>
        </div>
      </div>
      <hr className="border-0 border-b-[1px] border-b-[#BABCC1] my-[1rem]" />
    </>
  );
};

export default NotifyToast;
