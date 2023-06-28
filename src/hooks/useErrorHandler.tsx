import React from "react";
import toast from "react-hot-toast";

function useErrorHandler(makeQuery: any, message = "", error = "Login Error") {
  React.useEffect(() => {
    if (makeQuery.error && makeQuery.isError) {
      toast.error(`${error}...${makeQuery?.error?.response?.data?.message}`, {
        icon: "❌",
      });
      makeQuery.reset();
    }

    if (makeQuery.isSuccess && makeQuery.data) {
      toast.success(`Successful...${message}`, {
        icon: "✅",
      });
    }
  }, [makeQuery]);

  return null;
}

export default useErrorHandler;
