import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import { FC } from "react";

interface Props {
  userDisplayName?: boolean;
  userEmail?: boolean;
  userCredit?: boolean;
  resetHistory?: boolean;
}

const UserDetails: FC<Props> = ({
  resetHistory,
  userCredit,
  userDisplayName,
  userEmail,
}) => {
  const { displayName, email, credit } = useAppSelector((state) => ({
    displayName: state.userData.userProfile.displayName,
    email: state.userData.userProfile.email,
    credit: state.userData.chat.credit,
  }));

  const dispatch = useAppDispatch();

  const content = userCredit ? (
    `credit: ${credit}`
  ) : userEmail ? (
    `email: ${email}`
  ) : userDisplayName ? (
    `hello ${displayName}`
  ) : resetHistory ? (
    <Button>reset history</Button>
  ) : null;

  return <div className='d-flex flex-warp'>{content}</div>;
};

export default UserDetails;
