import api from "@/lib/axios";

// Login with email / phone
export const loginWithEmail = async (data) => {
  const res = await api.post("/accounts/login/email/", data);
  return res.data;
};

export const loginWithPhone = async (data) => {
  const res = await api.post("/accounts/login/phone/", data);
  return res.data;
};

// Register with email / phone
export const signupWithEmail = async (data) => {
  const res = await api.post("/accounts/register/email/", data);
  return res.data;
};

export const signupWithPhone = async (data) => {
  const res = await api.post("/accounts/register/phone/", data);
  return res.data;
};

// Logout
export const logout = async (token) => {
  const res = await api.post("/accounts/logout/", { refresh: token });
  return res.data;
};
