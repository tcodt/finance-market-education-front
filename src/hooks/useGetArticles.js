import { getArticles } from "@/services/articles";
import { useQuery } from "@tanstack/react-query";

export const useGetArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
};
