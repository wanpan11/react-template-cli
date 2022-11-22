import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import routers from "../router/config";

const Content = ({ children }: PageProps) => {
  return (
    <div>
      <BreadCrumb routes={routers} />

      {children}
    </div>
  );
};

export default Content;
