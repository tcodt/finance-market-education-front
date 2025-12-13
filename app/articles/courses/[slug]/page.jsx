"use client";

import { useArticleCourseDetail } from "@/hooks/useGetArticleCourseDetail.js";
import { useParams } from "next/navigation";
import { ChevronLeft, Lock, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ArticleCourseDetailPage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useArticleCourseDetail(slug);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    if (data?.sections?.length) setSelectedSection(data.sections[0]);
  }, [data]);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Lock className="w-12 h-12 text-red-500" />
        <h4 className="text-xl font-bold text-gray-800">دسترسی غیرمجاز</h4>
        <p className="text-gray-600">
          برای مشاهده این بخش باید وارد حساب کاربری خود شوید
        </p>
      </div>
    );
  }

  const completedCount = data.sections.length; // نیاز به API واقعی برای استیت‌ها
  const totalCount = data.sections.length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
        <span className="text-gray-500">آموزش‌های مقاله‌ای</span>
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-black">{data.title}</span>
      </nav>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar Sections */}
        <div className="lg:order-1">
          <div className="bg-white rounded-2xl p-6 shadow sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">سرفصل‌ها</h3>
              <span className="text-sm text-gray-500">
                {completedCount}/{totalCount}
              </span>
            </div>

            <div className="space-y-2">
              {data.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={cn(
                    "w-full text-right flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-gray-100",
                    selectedSection?.id === section.id && "bg-gray-200"
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{section.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:order-2">
          <div className="bg-white rounded-2xl p-8 border shadow-sm">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{selectedSection?.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
