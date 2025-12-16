"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function ProgressPanel({ courseId, lessons = [] }) {
  const { data, isLoading } = useCourseProgress(courseId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] p-4 shadow-sm">
        در حال بارگذاری...
      </div>
    );
  }

  const completedCount = data?.completed_lessons || 0;
  const total = lessons.length;

  const mappedLessons = lessons.map((lesson, index) => {
    let status = "locked";

    if (index < completedCount) status = "completed";
    else if (index === completedCount) status = "current";

    return {
      id: lesson.id,
      title: lesson.title,
      duration: `${lesson.duration_minutes} دقیقه`,
      status,
    };
  });

  return (
    <div className="bg-white rounded-[20px] p-4 pt-2 shadow-[0_2px_20px_rgba(0,0,0,0.03)] sticky top-3 h-[calc(100vh-1.5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-[#1A1A1A]">پیشرفت شما</h3>
        <span className="text-xs text-[#999]">
          {completedCount}/{total}
        </span>
      </div>

      {/* Lessons List */}
      <div
        className="relative overflow-y-auto flex-1"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        {/* Vertical line */}
        <div
          className="absolute right-[11px] top-1 bottom-1 w-[2px]"
          style={{
            height: `${(mappedLessons.length - 1) * 42}px`,
            background: `linear-gradient(
              to bottom,
              #E45858 0%,
              #E45858 ${(completedCount / total) * 100}%,
              #E5E1DC ${(completedCount / total) * 100}%,
              #E5E1DC 100%
            )`,
          }}
        />

        <div className="space-y-0">
          {mappedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center gap-3 py-1.5 cursor-pointer group relative"
            >
              {/* Status Circle */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
                    lesson.status === "completed" && "bg-[#E45858]",
                    lesson.status === "current" &&
                      "bg-white border-[2.5px] border-[#E45858]",
                    lesson.status === "locked" &&
                      "bg-white border-[1.5px] border-[#E5E1DC]"
                  )}
                >
                  {lesson.status === "completed" && (
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-[13px] leading-snug transition-colors",
                    lesson.status === "completed" &&
                      "text-[#1A1A1A] font-medium",
                    lesson.status === "current" &&
                      "text-[#1A1A1A] font-semibold",
                    lesson.status === "locked" && "text-[#6E6E6E]"
                  )}
                >
                  {lesson.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
