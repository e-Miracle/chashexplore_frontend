import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconName,
} from "@fortawesome/free-regular-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { influencerCards } from "../../constants";
import { nFormatter } from "../../Utils";
// const influencerCards = await import("../../constants").then((module) => {
//   return module.influencerCards;
// });
// const nFormatter = await import("../../Utils").then((module) => {
//   return module.nFormatter;
// });
type Props = {
  raffles: number;
  participants: number;
  tickets: number;
};
const index: React.FC<Props> = (props: Props) => {
  return (
    <Suspense>
      <div className=" grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0">
        {influencerCards &&
          influencerCards.map((card, i) => (
            <div
              key={i}
              style={{ background: card.color }}
              className="p-5 rounded-[10px] font-ubuntu text-white cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base lg:text-[1.25rem]">
                  {card.name}
                </h3>
                <FontAwesomeIcon
                  className="text-2xl bg-white rounded-full text-icon p-3 text-xs lg:text-sm "
                  icon={["fas", card.icon as IconName]}
                />
              </div>

              <h2 className="my-3 text-[1.7rem] lg:text-[2rem]">
                {nFormatter(props[card.type as keyof Props], 3)}
              </h2>

              <Link
                className="mt-5 w-full flex items-center justify-between text-sm lg:text-base hover:opacity-80"
                to={card.route}
              >
                <span> See draws here</span>
                <FontAwesomeIcon
                  className="text-2xl "
                  icon={faLongArrowAltRight}
                />
              </Link>
            </div>
          ))}
      </div>
    </Suspense>
  );
};

export default index;
