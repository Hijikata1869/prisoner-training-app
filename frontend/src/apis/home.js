import axios from "axios";

export const fetchHome = () => {
  return axios.get(`${process.env.REACT_APP_SERVER_URL}`)
  .then(res => {
    return res;
  })
  .catch((e) => console.error(e))
}