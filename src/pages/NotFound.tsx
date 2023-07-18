import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => navigate("/"), 2000);

    return () => clearInterval(timer);
  }, []);

  return <>Not Found</>;
};

export default NotFound;
