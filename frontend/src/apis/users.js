import axios from 'axios';
import { usersIndexPage, postUserPage, signInPost, showUserPage, userUpdate, userEditPage} from '../urls/index';

export const fetchUsers = () => {
  return axios.get(usersIndexPage)
  .then(res => {
    return res
  })
  .catch((e) => console.error(e))
}

export const fetchUser = (userId, token, client, uid) => {
  return axios.get(showUserPage(userId), {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then(res => {
    return res
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
      data: res.data,
      headers: res.headers
    }
  })
  .catch((e) => console.error(e))
}

export const fetchCurrentUser = (token, client, uid) => {
  return axios.get(userEditPage, {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then((res) => {
    const currentUser = res.data.currentUser;
    return currentUser;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const userUpdateAction = (userId, nickname, email, introduction, password, image, token, client, uid) => {
  return axios.patch(userUpdate(userId),{
    'access-token': token,
    'client': client,
    'uid': uid,
    'nickname': nickname,
    'email': email,
    'introduction': introduction,
    'password': password,
    'image': image,
  })
  .then(res => {
    return {
      data: res.data,
      status: res.status,
      headers: res.headers
    }
  })
  .catch((e) => {
    console.error(e)
  })
}