import { courses } from "@/services/courses";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courses,
  });
};
