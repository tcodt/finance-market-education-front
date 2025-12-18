"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function ProgressPanel({
  courseId,
  lessons = [],
  currentLessonIndex = 0, // ← prop جدید
}) {
  const { data, isLoading } = useCourseProgress(courseId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-sm text-center text-sm">
        در حال بارگذاری پیشرفت...
      </div>
    );
  }

  const completedCount = data?.completed_lessons ?? 0;
  const total = lessons.length;

  const mappedLessons = lessons.map((lesson, index) => {
    let status = "locked";

    if (index < completedCount) {
      status = "completed";
    } else if (index === currentLessonIndex) {
      status = "current"; // ← حالا درست نشون می‌ده حتی اگر هنوز کامل نشده باشه
    }

    return {
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration_minutes
        ? `${lesson.duration_minutes} دقیقه`
        : "",
      status,
    };
  });

  return (
    <div className="bg-white rounded-[20px] p-4 pt-2 shadow-[0_2px_20px_rgba(0,0,0,0.03)] sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[15px] font-bold text-[#1A1A1A]">پیشرفت شما</h3>
        <span className="text-xs font-medium text-[#666]">
          {completedCount} از {total}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="relative">
          {/* خط پیشرفت */}
          <div
            className="absolute right-[11px] top-3 bottom-3 w-[2px] bg-[#E5E1DC] rounded-full"
            style={{
              background: `linear-gradient(to bottom, 
                #E45858 0%, 
                #E45858 ${(completedCount / total) * 100}%, 
                #E5E1DC ${(completedCount / total) * 100}%, 
                #E5E1DC 100%)`,
            }}
          />

          <div className="space-y-3">
            {mappedLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 py-1 pr-1"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm",
                      lesson.status === "completed" && "bg-[#E45858]",
                      lesson.status === "current" &&
                        "bg-white border-4 border-[#E45858] shadow-md",
                      lesson.status === "locked" &&
                        "bg-white border-2 border-[#E5E1DC]"
                    )}
                  >
                    {lesson.status === "completed" && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-[13px] leading-tight truncate",
                      lesson.status === "completed" &&
                        "text-[#1A1A1A] font-medium",
                      lesson.status === "current" && "text-[#E45858] font-bold",
                      lesson.status === "locked" && "text-[#888]"
                    )}
                  >
                    {index + 1}. {lesson.title}
                  </p>
                  {lesson.duration && (
                    <p className="text-xs text-[#999] mt-0.5">
                      {lesson.duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
