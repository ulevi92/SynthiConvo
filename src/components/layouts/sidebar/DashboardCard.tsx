import { FC } from "react";
import { Card } from "react-bootstrap";
import Icon from "../../Icon";
import * as icons from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import {
  setDarkMode,
  setModalType,
  setShowModal,
} from "../../../redux/features/global/globalSlice";
import { fetchSignOut } from "../../../redux/features/user/userSlice";

interface Props {
  cardName:
    | "about"
    | "account"
    | "clear conversation"
    | "dark mode"
    | "logout"
    | "conversation";

  conversationKeyWords?: string;
  cardMarginY?: 1 | 3;
  cardMarginB?: number;
  cardMarginT?: number;
  clickable?: boolean;
}

const DashboardCard: FC<Props> = ({
  cardName,
  conversationKeyWords,
  cardMarginY,
  cardMarginB,
  cardMarginT,
  clickable,
}) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const cardText =
    cardName !== "conversation" ? cardName : conversationKeyWords;

  const cardIcon = () => {
    let icon: keyof typeof icons = "Activity";

    switch (cardName) {
      case "about":
        icon = "QuestionDiamond";
        break;

      case "account":
        icon = "Person";
        break;

      case "clear conversation":
        icon = "Trash";
        break;

      case "conversation":
        icon = "ChatDots";
        break;

      case "dark mode":
        icon = darkMode ? "SunFill" : "MoonFill";
        break;

      case "logout":
        icon = "PersonDash";
        break;

      default:
        break;
    }

    return icon;
  };

  const cardClass: () => string = () => {
    const baseClass = "p-2 w-100";
    const marginClass = cardMarginY
      ? `my-${cardMarginY}`
      : `mb-${cardMarginB} mt-${cardMarginT}`;

    if (clickable) {
      const outlineClass = darkMode
        ? "btn btn-outline-light"
        : "btn btn-outline-dark";
      return `${outlineClass} ${baseClass} ${marginClass}`;
    }

    return `${baseClass} ${marginClass}`;
  };

  const handleCardClick = () => {
    switch (cardName) {
      case "about":
      case "account":
      case "conversation":
      case "clear conversation":
        dispatch(setModalType(cardName));
        dispatch(setShowModal(true));
        break;

      case "dark mode":
        dispatch(setDarkMode(!darkMode));
        break;

      case "logout":
        dispatch(fetchSignOut());
        break;

      default:
        break;
    }
  };

  const RenderCard = (
    <Card className={cardClass()} onClick={handleCardClick}>
      <Card.Body className='p-0 d-flex align-items-center justify-content-between'>
        <div>
          <Icon iconName={cardIcon()} />

          {cardText}
        </div>

        <div>
          {cardName === "conversation" && (
            <Icon iconName='Trash' className='btn' onClick={handleCardClick} />
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return RenderCard;
};

export default DashboardCard;
