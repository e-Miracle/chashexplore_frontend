import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  rating: number;
  imgSrc: string;
  username: string;
  amount: number;
  noref?: any;
};

const counter = (value: number) => {
  let arr: number[] = [];
  for (let i = 0; i < value; i++) {
    arr.push(i);
  }
  return arr;
};

const ReviewCard: React.FC<Props> = (props) => {
  return (
    <Suspense>
      <div className="font-ubuntu bg-white rounded-[10px] p-[1rem]" ref={props.noref}>
        <h3 className="text-base lg:text-[1.25rem] text-labels leading-[2]">
          {props.text}
        </h3>

        <div className="flex items-center text-[#646C79] text-base lg:text-[1.25rem] mt-[2rem] md:[5rem]">
          Rating:{" "}
          <span>
            {props.rating &&
              (props.rating % 1 === 0 ? (
                <div>
                  {counter(props.rating).map((rating) => (
                    <FontAwesomeIcon
                      key={rating}
                      icon={faStar}
                      className="text-base lg:text-sm text-[#ffa534]"
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {counter(parseInt(String(props.rating))).map((rating) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={rating}
                      className="text-base lg:text-sm text-[#ffa534]"
                    />
                  ))}
                  <FontAwesomeIcon
                    icon={faStarHalf}
                    className="text-base lg:text-sm text-[#ffa534]"
                  />
                </div>
              ))}
          </span>
        </div>

        <div className="flex items-center mt-5">
          <div className="w-[36px] h-[36px]">
            <img
              className="w-full h-full object-cover rounded-full"
              src={props.imgSrc}
              alt={props.imgSrc}
            />
          </div>

          <div className="ml-2 ">
            <h4 className="text-[#232E43] text-base lg:text-[1.25rem]">
              {props.username}
            </h4>
            <p className="text-primary text-sm lg:text-base font-semibold">
              Winner, N{props.amount}
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ReviewCard;
