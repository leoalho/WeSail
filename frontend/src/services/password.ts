import axios from "axios";
const baseUrl = "/api/password";

interface UserInfo {
  username: string;
}

interface Password {
  password: string;
}

export const sendResetEmail = async (credentials: UserInfo) => {
  await axios.post(baseUrl, credentials);
};

export const resetPassword = async (url: string, credentials: Password) => {
  await axios.post(`${baseUrl}/${url}`, credentials);
};
