"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetArticleDetail } from "@/hooks/useGetArticleDetail";

import { createPageUrl } from "@/utils";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Twitter,
  Linkedin,
  Link2,
  PlayCircle,
  Tag,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Comments from "@/components/shared/Comments";
import { toast } from "sonner";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { data: article, isLoading } = useGetArticleDetail(slug);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!article) return <p>مقاله یافت نشد</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link
          href={createPageUrl("blogs")}
          className="text-[#6E6E6E] hover:text-[#E45858]"
        >
          مقالات
        </Link>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <Badge className="bg-purple-100 text-purple-700 mb-4">
          {article.category?.title}
        </Badge>

        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed my-4">
          {article.title}
        </h1>

        {/* Author */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pb-6 border-b border-[#E5E1DC]">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border-2 border-[#E45858]/20">
              <AvatarImage src={article.author?.avatar} />
              <AvatarFallback className="bg-[#E45858] text-white font-bold">
                {article.author?.full_name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold">{article.author?.full_name}</p>
              <p className="text-sm text-[#6E6E6E]">
                {article.author?.description}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#6E6E6E]">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.reading_time} دقیقه مطالعه</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      <img
        src={article.cover}
        alt={article.title}
        className="w-full rounded-2xl mb-8 shadow-lg aspect-[2/1] object-cover"
      />

      {/* Content (HTML) */}
      <article
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      <div className="flex gap-3 flex-wrap mb-8 pb-8 border-b border-[#E5E1DC]">
        <Tag className="w-5 h-5 text-[#6E6E6E]" />
        {article.tags?.map((tag) => (
          <Badge
            key={tag.id}
            variant="outline"
            className="border-[#E5E1DC] hover:border-[#E45858] hover:text-[#E45858]"
          >
            {tag.title}
          </Badge>
        ))}
      </div>

      {/* Share */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-12 p-6 bg-white rounded-2xl border shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[#6E6E6E] whitespace-nowrap">
            اشتراک‌گذاری:
          </span>

          {/* شیر در X (توییتر) */}
          {article.x && (
            <a
              href={article.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              aria-label="پروفایل X نویسنده"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}

          {/* شیر واقعی در X - پست مقاله */}
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              const text = encodeURIComponent(
                `${article.title} — مقاله‌ای از ${article.author?.full_name}`
              );
              window.open(
                `https://x.com/intent/post?url=${url}&text=${text}`,
                "share-x",
                "width=600,height=400"
              );
            }}
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            aria-label="اشتراک در X"
          >
            <Twitter className="w-5 h-5 text-black" />
          </button>

          {/* لینکدین */}
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              const title = encodeURIComponent(article.title);
              const summary = encodeURIComponent(
                article.excerpt || article.title
              );
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
                "share-linkedin",
                "width=600,height=600"
              );
            }}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="اشتراک در لینکدین"
          >
            <Linkedin className="w-5 h-5" />
          </button>

          {/* کپی لینک */}
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                // می‌تونی یه toast ساده نشون بدی (اختیاری)
                toast.success("لینک مقاله کپی شد!");
              } catch (err) {
                toast.error("خطا در کپی لینک");
              }
            }}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="کپی لینک"
          >
            <Link2 className="w-5 h-5" />
          </button>
        </div>

        {/* لینک‌های سوشیال نویسنده اگر وجود داشته باشه */}
        {(article.telegram || article.instagram || article.youtube) && (
          <div className="flex items-center gap-3">
            <span className="text-[#6E6E6E] text-sm whitespace-nowrap">
              پروفایل نویسنده:
            </span>
            <div className="flex gap-2">
              {article.telegram && (
                <a
                  href={article.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                  aria-label="تلگرام"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-.78l15.1-5.8c.73-.28 1.38.5.99 1.16L14.1 17.5l-1.7 4.03c-.24.57-.88.7-1.24.38l-2.58-2.6z" />
                  </svg>
                </a>
              )}

              {article.instagram && (
                <a
                  href={article.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity"
                  aria-label="اینستاگرام"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zm0 1.8c-3.16 0-3.53.01-4.79.07-2.45.12-3.75 1.42-3.88 3.88-.06 1.26-.07 1.63-.07 4.79s.01 3.53.07 4.79c.12 2.46 1.42 3.76 3.88 3.88 1.26.06 1.63.07 4.79.07s3.53-.01 4.79-.07c2.46-.12 3.76-1.42 3.88-3.88.06-1.26.07-1.63.07-4.79s-.01-3.53-.07-4.79c-.12-2.45-1.42-3.75-3.88-3.88-1.26-.06-1.63-.07-4.79-.07zm0 3.24a5.76 5.76 0 110 11.52 5.76 5.76 0 010-11.52zm0 9.52a3.76 3.76 0 100-7.52 3.76 3.76 0 000 7.52zm6.04-9.96a1.36 1.36 0 11-2.72 0 1.36 1.36 0 012.72 0z" />
                  </svg>
                </a>
              )}

              {article.youtube && (
                <a
                  href={article.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  aria-label="یوتیوب"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.5 6.96c-.27-1.02-1.07-1.82-2.09-2.09-1.84-.49-9.41-.49-9.41-.49s-7.57 0-9.41.49c-1.02.27-1.82 1.07-2.09 2.09C.24 8.81.24 12 .24 12s0 3.19.27 5.04c.27 1.02 1.07 1.82 2.09 2.09 1.84.49 9.41.49 9.41.49s7.57 0 9.41-.49c1.02-.27 1.82-1.07 2.09-2.09.27-1.85.27-5.04.27-5.04s.01-3.19-.27-5.04zM9.8 15.62V8.38l6.27 3.62-6.27 3.62z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* دکمه آموزش‌های مرتبط - بدون تغییر */}
        <Link href={createPageUrl("video-education")}>
          <Button className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 whitespace-nowrap">
            <PlayCircle className="w-5 h-5 ml-2" />
            مشاهده آموزش‌های مرتبط
          </Button>
        </Link>
      </div>

      <Comments type="blog" id={article.id} slug={article.slug} />
    </div>
  );
}
