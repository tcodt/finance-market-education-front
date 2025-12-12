import { getArticleDetail } from "@/services/getArticleDetail";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleDetail = (slug) => {
  return useQuery({
    queryKey: ["article-detail", slug],
    queryFn: () => getArticleDetail(slug),
  });
};
