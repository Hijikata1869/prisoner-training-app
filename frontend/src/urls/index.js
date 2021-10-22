export const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const indexPage = `${DEFAULT_API_LOCALHOST}/index`;
export const usersIndexPage = `${DEFAULT_API_LOCALHOST}/users`;
export const trainingLogIndexPage = `${DEFAULT_API_LOCALHOST}/training_log`;
export const signUpPage = `${DEFAULT_API_LOCALHOST}/auth/sign_up`;
export const postUserPage = `${DEFAULT_API_LOCALHOST}/auth`;
export const signInPost = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;
export const userEditPage = `${DEFAULT_API_LOCALHOST}/auth/edit`;
export const showUserPage = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const userUpdate =  (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const passwordUpdatePage = `${DEFAULT_API_LOCALHOST}/auth/password`;
export const postTrainingUrl = `${DEFAULT_API_LOCALHOST}/training_logs`;
export const postQuestionUrl = `${DEFAULT_API_LOCALHOST}/questions`;
export const showQuestionUrl = (questionId) => `${DEFAULT_API_LOCALHOST}/questions/${questionId}`;
export const postAdviceUrl = `${DEFAULT_API_LOCALHOST}/advices`;
export const bookmarkCreateUrl = (adviceId) => `${DEFAULT_API_LOCALHOST}/advices/${adviceId}/bookmarks`;