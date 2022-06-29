import { lazy } from "react";

const getLazyLoad = url => lazy(() => import(`@/${url}/index`));

const routers = [
  {
    path: "*",
    component: getLazyLoad("pages"),
    childrenList: [
      { path: "*", static: true, component: getLazyLoad("pages/welcome") },
      { path: "/list", static: true, component: getLazyLoad("pages/list") },
    ],
  },
];

export default routers;
