import { createPageUrl } from "@/utils";
import Link from "next/link";

const coursesData = [
  {
    id: 1,
    title: "مبانی تحلیل تکنیکال",
    description: "آموزش کامل تحلیل تکنیکال از پایه تا پیشرفته",
    articlesCount: 12,
    totalTime: "۳ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1642790595397-7047dc98fa72?w=600&h=400&fit=crop",
    category: "تحلیل تکنیکال",
    instructor: {
      name: "استاد میلاد رضایی",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    progress: 75,
  },
  {
    id: 2,
    title: "روانشناسی معامله‌گری",
    description: "کنترل احساسات و تصمیم‌گیری در بازارهای مالی",
    articlesCount: 8,
    totalTime: "۲ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&h=400&fit=crop",
    category: "روانشناسی",
    instructor: {
      name: "دکتر رضا کریمی",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    },
    progress: 50,
  },
  {
    id: 3,
    title: "مدیریت سرمایه و ریسک",
    description: "استراتژی‌های حرفه‌ای مدیریت سرمایه",
    articlesCount: 10,
    totalTime: "۲.۵ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "مدیریت ریسک",
    instructor: {
      name: "استاد سارا احمدی",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    progress: 0,
  },
  {
    id: 4,
    title: "آشنایی با ارزهای دیجیتال",
    description: "دنیای کریپتو و بلاک‌چین از صفر",
    articlesCount: 15,
    totalTime: "۴ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    category: "کریپتو",
    instructor: {
      name: "مهندس فرهاد نوری",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    progress: 0,
  },
  {
    id: 5,
    title: "استراتژی‌های پرایس اکشن",
    description: "معامله بر اساس حرکت قیمت",
    articlesCount: 14,
    totalTime: "۳.۵ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    category: "استراتژی",
    instructor: {
      name: "استاد امیر حسینی",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    progress: 25,
  },
  {
    id: 6,
    title: "بازار فارکس برای مبتدیان",
    description: "آموزش کامل معاملات فارکس",
    articlesCount: 11,
    totalTime: "۳ ساعت مطالعه",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
    category: "فارکس",
    instructor: {
      name: "دکتر مریم صادقی",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    },
    progress: 0,
  },
];

export default function ArticleCourses() {
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
        {coursesData.map((course) => (
          <Link
            key={course.id}
            href={createPageUrl("article-course-detail") + `?id=${course.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D9D9D9] hover:shadow-xl hover:border-[#000000]/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[16/9] overflow-hidden relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <div
                    className="h-full bg-[#000000]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <span className="text-xs font-medium text-[#000000] mb-2 block">
                {course.category}
              </span>

              {/* Title */}
              <h3 className="font-bold text-lg text-[#000000] mb-2 group-hover:text-[#000000] transition-colors">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-[#6E6E6E] text-sm leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Instructor */}
              {course.instructor && (
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-[#6E6E6E]">
                    {course.instructor.name}
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
