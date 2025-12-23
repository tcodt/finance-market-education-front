"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import { useGetArticles } from "@/hooks/useGetArticles"; // فرض: این هوک همه بلاگ‌ها رو از /blogs/ می‌گیره

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles = [], isLoading } = useGetArticles();

  // استخراج دسته‌بندی‌های منحصر به فرد + تعداد مقاله در هر کدام
  const categories = useMemo(() => {
    const categoryMap = new Map();

    // دسته "همه" رو دستی اضافه می‌کنیم
    categoryMap.set("همه", articles.length);

    articles.forEach((article) => {
      const title = article?.category?.title || "بدون دسته";
      categoryMap.set(title, (categoryMap.get(title) || 0) + 1);
    });

    // تبدیل Map به آرایه و مرتب‌سازی (اختیاری: الفبایی یا بر اساس تعداد)
    return Array.from(categoryMap.entries()).sort((a, b) => {
      if (a[0] === "همه") return -1;
      if (b[0] === "همه") return 1;
      return b[1] - a[1]; // بیشترین تعداد اول
    });
  }, [articles]);

  // فیلتر کردن مقاله‌ها
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryTitle = article?.category?.title || "بدون دسته";

      // فیلتر دسته‌بندی
      const matchesCategory =
        activeCategory === "همه" || categoryTitle === activeCategory;

      // فیلتر جستجو
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          مقالات بازار مالی
        </h1>
        <p className="text-lg text-gray-600">
          آخرین مقالات، تحلیل‌ها و آموزش‌های بازارهای مالی
        </p>
      </div>

      {/* Search + Category Filter */}
      <div className="mb-10">
        {/* جستجو */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="جستجو در عنوان یا خلاصه مقاله..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-300 focus:border-black focus:outline-none transition"
          />
        </div>

        {/* تب‌های دسته‌بندی */}
        <div className="flex gap-3 flex-wrap">
          {categories.map(([catTitle, count]) => (
            <button
              key={catTitle}
              onClick={() => setActiveCategory(catTitle)}
              className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                activeCategory === catTitle
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {catTitle}
              <span className="mr-2 text-sm opacity-70">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-20">
          <p className="text-lg">در حال بارگذاری مقالات...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            {searchQuery
              ? "مقاله‌ای با این عنوان یا محتوا یافت نشد."
              : "هنوز مقاله‌ای در این دسته‌بندی منتشر نشده."}
          </p>
        </div>
      ) : (
        /* Articles Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
