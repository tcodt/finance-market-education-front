import { getCourseProgress } from "@/services/getCourseProgress";
import { useQuery } from "@tanstack/react-query";

export const useCourseProgress = (courseId) => {
  return useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
  });
};
