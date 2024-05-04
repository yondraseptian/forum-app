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

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name: name,
      email: email,
      password: password
    });
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to register user');
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data.data.user;
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
};

export const createThread = async (threadData) => {
  try {
    const response = await axios.post(`${BASE_URL}/threads`, threadData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createComment = async (threadId, commentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/comments`,
      commentData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const upVoteThread = async (threadId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const downVoteThread = async (threadId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const neutralizeThreadVote = async (threadId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const upVoteComment = async (threadId,commentId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const downVoteComment = async (threadId, commentId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const neutralizeCommentVote = async (threadId,commentId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getLeaderBoard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/leaderboards`);
    return response.data.data.leaderboards;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
