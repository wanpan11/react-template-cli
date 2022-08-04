import BreadCrumb from "../../components/BreadCrumb";
import routers from "../router/config";

const Content = ({ children }) => {
  return (
    <div>
      <BreadCrumb routes={routers} />

      {children}
    </div>
  );
};

export default Content;
