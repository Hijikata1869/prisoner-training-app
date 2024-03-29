export const indexPage = `${process.env.REACT_APP_SERVER_URL}/index`;
export const usersIndexPage = `${process.env.REACT_APP_SERVER_URL}/users`;
export const trainingLogIndexPage = `${process.env.REACT_APP_SERVER_URL}/training_log`;
export const signUpPage = `${process.env.REACT_APP_SERVER_URL}/auth/sign_up`;
export const postUserPage = `${process.env.REACT_APP_SERVER_URL}/auth`;
export const signInPost = `${process.env.REACT_APP_SERVER_URL}/auth/sign_in`;
export const userEditPage = `${process.env.REACT_APP_SERVER_URL}/auth/edit`;
export const showUserPage = (userId) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${userId}`;
export const userUpdate = (userId) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${userId}`;
export const passwordUpdatePage = `${process.env.REACT_APP_SERVER_URL}/auth/password`;
export const postTrainingUrl = `${process.env.REACT_APP_SERVER_URL}/training_logs`;
export const postQuestionUrl = `${process.env.REACT_APP_SERVER_URL}/questions`;
export const showQuestionUrl = (questionId) =>
  `${process.env.REACT_APP_SERVER_URL}/questions/${questionId}`;
export const postAdviceUrl = `${process.env.REACT_APP_SERVER_URL}/advices`;
export const hundleBookmarkUrl = (adviceId) =>
  `${process.env.REACT_APP_SERVER_URL}/advices/${adviceId}/bookmarks`;
export const fetchAdvicesUrl = `${process.env.REACT_APP_SERVER_URL}/advices`;
export const signOutUrl = `${process.env.REACT_APP_SERVER_URL}/auth/sign_out`;
export const hundleFollowUrl = (userId) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${userId}/relationships`;
export const showFollowingsUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/follows`;
export const showFollowersUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/followers`;
export const getTrainingLogsUrl = `${process.env.REACT_APP_SERVER_URL}/training_logs`;
export const hundleTrainingLogsUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/training_logs/${id}`;
export const hundleQuestionsUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/questions/${id}`;
export const hundleAdivceUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/advices/${id}`;
export const showTrainingLogUrl = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/training_logs/${id}`;
export const hundleLikesUrl = `${process.env.REACT_APP_SERVER_URL}/likes`;
export const showCurrentUserUrl = `${process.env.REACT_APP_SERVER_URL}/current_user`;
export const guestLoginUrl = `${process.env.REACT_APP_SERVER_URL}/auth/guest_sign_in`;
export const postBodyCompositionPath = `${process.env.REACT_APP_SERVER_URL}/body_compositions`;
export const showUserBodyCompositionPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/body_compositions`;
export const showUserTrainingLogsPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/training_logs`;
export const showUserQuestionsPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/questions`;
export const showUserAdvicesPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/advices`;
export const showUserBookmarkAdvicesPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/bookmark_advices`;
export const showUserFollowingsPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/follows`;
export const showUserFollowersPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/followers`;
export const showCurrentUserFollowingsPath = `${process.env.REACT_APP_SERVER_URL}/current_user/followings`;
export const showCurrentUserBookmarksPath = `${process.env.REACT_APP_SERVER_URL}/current_user/bookmarks`;
export const showCurrentUserLikesPath = `${process.env.REACT_APP_SERVER_URL}/current_user/likes`;
export const showRecentTrainingLogsPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/users/${id}/recent_training_logs`;
export const showNumberOfLikesPath = (id) =>
  `${process.env.REACT_APP_SERVER_URL}/training_logs/${id}/number_of_likes`;
export const showRecentQuestionsPath = `${process.env.REACT_APP_SERVER_URL}/recent_questions`;
export const showOneKindQuestionPath = `${process.env.REACT_APP_SERVER_URL}/one_kind_questions`;
export const showeDesignatedUsersPath = `${process.env.REACT_APP_SERVER_URL}/fetch_designated_users`;
