import React, { Suspense, useState, useRef, useEffect } from "react";
import moment from "moment";

type Props = {
  countDownDate?: any;
  color?: string;
  background?: string;
  small?: boolean;
};
const Timer: React.FC<Props> = ({
  countDownDate = moment().add(1, "d").toDate(),
  color = "#1F52AE",
  background = "#F4F6F8",
  small = false,
}) => {
  const [timerDays, setTimerDays] = useState<string | number>("00");
  const [timerHours, setTimerHours] = useState<string | number>("00");
  const [timerMinutes, setTimerMinutes] = useState<string | number>("00");
  const [timerSeconds, setTimerSeconds] = useState<string | number>("00");

  let interval: any = useRef();
  const startTimer = (countDownDate: any = moment().add(1, "d").toDate()) => {
    interval.current = setInterval(() => {
      const now: any = moment().toDate();
      const distance: any = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop the timer
        setTimerDays("00");
        setTimerHours("00");
        setTimerSeconds("00");
        setTimerMinutes("00");
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => startTimer(countDownDate), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense>
      {small ? (
        <>
          {timerDays}:{timerHours}:{timerMinutes}:{timerSeconds}
        </>
      ) : (
        <div className="flex items-center flex-wrap font-ubuntu mt-5 md:mt-0">
          <div
            className=" w-[58px] h-[58px] lg:w-[78px] lg:h-[78px] rounded-full bg-bg flex flex-col justify-center items-center"
            style={{ color, background }}
          >
            <h1 className=" text-[1.2rem]  lg:text-[1.5rem]">{timerDays}</h1>
            <span className="mt-1 text-sm  lg:text-base uppercase">DAYS</span>
          </div>
          <span className="text-2xl mx-1 text-labels"> :</span>
          <div
            className=" w-[58px] h-[58px] lg:w-[78px] lg:h-[78px] rounded-full bg-bg flex flex-col justify-center items-center"
            style={{ color, background }}
          >
            <h1 className=" text-[1.2rem]  lg:text-[1.5rem]">{timerHours}</h1>
            <span className="mt-1 text-sm lg:text-base uppercase">HRS</span>
          </div>
          <span className="text-2xl mx-1 text-labels"> :</span>
          <div
            className=" w-[58px] h-[58px] lg:w-[78px] lg:h-[78px] rounded-full bg-bg flex flex-col justify-center items-center"
            style={{ color, background }}
          >
            <h1 className=" text-[1.2rem]  lg:text-[1.5rem]">{timerMinutes}</h1>
            <span className="mt-1 text-sm lg:text-base uppercase">MINS</span>
          </div>
          <span className="text-2xl mx-1 text-labels"> :</span>
          <div
            className=" w-[58px] h-[58px] lg:w-[78px] lg:h-[78px] rounded-full bg-bg flex flex-col justify-center items-center"
            style={{ color, background }}
          >
            <h1 className=" text-[1.2rem]  lg:text-[1.5rem]">{timerSeconds}</h1>
            <span className="mt-1 text-sm lg:text-base uppercase">SECS</span>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Timer;
