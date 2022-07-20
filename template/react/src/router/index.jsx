import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import routersObj from "./config";

const Loading = () => {
  return <div>loading...</div>;
};

const getRoRouteuters = routers => {
  return routers.map(e => {
    const { path = "", component: Component, childrenList = [], title } = e;

    const arr = (
      <Route
        path={path}
        element={
          <React.Suspense fallback={<Loading />}>
            <Component title={title}>
              {/* Outlet 用作子路由页面出口 */}
              {childrenList.length ? <Outlet /> : null}
            </Component>
          </React.Suspense>
        }
        key={title}
      >
        {childrenList.length ? getRoRouteuters(childrenList) : ""}
      </Route>
    );

    return arr;
  });
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>{getRoRouteuters(routersObj)}</Routes>
    </BrowserRouter>
  );
};

export default App;
