import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/userData/userDataSlice";
import NotAllowed from "./NotAllowed";
import NotFound from "./NotFound";

interface Props {
  notFound: Boolean;
}

export interface ErroPagesProps {
  countdown: number;
}

const counter = 10;

const ErrorPage: FC<Props> = ({ notFound }) => {
  const [countdown, setCountdown] = useState(counter);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const notAllowed = useAppSelector((state) => state.userData.userNotAllowed);

  useEffect(() => {
    const timeout: number = counter * 1000;
    let timer: NodeJS.Timeout;

    if (notFound) {
      setCountdown((prev) => prev - 1);
      timer = setTimeout(() => navigate("/"), timeout);
    } else if (notAllowed) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        dispatch(fetchSignOut());
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [notFound, notAllowed]);

  if (!notFound) return <NotAllowed countdown={countdown} />;

  return <NotFound countdown={countdown} />;
};

export default ErrorPage;
