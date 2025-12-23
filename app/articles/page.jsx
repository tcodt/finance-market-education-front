"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetArticlesCoursesCategories } from "@/hooks/useGetArticlesCoursesCategories";
import { useGetArticlesCourses } from "@/hooks/useGetArticlesCourses"; // این هوک فقط همه مقاله‌ها رو می‌گیره

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState();

  // گرفتن همه دسته‌بندی‌ها
  const { data: categories, isLoading: loadingCategories } =
    useGetArticlesCoursesCategories();

  // گرفتن همه مقاله‌ها (فقط یک بار)
  const { data: allCourses, isLoading: loadingCourses } =
    useGetArticlesCourses();

  // فیلتر کردن مقاله‌ها بر اساس دسته‌بندی انتخاب‌شده
  const courses = activeCategory
    ? allCourses?.filter((course) => course.category?.slug === activeCategory)
    : allCourses;

  // لودینگ کلی (تا وقتی هر دو داده آماده بشن)
  if (loadingCategories || loadingCourses) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-lg">در حال بارگذاری آموزش‌ها...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          آموزش‌های مقاله‌ای
        </h1>
        <p className="text-[#6E6E6E] text-lg">
          دوره‌های آموزشی جامع به صورت مقاله
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-3 mb-12 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-6 py-3 rounded-xl font-medium border transition-all ${
            activeCategory === null
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300 hover:bg-gray-50"
          }`}
        >
          همه
        </button>

        {categories?.map((cat) => {
          // تعداد مقاله‌های این دسته (اختیاری — برای نمایش مثل "فارکس (۵)")
          const count = allCourses?.filter(
            (course) => course.category?.slug === cat.slug
          ).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                activeCategory === cat.slug
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.title}
              {count > 0 && (
                <span className="ml-2 text-sm opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {courses?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            هنوز مقاله‌ای در این دسته‌بندی منتشر نشده.
          </p>
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/articles/courses/${course.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={course.images?.[0]?.image || "/placeholder-course.jpg"}
                  alt={course.images?.[0]?.alt || course.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
                  {course.category?.title || "بدون دسته"}
                </span>

                <h3 className="font-bold text-xl mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-[#6E6E6E] line-clamp-3">
                  {course.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
