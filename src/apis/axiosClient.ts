import axios from "axios";
import queryString from "query-string";
import { localDataNames } from "../constants/appInfor";

const baseURL = "http://192.168.1.8:3001";

const getAccessToken = () => {
    const res = localStorage.getItem(localDataNames.authData);

    return res ? JSON.parse(res).token : "";
};

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    const token = getAccessToken();

    config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...config.headers,
    };

    return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            return Promise.reject(res.data);
        }
    },
    (err) => {
        const { response } = err;

        return Promise.reject(response.data);
    }
);

export default axiosClient;
