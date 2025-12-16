import api from "@/lib/axios";

export const courses = async () => {
  try {
    const response = await api("/courses/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api(`/courses/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
