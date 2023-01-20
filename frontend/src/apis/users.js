import axios from "axios";
import {
  usersIndexPage,
  postUserPage,
  signInPost,
  showUserPage,
  userUpdate,
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
  hundleQuestionsUrl,
  hundleAdivceUrl,
  showTrainingLogUrl,
  hundleLikesUrl,
  showCurrentUserUrl,
  guestLoginUrl,
  postBodyCompositionPath,
  showUserBodyCompositionPath,
  showUserTrainingLogsPath,
  showUserQuestionsPath,
  showUserAdvicesPath,
  showUserBookmarkAdvicesPath,
  showUserFollowingsPath,
  showUserFollowersPath,
  showCurrentUserFollowingsPath,
  showCurrentUserBookmarksPath,
  showCurrentUserLikesPath,
  showRecentTrainingLogsPath,
  showNumberOfLikesPath,
  showRecentQuestionsPath,
  showOneKindQuestionPath,
} from "../urls/index";

export const fetchUsers = () => {
  return axios
    .get(usersIndexPage)
    .then((res) => {
      return res;
    })
    .catch((e) => console.error(e));
};

export const fetchUser = (userId) => {
  return axios
    .get(showUserPage(userId))
    .then((res) => {
      return res;
    })
    .catch((e) => console.error(e));
};

export const postUser = (nickname, email, password) => {
  return axios
    .post(postUserPage, {
      nickname: nickname,
      email: email,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => console.error(e));
};

export const userSignIn = (email, password) => {
  return axios
    .post(signInPost, {
      email: email,
      password: password,
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        headers: res.headers,
      };
    })
    .catch((e) => console.error(e));
};

export const fetchCurrentUser = (token, client, uid) => {
  return axios
    .get(showCurrentUserUrl, {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const userUpdateAction = (
  userId,
  nickname,
  email,
  introduction,
  token,
  client,
  uid
) => {
  return axios
    .patch(userUpdate(userId), {
      "access-token": token,
      client: client,
      uid: uid,
      nickname: nickname,
      email: email,
      introduction: introduction,
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const passwordUpdate = (
  token,
  client,
  uid,
  password,
  confirmationPassword
) => {
  return axios
    .put(passwordUpdatePage, {
      "access-token": token,
      client: client,
      uid: uid,
      password: password,
      password_confirmation: confirmationPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const imageUpdate = (userId, token, client, uid, image) => {
  return axios
    .patch(userUpdate(userId), image, {
      headers: {
        "content-type": "multipart/form-data",
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const postTraining = (
  userId,
  token,
  client,
  uid,
  trainingMenu,
  step,
  repetition,
  set,
  memo
) => {
  return axios
    .post(postTrainingUrl, {
      "access-token": token,
      client: client,
      uid: uid,
      user_id: userId,
      training_menu: trainingMenu,
      step: step,
      repetition: repetition,
      set: set,
      memo: memo,
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const postQuestion = (
  token,
  client,
  uid,
  userId,
  trainingMenu,
  step,
  question
) => {
  return axios.post(postQuestionUrl, {
    "access-token": token,
    client: client,
    uid: uid,
    user_id: userId,
    training_menu: trainingMenu,
    step: step,
    question: question,
  });
};

export const fetchQuestions = () => {
  return axios
    .get(postQuestionUrl)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchQuestion = (questionId, token, client, uid) => {
  return axios
    .get(showQuestionUrl(questionId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const postAdvice = (
  token,
  client,
  uid,
  currentUserId,
  questionId,
  advice
) => {
  return axios
    .post(postAdviceUrl, {
      "access-token": token,
      client: client,
      uid: uid,
      user_id: currentUserId,
      question_id: questionId,
      advice: advice,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const createBookmark = (adviceId, token, client, uid) => {
  return axios
    .post(hundleBookmarkUrl(adviceId), {
      "access-token": token,
      client: client,
      uid: uid,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchAdvices = () => {
  return axios
    .get(fetchAdvicesUrl)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const deleteBookmark = (adviceId, token, client, uid) => {
  return axios
    .delete(hundleBookmarkUrl(adviceId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const signOut = (token, client, uid) => {
  return axios
    .delete(signOutUrl, {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const userFollow = (token, client, uid, userId) => {
  return axios
    .post(hundleFollowUrl(userId), {
      "access-token": token,
      client: client,
      uid: uid,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const userUnFollow = (token, client, uid, userId) => {
  return axios
    .delete(hundleFollowUrl(userId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchFollowings = (id) => {
  return axios
    .get(showFollowingsUrl(id))
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchFollowers = (id) => {
  return axios
    .get(showFollowersUrl(id))
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchTrainingLogs = () => {
  return axios
    .get(getTrainingLogsUrl)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const deleteTrainingLog = (token, client, uid, trainingLogId) => {
  return axios
    .delete(hundleTrainingLogsUrl(trainingLogId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const deleteQuestion = (token, client, uid, questionId) => {
  return axios
    .delete(hundleQuestionsUrl(questionId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const deleteAdvice = (token, client, uid, adviceId) => {
  return axios
    .delete(hundleAdivceUrl(adviceId), {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchTrainingLog = (trainingLogId) => {
  return axios
    .get(showTrainingLogUrl(trainingLogId))
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchLikes = () => {
  return axios
    .get(hundleLikesUrl)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const guestLogin = (nickname, email, password) => {
  return axios
    .post(guestLoginUrl, {
      nickname: nickname,
      email: email,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => console.error(e));
};

export const postBodyComposition = (
  token,
  client,
  uid,
  currentUserId,
  weight,
  bodyFat
) => {
  return axios
    .post(postBodyCompositionPath, {
      "access-token": token,
      client: client,
      uid: uid,
      user_id: currentUserId,
      weight: weight,
      body_fat: bodyFat,
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserBodyCompositions = (id) => {
  return axios
    .get(showUserBodyCompositionPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserTrainingLogs = (id) => {
  return axios
    .get(showUserTrainingLogsPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserQuestions = (id) => {
  return axios
    .get(showUserQuestionsPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserAdvices = (id) => {
  return axios
    .get(showUserAdvicesPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserBookmarkAdvices = (id) => {
  return axios
    .get(showUserBookmarkAdvicesPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserFollowings = (id) => {
  return axios
    .get(showUserFollowingsPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserFollowers = (id) => {
  return axios
    .get(showUserFollowersPath(id))
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchCurrentUserFollowings = (token, client, uid) => {
  return axios
    .get(showCurrentUserFollowingsPath, {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchCurrentUserBookmarks = (token, client, uid) => {
  return axios
    .get(showCurrentUserBookmarksPath, {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchCurrentUserLikes = (token, client, uid) => {
  return axios
    .get(showCurrentUserLikesPath, {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchUserRecentTrainingLogs = (id) => {
  return axios
    .get(showRecentTrainingLogsPath(id))
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchNumberOfLikes = (id) => {
  return axios
    .get(showNumberOfLikesPath(id))
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchRecentQuestions = () => {
  return axios
    .get(showRecentQuestionsPath)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const fetchOneKindQuestions = (trainingMenu) => {
  return axios
    .get(showOneKindQuestionPath, {
      params: {
        training_menu: trainingMenu,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
    });
};
