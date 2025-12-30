import api from "@/lib/axios";

export const userProfile = async () => {
  try {
    const response = await api.get("/users/profile/");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
