import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { z } from "zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { getUserData } from "../../../Utils";
import useAddReview from "../../../hooks/utils/useCustomAddReview";
import useErrorHandler from "../../../hooks/useErrorHandler";

const StarRating = ({ onClick }: any) => {
  const [rating, setRating] = React.useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onClick(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{ color: star <= rating ? "gold" : "gray", cursor: "pointer" }}
          className="text-xl lg:text-3xl"
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Form = ({ id }: { id: number }) => {
  const addReview = useAddReview();
  useErrorHandler(addReview, "Review Successful", "Review Error");
  const formSchema = z.object({
    comment: z
      .string()
      .min(3, { message: "name must have at least three characters " }),
    star: z.number().min(1).max(5).int(),
  });
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const newData = {
      ...data,
      campaign_id: id,
      follower_id: getUserData()?.id,
    };
    console.log(newData);
    await addReview.mutateAsync(newData);
    reset({ comment: "", star: 0 });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[3rem]">
        <label
          htmlFor="name"
          className="w-full lg:w-[30%] inline-block text-labels font-ubuntu  text-sm lg:text-base "
        >
          Comment
        </label>
        <div className="w-full lg:w-[80%] ">
          <textarea
            className={
              errors.comment && errors.comment.message
                ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            id="comment"
            placeholder="Add a review"
            {...register("comment", { required: "This is required." })}
          ></textarea>
          <ErrorMessage
            errors={errors}
            name="comment"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>
      <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[1rem]">
        <label
          htmlFor="phone"
          className="w-full lg:w-[30%] inline-block text-labels font-ubuntu  text-sm lg:text-base "
        >
          Rating
        </label>
        <div className="w-full lg:w-[80%] ">
          <Controller
            name="star"
            control={control}
            render={({ field }) => (
              <StarRating
                onClick={(rating: number) => field.onChange(rating)}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="star"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className=" w-full p-[1rem] lg:p-0 md:flex md:items-end md:justify-end">
        {isSubmitting ? (
          <div>
            <Spinner toggle={false} />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
          >
            Review Camapign
          </button>
        )}
      </div>
    </form>
  );
};

const ReviewTicket = () => {
  const { id } = useParams();
  return (
    <Suspense>
      <DashBoardLayout type="follower" backbtn={true}>
        <h1 className="text-rand text-[1.2rem] lg:text-[1.5rem] my-[1rem] text-center lg:text-left font-bold">
          Review Camapign
        </h1>
        <BackgroundDrop>
          <Form id={Number(id)} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default ReviewTicket;
