"use client";

import { useState } from "react";
import VideoCourseCard from "@/components/video/VideoCourseCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const coursesData = [
  {
    id: 1,
    title: "آموزش مقدماتی بازار مالی",
    description:
      "در این دوره، شما با مفاهیم پایه‌ای بازارهای مالی، از جمله فارکس، ارزهای دیجیتال، و بورس آشنا خواهید شد.",
    image:
      "https://images.unsplash.com/photo-1642790595397-7047dc98fa72?w=800&h=600&fit=crop",
    category: "مقدماتی",
    instructor: {
      name: "استاد میلاد رضایی",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    lessons: 14,
    duration: "۶ هفته",
    level: "مبتدی",
    progress: 30,
  },
  {
    id: 2,
    title: "تحلیل تکنیکال پیشرفته",
    description:
      "آموزش جامع تحلیل تکنیکال از مبانی تا پیشرفته، شامل الگوها، اندیکاتورها و استراتژی‌های معاملاتی.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "پیشرفته",
    instructor: {
      name: "استاد سارا احمدی",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    lessons: 22,
    duration: "۸ هفته",
    level: "پیشرفته",
    progress: 0,
  },
  {
    id: 3,
    title: "روانشناسی معاملات و مدیریت سرمایه",
    description:
      "یادگیری اصول روانشناسی در معاملات، کنترل احساسات و مدیریت ریسک برای موفقیت در بازارهای مالی.",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&h=600&fit=crop",
    category: "متوسط",
    instructor: {
      name: "دکتر رضا کریمی",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    },
    lessons: 18,
    duration: "۵ هفته",
    level: "متوسط",
    progress: 75,
  },
  {
    id: 4,
    title: "استراتژی‌های پرایس اکشن",
    description:
      "آموزش کامل استراتژی‌های پرایس اکشن و نحوه تشخیص الگوهای قیمتی در بازارهای مالی.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    category: "متوسط",
    instructor: {
      name: "استاد امیر حسینی",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    lessons: 16,
    duration: "۷ هفته",
    level: "متوسط",
    progress: 0,
  },
  {
    id: 5,
    title: "معاملات الگوریتمی و ربات‌های معاملاتی",
    description:
      "یادگیری برنامه‌نویسی ربات‌های معاملاتی و استراتژی‌های اتوماتیک برای بازارهای مالی.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    category: "پیشرفته",
    instructor: {
      name: "مهندس فرهاد نوری",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    lessons: 20,
    duration: "۱۰ هفته",
    level: "پیشرفته",
    progress: 0,
  },
  {
    id: 6,
    title: "تحلیل فاندامنتال و اخبار اقتصادی",
    description:
      "آشنایی با تحلیل بنیادی، بررسی اخبار اقتصادی و تاثیر آن‌ها بر بازارهای مالی.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop",
    category: "متوسط",
    instructor: {
      name: "دکتر مریم صادقی",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    },
    lessons: 12,
    duration: "۴ هفته",
    level: "متوسط",
    progress: 15,
  },
];

const categories = ["همه", "مقدماتی", "متوسط", "پیشرفته"];

export default function VideoCourses() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter((course) => {
    const matchesCategory =
      activeCategory === "همه" || course.category === activeCategory;
    const matchesSearch =
      course.title.includes(searchQuery) ||
      course.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

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
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-[#000000] text-white shadow-lg shadow-[#000000]/25"
                  : "bg-white text-[#6E6E6E] border border-[#D9D9D9] hover:border-[#000000] hover:text-[#000000]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E6E]" />
          <Input
            type="text"
            placeholder="جستجوی دوره..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 border-[#D9D9D9] focus:border-[#000000] rounded-xl"
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
        <div className="text-center py-12">
          <p className="text-[#6E6E6E]">دوره‌ای یافت نشد</p>
        </div>
      )}
    </div>
  );
}
