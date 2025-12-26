"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

import VideoPlayer from "@/components/video/VideoPlayer";
import InstructorInfo from "@/components/video/InstructorInfo";
import ProgressPanel from "@/components/video/ProgressPanel";
import Comments from "@/components/shared/Comments";

import { useGetCourseById } from "@/hooks/useGetCourseById";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function CourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: course,
    isLoading,
    refetch: refetchCourse,
  } = useGetCourseById(id);
  const { data: progress, refetch: refetchProgress } = useCourseProgress(id);

  // state برای نگهداری index درس فعلی
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // وقتی progress تغییر کرد، درس فعلی رو به‌روز کن
  useEffect(() => {
    if (progress && course?.lessons) {
      const completed = progress.completed_lessons || 0;
      const maxIndex = course.lessons.length - 1;
      setCurrentLessonIndex(Math.min(completed, maxIndex));
    }
  }, [progress, course]);

  if (isLoading) {
    return (
      <div className="w-full px-[3%] py-10 text-center">
        در حال بارگذاری دوره...
      </div>
    );
  }

  if (!course) return null;

  // درس فعلی
  const currentLesson = course.lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === course.lessons.length - 1;

  // تابع برای رفتن به درس بعدی
  const goToNextLesson = async () => {
    if (isLastLesson) return;

    setCurrentLessonIndex((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // بعد از تغییر درس، progress رو دوباره بگیر تا تیک درست بخوره
    await refetchProgress();
  };

  return (
    <div className="w-full px-[3%]">
      {/* مسیر ناوبری */}
      <nav className="flex items-center gap-2 text-sm mb-3 flex-wrap">
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          همه دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">
          {course.title} - درس {currentLessonIndex + 1} از{" "}
          {course.lessons.length}
        </span>
      </nav>

      <div className="flex gap-4">
        {/* پنل پیشرفت */}
        <div className="w-[260px] flex-shrink-0 hidden lg:block mr-6">
          <ProgressPanel
            courseId={course.id}
            lessons={course.lessons}
            currentLessonIndex={currentLessonIndex}
            onLessonSelect={(index) => {
              setCurrentLessonIndex(index);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 space-y-4">
          {/* پخش کننده ویدیو */}
          {currentLesson ? (
            <>
              <VideoPlayer
                key={currentLesson.id}
                title={currentLesson.title}
                thumbnail={currentLesson.thumbnail}
                videoUrl={currentLesson.video_url}
                courseId={course.id}
                lessonId={currentLesson.id}
                isLastLesson={isLastLesson}
                onVideoEnd={goToNextLesson}
              />

              {/* دکمه‌های ناوبری دستی */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    if (currentLessonIndex > 0) {
                      setCurrentLessonIndex((prev) => prev - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  disabled={currentLessonIndex === 0}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentLessonIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#E45858] hover:bg-[#d14545] text-white"
                  }`}
                >
                  ← درس قبلی
                </button>

                <div className="text-sm text-[#6E6E6E]">
                  درس {currentLessonIndex + 1} از {course.lessons.length}
                </div>

                <button
                  onClick={goToNextLesson}
                  disabled={isLastLesson}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isLastLesson
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#10B981] hover:bg-[#0DA271] text-white"
                  }`}
                >
                  درس بعدی →
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC] text-center">
              <p className="text-lg font-bold text-[#1A1A1A]">
                🎉 تبریک! شما تمام درس‌های این دوره را به پایان رساندید.
              </p>
              <button
                onClick={() => setCurrentLessonIndex(0)}
                className="mt-4 bg-[#E45858] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d14545] transition-colors"
              >
                بازگشت به اولین درس
              </button>
            </div>
          )}

          {/* اطلاعات درس فعلی */}
          {currentLesson && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
                {currentLesson.title}
              </h2>
              <p className="text-[#6E6E6E] text-sm mb-4">
                مدت زمان: {currentLesson.duration_minutes || 0} دقیقه
              </p>
              <p className="text-[#1A1A1A] leading-relaxed">
                {currentLesson.description ||
                  "توضیحاتی برای این درس وجود ندارد."}
              </p>
            </div>
          )}

          {/* اطلاعات مدرس */}
          <InstructorInfo
            name={course.instructor?.full_name}
            email={course.instructor?.email}
            rating={course.rating}
            duration={`${course.duration_weeks} هفته`}
            lessons={course.total_sessions}
          />

          {/* توضیحات دوره */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
              درباره دوره
            </h3>
            <div className="prose prose-sm max-w-none text-[#1A1A1A] leading-relaxed space-y-4">
              <p>{course.description}</p>
            </div>
          </div>

          {/* نظرات */}
          <Comments type="course" id={course.id} />
        </div>
      </div>
    </div>
  );
}
