import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routersObj from "./config";

const Loading = () => {
  return <div>loading...</div>;
};

const GetRouters = props => {
  const { routers } = props;

  return (
    <Routes>
      {routers.map((e, i) => {
        const { path = "", component: Component, childrenList = [] } = e;

        if (Component) {
          const Child = (
            <React.Suspense fallback={<Loading />}>
              <Component>
                {childrenList.length > 0 ? (
                  <GetRouters routers={childrenList} />
                ) : (
                  ""
                )}
              </Component>
            </React.Suspense>
          );
          return <Route path={path} element={Child} key={i} />;
        }
      })}
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <GetRouters routers={routersObj} />
    </BrowserRouter>
  );
};

export default App;
