import axios from "axios";

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/users/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to create account.");
  }
  const data = await res.data;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/users/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/users/logout");
  if (res.status !== 200) {
    throw new Error("Error logging out user");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/users/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate.");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat.");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chats.");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats.");
  }
  const data = await res.data;
  return data;
};
