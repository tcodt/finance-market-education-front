import { useQuery } from "@tanstack/react-query";
import { getArticlesCoursesByCategory } from "@/services/getArticlesCoursesByCategory";

export const useGetArticlesCoursesByCategory = (slug) => {
  return useQuery({
    queryKey: ["articles-courses", slug],
    queryFn: () => getArticlesCoursesByCategory(slug),
    keepPreviousData: true,
  });
};
