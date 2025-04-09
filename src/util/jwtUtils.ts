import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie } from "./cookieUtils";

const jwtAxios = axios.create();

const refreshJwt = async (accessToken: string, refreshToken: string) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.post(
    `http://localhost:8080/api/members/refresh?refreshToken=${refreshToken}`,
    header
  );

  return res.data;
};

const beforeReq = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<any> => {
  const memberInfo = getCookie("member");

  if (!memberInfo) {
    const error = new AxiosError("REQUIRE_LOGIN", "ERR_REQUIRE_LOGIN", config);
    return Promise.reject(error);
  }

  const { accessToken } = memberInfo;

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const requestFail = (err: AxiosError): Promise<AxiosError> => {
  return Promise.reject(err);
};

const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    const result = await refreshJwt(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );

    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    setCookie("member", JSON.stringify(memberCookieValue), 1);

    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }

  return res;
};

const responseFail = (err: AxiosError): Promise<AxiosError> => {
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
