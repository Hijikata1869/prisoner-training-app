import axios from 'axios';
import { 
  usersIndexPage, 
  postUserPage, 
  signInPost, 
  showUserPage, 
  userUpdate, 
  userEditPage, 
  passwordUpdatePage,
  postTrainingUrl,
  postQuestionUrl,
  showQuestionUrl,
  postAdviceUrl,
  hundleBookmarkUrl,
  fetchAdvicesUrl,
  signOutUrl,
  hundleFollowUrl,
  showFollowingsUrl,
  showFollowersUrl,
  getTrainingLogsUrl,
  hundleTrainingLogsUrl,
 } from '../urls/index';

export const fetchUsers = () => {
  return axios.get(usersIndexPage)
  .then(res => {
    return res;
  })
  .catch((e) => console.error(e))
}

export const fetchUser = (userId) => {
  return axios.get(showUserPage(userId))
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
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const userUpdateAction = (userId, nickname, email, introduction, token, client, uid) => {
  return axios.patch(userUpdate(userId),{
    'access-token': token,
    'client': client,
    'uid': uid,
    'nickname': nickname,
    'email': email,
    'introduction': introduction,
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

export const passwordUpdate = (token, client, uid, password, confirmationPassword) => {
  return axios.put(passwordUpdatePage,{
    'access-token': token,
    'client': client,
    'uid': uid,
    'password': password,
    'password_confirmation': confirmationPassword
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const imageUpdate = (userId, token, client, uid, image) => {

  return axios.patch(userUpdate(userId),image, {headers: {
    'content-type': 'multipart/form-data',
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then((res) => {
    return {
      data: res.data,
      status: res.status
    };
  })
  .catch((e) => {
    console.error(e);
  })
}


export const postTraining = (userId, token, client, uid, trainingMenu, step, repetition, set, memo) => {
  return axios.post(postTrainingUrl, {
    'access-token': token,
    'client': client,
    'uid': uid,
    'user_id': userId,
    'training_menu': trainingMenu,
    'step': step,
    'repetition': repetition,
    'set': set,
    'memo': memo,
  })
  .then((res) => {
    return{
      data: res.data,
      status: res.status
    };
  })
  .catch((e) => {
    console.error(e);
  })
}

export const postQuestion = (token, client, uid, userId, trainingMenu, step, question) => {
  return axios.post(postQuestionUrl, {
    'access-token': token,
    'client': client,
    'uid': uid,
    'user_id': userId,
    'training_menu': trainingMenu,
    'step': step,
    'question': question,
  })
}

export const fetchQuestions = (token, client, uid) => {
  return axios.get(postQuestionUrl, {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then(res => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const fetchQuestion = (questionId, token, client, uid) => {
  return axios.get(showQuestionUrl(questionId), {headers: {
    'access-token': token,
    'client': client,
    'uid': uid,
  }})
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const postAdvice = (token, client, uid, currentUserId, questionId, advice) => {
  return axios.post(postAdviceUrl, {
    'access-token': token,
    'client': client,
    'uid': uid,
    'user_id': currentUserId,
    'question_id': questionId,
    'advice': advice
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const createBookmark = (adviceId, token, client, uid) => {
  return axios.post(hundleBookmarkUrl(adviceId), {
    'access-token': token,
    'client': client,
    'uid': uid
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const fetchAdvices = () => {
  return axios.get(fetchAdvicesUrl)
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const deleteBookmark = (adviceId, token, client, uid) => {
  return axios.delete(hundleBookmarkUrl(adviceId), {headers: {
    'access-token': token,
    'client': client,
    'uid': uid,
  }})
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const signOut = (token, client, uid) => {
  return axios.delete(signOutUrl, {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const userFollow = (token, client, uid, userId) => {
  return axios.post(hundleFollowUrl(userId), {
    'access-token': token,
    'client': client,
    'uid': uid,
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const userUnFollow = (token, client, uid, userId) => {
  return axios.delete(hundleFollowUrl(userId), {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const fetchFollowings = (id) => {
  return axios.get(showFollowingsUrl(id))
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const fetchFollowers = (id) => {
  return axios.get(showFollowersUrl(id))
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const fetchTrainingLogs = () => {
  return axios.get(getTrainingLogsUrl)
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}

export const deleteTrainingLog = (token, client, uid, trainingLogId) => {
  return axios.delete(hundleTrainingLogsUrl(trainingLogId), {headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }})
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.error(e);
  })
}
