import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  path: string;
  title: string;
  Icon: any;
  isIconMode?: boolean;
};

const activeStyle: {
  background: string;
  color: string;
} = {
  background: "#fff",
  color: "#1F52AE",
};

const emptyStyle: { color: string; background: string } = {
  color: "#fff",
  background: "#1F52AE",
};

function SidebarLink({ path, title, Icon, isIconMode = false }: Props) {
  let body = (
    <div>
      <span>
        {isIconMode ? (
          <FontAwesomeIcon className="text-2xl " icon={["fas", Icon]} />
        ) : (
          <FontAwesomeIcon className="text-lg" icon={["fas", Icon]} />
        )}
      </span>
      {isIconMode ? null : (
        <span className="inline-block ml-5 text-base lg:text-lg font-ubuntu">
          {title}
        </span>
      )}
    </div>
  );

  return (
    <Suspense>
      <NavLink
        // style={({ isActive }) => (isActive ? activeStyle : emptyStyle)}
        className={({ isActive }) =>
          isActive
            ? isIconMode
              ? "bg-white relative w-full bg-white text-primary  pl-9 my-2 py-3 rounded-l-[30px]"
              : "relative  rounded-l-[30px] my-3 py-5 pl-10 w-full ml-[5rem] bg-white text-primary "
            : isIconMode
            ? " my-2 py-3 pl-9 w-full   hover:bg-white hover:text-primary hover:rounded-l-[30px]"
            : " my-3 py-5 pl-10 w-full ml-[5rem] hover:bg-white hover:text-primary hover:rounded-l-[30px]"
        }
        to={path}
        data-tooltip-target="tooltip-hover"
        data-tooltip-trigger="hover"
      >
        {body}
      </NavLink>
      <span
        id="tooltip-hover"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {title}
        <span className="tooltip-arrow" data-popper-arrow></span>
      </span>
    </Suspense>
  );
}

export default SidebarLink;
