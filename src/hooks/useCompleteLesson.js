import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lessonId }) =>
      api.post("/courses/lessons/complete/", {
        course: courseId,
        lesson: lessonId,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-progress", String(variables.courseId)],
      });
    },
  });
};
