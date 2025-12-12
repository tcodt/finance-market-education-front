import { useQuery } from "@tanstack/react-query";
import { getArticlesCourses } from "@/services/articlesCourses";

export const useGetArticlesCourses = () => {
  return useQuery({
    queryKey: ["articles-courses"],
    queryFn: getArticlesCourses,
  });
};
