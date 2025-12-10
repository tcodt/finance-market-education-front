"use client";

import { useState } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import CategoryFilter from "@/components/articles/CategoryFilter";

const articlesData = [
  {
    id: 1,
    title: "چگونه از ضرر در بازار کریپتو جلوگیری کنیم؟",
    summary:
      "در این مقاله با استراتژی‌های مدیریت ریسک و نکات کلیدی برای جلوگیری از ضررهای سنگین در بازار ارزهای دیجیتال آشنا می‌شوید.",
    category: "کریپتو",
    author: "علی محمدی",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    date: "۱۵ دی ۱۴۰۳",
    readTime: "۷ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "۵ اشتباه رایج معامله‌گران تازه‌کار در فارکس",
    summary:
      "بسیاری از معامله‌گران تازه‌کار اشتباهاتی را مرتکب می‌شوند که می‌توان با آگاهی از آن‌ها، از ضررهای غیرضروری جلوگیری کرد.",
    category: "فارکس",
    author: "سارا احمدی",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
    date: "۱۲ دی ۱۴۰۳",
    readTime: "۵ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "تحلیل هفتگی بازار بورس ایران",
    summary:
      "بررسی روند بازار سهام ایران در هفته گذشته و پیش‌بینی روندهای آتی با تحلیل شاخص‌های کلیدی.",
    category: "بورس ایران",
    author: "محمد حسینی",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    date: "۱۰ دی ۱۴۰۳",
    readTime: "۱۰ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "روانشناسی معامله‌گری: چگونه احساسات خود را کنترل کنیم؟",
    summary:
      "کنترل احساسات یکی از مهم‌ترین مهارت‌های یک معامله‌گر موفق است. در این مقاله با تکنیک‌های کاربردی آشنا شوید.",
    category: "روانشناسی معامله‌گری",
    author: "دکتر رضا کریمی",
    authorAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop",
    date: "۸ دی ۱۴۰۳",
    readTime: "۸ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "آموزش کامل الگوهای کندل استیک",
    summary:
      "الگوهای کندل استیک ابزار قدرتمندی برای تحلیل تکنیکال هستند. در این مقاله با مهم‌ترین الگوها آشنا شوید.",
    category: "فارکس",
    author: "مریم نوری",
    authorAvatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=50&h=50&fit=crop",
    date: "۵ دی ۱۴۰۳",
    readTime: "۱۲ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "مقایسه بیت‌کوین و اتریوم: کدام را بخریم؟",
    summary:
      "بررسی تفاوت‌های اساسی بین دو ارز دیجیتال محبوب و راهنمای انتخاب برای سرمایه‌گذاران.",
    category: "کریپتو",
    author: "امیر صادقی",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
    date: "۳ دی ۱۴۰۳",
    readTime: "۹ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&h=400&fit=crop",
  },
];

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory =
      activeCategory === "همه" || article.category === activeCategory;
    const matchesSearch =
      article.title.includes(searchQuery) ||
      article.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-2">
          مقالات بازار مالی
        </h1>
        <p className="text-[#6E6E6E]">
          آخرین مقالات و تحلیل‌های بازارهای مالی را مطالعه کنید
        </p>
      </div>

      {/* Filters */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#6E6E6E]">مقاله‌ای یافت نشد</p>
        </div>
      )}
    </div>
  );
}
