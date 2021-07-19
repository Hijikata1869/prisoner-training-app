import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls/index";

export const fetchHome = () => {
  return axios.get(DEFAULT_API_LOCALHOST)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}