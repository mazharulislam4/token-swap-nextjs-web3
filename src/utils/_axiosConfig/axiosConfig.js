import axios from "axios";

const inchBase = process.env.NEXT_PUBLIC_INCH_API_BASE_URL;
const inchKey = process.env.NEXT_PUBLIC_INCH_API_KEY;

export const axiosInchConfig = axios.create({
  baseURL: inchBase,
  headers: {
    Authorization: `Bearer ${inchKey}`,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
