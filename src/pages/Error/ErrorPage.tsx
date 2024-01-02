import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/userData/userDataSlice";
import NotAllowed from "./NotAllowed";
import NotFound from "./NotFound";

interface Props {
  notFound: Boolean;
}

const ErrorPage: FC<Props> = ({ notFound }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const notAllowed = useAppSelector((state) => state.userData.userNotAllowed);

  useEffect(() => {
    const timeout: number = 10000;
    let timer: NodeJS.Timeout;

    if (notFound) {
      timer = setTimeout(() => navigate("/"), timeout);
    } else if (notAllowed) {
      timer = setTimeout(() => {
        dispatch(fetchSignOut());
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [notFound, notAllowed]);

  if (notAllowed) return <NotAllowed />;

  return <NotFound />;
};

export default ErrorPage;
