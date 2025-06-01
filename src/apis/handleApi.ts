import axiosClient from "./axiosClient";

const handleApi = async (
    url: string,
    data: any,
    method?: "POST" | "PUT" | "PATCH" | "GET" | "DELETE"
) => {
    return await axiosClient(url, {
        method: method ?? "GET",
        data,
    });
};

export default handleApi;
