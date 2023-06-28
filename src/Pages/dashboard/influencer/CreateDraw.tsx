import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import toast from "react-hot-toast";
import { BackgroundDrop } from "./Profile";
import { useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../../../constants";
import { getDateIsoString } from "../../../Utils";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCreateInfluencerCampaign from "../../../hooks/influencer/useCustomInfluencerCampaign";
import useErrorHandler from "../../../hooks/useErrorHandler";

const Draws = () => {
  const createCampaign = useCreateInfluencerCampaign();
  useErrorHandler(
    createCampaign,
    "Create Campaign Successful",
    "Create Campaign Error"
  );
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
    start_date: z.coerce
      .date({
        required_error: "date is required",
        invalid_type_error: "date must be a string",
      })
      .min(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        { message: "Date must start_date from today" }
      )
      .max(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 2,
          new Date().getDate() + 9
        ),
        {
          message: "Date must be within the next 2 months",
        }
      ),
    end_date: z.coerce
      .date({
        required_error: "date is required",
        invalid_type_error: "date must be a string",
      })
      .min(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        { message: "Date must start_date from today" }
      )
      .max(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 2,
          new Date().getDate() + 9
        ),
        {
          message: "Date must be within the next 2 months",
        }
      ),
    recurring: z
      .string()
      .min(3, { message: "recurring must have at least three characters " }),
    number_of_winners: z
      .number({
        required_error: "number of winners  is required",
        invalid_type_error: "number of winners must be a number",
      })
      .positive()
      .refine((value) => Number(value) <= 1000000, "winners must be a number"),
    draw_type: z
      .string({
        required_error: "draw_type is required",
        invalid_type_error: "draw_type must be a string",
      })
      .min(3, { message: "draw_type must have at least three characters " }),
    description: z
      .string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
      })
      .min(3, { message: "description must have at least three characters " }),
    ticket_prize: z
      .number({
        required_error: "Ticket Price  is required",
        invalid_type_error: "Ticket Price must be a number",
      })
      .positive()
      .refine((value) => Number(value) <= 1000000, "price must be a number"),
    // .min(1, { message: "currency must have at least one character" }),
    // amount: z
    //   .number({
    //     required_error: "number of number_of_winners  is required",
    //     invalid_type_error: "number of number_of_winners must be a number",
    //   })
    //   .positive(),
    ticket_sale_cap: z
      .number({
        required_error: "number of tickets  is required",
        invalid_type_error: "number of tickets must be a number",
      })
      .positive()
      .refine((value) => Number(value) <= 1000000, "number of tickets must be a number"),
    brand_colors: z
      .array(z.string())
      .refine(
        (value) => value.length === 3,
        "Brand Colors contain exactly three colors"
      ),
  });

  type FormSchmaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchmaType>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   start_date: new Date(new Date().toISOString().split("T")[0]),
    //   end_date: new Date(new Date().toISOString().split("T")[0]),
    // },
  });

  const defaultColor = "#1F52AE";

  //image section
  const [images, setImages] = useState<File[]>([]);
  const onDrop = (acceptedFiles: File[]) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    if (images.length === 0) {
      return toast.error("Please add Images for the campaign");
    }
    images.map((img) => {
      if (img.size > MAX_FILE_SIZE)
        return toast.error(
          "Some of the images exceed 5MB Max image audience_size is 5MB"
        );
      if (!ACCEPTED_IMAGE_TYPES.includes(img.type))
        return toast.error(
          "Some of the images exceed 5MB Max image audience_size is 5MB"
        );
    });
    const req = {
      ...data,
      start_date: getDateIsoString(data.start_date),
      end_date: getDateIsoString(data.end_date),
      raffle_images:images,
    };
    console.log(req);
    createCampaign.mutateAsync(req);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer" backbtn={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BackgroundDrop>
            <h3 className="text-primary font-ubuntu text-[1.2rem] lg:text-[1.5rem]  font-bold">
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
                  Please enter the start_date and end dates and time.
                </p>
              </div>

              <div className="w-full lg:w-[70%] ">
                <div className="flex  justify-between flex-wrap">
                  <input
                    className={`w-full  border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start_date"
                    placeholder="Start"
                    type="date"
                    id="start_date"
                    {...register("start_date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />

                  {/* <input
                    className={`w-full lg:w-[48%] mt-3 lg:mt-0 border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start_date"
                    placeholder="Start"
                    type="text"
                    id="start_date"
                    {...register("start_date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  /> */}
                </div>
                <div className="flex justify-between flex-wrap mt-[1rem]">
                  <input
                    className={`w-full  border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start_date"
                    placeholder="Start"
                    type="date"
                    id="start_date"
                    {...register("end_date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />

                  {/* <input
                    className={`w-full lg:w-[48%] mt-3 lg:mt-0  border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="start_date"
                    placeholder="End"
                    type="text"
                    id="start_date"
                    {...register("end_date", {
                      required: "This is required.",
                    })}
                    disabled={isSubmitting}
                  /> */}
                </div>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="start_date"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <ErrorMessage
              errors={errors}
              name="end_date"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
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
                  <option className="text-sm opacity-[.6]" value="monthly">
                    Every Month
                  </option>
                  <option className="text-sm opacity-[.6]" value="custom">
                    Custom
                  </option>
                </select>
              </div>
            </div>

            <ErrorMessage
              errors={errors}
              name="recurring"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <label
                htmlFor="number_of_winners"
                className="font-ubuntu text-rand text-sm lg:text-base mb-3 lg:mb-0"
              >
                Number of number_of_winners
              </label>

              <input
                className={`w-full lg:w-[70%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="number_of_winners"
                placeholder="No of number_of_winners"
                type="text"
                id="number_of_winners"
                {...register("number_of_winners", {
                  required: "This is required.",
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
                disabled={isSubmitting}
              />
            </div>

            <ErrorMessage
              errors={errors}
              name="number_of_winners"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-wrap justify-between mt-[1rem] lg:mt-[2rem]">
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
                  // {...(register("draw_type"), { required: "This is required." })}
                  {...register("draw_type", { required: "This is required." })}
                >
                  <option className="text-sm opacity-[.6]" value="">
                    Select an option
                  </option>
                  <option className="text-sm opacity-[.6]" value="live">
                    Live Draw
                  </option>
                  <option className="text-sm opacity-[.6]" value="scheduled">
                    Schedule Draw
                  </option>
                </select>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="draw_type"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
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
                <textarea
                  className="w-full bg-transparent border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]"
                  id="description"
                  {...register("description")}
                ></textarea>
              </div>
            </div>

            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />
          </BackgroundDrop>

          <div className="bg-bg p-[1rem] mt-[1rem] lg:mt-[2rem] rounded-[10px]">
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
                <div
                  className={`:w-[20%] lg:w-[10%] mr-0 border text-sm bg-[#F4F6F8] lg:text-base text-forms border-formborder p-3 rounded-l-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                >
                  $
                </div>
                {/* <select
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
                </select> */}
                <input
                  className={`w-[80%] lg:w-[90%] border text-sm bg-bg lg:text-base text-forms border-formborder p-3 rounded-r-[10px] outline-none placeholder:text-forms placeholder:text-sm placeholder:opacity-[.6]`}
                  aria-label="amount"
                  placeholder="Amount"
                  type="text"
                  {...register("ticket_prize", {
                    required: "This is required.",
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* <ErrorMessage
              errors={errors}
              name="currency"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            /> */}
            <ErrorMessage
              errors={errors}
              name="ticket_prize"
              render={({ message }) => (
                <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                  {message}
                </p>
              )}
            />

            <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
              <div className="lg:w-[30%]">
                <label
                  htmlFor="ticket_sale_cap"
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
                  aria-label="ticket_sale_cap"
                  placeholder="No of Tickets"
                  type="number"
                  id="ticket_sale_cap"
                  {...register("ticket_sale_cap", {
                    required: "This is required.",
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <ErrorMessage
            errors={errors}
            name="ticket_sale_cap"
            render={({ message }) => (
              <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                {message}
              </p>
            )}
          />

          <div className="bg-bg p-[1rem] mt-[1rem] lg:mt-[2rem] rounded-[10px]">
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
                <div
                  {...getRootProps()}
                  className={`h-[200px] flex justify-center items-center rounded-lg border border-dashed   ${
                    isDragActive ? "border-[green]" : "border-[gray]"
                  }`}
                >
                  <input {...getInputProps()} />
                  <p className="text-[#000]">Drag 'n' drop some files here</p>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-[200px] border border-dashed border-[gray] relative"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-contain  aspect-[3/2] "
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="text-[#000] text-base absolute top-[-0.6rem] right-[-0.5rem] hover:text-primary"
                      >
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col lg:flex-row justify-between mt-[1rem] lg:mt-[2rem]">
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
            </div> */}

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
                <input
                  type="color"
                  className="block hover:opacity-80 cursor-pointer rounded-full w-[30px] h-[30px]  mr-2 border-0 bg-white"
                  defaultValue={defaultColor}
                  {...register("brand_colors.0", {
                    required: "Color 1 is required",
                  })}
                />
                <input
                  type="color"
                  {...register("brand_colors.1", {
                    required: "Color 2 is required",
                  })}
                  defaultValue={defaultColor}
                  className="block hover:opacity-80 cursor-pointer rounded-full w-[30px] h-[30px]  mr-2 border-0 bg-white"
                />
                <input
                  type="color"
                  {...register("brand_colors.2", {
                    required: "Color 3 is required",
                  })}
                  defaultValue={defaultColor}
                  className="block hover:opacity-80 cursor-pointer rounded-full w-[30px] h-[30px]  mr-2 border-0 outline-none bg-white"
                />
                {/* {colors.map((item: string, i: number) => (
                  <span
                    key={i}
                    style={{ background: item }}
                    onClick={() => setBrandColors(item)}
                    className="block hover:opacity-80 cursor-pointer rounded-full w-[20px] h-[20px]  mr-2"
                  ></span>
                ))} */}
              </div>
            </div>
          </div>

          <ErrorMessage
            errors={errors}
            name="brand_colors"
            render={({ message }) => (
              <p className="my-1 font-ubuntu text-[#E4033B] text-xs lg:text-sm">
                {message}
              </p>
            )}
          />

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

// import React from "react";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   files: yup
//     .mixed()
//     .test("required", "Please select a file ...", (value: any) => {
//       return value && value?.length;
//     }),
// });

// const App: React.FC = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [image, setImage] = React.useState<string | undefined>("");

//   const convertToBase64 = (file: any) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result?.toString());
//     };
//     reader.readAsDataURL(file);
//   };

//   const onSubmit = (data: any) => {
//     if (data.files.length > 0) {
//       convertToBase64(data.files[0]);
//       console.log(data);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {image && <img src={image} width="450" />}
//       {!watch("files") || watch("files").length === 0 ? (
//         <>
//           <input type="file" id="fileUpload" {...register(" files")} />
//           <label htmlFor="fileUpload">Nne</label>
//         </>
//       ) : (
//         <strong>{watch("files")[0].name}</strong>
//       )}

//       <button type="submit">Submit</button>
//       {errors.files && (
//         <p>{errors.files.message && errors.files.message.toString()}</p>
//       )}
//     </form>
//   );
// };

// export default App;
