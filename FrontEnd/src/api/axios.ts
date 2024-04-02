import { BASE_URL } from "@/constants/api";
import { getCookie } from "@/util/cookies";
import { logOnDev } from "@/util/logging";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type ResponseDataType = {
  dataHeader: {
    successCode: number | null;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: object | null;
};

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
  logOnDev(`🚀 [API - REQUEST] | ${method?.toUpperCase()} | ${url}`);
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } else {
    window.location.href = "/";
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  logOnDev(`❌[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

//---------------------------------------------------
const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { dataBody, dataHeader }: ResponseDataType = res.data;
  // const data : object = res.data.dataBody
  if (dataHeader.successCode === 0 && dataBody) {
    logOnDev(
      `💌 [API - RESPONSE] | SUCCESS |${method?.toUpperCase()} | ${url}`
    );
    logOnDev(dataBody);
  }
  return res;
};
const onResponseError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const {data, status} = error.response as AxiosResponse
    const { dataHeader }: ResponseDataType = data

    logOnDev(`❌[Response error ${status} ${dataHeader.resultCode}] | ${method?.toUpperCase()} | ${url} | ${dataHeader.resultMessage}`);

  }
  return Promise.reject(error);
};
//---------------------------------------------------
// request 시 적용
instance.defaults.headers.common["Authorization"] = "";
instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

