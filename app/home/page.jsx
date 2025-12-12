import { createPageUrl } from "@/utils";
import { PlayCircle, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E4E4E4] flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Image/Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img
            src="https://images.unsplash.com/photo-1642790595397-7047dc98fa72?w=1200&h=600&fit=crop"
            alt="آموزش بازار مالی"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                آموزش بازار مالی
              </h1>
              <p className="text-xl text-white/90 font-medium">
                یادگیری حرفه‌ای و جامع
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={createPageUrl("video-courses")}
            className="group flex items-center gap-3 bg-white hover:bg-[#000000] text-[#000000] hover:text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center border border-[#D9D9D9]"
          >
            <PlayCircle className="w-6 h-6" />
            <span className="font-bold text-lg">آموزش ویدیویی</span>
          </Link>

          <Link
            href={createPageUrl("blogs")}
            className="group flex items-center gap-3 bg-white hover:bg-[#000000] text-[#000000] hover:text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center border border-[#D9D9D9]"
          >
            <FileText className="w-6 h-6" />
            <span className="font-bold text-lg">مقاله‌ها</span>
          </Link>

          <Link
            href={createPageUrl("article-courses")}
            className="group flex items-center gap-3 bg-white hover:bg-[#000000] text-[#000000] hover:text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center border border-[#D9D9D9]"
          >
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg">آموزش متنی</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
