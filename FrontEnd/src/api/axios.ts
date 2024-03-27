import { BASE_URL } from "@/constants/api";
import { getCookie } from "@/util/cookies";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
// type dataHeader = {

// }
axios.defaults.baseURL = `${BASE_URL}`;

export const instance = axios.create({
  baseURL: BASE_URL,
  // 요청 최대 대기시간 3초
  timeout: 3000,
});

// request 시 적용
instance.defaults.headers.common["Authorization"] = "";

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.alert("로그인해주세염");
      window.location.href = "/";
    }
    return config;
  },
  (error: AxiosError<{ message: string; errorCode: string }>) => {
    return Promise.reject(error);
  }
);

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
          "Error code:",
          error.response.status,
          "|",
          "Error Message :",
          error.response.data.dataHeader.resultMessage
        );
        // window.alert('잘못된 요청입니다.')
        break;
      }
      case 401: {
        console.log(error.response.data.dataHeader.resultMessage);
        // window.location.href('/')
        // window.alert(error.response.data.dataHeader.resultMessage, '다시 로그인해주세요')
        break;
      }
    }
    return Promise.reject(error);
  }
);
