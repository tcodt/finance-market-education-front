import api from "@/lib/axios";

export const getArticlesCoursesCategories = async () => {
  try {
    const response = await api.get("/articles/courses/categories/");
    return response.data;
  } catch (error) {
    console.log("GET ARTICLES COURSES CATEGORY: ", error);
  }
};
