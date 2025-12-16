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

        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed">
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
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-12 p-6 bg-white rounded-2xl border">
        <div className="flex items-center gap-3">
          <span className="text-[#6E6E6E]">اشتراک‌گذاری:</span>

          <button className="share-btn">
            <Twitter className="w-5 h-5" />
          </button>

          <button className="share-btn">
            <Linkedin className="w-5 h-5" />
          </button>

          <button className="share-btn">
            <Link2 className="w-5 h-5" />
          </button>
        </div>

        <Link href={createPageUrl("video-education")}>
          <Button className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6">
            <PlayCircle className="w-5 h-5" />
            مشاهده آموزش‌های مرتبط
          </Button>
        </Link>
      </div>

      <Comments type="blog" id={article.id} slug={article.slug} />
    </div>
  );
}
