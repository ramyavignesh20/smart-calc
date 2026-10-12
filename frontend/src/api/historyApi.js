import axiosClient from "./axiosClient";

export const saveHistory = async (data) => (await axiosClient.post("/history", data)).data;
export const getHistory = async (userId) => (await axiosClient.get(`/history/${userId}`)).data;
export const deleteHistory = async (id) => (await axiosClient.delete(`/history/${id}`)).data;
