import { createPageUrl } from "@/utils";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Share2,
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
import Link from "next/link";

export default function ArticleDetail() {
  const article = {
    id: 1,
    title: "چگونه از ضرر در بازار کریپتو جلوگیری کنیم؟",
    category: "کریپتو",
    author: "علی محمدی",
    authorBio: "تحلیلگر ارشد بازارهای مالی با ۱۰ سال تجربه",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "۱۵ دی ۱۴۰۳",
    readTime: "۷ دقیقه مطالعه",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=600&fit=crop",
    tags: ["کریپتو", "مدیریت ریسک", "بیت‌کوین", "سرمایه‌گذاری"],
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
        <Link
          href={createPageUrl("Articles")}
          className="text-[#6E6E6E] hover:text-[#E45858] transition-colors"
        >
          مقالات
        </Link>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <Badge className="bg-purple-100 text-purple-700 mb-4">
          {article.category}
        </Badge>

        <h1 className="text-2xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-relaxed">
          {article.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E1DC]">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border-2 border-[#E45858]/20">
              <AvatarImage src={article.authorAvatar} />
              <AvatarFallback className="bg-[#E45858] text-white font-bold">
                {article.author[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-[#1A1A1A]">{article.author}</p>
              <p className="text-sm text-[#6E6E6E]">{article.authorBio}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#6E6E6E]">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-[2/1] object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <p className="text-[#1A1A1A] leading-loose text-lg">
          بازار ارزهای دیجیتال یکی از پرنوسان‌ترین بازارهای مالی جهان است.
          بسیاری از معامله‌گران تازه‌کار بدون داشتن استراتژی مناسب وارد این
          بازار می‌شوند و متحمل ضررهای سنگینی می‌گردند. در این مقاله، قصد داریم
          راهکارهای عملی برای مدیریت ریسک و جلوگیری از ضرر در بازار کریپتو را
          بررسی کنیم.
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">
          ۱. تعیین حد ضرر (Stop Loss)
        </h2>
        <p className="text-[#1A1A1A] leading-loose">
          یکی از مهم‌ترین ابزارهای مدیریت ریسک، تعیین حد ضرر است. قبل از ورود به
          هر معامله، باید مشخص کنید که در چه قیمتی از معامله خارج می‌شوید. این
          کار از ضررهای بزرگ جلوگیری می‌کند و به شما کمک می‌کند تا احساساتی
          تصمیم نگیرید.
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">
          ۲. تنوع‌بخشی به سبد سرمایه‌گذاری
        </h2>
        <p className="text-[#1A1A1A] leading-loose">
          هیچ‌گاه تمام سرمایه خود را در یک ارز دیجیتال قرار ندهید. با تنوع‌بخشی
          به سبد سرمایه‌گذاری، ریسک کلی پرتفوی خود را کاهش می‌دهید. پیشنهاد
          می‌شود سرمایه خود را بین ارزهای مختلف با سطح ریسک متفاوت تقسیم کنید.
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">
          ۳. استفاده از مدیریت سرمایه
        </h2>
        <p className="text-[#1A1A1A] leading-loose">
          قانون ۲ درصد یکی از معروف‌ترین قوانین مدیریت سرمایه است. طبق این
          قانون، در هر معامله نباید بیش از ۲ درصد از کل سرمایه خود را ریسک کنید.
          این روش به شما اجازه می‌دهد حتی پس از چند معامله زیان‌ده، همچنان
          سرمایه کافی برای ادامه معاملات داشته باشید.
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">
          ۴. تحلیل قبل از معامله
        </h2>
        <p className="text-[#1A1A1A] leading-loose">
          قبل از ورود به هر معامله، تحلیل کامل انجام دهید. هم تحلیل تکنیکال و هم
          تحلیل بنیادی می‌توانند به شما در تصمیم‌گیری بهتر کمک کنند. همچنین،
          اخبار و رویدادهای مرتبط با ارز دیجیتال مورد نظر را دنبال کنید.
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">
          ۵. کنترل احساسات
        </h2>
        <p className="text-[#1A1A1A] leading-loose">
          ترس و طمع دو دشمن اصلی معامله‌گران هستند. هیچ‌گاه تحت تأثیر احساسات
          تصمیم نگیرید. به استراتژی خود پایبند باشید و از معاملات هیجانی خودداری
          کنید. اگر احساس می‌کنید تحت فشار هستید، بهتر است از معامله فاصله
          بگیرید.
        </p>

        <div className="bg-[#FFF8F3] border-r-4 border-[#E45858] p-6 rounded-lg my-8">
          <p className="text-[#1A1A1A] font-medium m-0">
            💡 نکته مهم: همیشه با سرمایه‌ای معامله کنید که تحمل از دست دادن آن
            را دارید. بازار کریپتو پرریسک است و هیچ تضمینی برای سود وجود ندارد.
          </p>
        </div>
      </article>

      {/* Tags */}
      <div className="flex items-center gap-3 flex-wrap mb-8 pb-8 border-b border-[#E5E1DC]">
        <Tag className="w-5 h-5 text-[#6E6E6E]" />
        {article.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-[#E5E1DC] text-[#1A1A1A] hover:border-[#E45858] hover:text-[#E45858] cursor-pointer transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Share & CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-[#E5E1DC]">
        <div className="flex items-center gap-3">
          <span className="text-[#6E6E6E]">اشتراک‌گذاری:</span>
          <button className="w-10 h-10 rounded-xl bg-[#F0EAE2] hover:bg-[#E45858] hover:text-white text-[#1A1A1A] flex items-center justify-center transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl bg-[#F0EAE2] hover:bg-[#E45858] hover:text-white text-[#1A1A1A] flex items-center justify-center transition-colors">
            <Linkedin className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl bg-[#F0EAE2] hover:bg-[#E45858] hover:text-white text-[#1A1A1A] flex items-center justify-center transition-colors">
            <Link2 className="w-5 h-5" />
          </button>
        </div>

        <Link href={createPageUrl("video-education")}>
          <Button className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 gap-2 shadow-lg shadow-[#E45858]/25">
            <PlayCircle className="w-5 h-5" />
            مشاهده آموزش‌های مرتبط
          </Button>
        </Link>
      </div>

      {/* Comments */}
      <Comments type="article" />
    </div>
  );
}
