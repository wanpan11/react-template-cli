import { lazy } from "react";

const getLazyLoad = (url: string) => lazy(() => import(`@/pages/${url}`));

/**
 *
 * @description 嵌套路由配置 react-router-dom V6 参考：https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
 * @param {path} * 表示无匹配时 渲染此项
 * @param {index} true 默认渲染此项 index 与 path 不能同时存在
 * @param {title} 每个对应组件会接受到 title
 * @param {component} 对应组件 采用 lazy 懒加载模式
 * @param {childrenList} 嵌套路由 可以在父路由组件内嵌 渲染
 *
 */
const routers: Routers = [
  {
    path: "/",
    title: "",
    component: getLazyLoad("index"),
    childrenList: [
      {
        path: "",
        index: true,
        title: "首页",
        component: getLazyLoad("welcome"),
      },
      {
        path: "list",
        title: "列表页",
        component: getLazyLoad("list"),
        childrenList: [
          {
            path: "detail",
            title: "详情页",
            component: getLazyLoad("list/detail"),
          },
        ],
      },
    ],
  },
];

export default routers;
