import { lazy } from "react";
import routes from "./routes";
import { parseObject } from "../libs/objects";

export const $lazy = (feature: string, page: string) =>
  lazy(() => import(`../features/${feature}/pages/${page}/${page}`));

export const getRoute = (name: string, params: { [key: string]: any } = {}) => {
  const route = routes.find((item) => item.name === name);

  if (route) {
    let { path } = route;

    Object.keys(params).map(
      (key) => (path = path.replace(`:${key}`, params[key]))
    );

    return params.query ? `${path}${parseObject(params.query)}` : path;
  }

  return "";
};
