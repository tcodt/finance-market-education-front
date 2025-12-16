import { getCourseById } from "@/services/courses";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
};
