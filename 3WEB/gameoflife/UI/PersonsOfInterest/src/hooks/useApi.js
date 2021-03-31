import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import get from "lodash.get";

const objectToQueryParameters = (parameters) => {
  if (parameters) {
    return `?${Object.entries(parameters)
      .map((parameter) => parameter.join("="))
      .join("&")}`;
  }
  return "";
};

export const callApiWithAxios = async ({ method = "get", url, ressource, id, payload, queryParameters, token, customHeaders }) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      ...customHeaders,
    },
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const path = `${[url, ressource, id].filter(Boolean).join("/")}${objectToQueryParameters(queryParameters)}`;
  return Axios({
    method,
    headers: config.headers,
    url: path,
    data: payload,
  });
};

const apiTry = async ({ setIsLoading, params, url, token, callApi, setData, dispatch }) => {
  setIsLoading(true);
  dispatch &&
    dispatch({
      type: "ADD_APICALL",
      payload: `${params.method || "get"}-${params.ressource}`,
    });
  const res = await callApi({ ...params, url, token });
  setData(res.data);
  if (res.status >= 200 && res.status < 300) {
    params.callbackSuccess && params.callbackSuccess(res.data);
  }
};

const apiCatch = ({ setError, e, params }) => {
  console.error(e);
  setError(e);
  params.callbackFail && params.callbackFail(e);
};

const apiFinally = ({ setIsLoading, dispatch, params }) => {
  setIsLoading(false);
  dispatch &&
    dispatch({
      type: "REMOVE_APICALL",
      payload: `${params.method || "get"}-${params.ressource}`,
    });
};

const useApi = ({ url, token, params: passedParams = false, defaultValue, dispatch, callApi = callApiWithAxios }) => {
  const [params, setParams] = useState(passedParams);
  const [data, setData] = useState(defaultValue);
  const setDataWithPath = useCallback(
    (newData) => {
      if (params.path && get(newData, params.path)) {
        setData(get(newData, params.path));
      } else {
        setData(newData);
      }
    },
    [params.path]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setError(null);
    try {
      await apiTry({ setIsLoading, params, callApi, url, token, dispatch, setData: setDataWithPath });
    } catch (e) {
      apiCatch({ setError, e, params });
    } finally {
      apiFinally({ setIsLoading, dispatch, params });
    }
  }, [params, callApi, setDataWithPath, token, url, dispatch]);

  useEffect(() => {
    Boolean(params) && fetchData();
  }, [params, fetchData]);

  return { setData: setDataWithPath, data, setParams, isLoading, error };
};

export default useApi;
