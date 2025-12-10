import { createPageUrl } from "@/utils";
import {
  PlayCircle,
  FileText,
  Award,
  TrendingUp,
  ArrowLeft,
  Clock,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const stats = [
  {
    icon: PlayCircle,
    label: "دوره‌های در حال مشاهده",
    value: "۳",
    color: "bg-[#E45858]",
  },
  {
    icon: FileText,
    label: "مقالات خوانده شده",
    value: "۱۲",
    color: "bg-blue-500",
  },
  { icon: Award, label: "گواهینامه‌ها", value: "۲", color: "bg-green-500" },
  {
    icon: TrendingUp,
    label: "ساعت آموزش",
    value: "۴۵",
    color: "bg-purple-500",
  },
];

const recentCourses = [
  {
    id: 1,
    title: "آموزش مقدماتی بازار مالی",
    progress: 60,
    lessons: 14,
    completed: 8,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "تحلیل تکنیکال پیشرفته",
    progress: 30,
    lessons: 20,
    completed: 6,
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "روانشناسی معاملات",
    progress: 85,
    lessons: 10,
    completed: 8,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
  },
];

const recentArticles = [
  {
    id: 1,
    title: "چگونه از ضرر در بازار کریپتو جلوگیری کنیم؟",
    category: "کریپتو",
    readTime: "۷ دقیقه",
  },
  {
    id: 2,
    title: "۵ اشتباه رایج معامله‌گران تازه‌کار",
    category: "آموزش",
    readTime: "۵ دقیقه",
  },
  {
    id: 3,
    title: "تحلیل هفتگی بازار فارکس",
    category: "فارکس",
    readTime: "۱۰ دقیقه",
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          سلام، خوش آمدید! 👋
        </h1>
        <p className="text-[#6E6E6E]">
          به پنل آموزش بازار مالی خوش آمدید. امروز چه چیزی می‌خواهید یاد بگیرید؟
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-5 bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-[#6E6E6E]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1A1A1A]">ادامه یادگیری</h2>
            <Link
              href={createPageUrl("video-education")}
              className="text-[#E45858] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course) => (
              <Link
                key={course.id}
                href={createPageUrl("video-education")}
                className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-20 md:w-32 md:h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#E45858] transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#6E6E6E] mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.completed}/{course.lessons} جلسه
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={course.progress}
                        className="flex-1 h-2"
                      />
                      <span className="text-sm font-medium text-[#E45858]">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1A1A1A]">آخرین مقالات</h2>
            <Link
              href={createPageUrl("articles")}
              className="text-[#E45858] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              بیشتر
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            {recentArticles.map((article, index) => (
              <Link
                key={article.id}
                href={createPageUrl("articles")}
                className="block group"
              >
                <div
                  className={`pb-4 ${
                    index !== recentArticles.length - 1
                      ? "border-b border-[#E5E1DC]"
                      : ""
                  }`}
                >
                  <span className="text-xs font-medium text-[#E45858] mb-1 block">
                    {article.category}
                  </span>
                  <h4 className="font-medium text-[#1A1A1A] mb-2 group-hover:text-[#E45858] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#6E6E6E]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} مطالعه</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
