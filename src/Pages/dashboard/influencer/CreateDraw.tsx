import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Image } from "../../../components/DragandDrop";
import { currency_list } from "../../../constants";
import toast from "react-hot-toast";
import { BackgroundDrop } from "./Profile";
import DatePicker from "react-datepicker";
const DropBox = React.lazy(() => import("../../../components/DragandDrop"));
const colors: string[] = ["#211DEC", "#716EEA", "#DDDCEF"];

const Draws = () => {
  const [raffleimages, setRaffleImages] = useState<Image[]>([]);
  const [PageIcons, setPageIcons] = useState<Image[]>([]);
  const [brandColor, setBrandColors] = useState<string>("");
  const dateSchema = z.object({
    date: z
      .string({
        required_error: "date is required",
        invalid_type_error: "date must be a string",
      })
      .min(3, { message: "date must have at least three characters " })
      .max(30, {
        message: "date must not be greater than 30 characters",
      }),
    time: z
      .string({
        required_error: "time is required",
        invalid_type_error: "time must be a string",
      })
      .min(3, { message: "time must have at least three characters " })
      .max(30, {
        message: "time must not be greater than 30 characters",
      }),
  });
  const formSchema = z.object({
    title: z
      .string({
        required_error: "title is required",
        invalid_type_error: "title must be a string",
      })
      .min(3, { message: "title must have at least three characters " })
      .max(50, {
        message: "title must not be greater than 30 characters",
      }),
    start: dateSchema,
    stop: dateSchema,
    // recurring: z
    //   .string()
    //   .min(3, { message: "recurring must have at least three characters " })
    //   .nullable()
    //   .optional(),
    // winners: z
    //   .number({
    //     required_error: "number of winners  is required",
    //     invalid_type_error: "number of winners must be a number",
    //   })
    //   .positive(),
    // drawType: z
    //   .string({
    //     required_error: "drawType is required",
    //     invalid_type_error: "drawType must be a string",
    //   })
    //   .min(3, { message: "drawType must have at least three characters " }),
    // description: z
    //   .string({
    //     required_error: "description is required",
    //     invalid_type_error: "description must be a string",
    //   })
    //   .min(3, { message: "description must have at least three characters " }),
    // currency: z.string({
    //   required_error: "currency is required",
    //   invalid_type_error: "currency must be a string",
    // }),
    // // .min(1, { message: "currency must have at least one character" }),
    // amount: z
    //   .number({
    //     required_error: "number of winners  is required",
    //     invalid_type_error: "number of winners must be a number",
    //   })
    //   .positive(),
    // noOfTickets: z
    //   .number({
    //     required_error: "number of tickets  is required",
    //     invalid_type_error: "number of tickets must be a number",
    //   })
    //   .positive(),
  });

  type FormSchmaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchmaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    // if (raffleimages && raffleimages.length < 0)
    //   return toast.error("Please add Images for the raffle");
    // if (PageIcons && PageIcons.length < 0)
    //   return toast.error("Please add Images for the icon");
    // if (!brandColor) return toast.error("Please add brand colors");
    console.log({ data });
    // console.log({ raffleimages, PageIcons, brandColor})
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BackgroundDrop>
            <h3 className="text-primary font-ubuntu text-[1.2rem] lg:text-[1.5rem] border-b-[1px] border-formborder font-bold">
              Raffle Draw Details
            </h3>

            <div className="flex flex-col lg:flex-row justify-between flex-Wrap mt-[1rem] lg:mt-[2rem]">
              <label
                htmlFor="title"
                className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
              >
                Campaign Title
              </label>

              <input
                className={`w-full lg:w-[70%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="title"
                placeholder="Title"
                type="text"
                id="title"
                {...register("title", { required: "This is required." })}
                disabled={isSubmitting}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  htmlFor="title"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Campaign Duration
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Please enter the start and end dates and time.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <div className="flex  justify-between flex-wrap">
                  <input
                    className={`w-full lg:w-[48%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start"
                    placeholder="Start"
                    type="date"
                    id="start"
                    {...register("start.date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  />

                  <input
                    className={`w-full lg:w-[48%] mt-3 lg:mt-0 border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start"
                    placeholder="Start"
                    type="text"
                    id="start"
                    {...register("start.time", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex justify-between flex-wrap mt-[1rem]">
                  <input
                    className={`w-full lg:w-[48%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start"
                    placeholder="Start"
                    type="date"
                    id="start"
                    {...register("stop.date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  />

                  <input
                    className={`w-full lg:w-[48%] mt-3 lg:mt-0  border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start"
                    placeholder="End"
                    type="text"
                    id="start"
                    {...register("stop.time", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* <ErrorMessage
              errors={errors}
              name="start.date"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="start.time"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="stop.date"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="stop.time"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}

            {/* <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  htmlFor="recurring"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Set Recurrent Draws{" "}
                  <span className="text-forms">(Optional)</span>
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  You can set this draw to automatically run at your set times.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <select
                  id="recurring"
                  className={`w-full border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  {...register("recurring")}
                >
                  <option className="text-sm opacity-[.6]" value="">
                    Select an option
                  </option>
                  <option
                    className="text-sm opacity-[.6]"
                    value="Every two weeks"
                  >
                    Every two weeks
                  </option>
                  <option className="text-sm opacity-[.6]" value="Every Month">
                    Every Month
                  </option>
                  <option className="text-sm opacity-[.6]" value="Custom">
                    Custom
                  </option>
                </select>
              </div>
            </div> */}

            {/* <ErrorMessage
              errors={errors}
              name="recurring"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}

            {/* <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <label
                htmlFor="winners"
                className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
              >
                Number of winners
              </label>

              <input
                className={`w-full lg:w-[70%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="winners"
                placeholder="No of winners"
                type="text"
                id="winners"
                {...register("winners", {
                  required: "This is required.",
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
                disabled={isSubmitting}
              />
            </div> */}

            {/* <ErrorMessage
              errors={errors}
              name="winners"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}

            {/* <div className="flex flex-wrap justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%] mb-3 lg:mb-0">
                <label
                  htmlFor="drawtype"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Raffle Draw Type
                </label>
              </div>

              <div className="w-full lg:w-[70%] ">
                <select
                  id="drawtype"
                  className={`w-full border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  // {...(register("drawType"), { required: "This is required." })}
                  {...register("drawType", { required: "This is required." })}
                >
                  <option className="text-sm opacity-[.6]" value="">
                    ---
                  </option>
                  <option className="text-sm opacity-[.6]" value="Live Draw">
                    Live Draw
                  </option>
                  <option
                    className="text-sm opacity-[.6]"
                    value="Schedule Draw"
                  >
                    Schedule Draw
                  </option>
                </select>
              </div>
            </div> */}
            {/* <ErrorMessage
              errors={errors}
              name="drawType"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}

            {/* <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  htmlFor=""
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Campaign Description
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Describe your campaign here.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <ReactQuill
                  theme="snow"
                  className="text-forms"
                  {...(register("description"),
                  { required: "This is required." })}
                />
              </div>
            </div> */}

            {/* <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}
          </BackgroundDrop>

          {/* <div className="bg-bg p-[1rem] mt-[1rem] lg:mt-[2rem] rounded-[10px]">
            <h3 className="text-primary font-ubuntu text-[1.2rem] lg:text-[1.5rem] border-b-[1px] border-formborder font-bold">
              Ticket Details
            </h3>

            <div className="flex flex-col lg:flex-row flex-Wrap justify-between mt-[1rem] lg:mt-[2rem]">
              <label
                htmlFor="input"
                className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
              >
                Ticket Prize
              </label>

              <div className="flex items-center w-full lg:w-[70%]">
                <select
                  id="input"
                  className={`:w-[20%] lg:w-[10%] mr-0 border text-sm bg-[#F4F6F8] lg:text-base text-forms border-formborder p-3 rounded-l-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  {...register("currency", { required: "This is required." })}
                >
                  <option value="">---</option>
                  {Object.keys(currency_list).map((key, i) => (
                    <option value="" key={i}>
                      {currency_list[key].symbol}
                    </option>
                  ))}
                </select>
                <input
                  className={`w-[80%] lg:w-[90%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-r-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  aria-label="amount"
                  placeholder="Amount"
                  type="text"
                  {...register("amount", {
                    required: "This is required.",
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <ErrorMessage
              errors={errors}
              name="currency"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="amount"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  htmlFor="noOfTickets"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Ticket Sale Cap
                </label>
                <p className="font-ubuntu text-sm lg:text-base mt-3  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Please select the maximum number of tickets you intend to
                  sell.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <input
                  className={`w-full  border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  aria-label="winners"
                  placeholder="No of Tickets"
                  type="number"
                  id="noOfTickets"
                  {...register("noOfTickets", {
                    required: "This is required.",
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div> */}

          {/* <ErrorMessage
            errors={errors}
            name="noOfTickets"
            render={({ message }) => (
              <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                {message}
              </p>
            )}
          /> */}

          {/* <div className="bg-bg p-[1rem] mt-[1rem] lg:mt-[2rem] rounded-[10px]">
            <h3 className="text-primary font-ubuntu text-[1.2rem] lg:text-[1.5rem] border-b-[1px] border-formborder font-bold">
              Customize Raffle
            </h3>
            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  // htmlFor="recurring"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Raffle Images
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Please upload jpg files of 600kb max.
                </p>
                <p className="font-ubuntu text-sm lg:text-base  text-rand lg:w-[80%] mb-3 lg:mb-0">
                  Note: the first image will appear as the thumbnail image.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                {" "}
                <DropBox images={raffleimages} setImages={setRaffleImages} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  // htmlFor="recurring"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Page Icon
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Please upload jpg files of 600kb max.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <DropBox images={PageIcons} setImages={setPageIcons} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  // htmlFor="recurring"
                  className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
                >
                  Brand Colors
                </label>
                <p className="font-ubuntu text-sm lg:text-base  text-forms lg:w-[80%] mb-3 lg:mb-0">
                  Tap each circle to change color.
                </p>
              </div>

              <div
                className={`w-full flex lg:w-[70%] border  bg-bg l border-formborder p-3 rounded-[10px] outline-none `}
              >
                {colors.map((item: string, i: number) => (
                  <span
                    key={i}
                    style={{ background: item }}
                    onClick={() => setBrandColors(item)}
                    className="block hover:opacity-80 cursor-pointer rounded-full w-[20px] h-[20px]  mr-2"
                  ></span>
                ))}
              </div>
            </div>
          </div> */}

          <div className=" w-full p-[1rem] lg:p-0">
            {isSubmitting ? (
              <div>
                <Spinner toggle={false} />
              </div>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-primary text-white text-sm lg:text-base  p-3 my-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-[#39CDCC] hover:border hover:border-[#39CDCC]"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
