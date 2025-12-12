"use client";

import Link from "next/link";
import { createPageUrl } from "@/utils";
import { useGetArticlesCourses } from "@/hooks/useGetArticlesCourses";

export default function ArticlesCourses() {
  const { data: courses, isLoading } = useGetArticlesCourses();

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">
        در حال بارگذاری...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-2">
          آموزش‌های مقاله‌ای
        </h1>
        <p className="text-[#6E6E6E]">دوره‌های آموزشی جامع به صورت مقاله</p>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Link
            key={course.id}
            href={`/articles/courses/${course.slug}/`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D9D9D9] hover:shadow-xl hover:border-[#000000]/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[16/9] overflow-hidden relative">
              <img
                src={course.images?.[0]?.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* اگر طول دوره داشت */}
              {course.sections?.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <div className="h-full bg-[#000000] w-full"></div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category */}
              {course.category?.title && (
                <span className="text-xs font-medium text-[#000000] mb-2 block">
                  {course.category.title}
                </span>
              )}

              {/* Title */}
              <h3 className="font-bold text-lg text-[#000000] mb-2 group-hover:text-[#000000] transition-colors">
                {course.title}
              </h3>

              {/* Summary */}
              <p className="text-[#6E6E6E] text-sm leading-relaxed mb-4">
                {course.summary}
              </p>

              {/* Instructor */}
              {course.author_name && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs">
                    {course.author_name.substring(0, 1)}
                  </div>
                  <span className="text-sm text-[#6E6E6E]">
                    {course.author_name}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
