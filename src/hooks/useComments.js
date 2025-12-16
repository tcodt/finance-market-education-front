import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

/* =======================
   GET COMMENTS
======================= */
export const useComments = ({ type, id, slug }) => {
  return useQuery({
    queryKey: ["comments", type, id, slug],
    queryFn: async () => {
      let url = "";

      if (type === "blog") {
        if (!id || !slug) return [];
        url = `/blogs/${id}/${slug}/comments/`;
      }

      if (type === "course") {
        if (!id) return [];
        url = `/courses/${id}/comments/`;
      }

      const res = await axios.get(url);
      return res.data;
    },
    enabled:
      (type === "blog" && Boolean(id && slug)) ||
      (type === "course" && Boolean(id)),
  });
};

/* =======================
   POST COMMENT
======================= */
export const usePostComment = ({ type, id, slug }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      let url = "";

      if (type === "blog") {
        url = `/blogs/${id}/${slug}/comments/`;
        return axios.post(url, {
          blog: id,
          ...data,
        });
      }

      if (type === "course") {
        url = `/courses/${id}/comments/`;
        return axios.post(url, {
          course: id,
          ...data,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", type, id, slug],
      });
    },
  });
};
