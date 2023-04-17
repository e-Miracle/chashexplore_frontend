import React from "react";

type Props = {
  title: string;
  paragraph: string;
  status: boolean;
  time: string;
  color: string;
  OnClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};
const NotifyToast: React.FC<Props> = ({
  title,
  paragraph,
  status = false,
  time,
  color = "#1F52AE",
  OnClick,
}) => {
  return (
    <>
      <div
        onClick={OnClick}
        className={
          status
            ? ` before:content-[''] before:border-l-[10px] before:border-[#BABCC1] before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-[8px]   relative cursor-pointer bg-[#F4F6F8] mb-[1rem] rounded-[8px] p-[1rem] hover:opacity-80`
            : ` before:content-[''] before:border-l-[10px] before:border-primary before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-[8px]   relative cursor-pointer bg-[#F4F6F8] mb-[1rem] rounded-[8px] p-[1rem] hover:opacity-80`
        }
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between ml-0 md:ml-[5rem] ">
          <div className="w-full">
            <h1 className="text-heading text-bold text-base lg:text-[1.25rem]">
              {title}
            </h1>
            <p className="mt-3 text-labelLight text-[10px] lg:text-[12px]">
              {paragraph}
            </p>
          </div>
          <div className="w-full flex items-center justify-between ">
            <h5 className="text-[0.75rem] lg:text-[0.875rem] capitalize">
              {status ? (
                <span className=" text-[#18FD66]">Read</span>
              ) : (
                <span className=" text-[#FD1818]">UnRead</span>
              )}
            </h5>
            <p className="text-[#BABCC1] mt-3  text-[10px] lg:text-[12px]">
              {time}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-0 border-b-[1px] border-b-[#BABCC1] my-[1rem]" />
    </>
  );
};

export default NotifyToast;
