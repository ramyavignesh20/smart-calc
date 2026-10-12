import axiosClient from "./axiosClient";

export const register = async (data) => (await axiosClient.post("/auth/register", data)).data;
export const login = async (data) => (await axiosClient.post("/auth/login", data)).data;
