import api from "@/lib/axios";

export const getArticleCourseDetail = async (slug) => {
  try {
    const res = await api.get(`/articles/courses/${slug}/`);
    return res.data;
  } catch (error) {
    console.log("GET ARTICLE COURSE DETAILS ERROR: ", error);
  }
};
