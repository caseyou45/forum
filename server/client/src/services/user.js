import axios from "axios";
const baseUrl = "/api/users";

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getUserWithNotes = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};
export default { signup, getUserWithNotes };
