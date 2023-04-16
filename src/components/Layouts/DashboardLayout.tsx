import React, { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
const SideBar = React.lazy(() => import("../Sidebar"));
const Header = React.lazy(() => import("../Header"));
const Button = React.lazy(() => import("../Backbtn"));
type Props = {
  children: React.ReactNode;
  type: "influencer" | "follower";
  backbtn?: boolean;
};

const DashboardLayout: React.FC<Props> = ({ children, type, backbtn }) => {
  const navigate = useNavigate();
  const [expand, setExpand] = React.useState<boolean>(false);
  const [mobileNav, setmobileNav] = React.useState<boolean>(false);
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const handleMobileNav = () => {
    if (isMobile) {
      setmobileNav(!mobileNav);
    }
  };
  const buttonProps = {
    frontIcon: true,
    icon: {
      prefix: "fas",
      name: "long-arrow-alt-left",
    },
    className:
      "text-primary font-ubuntu hover:opacity-80 text-sm lg:text-base ml-2 lg:ml-0",
    onClick: () => navigate(-1),
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
            <div className="bg-white">
              {backbtn && (
                <Button {...buttonProps} frontIcon={true}>
                  Back
                </Button>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
