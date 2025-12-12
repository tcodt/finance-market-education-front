import api from "@/lib/axios";

export const getArticles = async () => {
  try {
    const response = await api.get("/blogs/");
    return response.data;
  } catch (error) {
    console.log("ARTICLE ERROR:", error);
    return [];
  }
};
