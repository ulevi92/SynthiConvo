import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import FormErrorText from "./FormErrorText";

const RejectedMessages = () => {
  const errorMessage = useAppSelector(
    (state) => state.authUser.auth.errorMessage
  );

  const content = useMemo(() => {
    if (errorMessage === undefined) return <></>;

    if (errorMessage.includes("email-already-in-use"))
      return <FormErrorText message='your email is already exists' />;

    if (
      errorMessage.includes("wrong-password") ||
      errorMessage.includes("user-not-found")
    )
      return <FormErrorText message='wrong input data' />;

    if (errorMessage.includes("network-request-failed"))
      return <FormErrorText message='check your internet connection' />;

    if (errorMessage.includes("too-many-requests"))
      return (
        <FormErrorText message='too many requests, please try again later' />
      );

    return null;
  }, [errorMessage]);

  return <>{content}</>;
};

export default memo(RejectedMessages);
