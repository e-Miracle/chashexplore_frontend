import React, { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
const SideBar = React.lazy(() => import("../Sidebar"));
const Header = React.lazy(() => import("../Header"));

type Props = {
  children: React.ReactNode;
  type: "influencer" | "follower";
};

const DashboardLayout: React.FC<Props> = ({ children, type }) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const [mobileNav, setmobileNav] = React.useState<boolean>(false);
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const handleMobileNav = () => {
    if (isMobile) {
      setmobileNav(!mobileNav);
    }
  };
  return (
    <Suspense>
      <div className={""}>
        <SideBar type={type} expand={expand} mobileNav={mobileNav} />
        <div
          className={
            isMobile
              ? `my-container`
              : expand
              ? "relative left-[6rem] min-h-full bg-[#fff] h-screen ease-in duration-300 w-[calc(100%-6rem)] overflow-auto"
              : "relative left-[18rem] min-h-full bg-[#fff] h-screen ease-in duration-300 w-[calc(100%-18rem)] overflow-auto"
          }
        >
          <div
            className={
              expand
                ? "w-full mx-auto max-w-[1240px]"
                : "w-full mx-auto max-w-[1024px] "
            }
          >
            <Header
              expand={expand}
              setExpand={setExpand}
              mobileNav={mobileNav}
              handleMobileNav={handleMobileNav}
            />{" "}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
