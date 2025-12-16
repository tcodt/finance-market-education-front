"use client";

import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import VideoPlayer from "@/components/video/VideoPlayer";
import InstructorInfo from "@/components/video/InstructorInfo";
import ProgressPanel from "@/components/video/ProgressPanel";
import Comments from "@/components/shared/Comments";

import { useGetCourseById } from "@/hooks/useGetCourseById";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseById(id);

  if (isLoading) {
    return (
      <div className="w-full px-[3%] py-10 text-center">
        در حال بارگذاری دوره...
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="w-full px-[3%]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-3 flex-wrap">
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          همه دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">{course.title}</span>
      </nav>

      <div className="flex gap-4">
        {/* Progress Panel */}
        <div className="w-[260px] flex-shrink-0 hidden lg:block mr-6">
          <ProgressPanel courseId={course.id} lessons={course.lessons} />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Video Player */}
          <VideoPlayer
            title={course.title}
            thumbnail="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop" // firstLesson?.video_url
            videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
          />

          {/* Instructor Info */}
          <InstructorInfo
            name={course.instructor?.full_name}
            email={course.instructor?.email}
            rating={course.rating}
            duration={`${course.duration_weeks} هفته`}
            lessons={course.total_sessions}
          />

          {/* Course Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
              درباره دوره
            </h3>
            <div className="prose prose-sm max-w-none text-[#1A1A1A] leading-relaxed space-y-4">
              <p>{course.description}</p>
            </div>
          </div>

          {/* Comments */}
          <Comments type="course" id={course.id} />
        </div>
      </div>
    </div>
  );
}
