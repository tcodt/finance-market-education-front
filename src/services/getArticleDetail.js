import api from "@/lib/axios";

export const getArticleDetail = async (slug) => {
  try {
    const response = await api.get(`/blogs/${slug}/`);
    return response.data;
  } catch (error) {
    console.log("GET ARTICLE DETAIL ERROR: ", error);
  }
};
