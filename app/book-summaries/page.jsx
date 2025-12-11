"use client";

import { useState } from "react";
import { createPageUrl } from "@/utils";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const booksData = [
  {
    id: 1,
    title: "سرمایه‌گذار هوشمند",
    author: "بنجامین گراهام",
    description: "راهنمای جامع سرمایه‌گذاری ارزشی و تحلیل بنیادی",
    cover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    category: "سرمایه‌گذاری",
    readTime: "۴۵ دقیقه",
  },
  {
    id: 2,
    title: "روانشناسی پول",
    author: "مورگان هاوسل",
    description: "درک رفتار انسان در مورد پول و سرمایه",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "روانشناسی",
    readTime: "۳۰ دقیقه",
  },
  {
    id: 3,
    title: "پدر پولدار، پدر فقیر",
    author: "رابرت کیوساکی",
    description: "آموزش هوش مالی و تفکر ثروتمندانه",
    cover:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
    category: "مدیریت مالی",
    readTime: "۴۰ دقیقه",
  },
  {
    id: 4,
    title: "تحلیل تکنیکال بازارهای مالی",
    author: "جان مورفی",
    description: "کتاب جامع تحلیل تکنیکال برای معامله‌گران",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    category: "تحلیل تکنیکال",
    readTime: "۵۰ دقیقه",
  },
  {
    id: 5,
    title: "معامله‌گر منضبط",
    author: "مارک داگلاس",
    description: "توسعه نگرش برنده در معاملات",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "روانشناسی",
    readTime: "۳۵ دقیقه",
  },
  {
    id: 6,
    title: "استاندارد بیت‌کوین",
    author: "سیف الدین عموس",
    description: "جایگزین غیرمتمرکز برای بانکداری مرکزی",
    cover:
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=600&fit=crop",
    category: "کریپتو",
    readTime: "۵۵ دقیقه",
  },
];

const categories = [
  "همه",
  "سرمایه‌گذاری",
  "روانشناسی",
  "مدیریت مالی",
  "تحلیل تکنیکال",
  "کریپتو",
];

export default function BookSummaries() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = booksData.filter((book) => {
    const matchesCategory =
      activeCategory === "همه" || book.category === activeCategory;
    const matchesSearch =
      book.title.includes(searchQuery) || book.author.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full px-[3%]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#000000] mb-2">
          خلاصه کتاب‌های بازار مالی
        </h1>
        <p className="text-[#6E6E6E]">
          خلاصه بهترین کتاب‌های دنیای سرمایه‌گذاری و معاملات
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all ${
              activeCategory === category
                ? "bg-[#000000] text-white hover:bg-[#000000]"
                : "border-[#D9D9D9] hover:border-[#000000] hover:bg-[#E4E4E4]"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E6E6E] w-5 h-5" />
        <Input
          type="text"
          placeholder="جستجو در کتاب‌ها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 py-6 rounded-xl border-[#D9D9D9] focus:border-[#000000]"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            href={`${createPageUrl("book-summary-detail")}?id=${book.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D9D9D9] hover:shadow-xl transition-all duration-300"
          >
            {/* Book Cover */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#E4E4E4] to-[#CFCFCF]">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-[#000000] opacity-20" />
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-[#000000] text-white text-xs font-medium rounded-full">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-bold text-[#000000] group-hover:text-[#000000] transition-colors line-clamp-2">
                {book.title}
              </h3>

              <p className="text-sm text-[#6E6E6E]">{book.author}</p>

              <p className="text-sm text-[#6E6E6E] line-clamp-2 leading-relaxed">
                {book.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#D9D9D9]">
                <span className="text-xs text-[#6E6E6E]">
                  زمان مطالعه: {book.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-[#D9D9D9] mx-auto mb-4" />
          <p className="text-[#6E6E6E]">کتابی پیدا نشد</p>
        </div>
      )}
    </div>
  );
}
