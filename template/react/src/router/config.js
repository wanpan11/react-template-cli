import { lazy } from "react";

const getLazyLoad = url => lazy(() => import(`@/${url}/index`));

/**
 *
 * @description 嵌套路由配置 react-router-dom V6 参考：https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
 * @param {path} * 表示无匹配时 渲染此项
 * @param {title} 每个对应组件会接受到 title
 * @param {component} 对应组件 采用 lazy 懒加载模式
 * @param {childrenList} 嵌套路由 可以在父路由组件内嵌 渲染
 *
 */
const routers = [
  {
    path: "*",
    title: "",
    component: getLazyLoad("pages"),
    childrenList: [
      {
        path: "*",
        title: "首页",
        component: getLazyLoad("pages/welcome"),
      },
      {
        path: "list",
        title: "列表页",
        component: getLazyLoad("pages/list"),
        childrenList: [
          {
            path: "detail",
            title: "详情页",
            component: getLazyLoad("pages/list/detail"),
          },
        ],
      },
    ],
  },
];

export default routers;
