import { ChevronLeft } from "lucide-react";
import VideoPlayer from "@/components/video/VideoPlayer";
import InstructorInfo from "@/components/video/InstructorInfo";
import ProgressPanel from "@/components/video/ProgressPanel";
import Comments from "@/components/shared/Comments";
import { Button } from "@/components/ui/button";

export default function VideoEducation() {
  return (
    <div className="w-full px-[3%]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-3 flex-wrap">
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#6E6E6E] hover:text-[#E45858] cursor-pointer transition-colors">
          همه دوره‌ها
        </span>
        <ChevronLeft className="w-4 h-4 text-[#6E6E6E]" />
        <span className="text-[#1A1A1A] font-medium">
          آموزش مقدماتی بازار مالی
        </span>
      </nav>

      <div className="flex gap-4">
        {/* Progress Panel - Right Side */}
        <div className="w-[260px] flex-shrink-0 hidden lg:block mr-6">
          <ProgressPanel />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Video Player */}
          <VideoPlayer
            title="آموزش مقدماتی بازار مالی"
            thumbnail="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop"
          />

          {/* Instructor Info */}
          <InstructorInfo
            name="استاد میلاد رضایی"
            email="milad.rezaei@finance.ir"
            rating={4.8}
            duration="۶ هفته"
            lessons={14}
          />

          {/* Course Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
              درباره دوره
            </h3>
            <div className="prose prose-sm max-w-none text-[#1A1A1A] leading-relaxed space-y-4">
              <p>
                این دوره آموزشی جامع برای افرادی طراحی شده که می‌خواهند وارد
                دنیای بازارهای مالی شوند. در این دوره، شما با مفاهیم پایه‌ای
                بازارهای مالی، از جمله فارکس، ارزهای دیجیتال، و بورس آشنا خواهید
                شد.
              </p>
              <p>
                در طول این دوره، شما یاد خواهید گرفت که چگونه تحلیل تکنیکال
                انجام دهید، ریسک معاملات خود را مدیریت کنید، و استراتژی‌های
                معاملاتی مؤثر را پیاده‌سازی کنید. همچنین، با روانشناسی معاملات
                آشنا می‌شوید که یکی از مهم‌ترین جنبه‌های موفقیت در بازارهای مالی
                است.
              </p>
              <p>
                این دوره شامل ۱۴ جلسه ویدیویی، تمرین‌های عملی، و آزمون‌های
                دوره‌ای است. پس از اتمام موفقیت‌آمیز دوره، گواهینامه پایان دوره
                به شما اعطا خواهد شد.
              </p>
            </div>
          </div>

          {/* Comments */}
          <Comments type="video" />
        </div>
      </div>
    </div>
  );
}
