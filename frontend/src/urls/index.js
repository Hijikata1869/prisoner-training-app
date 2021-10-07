export const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const indexPage = `${DEFAULT_API_LOCALHOST}/index`;
export const usersIndexPage = `${DEFAULT_API_LOCALHOST}/users`;
export const trainingLogIndexPage = `${DEFAULT_API_LOCALHOST}/training_log`;
export const signUpPage = `${DEFAULT_API_LOCALHOST}/auth/sign_up`;
export const postUserPage = `${DEFAULT_API_LOCALHOST}/auth`;
export const signInPost = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;
export const showUserPage = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const userEditPage = `${DEFAULT_API_LOCALHOST}/auth/edit`;
export const userUpdate =  (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const passwordUpdatePage = `${DEFAULT_API_LOCALHOST}/auth/password`;
export const postTrainingUrl = `${DEFAULT_API_LOCALHOST}/training_logs`;