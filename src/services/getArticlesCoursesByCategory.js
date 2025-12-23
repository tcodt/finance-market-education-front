import api from "@/lib/axios";

export const getArticlesCoursesByCategory = async (slug) => {
  try {
    if (!slug) {
      const response = await api.get("/articles/courses/");
      return response.data;
    }

    const response = await api.get(`/articles/courses/categories/${slug}/`);
    return response.data;
  } catch (error) {
    console.log("GET ARTICLES COURSES BY CATEGORY ERROR: ", error);
    throw error;
  }
};
