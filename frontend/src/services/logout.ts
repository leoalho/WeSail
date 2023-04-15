import axios from "axios";
const baseUrl = "/api/logout";

const logout = async () => {
  await axios.get(baseUrl);
};

export default logout;
