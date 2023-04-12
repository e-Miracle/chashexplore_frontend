import React, { Suspense } from "react";
import { IconPrefix, IconName } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  frontIcon?: boolean;
  backIcon?: boolean;
  icon?: {
    prefix: any;
    name: any;
  };
};
const index: React.FC<Props> = ({
  children,
  frontIcon,
  backIcon,
  icon,
  ...props
}) => {
  return (
    <Suspense>
      <button {...props}>
        {frontIcon && icon && (
          <FontAwesomeIcon className="mr-2" icon={[icon?.prefix, icon?.name]} />
        )}
        {children}
        {backIcon && icon && (
          <FontAwesomeIcon className="ml-2" icon={[icon?.prefix, icon?.name]} />
        )}
      </button>
    </Suspense>
  );
};

export default index;
