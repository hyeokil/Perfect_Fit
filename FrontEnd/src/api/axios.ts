import { BASE_URL } from "@/constants/api";
import { getCookie } from "@/util/cookies";
<<<<<<< HEAD
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
=======
import axios, { AxiosError } from "axios";
// type dataHeader = {
>>>>>>> fffbcf1 (feat: FE 검색 기능 완료(아마도))

axios.defaults.baseURL = `${BASE_URL}`;

export const instance = axios.create({
  baseURL: BASE_URL,
  // 요청 최대 대기시간 3초
  timeout: 3000,
});
//---------------------------------------------------

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);
  const token = getCookie("accessToken");
  if (token) {
    // if (!config.headers) {
    //   config.headers = {}; // config.headers가 undefined인 경우 빈 객체로 설정
    // }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } else {
    // window.alert('로그인해주세염')
    window.location.href = "/";
  }
  return config
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

//---------------------------------------------------
// request 시 적용
instance.defaults.headers.common["Authorization"] = "";
instance.interceptors.request.use(onRequest, onRequestError);



instance.interceptors.response.use(
  (res) => {
    if (res.data.dataHeader.successCode === 0) {
      return res.data.dataBody;
    }
  },
  (error: AxiosError<{ message: string; errorCode: string }>) => {

    switch (error.response?.status) {
      case 400: {
        console.log(
          `🚀[${error.config?.method?.toUpperCase()}] ✔URL : ${
            error.config?.url
          }❌Error Code:`,
          error.response.status,
          "Bad request❌",
          "|",
          "💌Error Message :",
          error.response.data
        );
        break;
      }
      case 401: {
        console.log(
          "❌Error code:",
          error.response.status,
          "Unauthorized❌",
          "|",
          "💌Error Message :",
          error.response.data
        );
        break;
      }
    }
    return Promise.reject(error);
  }
);
