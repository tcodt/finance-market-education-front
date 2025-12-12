import api from "@/lib/axios";

export const getComments = async (blogId, slug) => {
  try {
    const response = await api.get(`/blogs/${blogId}/${slug}/comments/`);
    return response.data;
  } catch (error) {
    console.log("GET COMMENTS ERROR: ", error);
  }
};

export const postComment = async (blogId, slug, data) => {
  try {
    const response = await api.post(`/blogs/${blogId}/${slug}/comments/`, data);
    return response.data;
  } catch (error) {
    console.log("POST COMMENT ERROR: ", error);
  }
};
