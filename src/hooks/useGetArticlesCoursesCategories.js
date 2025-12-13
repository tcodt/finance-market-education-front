import { useQuery } from "@tanstack/react-query";
import { getArticlesCoursesCategories } from "@/services/getArticlesCoursesCategories";

export const useGetArticlesCoursesCategories = () => {
  return useQuery({
    queryKey: ["articles-courses-categories"],
    queryFn: getArticlesCoursesCategories,
  });
};
