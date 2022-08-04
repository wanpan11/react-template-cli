import { memo, useMemo } from "react";
import lessStyle from "./index.module.less";
import { useLocation, useNavigate } from "react-router-dom";

const BreadCrumb = ({ routes = [] }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routesMap = useMemo(() => {
    const obj = {};

    const getBreadCrumbConf = (arr, parentPath = "", parentTitle = "") => {
      arr.forEach(e => {
        const { path, title, childrenList = [] } = e;

        let newPath = "/";
        let newTitle = "";

        if (parentPath) {
          if (parentPath === "/") {
            newPath = `${parentPath}${path === "*" ? "" : path}`;
          } else {
            newPath = `${parentPath}${"/" + path}`;
          }

          newTitle = parentTitle + title;
          obj[newPath] = newTitle;
        }

        if (childrenList.length) {
          getBreadCrumbConf(
            childrenList,
            newPath,
            title ? newTitle + " / " : ""
          );
        }
      });
    };
    getBreadCrumbConf(routes);

    return obj;
  }, [routes]);

  const title = routesMap[pathname];

  return (
    <div className={lessStyle.bread_crumb}>
      <svg
        className={lessStyle.home}
        t="1659601605152"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3924"
        onClick={() => {
          navigate("/");
        }}
      >
        <path
          d="M946.488889 505.002667l-411.875556-411.591111a31.914667 31.914667 0 0 0-45.226666 0l-411.875556 411.591111c-12.003556 12.003556-18.830222 28.302222-18.830222 45.283555a64.056889 64.056889 0 0 0 64 64H166.115556v293.717334c0 17.692444 14.307556 32 32 32h249.912888v-224h111.985778v224h265.898667c17.720889 0 32-14.307556 32-32V614.286222h43.406222a64.056889 64.056889 0 0 0 45.226667-109.283555z"
          p-id="3925"
          fill="#e6e6e6"
        ></path>
      </svg>

      <span>{title}</span>
    </div>
  );
};

export default memo(BreadCrumb);
