import { FC, PropsWithChildren } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";
import BouncingDot from "./BouncingDot";

interface Props extends PropsWithChildren {
  auth?: boolean;
  chat?: boolean;
  isMounted?: boolean;
}

export const Loader: FC<Props> = ({ children, auth, chat, isMounted }) => {
  const loading = useAppSelector((state) => state.global.loading);
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const authLoader = useAppSelector((state) => state.userData.auth.authLoading);
  const questionAsked = useAppSelector(
    (state) => state.userData.chat.questionAsked
  );

  if (loading)
    return (
      <div className={`loader-container z-3 ${darkMode ? "dark" : "light"}`}>
        <div className='align-items-center h-100'>
          <div className='d-flex justify-content-center loader'>
            <BouncingDot />
          </div>
        </div>
      </div>
    );

  if (auth && authLoader)
    return (
      <div className='modal-loader'>
        <div className={`bg-light opacity-25`}>{children}</div>
        <div className='loader'>
          <BouncingDot />
        </div>
      </div>
    );

  if (chat && questionAsked)
    return <div className={`loader-circle ${darkMode ? "dark" : "light"}`} />;

  return <>{children}</>;
};
