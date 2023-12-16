import * as icons from "react-bootstrap-icons";
import { useAppSelector } from "../redux/reduxHooks";

interface Props extends icons.IconProps {
  iconName: keyof typeof icons;
  className?: string;
  chat?: boolean;
}

const Icon = ({ iconName, className, chat, ...props }: Props) => {
  const credit = useAppSelector((state) => state.userData.chat.credit);

  const BootstrapIcon = icons[iconName];

  const defaultClassName = () => {
    if (credit === 0 && chat) return "mx-2";

    return "add-pointer-cursor mx-2";
  };

  return <BootstrapIcon className={defaultClassName()} {...props} />;
};

export default Icon;
