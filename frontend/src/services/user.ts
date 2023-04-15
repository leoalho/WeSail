import axios from "axios";
import { User } from "../types";
const baseUrl = "/api/login";

const getLoggedInUser = async (): Promise<User> => {
  const response = await axios.get(baseUrl);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

export default getLoggedInUser;
