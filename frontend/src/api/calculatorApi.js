import axiosClient from "./axiosClient";

const get = async (url, params) => (await axiosClient.get(url, {params})).data;

export const bmi = (weight, height) => get("/calculator/bmi", {weight, height});
export const math = (operation, a, b) => get(`/calculator/${operation}`, {a,b});
export const sqFeetToCent = (value) => get("/calculator/sqfeet-to-cent", {value});
export const centToSqFeet = (value) => get("/calculator/cent-to-sqfeet", {value});
export const simpleInterest = (principal, rate, time) => get("/calculator/simple-interest", {principal,rate,time});
export const compoundInterest = (principal, rate, time) => get("/calculator/compound-interest", {principal,rate,time});
export const discount = (price, percent) => get("/calculator/discount", {price,percent});
export const squareRoot = (value) => get("/calculator/square-root", {value});
export const cubeRoot = (value) => get("/calculator/cube-root", {value});
export const nthRoot = (value, root) => get("/calculator/nth-root", {value,root});
export const convertLength = (endpoint, value) => get(`/calculator/${endpoint}`, {value});
export const area = (endpoint, params) => get(`/calculator/${endpoint}`, params);
