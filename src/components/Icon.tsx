import * as icons from "react-bootstrap-icons";

interface Props extends icons.IconProps {
  iconName: keyof typeof icons;
  className?: string;
}

const Icon = ({ iconName, className, ...props }: Props) => {
  const BootstrapIcon = icons[iconName];

  const defaultClassName = "add-pointer-cursor d-flex align-self-center mx-2";

  return <BootstrapIcon className={defaultClassName} {...props} />;
};

export default Icon;
