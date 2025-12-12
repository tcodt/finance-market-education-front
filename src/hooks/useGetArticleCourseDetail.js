import { useQuery } from "@tanstack/react-query";
import { getArticleCourseDetail } from "@/services/getArticleCourseDetail";

export const useArticleCourseDetail = (slug) => {
  return useQuery({
    queryKey: ["article-course-detail", slug],
    queryFn: () => getArticleCourseDetail(slug),
    enabled: !!slug,
  });
};
