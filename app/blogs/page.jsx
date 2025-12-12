"use client";

import { useState } from "react";
import { useGetArticles } from "@/hooks/useGetArticles";
import ArticleCard from "@/components/articles/ArticleCard";
import CategoryFilter from "@/components/articles/CategoryFilter";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles = [], isLoading } = useGetArticles();

  // فیلتر دسته‌بندی
  const filteredByCategory = articles.filter((article) => {
    const categoryTitle = article?.category?.title || "";
    return activeCategory === "همه" || categoryTitle === activeCategory;
  });

  // فیلتر جستجو
  const filteredArticles = filteredByCategory.filter((article) => {
    return (
      article.title.includes(searchQuery) ||
      article.excerpt.includes(searchQuery)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">مقالات بازار مالی</h1>
        <p className="text-gray-500">آخرین مقالات و تحلیل‌های بازار مالی</p>
      </div>

      {/* Filters */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isLoading ? (
        <p className="text-center py-10">در حال بارگذاری...</p>
      ) : (
        <>
          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              مقاله‌ای یافت نشد
            </div>
          )}
        </>
      )}
    </div>
  );
}
