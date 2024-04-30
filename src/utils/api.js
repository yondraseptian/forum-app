import axios from "axios";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

export const getThreads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/threads`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data.data.token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getDetailThreadById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/threads/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
