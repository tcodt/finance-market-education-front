import api from "@/lib/axios";

export const getCourseProgress = async (courseId) => {
  try {
    const response = await api(`/courses/${courseId}/progress/`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
