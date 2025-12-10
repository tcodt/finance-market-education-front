"use client";

import { useState } from "react";
import { ChevronLeft, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const courseArticles = [
  {
    id: 1,
    title: "مقدمه‌ای بر تحلیل تکنیکال",
    status: "completed",
    readTime: "۱۵ دقیقه",
    content: `# مقدمه‌ای بر تحلیل تکنیکال

تحلیل تکنیکال یکی از روش‌های اصلی برای پیش‌بینی روند قیمت در بازارهای مالی است. این روش بر اساس بررسی نمودارها و الگوهای قیمتی عمل می‌کند.

## اصول پایه

تحلیل تکنیکال بر سه اصل اساسی استوار است:

1. **قیمت همه چیز را در خود دارد**: تمام اطلاعات موجود در قیمت منعکس شده است
2. **قیمت در روند حرکت می‌کند**: بازار دارای روندهای صعودی، نزولی و خنثی است
3. **تاریخ تکرار می‌شود**: الگوهای قیمتی تمایل به تکرار دارند

## ابزارهای تحلیل تکنیکال

- **نمودار شمعی ژاپنی**
- **خطوط روند**
- **سطوح حمایت و مقاومت**
- **اندیکاتورها**

در مقالات بعدی، به تفصیل هر یک از این موارد را بررسی خواهیم کرد.`,
  },
  {
    id: 2,
    title: "نمودار شمعی ژاپنی",
    status: "completed",
    readTime: "۲۰ دقیقه",
    content: `# نمودار شمعی ژاپنی

نمودار شمعی ژاپنی یکی از محبوب‌ترین انواع نمودارها در تحلیل تکنیکال است که اطلاعات جامعی از حرکت قیمت را در اختیار معامله‌گران قرار می‌دهد.

## ساختار یک کندل

هر کندل شامل چهار قیمت مهم است:
- قیمت باز شدن (Open)
- قیمت بسته شدن (Close)
- بالاترین قیمت (High)
- پایین‌ترین قیمت (Low)

بدنه کندل نشان‌دهنده فاصله بین قیمت باز و بسته است، و سایه‌ها (Wick) نشان‌دهنده بالاترین و پایین‌ترین قیمت هستند.`,
  },
  {
    id: 3,
    title: "الگوهای کندل استیک",
    status: "current",
    readTime: "۲۵ دقیقه",
    content: `# الگوهای کندل استیک

الگوهای کندل استیک ابزار قدرتمندی برای شناسایی نقاط برگشت روند و ادامه روند هستند.

## الگوهای برگشتی

### الگوهای برگشتی صعودی
- **هامر (Hammer)**: نشان‌دهنده برگشت از روند نزولی
- **اینورتد هامر (Inverted Hammer)**: احتمال برگشت صعودی
- **بولیش انگالفینگ (Bullish Engulfing)**: الگوی قوی برگشتی صعودی

### الگوهای برگشتی نزولی
- **شوتینگ استار (Shooting Star)**: احتمال برگشت نزولی
- **هنگینگ من (Hanging Man)**: هشدار برگشت نزولی
- **بریش انگالفینگ (Bearish Engulfing)**: الگوی قوی برگشتی نزولی

در ادامه به تفصیل نحوه معامله با این الگوها را خواهیم آموخت.`,
  },
  {
    id: 4,
    title: "خطوط روند و کانال‌ها",
    status: "locked",
    readTime: "۱۸ دقیقه",
    content: "",
  },
  {
    id: 5,
    title: "سطوح حمایت و مقاومت",
    status: "locked",
    readTime: "۲۲ دقیقه",
    content: "",
  },
  {
    id: 6,
    title: "اندیکاتورهای پرکاربرد",
    status: "locked",
    readTime: "۳۰ دقیقه",
    content: "",
  },
];

export default function ArticleCourseDetail() {
  const [selectedArticle, setSelectedArticle] = useState(courseArticles[2]); // Current article

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          آموزش‌های مقاله‌ای
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">مبانی تحلیل تکنیکال</span>
      </nav>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Progress Panel - Right Side */}
        <div className="lg:order-1">
          <div className="bg-white rounded-[28px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] sticky top-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[17px] font-bold text-[#1A1A1A]">سرفصل‌ها</h3>
              <span className="text-sm text-[#6E6E6E]">
                {courseArticles.filter((a) => a.status === "completed").length}/
                {courseArticles.length}
              </span>
            </div>

            {/* Articles List */}
            <div className="space-y-2">
              {courseArticles.map((article, index) => (
                <button
                  key={article.id}
                  onClick={() =>
                    article.status !== "locked" && setSelectedArticle(article)
                  }
                  disabled={article.status === "locked"}
                  className={cn(
                    "w-full text-right flex items-start gap-3 p-3 rounded-xl transition-all",
                    selectedArticle.id === article.id && "bg-[#F0EAE2]",
                    article.status !== "locked" &&
                      "hover:bg-[#F0EAE2]/50 cursor-pointer",
                    article.status === "locked" &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                        article.status === "completed" && "bg-[#E45858]",
                        article.status === "current" &&
                          "bg-white border-[3px] border-[#E45858]",
                        article.status === "locked" && "bg-[#E5E1DC]"
                      )}
                    >
                      {article.status === "completed" && (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={2.5}
                        />
                      )}
                      {article.status === "locked" && (
                        <Lock className="w-3 h-3 text-[#6E6E6E]" />
                      )}
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-[15px] leading-snug mb-1",
                        article.status === "current" &&
                          "font-semibold text-[#1A1A1A]",
                        article.status === "completed" &&
                          "font-medium text-[#1A1A1A]",
                        article.status === "locked" && "text-[#6E6E6E]"
                      )}
                    >
                      {article.title}
                    </p>
                    <p className="text-xs text-[#6E6E6E]">{article.readTime}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="lg:order-2">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E1DC]">
            {selectedArticle.status === "locked" ? (
              <div className="text-center py-16">
                <Lock className="w-16 h-16 text-[#E5E1DC] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  این مقاله قفل است
                </h3>
                <p className="text-[#6E6E6E]">
                  برای دسترسی به این مقاله، ابتدا مقالات قبلی را مطالعه کنید
                </p>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-[#1A1A1A] mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-[#1A1A1A] mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[#1A1A1A] leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc mr-6 mb-4 space-y-2 text-[#1A1A1A]">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                  }}
                >
                  {selectedArticle.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
