import axios from 'axios';
import { usersIndexPage, postUserPage, signInPost } from '../urls/index';

export const fetchUsers = () => {
  return axios.get(usersIndexPage)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}

export const postUser = (nickname, email, password) => {
  return axios.post(postUserPage,
    {
      nickname: nickname,
      email: email,
      password: password
    },
  )
  .then(res => {
    return res.data;
  })
  .catch((e) => console.error(e))
}

export const userSignIn = (email, password) => {
  return axios.post(signInPost,
    {
      email: email,
      password: password
    },
  )
  .then(res => {
    return {
      status: res.status,
      data: res.data
    }
  })
  .catch((e) => console.error(e))
}