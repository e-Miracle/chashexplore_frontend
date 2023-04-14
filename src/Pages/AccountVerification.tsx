import React, { Suspense, SyntheticEvent } from "react";
import { PageLayout, Spinner } from ".";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";
import { Link } from "react-router-dom";
import { faCheckCircle, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Form = () => {
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const MAX_FILE_SIZE: number = 1000000;
  const ACCEPTED_IMAGE_TYPES: string[] = [
    "image/gif",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const formSchema = z.object({
    file: z
      .instanceof(File)
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        `Only .jpg, .jpeg, and .png  formats are supported.`
      ),
    phone: z.string().refine(validator.isMobilePhone),
    size: z
      .string()
      .min(2, { message: "size must have at least two characters " }),
    validId: z
      .string()
      .min(3, { message: "size must have at least three characters " }),
    facebook: z
      .string()
      .url()
      .min(3, { message: "facebook must have at least three characters " })
      .refine(
        (value) =>
          /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/.test(
            value
          ),
        "Invalid Facebook link"
      ),
    instagram: z
      .string()
      .url()
      .min(3, { message: "instagram must have at least three characters " })
      .refine(
        (value) =>
          /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/.test(
            value
          ),
        "Invalid Instagram link"
      ),
    twitter: z
      .string()
      .url()
      .min(3, { message: "twitter must have at least three characters " })
      .refine(
        (value) =>
          /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/.test(
            value
          ),
        "Invalid Twitter link"
      ),
    LinkedIn: z
      .string()
      .url()
      .min(3, { message: "LinkedIn must have at least three characters " })
      .refine(
        (value) => /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(value),
        "Invalid LinkedIn link"
      ),
    // file: z.instanceof(File).superRefine((f, ctx) => {
    //   // First, add an issue if the mime type is wrong.
    //   if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
    //         ", "
    //       )}] but was ${f.type}`,
    //     });
    //   }
    //   // Next add an issue if the file size is too large.
    //   if (f.size > 3 * MAX_FILE_SIZE) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.too_big,
    //       type: "array",
    //       message: `The file must not be larger than ${
    //         3 * MAX_FILE_SIZE
    //       } bytes: ${f.size}`,
    //       maximum: 3 * MAX_FILE_SIZE,
    //       inclusive: true,
    //     });
    //   }
    // }),
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

  const handleImageChange = (e: any) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  React.useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    // console.log("hiiiiiiiiiii")
    // data.file
    console.log(data);
  };

  

  return (
    <Suspense>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-ubuntu text-primary font-medium text-center lg:text-left text-[2.1rem] lg:text-[2.5rem]">
          Account Verification
          <FontAwesomeIcon className="ml-2" icon={faCheckCircle} />
        </h3>

        <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[5rem]">
          <label
            htmlFor="phone"
            className="inline-block text-labels font-ubuntu w-full lg:w-1/2 text-[1.2rem] lg:text-[1.5rem]"
          >
            Phone Number
          </label>
          <div className="w-full lg:w-1/2 ">
            <input
              className={
                errors.phone && errors.phone.message
                  ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="phone"
              placeholder="Phone Number"
              type="tel"
              id="phone"
              {...register("phone", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="validId"
              className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]"
            >
              Valid Identification
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              Please select a valid ID and upload an image of your selected ID.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <select
              id="validId"
              {...register("validId", { required: "This is required." })}
              className={
                errors.validId && errors.validId.message
                  ? "w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
            >
              <option value="">Select Valid ID</option>
              <option value="license">license</option>
              <option value="license">license</option>
              <option value="license">license</option>
            </select>

            <ErrorMessage
              errors={errors}
              name="validId"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />

            {imageUrl ? (
              <img
                src={imageUrl}
                className="  w-full h-[150px]  lg:h-[200px] object-contain mt-1 border border-dashed border-[#F4F6F8] rounded-[10px]"
                alt="Image Alt"
              />
            ) : (
              <label
                htmlFor="image"
                className="flex items-center justify-center cursor-pointer text-xl text-labels lg:text-3xl  mt-1 h-[150px]  lg:h-[200px] w-full rounded-[10px] bg-[#8E939D] border border-dashed border-[#F4F6F8]"
              >
                <FontAwesomeIcon className="" icon={faCamera} />
              </label>
            )}

            <input
              type="file"
              accept="photo/*"
              id="image"
              {...register("file", { required: true })}
              onChange={handleImageChange}
              className="hidden"
            />

            <ErrorMessage
              errors={errors}
              name="image"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]">
              Social Media Profiles
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              Please add the links to your social media profiles for review.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <input
              className={
                errors.facebook && errors.facebook.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="facebook"
              placeholder="Facebook"
              type="text"
              id="facebook"
              {...register("facebook", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="facebook"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />

            <input
              className={
                errors.instagram && errors.instagram.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="instagram"
              placeholder="Instagram"
              type="text"
              id="instagram"
              {...register("instagram", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="instagram"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />

            <input
              className={
                errors.twitter && errors.twitter.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="twitter"
              placeholder="Twitter"
              type="text"
              id="twitter"
              {...register("twitter", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="twitter"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />

            <input
              className={
                errors.twitter && errors.twitter.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="LinkedIn"
              placeholder="LinkedIn"
              type="text"
              id="LinkedIn"
              {...register("LinkedIn", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="LinkedIn"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]">
              Audience Size
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              What is your audience size?
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <select
              className={
                errors.size && errors.size.message
                  ? "w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              id="size"
              {...register("size", { required: "This is required." })}
            >
              <option value="">Select your audience size range</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>

            <ErrorMessage
              errors={errors}
              name="size"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col lg:flex-row items-center justify-end">
          <Link
            to="/"
            className=" text-center font-ubuntu text-primary text-[1.2rem] lg:text-[1.5rem] hover:opacity-80 p-5 block"
          >
            Skip
          </Link>
          <div className="w-full lg:w-auto ">
            {isSubmitting ? (
              <div>
                <Spinner toggle={false} />
              </div>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className={
                  "w-full lg:w-auto bg-primary text-[#fff] text-[1rem] lg:text-[1.2rem] font-medium outline-none  py-5 px-[5rem]  rounded-[100px] cursor-pointer hover:opacity-80"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </Suspense>
  );
};

const AccountVerification = () => {
  return (
    <PageLayout>
      <div className="bg-white shadow-normal rounded-[20px] lg:p-10 p-5 ">
        <Form />
      </div>
    </PageLayout>
  );
};

export default AccountVerification;
