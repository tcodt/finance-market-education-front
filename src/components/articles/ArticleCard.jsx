import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft } from "lucide-react";

const categoryColors = {
  فارکس: "bg-blue-100 text-blue-700",
  کریپتو: "bg-purple-100 text-purple-700",
  "بورس ایران": "bg-green-100 text-green-700",
  "سهام جهانی": "bg-orange-100 text-orange-700",
  "روانشناسی معامله‌گری": "bg-pink-100 text-pink-700",
};

export default function ArticleCard({ article }) {
  return (
    <Link
      href={`/blogs/${article.slug}`}
      className="group block overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden rounded-xl mb-3">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base text-[#000000] leading-snug group-hover:text-[#000000] transition-colors">
        {article.title}
      </h3>
    </Link>
  );
}
