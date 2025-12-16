"use client";

import { useState, useMemo } from "react";
import VideoCourseCard from "@/components/video/VideoCourseCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGetCourses } from "@/hooks/useGetCourses";

const categories = ["همه", "مقدماتی", "متوسط", "پیشرفته"];

export default function Courses() {
  const { data: courses, isLoading } = useGetCourses();

  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const mappedCourses = useMemo(() => {
    if (!courses) return [];

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image:
        "https://images.unsplash.com/photo-1642790595397-7047dc98fa72?w=800&h=600&fit=crop", // فعلاً placeholder
      category: "متوسط", // تا وقتی بک‌اند بفرسته
      instructor: {
        name: course.instructor?.full_name,
      },
      lessons: course.lessons?.length || 0,
      duration: `${course.duration_weeks} هفته`,
      level: "—",
      progress: 0,
    }));
  }, [courses]);

  const filteredCourses = mappedCourses.filter((course) => {
    const matchesCategory =
      activeCategory === "همه" || course.category === activeCategory;

    const matchesSearch =
      course.title.includes(searchQuery) ||
      course.description.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000000] mb-2">
          آموزش‌های ویدیویی
        </h1>
        <p className="text-[#6E6E6E]">دوره‌های آموزشی جامع بازارهای مالی</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-[#000000] text-white"
                  : "bg-white border border-[#D9D9D9]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E6E]" />
          <Input
            placeholder="جستجوی دوره..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 rounded-xl bg-white"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <VideoCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#6E6E6E]">دوره‌ای یافت نشد</div>
      )}
    </div>
  );
}
