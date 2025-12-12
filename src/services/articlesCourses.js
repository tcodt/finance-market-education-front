import api from "@/lib/axios";

export const getArticlesCourses = async () => {
  try {
    const response = await api.get("/articles/courses/");
    return response.data;
  } catch (error) {
    console.log("GET ARTICLES COURSES ERROR: ", error);
  }
};
