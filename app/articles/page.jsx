"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetArticlesCourses } from "@/hooks/useGetArticlesCourses";
import { useGetArticlesCoursesCategories } from "@/hooks/useGetArticlesCoursesCategories";

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: categories } = useGetArticlesCoursesCategories();
  const { data: courses, isLoading } = useGetArticlesCourses(activeCategory);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          آموزش‌های مقاله‌ای
        </h1>
        <p className="text-[#6E6E6E]">دوره‌های آموزشی جامع به صورت مقاله</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-xl text-sm border ${
            !activeCategory ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          همه
        </button>

        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-sm border transition ${
              activeCategory === cat.slug
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black/5"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Link
            key={course.id}
            href={`/articles/courses/${course.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={course.images?.[0]?.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <span className="text-xs font-medium mb-2 block">
                {course.category?.title}
              </span>

              <h3 className="font-bold text-lg mb-2">{course.title}</h3>

              <p className="text-sm text-[#6E6E6E]">{course.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
