import axios from "axios";
import { Configs } from "../app-config/api-config";
import { getUserInfo } from "../app-helper";
const getOptions = (options) => {
  const userInfo = getUserInfo();

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (userInfo) {
    opts.headers["Authorization"] = `Bearer ${userInfo.token}`;
  }
  return opts;
};
export const getTokenSource = () => {
  return axios.CancelToken.source();
};
export const POST = (path, params, option = {}) => {
  const _url = (option.useLocalApi ? Configs.LOCAL : Configs.BASE_API) + path;

  const _option = getOptions(option);

  return axios.post(_url, params, _option).then((response) => {
    return response.data;
  });
};
export const GET = (path, params, option = {}) => {
  const _params = params
    ? Object.keys(params)
        .map((key) => {
          let valueParam = params[key];
          let adjustParam = "";
          if (Array.isArray(valueParam)) {
            // TODO with "all" value;
            adjustParam = valueParam
              .map(
                (paramDetail) =>
                  `${key}=${encodeURIComponent(
                    paramDetail != "all" ? paramDetail : ""
                  )}`
              )
              .join("&");
          } else {
            // TODO with "all" value;
            valueParam = valueParam != "all" ? valueParam : "";
            adjustParam = `${key}=${encodeURIComponent(valueParam)}`;
          }
          return adjustParam;
        })
        .join("&")
    : "";
  const _url =
    (option.useLocalApi ? Configs.LOCAL : Configs.BASE_API) +
    path +
    (_params === "" ? "" : "?" + _params);

  const _option = getOptions(option);

  return axios.get(_url, _option).then((response) => {
    return response.data;
  });
};
