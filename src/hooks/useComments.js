import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, postComment } from "@/services/comments";

export const useComments = (blogId, slug) => {
  return useQuery({
    queryKey: ["comments", blogId, slug],
    queryFn: () => getComments(blogId, slug),
  });
};

export const usePostComment = (blogId, slug) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postComment(blogId, slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", blogId, slug]);
    },
  });
};
